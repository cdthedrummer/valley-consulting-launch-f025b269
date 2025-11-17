-- Trigger type regeneration by updating table comments
-- This will force Lovable to regenerate TypeScript types from the actual database schema

COMMENT ON TABLE business_profiles IS 'Business profile information for users';
COMMENT ON TABLE campaigns IS 'Marketing campaigns created by users';
COMMENT ON TABLE chat_sessions IS 'User chat sessions with AI copilot';
COMMENT ON TABLE chat_messages IS 'Messages within chat sessions';
COMMENT ON TABLE chat_signals IS 'Signals extracted from chat conversations';
COMMENT ON TABLE user_intelligence_profile IS 'Intelligence profile built from user interactions';
COMMENT ON TABLE local_market_intelligence IS 'Local market intelligence data';
COMMENT ON TABLE campaign_metrics IS 'Metrics for marketing campaigns';
COMMENT ON TABLE contact_submissions IS 'Contact form submissions';
COMMENT ON TABLE appointments IS 'Appointment bookings';
COMMENT ON TABLE testimonials IS 'Customer testimonials';
COMMENT ON TABLE cta_clicks IS 'Call-to-action click tracking';
COMMENT ON TABLE subscribers IS 'Subscription and payment information';
COMMENT ON TABLE profiles IS 'User profile information';
COMMENT ON TABLE user_roles IS 'User role assignments';

-- Force a schema change to ensure type regeneration
DO $$
BEGIN
    -- This ensures the migration actually modifies the schema
    NULL;
END $$;