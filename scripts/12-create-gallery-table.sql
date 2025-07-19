-- Criar tabela gallery para armazenar metadados das imagens
CREATE TABLE IF NOT EXISTS gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    file_path TEXT NOT NULL UNIQUE,
    file_size BIGINT NOT NULL,
    mime_type TEXT NOT NULL,
    alt_text TEXT,
    description TEXT,
    tags TEXT[] DEFAULT '{}',
    is_public BOOLEAN DEFAULT true,
    uploaded_by TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON gallery(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_is_public ON gallery(is_public);
CREATE INDEX IF NOT EXISTS idx_gallery_tags ON gallery USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_gallery_uploaded_by ON gallery(uploaded_by);

-- Criar trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_gallery_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_gallery_updated_at
    BEFORE UPDATE ON gallery
    FOR EACH ROW
    EXECUTE FUNCTION update_gallery_updated_at();

-- Habilitar RLS (Row Level Security)
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura de imagens públicas
CREATE POLICY "Permitir leitura de imagens públicas" ON gallery
    FOR SELECT USING (is_public = true);

-- Política para permitir todas as operações para usuários autenticados
CREATE POLICY "Permitir todas as operações para usuários autenticados" ON gallery
    FOR ALL USING (auth.role() = 'authenticated');

-- Comentários na tabela
COMMENT ON TABLE gallery IS 'Tabela para armazenar metadados das imagens da galeria';
COMMENT ON COLUMN gallery.filename IS 'Nome do arquivo no storage';
COMMENT ON COLUMN gallery.original_name IS 'Nome original do arquivo enviado';
COMMENT ON COLUMN gallery.file_path IS 'Caminho completo do arquivo no storage';
COMMENT ON COLUMN gallery.file_size IS 'Tamanho do arquivo em bytes';
COMMENT ON COLUMN gallery.mime_type IS 'Tipo MIME do arquivo';
COMMENT ON COLUMN gallery.alt_text IS 'Texto alternativo para acessibilidade';
COMMENT ON COLUMN gallery.description IS 'Descrição da imagem';
COMMENT ON COLUMN gallery.tags IS 'Tags para categorização';
COMMENT ON COLUMN gallery.is_public IS 'Se a imagem é pública ou privada';
COMMENT ON COLUMN gallery.uploaded_by IS 'ID do usuário que fez o upload';
