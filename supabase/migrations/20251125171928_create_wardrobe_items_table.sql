/*
  # Create wardrobe_items table for Rhea Stylist Agent

  1. New Tables
    - `wardrobe_items`
      - `id` (uuid, primary key) - Unique item identifier
      - `user_id` (uuid, foreign key to auth.users) - Links to authenticated user
      - `item_url` (text, not null) - Public URL to the stored image in Supabase Storage
      - `item_category` (text) - Category of the clothing item (shirt, pants, dress, etc.)
      - `item_name` (text) - Optional user-defined name for the item
      - `item_description` (text) - Optional description or notes
      - `metadata` (jsonb) - Additional metadata (colors, brands, tags, etc.)
      - `created_at` (timestamptz) - Item creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `wardrobe_items` table
    - Add policy for authenticated users to read their own wardrobe items
    - Add policy for authenticated users to insert their own wardrobe items
    - Add policy for authenticated users to update their own wardrobe items
    - Add policy for authenticated users to delete their own wardrobe items

  3. Notes
    - Uses auth.uid() for user identification and RLS enforcement
    - Automatically updates updated_at timestamp on row changes
    - Public URLs stored in item_url are accessible via Supabase Storage
    - Metadata stored as JSONB for flexible schema evolution
*/

CREATE TABLE IF NOT EXISTS wardrobe_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_url text NOT NULL,
  item_category text,
  item_name text,
  item_description text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create index for faster lookups by user_id
CREATE INDEX IF NOT EXISTS idx_wardrobe_items_user_id ON wardrobe_items(user_id);

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_wardrobe_items_category ON wardrobe_items(item_category);

-- Enable Row Level Security
ALTER TABLE wardrobe_items ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own wardrobe items
CREATE POLICY "Users can read own wardrobe items"
  ON wardrobe_items
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own wardrobe items
CREATE POLICY "Users can insert own wardrobe items"
  ON wardrobe_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own wardrobe items
CREATE POLICY "Users can update own wardrobe items"
  ON wardrobe_items
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own wardrobe items
CREATE POLICY "Users can delete own wardrobe items"
  ON wardrobe_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Trigger to automatically update updated_at timestamp
CREATE TRIGGER update_wardrobe_items_updated_at
  BEFORE UPDATE ON wardrobe_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
