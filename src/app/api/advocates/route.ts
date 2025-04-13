import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { NextRequest } from "next/server";
import { count, sql, ilike, or, eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  // Get pagination parameters from URL query string
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const searchTerm = searchParams.get("search") || "";
  
  // Calculate offset for pagination
  const offset = (page - 1) * pageSize;
  
  let data;
  let totalCount;

  try {
    // Create search conditions if search term is provided
    let conditions = undefined;
    
    if (searchTerm) {
      // Specialties is a jsonb array, so we need to search within it
      const specialtiesSearch = sql`EXISTS (
        SELECT 1 FROM jsonb_array_elements_text(${advocates.specialties}) as specialty
        WHERE specialty ILIKE ${'%' + searchTerm + '%'}
      )`;

      // Create case-insensitive search across multiple columns
      // Use proper parameterized queries with sql template literals
      conditions = or(
        sql`${advocates.firstName} ILIKE ${'%' + searchTerm + '%'}`,
        sql`${advocates.lastName} ILIKE ${'%' + searchTerm + '%'}`,
        sql`${advocates.city} ILIKE ${'%' + searchTerm + '%'}`,
        sql`${advocates.degree} ILIKE ${'%' + searchTerm + '%'}`,
        specialtiesSearch,
        sql`CAST(${advocates.yearsOfExperience} AS TEXT) ILIKE ${'%' + searchTerm + '%'}`,
        sql`${advocates.phoneNumber} ILIKE ${'%' + searchTerm + '%'}`
      );
    }

    // Fetch paginated data with optional search filter
    data = await db
      .select()
      .from(advocates)
      .where(conditions)
      .limit(pageSize)
      .offset(offset);
    
    // Get total count with the same search filter applied
    const countResult = await db
      .select({ value: count() })
      .from(advocates)
      .where(conditions);
    
    totalCount = countResult[0]?.value || 0;
  } catch (error) {
    console.error("Database error:", error);
    // Fallback to local data if database query fails
    const filteredData = searchTerm 
      ? advocateData.filter(advocate => 
          advocate && (
            advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
            advocate.specialties.some(specialty => 
              specialty.toLowerCase().includes(searchTerm.toLowerCase())
            ) ||
            advocate.yearsOfExperience.toString().includes(searchTerm.toLowerCase()) ||
            advocate.phoneNumber.toString().includes(searchTerm.toLowerCase())
          )
        )
      : advocateData;
    
    const startIndex = offset;
    const endIndex = startIndex + pageSize;
    data = filteredData.slice(startIndex, endIndex);
    totalCount = filteredData.length;
  }
  
  // Ensure data is not empty
  data = data.filter(advocate => !!advocate);
  
  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);
  
  return Response.json({
    data,
    meta: {
      currentPage: page,
      pageSize,
      totalPages,
      totalCount,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
}