-- Add web search capability function
CREATE OR REPLACE FUNCTION search_web_for_property_data(location TEXT, query_type TEXT)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    -- This is a placeholder function that would integrate with real estate APIs
    -- For now, it returns mock data to demonstrate the structure
    
    IF query_type = 'home_sales' THEN
        result := JSON_BUILD_OBJECT(
            'location', location,
            'total_sales_last_quarter', 37,
            'properties', JSON_BUILD_ARRAY(
                JSON_BUILD_OBJECT(
                    'address', '123 Main St',
                    'sale_price', 450000,
                    'sale_date', '2024-01-15',
                    'year_built', 1965,
                    'bedrooms', 3,
                    'bathrooms', 2,
                    'renovation_potential', 'high'
                ),
                JSON_BUILD_OBJECT(
                    'address', '456 Oak Ave',
                    'sale_price', 520000,
                    'sale_date', '2024-02-03',
                    'year_built', 1978,
                    'bedrooms', 4,
                    'bathrooms', 2,
                    'renovation_potential', 'medium'
                )
            ),
            'insights', JSON_BUILD_OBJECT(
                'pre_1970_homes', 12,
                'unrenovated_potential', 8,
                'average_price', 485000,
                'market_trend', 'stable'
            )
        );
    ELSIF query_type = 'demographics' THEN
        result := JSON_BUILD_OBJECT(
            'location', location,
            'total_households', 2847,
            'median_income', 89500,
            'avg_home_value', 475000,
            'age_groups', JSON_BUILD_OBJECT(
                '25_34', 18,
                '35_44', 25,
                '45_54', 22,
                '55_64', 20,
                '65_plus', 15
            ),
            'home_ownership_rate', 78
        );
    ELSE
        result := JSON_BUILD_OBJECT('error', 'Unknown query type');
    END IF;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;