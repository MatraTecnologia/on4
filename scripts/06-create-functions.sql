-- Função para buscar contatos com filtros
CREATE OR REPLACE FUNCTION search_contacts(
    search_term TEXT DEFAULT '',
    status_filter TEXT DEFAULT '',
    category_filter TEXT DEFAULT '',
    limit_count INTEGER DEFAULT 50,
    offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    name VARCHAR,
    email VARCHAR,
    category VARCHAR,
    employees VARCHAR,
    status VARCHAR,
    notes TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.name,
        c.email,
        c.category,
        c.employees,
        c.status,
        c.notes,
        c.created_at,
        c.updated_at
    FROM contacts c
    WHERE 
        (search_term = '' OR 
         c.name ILIKE '%' || search_term || '%' OR 
         c.email ILIKE '%' || search_term || '%')
        AND (status_filter = '' OR c.status = status_filter)
        AND (category_filter = '' OR c.category = category_filter)
    ORDER BY c.created_at DESC
    LIMIT limit_count
    OFFSET offset_count;
END;
$$ LANGUAGE plpgsql;

-- Função para obter contatos por período
CREATE OR REPLACE FUNCTION get_contacts_by_period(
    start_date DATE,
    end_date DATE
)
RETURNS TABLE (
    id UUID,
    name VARCHAR,
    email VARCHAR,
    category VARCHAR,
    employees VARCHAR,
    status VARCHAR,
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.name,
        c.email,
        c.category,
        c.employees,
        c.status,
        c.created_at
    FROM contacts c
    WHERE c.created_at::DATE BETWEEN start_date AND end_date
    ORDER BY c.created_at DESC;
END;
$$ LANGUAGE plpgsql;
