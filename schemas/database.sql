-- Create indexes for performance
-- Primary index on the 'slug' column for fast lookups by short code
CREATE UNIQUE INDEX IF NOT EXISTS idx_links_slug ON shortened_links(slug);

-- Index on the 'expires_at' column for efficient expiration checks and cleanup
CREATE INDEX IF NOT EXISTS idx_links_expires_at ON shortened_links(expires_at);

-- Composite index for deletion operations (slug + delete_token)
CREATE INDEX IF NOT EXISTS idx_links_slug_delete_token ON shortened_links(slug, delete_token);

-- Index on created_at for analytics and cleanup operations
CREATE INDEX IF NOT EXISTS idx_links_created_at ON shortened_links(created_at);

-- *** COMMENT OUT OR REMOVE THIS BLOCK ***
-- -- Partial index for active (non-expired) links only
-- -- *** THIS WILL CAUSE ERROR 42P17 ***
-- CREATE INDEX IF NOT EXISTS idx_links_active ON shortened_links(slug)
-- WHERE expires_at > NOW();
-- *** END BLOCK TO COMMENT OUT OR REMOVE ***

-- Ensure is_link_expired function is correctly defined (for general use, not the index predicate)
-- Note: This function CANNOT be used in the idx_links_active predicate because it uses NOW()
CREATE OR REPLACE FUNCTION public.is_link_expired(link_expires_at TIMESTAMP WITH TIME ZONE)
RETURNS BOOLEAN AS $$
BEGIN
   -- This function is useful for querying but cannot be IMMUTABLE due to NOW()
   -- For index predicates, use direct comparisons like expires_at > 'some_timestamp'
   RETURN link_expires_at < NOW();
END;
$$ LANGUAGE plpgsql
SET search_path = pg_catalog, public;