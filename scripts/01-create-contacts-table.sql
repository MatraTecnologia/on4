-- Criar tabela de contatos
CREATE TABLE IF NOT EXISTS contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('mei', 'microempresa', 'pequena-empresa', 'media-empresa', 'grande-empresa', 'pessoa-fisica')),
    employees VARCHAR(20) NOT NULL CHECK (employees IN ('0', '1-5', '6-10', '11-20', '21-50', '51-100', '100+')),
    status VARCHAR(20) DEFAULT 'novo' CHECK (status IN ('novo', 'contatado', 'cliente', 'perdido')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_category ON contacts(category);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Comentários para documentação
COMMENT ON TABLE contacts IS 'Tabela para armazenar contatos do formulário do site';
COMMENT ON COLUMN contacts.id IS 'Identificador único do contato';
COMMENT ON COLUMN contacts.name IS 'Nome da pessoa ou empresa';
COMMENT ON COLUMN contacts.email IS 'Email de contato';
COMMENT ON COLUMN contacts.category IS 'Categoria da empresa (MEI, Microempresa, etc.)';
COMMENT ON COLUMN contacts.employees IS 'Número de funcionários';
COMMENT ON COLUMN contacts.status IS 'Status do lead (novo, contatado, cliente, perdido)';
COMMENT ON COLUMN contacts.notes IS 'Observações adicionais sobre o contato';
COMMENT ON COLUMN contacts.created_at IS 'Data e hora de criação do registro';
COMMENT ON COLUMN contacts.updated_at IS 'Data e hora da última atualização';
