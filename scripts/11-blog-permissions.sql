-- Habilitar RLS para blog_posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública de posts publicados
CREATE POLICY "Allow public read of published posts" ON blog_posts
    FOR SELECT USING (published = true);

-- Política para permitir todas as operações para usuários autenticados
CREATE POLICY "Allow all operations for authenticated users" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

-- Conceder permissões
GRANT SELECT ON blog_posts TO anon;
GRANT ALL ON blog_posts TO authenticated;
