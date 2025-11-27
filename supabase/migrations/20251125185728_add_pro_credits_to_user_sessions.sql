/*
  # Add Pro Credits to user_sessions table

  1. Changes
    - Add `pro_credits` column to `user_sessions` table
      - Default value: 0 (Free Tier users start with no credits)
      - Type: integer (non-negative)
      - Used to track Pro Tier visualization credits

  2. Notes
    - Pro Tier feature: 50 credits required per image generation
    - Credits are deducted atomically during visualization requests
    - Free Tier users have 0 credits and cannot access Pro features
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_sessions' AND column_name = 'pro_credits'
  ) THEN
    ALTER TABLE user_sessions ADD COLUMN pro_credits integer DEFAULT 0 NOT NULL CHECK (pro_credits >= 0);
  END IF;
END $$;

COMMENT ON COLUMN user_sessions.pro_credits IS 'Pro Tier visualization credits. 50 credits = 1 image generation. Free Tier users have 0 credits.';
