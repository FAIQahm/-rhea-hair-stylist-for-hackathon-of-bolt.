/*
  # Create user_sessions table for Rhea Stylist Agent

  1. New Tables
    - `user_sessions`
      - `id` (uuid, primary key) - Unique session identifier
      - `user_id` (uuid, foreign key to auth.users) - Links to authenticated user
      - `face_shape` (text) - Detected face shape (oval, round, square, heart, diamond)
      - `skin_undertone` (text) - Detected skin undertone (warm, cool, neutral)
      - `current_hairstyle` (text) - Currently recommended hairstyle
      - `preferences` (jsonb) - User preferences and additional metadata
      - `created_at` (timestamptz) - Session creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `user_sessions` table
    - Add policy for authenticated users to read their own session data
    - Add policy for authenticated users to insert their own session data
    - Add policy for authenticated users to update their own session data
    - Add policy for authenticated users to delete their own session data

  3. Notes
    - Uses auth.uid() for user identification
    - Automatically updates updated_at timestamp on row changes
    - Preferences stored as JSONB for flexible schema evolution
*/

CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  face_shape text,
  skin_undertone text,
  current_hairstyle text,
  preferences jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create index for faster lookups by user_id
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);

-- Enable Row Level Security
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own session data
CREATE POLICY "Users can read own session data"
  ON user_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own session data
CREATE POLICY "Users can insert own session data"
  ON user_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own session data
CREATE POLICY "Users can update own session data"
  ON user_sessions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own session data
CREATE POLICY "Users can delete own session data"
  ON user_sessions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before updates
CREATE TRIGGER update_user_sessions_updated_at
  BEFORE UPDATE ON user_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
