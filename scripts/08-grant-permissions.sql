-- Conceder permissões para o usuário anônimo (para formulário público)
GRANT INSERT ON contacts TO anon;

-- Conceder permissões para usuários autenticados
GRANT ALL ON contacts TO authenticated;
GRANT ALL ON contact_audit TO authenticated;
GRANT SELECT ON contact_stats TO authenticated;

-- Conceder permissões para executar funções
GRANT EXECUTE ON FUNCTION search_contacts TO authenticated;
GRANT EXECUTE ON FUNCTION get_contacts_by_period TO authenticated;
