-- Migration to convert phone_number from bigint to text

-- Add a new column for the text version
ALTER TABLE "advocates" ADD COLUMN "phone_number_text" text;

-- Copy and convert data from the bigint column to the text column
UPDATE "advocates" SET "phone_number_text" = "phone_number"::text;

-- Make the new column NOT NULL after data is copied
ALTER TABLE "advocates" ALTER COLUMN "phone_number_text" SET NOT NULL;

-- Drop the old bigint column
ALTER TABLE "advocates" DROP COLUMN "phone_number";

-- Rename the new text column to the original name
ALTER TABLE "advocates" RENAME COLUMN "phone_number_text" TO "phone_number";