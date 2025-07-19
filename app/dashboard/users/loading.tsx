import { RefreshCw } from "lucide-react"

export default function UsersLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex items-center space-x-2">
        <RefreshCw className="h-6 w-6 animate-spin" />
        <span>Carregando usuários...</span>
      </div>
    </div>
  )
}
