import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";
import { NextRequest } from "next/server";
import { count } from "drizzle-orm";

export async function GET(request: NextRequest) {
  // Get pagination parameters from URL query string
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  
  // Calculate offset for pagination
  const offset = (page - 1) * pageSize;
  
  let data;
  let totalCount;

  try {
    // Try to use database pagination
    try {
      // Fetch paginated data using Drizzle
      data = await db
        .select()
        .from(advocates)
        .limit(pageSize)
        .offset(offset);
      
      // Get total count
      const countResult = await db
        .select({ value: count() })
        .from(advocates);
      
      totalCount = countResult[0]?.value || 0;
    } catch (dbError) {
      console.error("Database query error:", dbError);
      throw dbError; // Re-throw to be caught by the outer try/catch
    }
  } catch (error) {
    console.error("Falling back to local data:", error);
    // Fallback to local data if anything fails
    const startIndex = offset;
    const endIndex = startIndex + pageSize;
    data = advocateData.slice(startIndex, endIndex);
    totalCount = advocateData.length;
  }
  
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