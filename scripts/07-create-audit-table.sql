-- Tabela para auditoria de alterações nos contatos
CREATE TABLE IF NOT EXISTS contact_audit (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
    action VARCHAR(10) NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    old_data JSONB,
    new_data JSONB,
    changed_by UUID, -- ID do usuário que fez a alteração
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para a tabela de auditoria
CREATE INDEX IF NOT EXISTS idx_contact_audit_contact_id ON contact_audit(contact_id);
CREATE INDEX IF NOT EXISTS idx_contact_audit_changed_at ON contact_audit(changed_at DESC);

-- Função para auditoria
CREATE OR REPLACE FUNCTION audit_contact_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO contact_audit (contact_id, action, old_data, changed_by)
        VALUES (OLD.id, 'DELETE', row_to_json(OLD), auth.uid());
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO contact_audit (contact_id, action, old_data, new_data, changed_by)
        VALUES (NEW.id, 'UPDATE', row_to_json(OLD), row_to_json(NEW), auth.uid());
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO contact_audit (contact_id, action, new_data, changed_by)
        VALUES (NEW.id, 'INSERT', row_to_json(NEW), auth.uid());
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger para auditoria
CREATE TRIGGER contact_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON contacts
    FOR EACH ROW EXECUTE FUNCTION audit_contact_changes();
