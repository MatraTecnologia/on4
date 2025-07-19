-- Criar view para estatísticas dos contatos
CREATE OR REPLACE VIEW contact_stats AS
SELECT 
    COUNT(*) as total_contacts,
    COUNT(*) FILTER (WHERE status = 'novo') as novos,
    COUNT(*) FILTER (WHERE status = 'contatado') as contatados,
    COUNT(*) FILTER (WHERE status = 'cliente') as clientes,
    COUNT(*) FILTER (WHERE status = 'perdido') as perdidos,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as ultimos_7_dias,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as ultimos_30_dias,
    COUNT(DISTINCT category) as categorias_ativas
FROM contacts;

-- Comentário na view
COMMENT ON VIEW contact_stats IS 'View com estatísticas resumidas dos contatos';
