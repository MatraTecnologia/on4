-- Criar tabela de posts do blog
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(500),
    author VARCHAR(100) NOT NULL DEFAULT 'Equipe ON4',
    category VARCHAR(50) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    read_time INTEGER DEFAULT 5,
    published BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para definir published_at quando publicado
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.published = true AND OLD.published = false THEN
        NEW.published_at = NOW();
    ELSIF NEW.published = false THEN
        NEW.published_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_blog_post_published_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION set_published_at();

-- Comentários para documentação
COMMENT ON TABLE blog_posts IS 'Tabela para armazenar posts do blog';
COMMENT ON COLUMN blog_posts.slug IS 'URL amigável do post (único)';
COMMENT ON COLUMN blog_posts.excerpt IS 'Resumo do post para listagens';
COMMENT ON COLUMN blog_posts.content IS 'Conteúdo completo em Markdown';
COMMENT ON COLUMN blog_posts.tags IS 'Array de tags do post';
COMMENT ON COLUMN blog_posts.read_time IS 'Tempo estimado de leitura em minutos';
COMMENT ON COLUMN blog_posts.published IS 'Se o post está publicado';
COMMENT ON COLUMN blog_posts.featured IS 'Se o post é destaque';
