"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Settings, User, Bell, Shield, Database, Palette, Save, RefreshCw, Download, Upload } from "lucide-react"
import { toast } from "sonner"
import { useUser } from "@clerk/nextjs"

export default function SettingsPage() {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    // Configurações gerais
    siteName: "ON4 Contabilidade",
    siteDescription: "Soluções contábeis completas & descomplicadas",
    contactEmail: "contato@on4.com.br",
    contactPhone: "(43) 3324-0380",

    // Notificações
    emailNotifications: true,
    newContactNotifications: true,
    blogCommentNotifications: false,
    weeklyReports: true,

    // Aparência
    darkMode: false,
    compactMode: false,

    // Backup
    autoBackup: true,
    backupFrequency: "daily",
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      // Aqui você salvaria as configurações no banco de dados
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simular API call
      toast.success("Configurações salvas com sucesso!")
    } catch (error) {
      toast.error("Erro ao salvar configurações")
    } finally {
      setLoading(false)
    }
  }

  const handleExportData = () => {
    toast.success("Exportação iniciada! Você receberá um email quando estiver pronta.")
  }

  const handleImportData = () => {
    toast.info("Funcionalidade de importação em desenvolvimento")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600">Gerencie as configurações do sistema e sua conta</p>
        </div>
        <Button onClick={handleSave} disabled={loading} className="bg-[#4ade80] hover:bg-[#3dc76a]">
          {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="account">Conta</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="data">Dados</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configurações Gerais
              </CardTitle>
              <CardDescription>Configure as informações básicas do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nome do Site</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings((prev) => ({ ...prev, siteName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de Contato</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings((prev) => ({ ...prev, contactEmail: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Descrição do Site</Label>
                <Input
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings((prev) => ({ ...prev, siteDescription: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Telefone de Contato</Label>
                <Input
                  id="contactPhone"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings((prev) => ({ ...prev, contactPhone: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações da Conta
              </CardTitle>
              <CardDescription>Gerencie suas informações pessoais e de acesso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1e3352] to-[#4ade80] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress.charAt(0) || "U"}
                </div>
                <div>
                  <h3 className="font-medium">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{user?.emailAddresses[0]?.emailAddress}</p>
                  <Badge className="mt-1">Administrador</Badge>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input value={user?.firstName || ""} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Sobrenome</Label>
                  <Input value={user?.lastName || ""} disabled />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={user?.emailAddresses[0]?.emailAddress || ""} disabled />
              </div>

              <p className="text-sm text-gray-500">
                Para alterar suas informações pessoais, use o menu de usuário no canto superior direito.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Preferências de Notificação
              </CardTitle>
              <CardDescription>Configure quando e como você deseja receber notificações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por Email</Label>
                  <p className="text-sm text-gray-500">Receber notificações gerais por email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emailNotifications: checked }))}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Novos Contatos</Label>
                  <p className="text-sm text-gray-500">Notificar quando um novo contato for cadastrado</p>
                </div>
                <Switch
                  checked={settings.newContactNotifications}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, newContactNotifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Comentários no Blog</Label>
                  <p className="text-sm text-gray-500">Notificar sobre novos comentários nos posts</p>
                </div>
                <Switch
                  checked={settings.blogCommentNotifications}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, blogCommentNotifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Relatórios Semanais</Label>
                  <p className="text-sm text-gray-500">Receber resumo semanal das atividades</p>
                </div>
                <Switch
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, weeklyReports: checked }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Aparência
              </CardTitle>
              <CardDescription>Personalize a aparência do dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo Escuro</Label>
                  <p className="text-sm text-gray-500">Usar tema escuro no dashboard</p>
                </div>
                <Switch
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, darkMode: checked }))}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo Compacto</Label>
                  <p className="text-sm text-gray-500">Reduzir espaçamentos para mostrar mais conteúdo</p>
                </div>
                <Switch
                  checked={settings.compactMode}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, compactMode: checked }))}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Cores do Tema</Label>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-[#1e3352] rounded-lg"></div>
                    <span className="text-xs">Azul Escuro</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-[#4ade80] rounded-lg"></div>
                    <span className="text-xs">Verde</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-[#e6c88a] rounded-lg"></div>
                    <span className="text-xs">Dourado</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 bg-gray-600 rounded-lg"></div>
                    <span className="text-xs">Cinza</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Gerenciamento de Dados
              </CardTitle>
              <CardDescription>Backup, exportação e importação de dados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Backup Automático</Label>
                  <p className="text-sm text-gray-500">Fazer backup automático dos dados</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoBackup: checked }))}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Ações de Dados</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" onClick={handleExportData} className="justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Dados
                  </Button>
                  <Button variant="outline" onClick={handleImportData} className="justify-start bg-transparent">
                    <Upload className="h-4 w-4 mr-2" />
                    Importar Dados
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Estatísticas de Uso</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#4ade80]">1.2GB</div>
                    <div className="text-sm text-gray-500">Dados Armazenados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#1e3352]">45</div>
                    <div className="text-sm text-gray-500">Contatos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">12</div>
                    <div className="text-sm text-gray-500">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">30</div>
                    <div className="text-sm text-gray-500">Dias Online</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Shield className="h-5 w-5" />
                Zona de Perigo
              </CardTitle>
              <CardDescription>Ações irreversíveis que afetam todos os dados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h4 className="font-medium text-red-800 mb-2">Limpar Todos os Dados</h4>
                  <p className="text-sm text-red-600 mb-4">
                    Esta ação irá remover permanentemente todos os contatos, posts e configurações. Esta ação não pode
                    ser desfeita.
                  </p>
                  <Button variant="destructive" size="sm">
                    Limpar Dados
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
