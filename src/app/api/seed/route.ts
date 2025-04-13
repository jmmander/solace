import db from "../../../db";
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST() {
  // Create a new array with converted phone numbers
  const convertedData = advocateData.map(advocate => ({
    ...advocate,
    phoneNumber: String(advocate.phoneNumber) // Convert number to string
  }));

  const records = await db.insert(advocates).values(convertedData).returning();

  return Response.json({ advocates: records });
}