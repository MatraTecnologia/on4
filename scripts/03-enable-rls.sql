-- Habilitar Row Level Security (RLS) para segurança
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura para usuários autenticados
CREATE POLICY "Allow read access for authenticated users" ON contacts
    FOR SELECT USING (auth.role() = 'authenticated');

-- Política para permitir inserção para usuários autenticados
CREATE POLICY "Allow insert for authenticated users" ON contacts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir atualização para usuários autenticados
CREATE POLICY "Allow update for authenticated users" ON contacts
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Política para permitir exclusão para usuários autenticados
CREATE POLICY "Allow delete for authenticated users" ON contacts
    FOR DELETE USING (auth.role() = 'authenticated');

-- Política para permitir inserção anônima (para o formulário público)
CREATE POLICY "Allow anonymous insert from website form" ON contacts
    FOR INSERT WITH CHECK (true);
