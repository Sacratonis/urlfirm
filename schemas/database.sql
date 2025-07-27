-- schemas/database_supabase.sql (Adapted for Supabase)
-- Create shortened_links table for URLFirm
-- Ensure the uuid-ossp extension is available for gen_random_uuid()
-- Note: In Supabase, this is usually enabled by default.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the main table for storing shortened links
-- Using 'shortened_links' table name and 'slug' column name as discussed
CREATE TABLE IF NOT EXISTS shortened_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    -- The original long URL
    original_url TEXT NOT NULL,
    -- The shortened code/alias (unique) - Changed from 'short_code' to 'slug'
    slug TEXT UNIQUE NOT NULL,
    -- Token required to delete the link
    delete_token TEXT NOT NULL,
    -- Timestamp when the link was created
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- Timestamp when the link expires (defaults to 7 days after creation)
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() + INTERVAL '7 days'
    -- Note: 'is_custom' column is removed in this schema version
);

-- Create indexes for performance
-- Index on the 'slug' column for fast lookups by short code
CREATE INDEX IF NOT EXISTS idx_links_slug ON shortened_links(slug);
-- Index on the 'expires_at' column for efficient expiration checks
CREATE INDEX IF NOT EXISTS idx_links_expires_at ON shortened_links(expires_at);
-- Index on the 'delete_token' column for faster deletion verification
-- (Though matching on both slug and token might be more common)
CREATE INDEX IF NOT EXISTS idx_links_delete_token ON shortened_links(delete_token);

-- Optional: Function to check if a link is expired
-- This can be useful for direct SQL queries or views
CREATE OR REPLACE FUNCTION is_link_expired(link_expires_at TIMESTAMP WITH TIME ZONE)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN link_expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation (aligned with new schema)
COMMENT ON TABLE shortened_links IS 'Stores shortened URLs with metadata for URLFirm (Supabase version)';
COMMENT ON COLUMN shortened_links.id IS 'Unique identifier for the link';
COMMENT ON COLUMN shortened_links.original_url IS 'The original long URL';
-- Updated comment to reflect the change from 'short_code' to 'slug'
COMMENT ON COLUMN shortened_links.slug IS 'The shortened code/alias (unique)';
COMMENT ON COLUMN shortened_links.delete_token IS 'Token required to delete the link';
COMMENT ON COLUMN shortened_links.created_at IS 'Timestamp when the link was created';
COMMENT ON COLUMN shortened_links.expires_at IS 'Timestamp when the link expires (7 days after creation)';