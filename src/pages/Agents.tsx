import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Brain, Package, Cog, Plus, Edit, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data
const initialAgents = [
  {
    id: "agent-001",
    name: "ComputeBot-Alpha",
    role: "Compute",
    walletAddress: "0x742d35Cc8C17e57E0C6d5A8e5B9F95c34A9B2C1D",
    spendingLimit: 1000,
    status: "Active"
  },
  {
    id: "agent-002", 
    name: "StorageNode-Beta",
    role: "Storage",
    walletAddress: "0x8F3B17C9A2E5D1F9C8B4A6E3F7C2D5A8B9E4F1C6",
    spendingLimit: 750,
    status: "Active"
  },
  {
    id: "agent-003",
    name: "OrchestratorPrime",
    role: "Orchestrator", 
    walletAddress: "0xA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0",
    spendingLimit: 2000,
    status: "Active"
  },
  {
    id: "agent-004",
    name: "ComputeBot-Gamma", 
    role: "Compute",
    walletAddress: "0x1A2B3C4D5E6F7890ABCDEF1234567890ABCDEF12",
    spendingLimit: 1200,
    status: "Inactive"
  }
]

function RoleIcon({ role }: { role: string }) {
  const icons = {
    Compute: Brain,
    Storage: Package, 
    Orchestrator: Cog
  }
  const Icon = icons[role as keyof typeof icons] || Brain
  return <Icon className="h-4 w-4" />
}

function RoleBadge({ role }: { role: string }) {
  const colors = {
    Compute: "bg-primary/20 text-primary border-primary/30",
    Storage: "bg-secondary/20 text-secondary border-secondary/30",
    Orchestrator: "bg-accent/20 text-accent border-accent/30"
  }
  return (
    <Badge variant="outline" className={colors[role as keyof typeof colors]}>
      <RoleIcon role={role} />
      <span className="ml-1">{role}</span>
    </Badge>
  )
}

export default function Agents() {
  const [agents, setAgents] = useState(initialAgents)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    walletAddress: "",
    spendingLimit: ""
  })
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.role || !formData.walletAddress || !formData.spendingLimit) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    const newAgent = {
      id: `agent-${Date.now()}`,
      name: formData.name,
      role: formData.role,
      walletAddress: formData.walletAddress,
      spendingLimit: parseInt(formData.spendingLimit),
      status: "Active"
    }

    setAgents([...agents, newAgent])
    setFormData({ name: "", role: "", walletAddress: "", spendingLimit: "" })
    setIsDialogOpen(false)
    
    toast({
      title: "Agent Registered",
      description: `${newAgent.name} has been successfully registered as a ${newAgent.role} agent.`,
    })
  }

  const handleDelete = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId)
    setAgents(agents.filter(a => a.id !== agentId))
    
    toast({
      title: "Agent Removed",
      description: `${agent?.name} has been removed from the network.`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            AI Agents
          </h1>
          <p className="text-muted-foreground">
            Manage registered agents in the payment network
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="neon" size="lg" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Register Agent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-card border-border">
            <DialogHeader>
              <DialogTitle className="gradient-primary bg-clip-text text-transparent">
                Register New Agent
              </DialogTitle>
              <DialogDescription>
                Add a new AI agent to the payment network
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Agent Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., ComputeBot-Delta"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select agent role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Compute">🧠 Compute Agent</SelectItem>
                    <SelectItem value="Storage">📦 Storage Agent</SelectItem>
                    <SelectItem value="Orchestrator">⚙️ Orchestrator Agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet">Wallet Address</Label>
                <Input
                  id="wallet"
                  placeholder="0x..."
                  value={formData.walletAddress}
                  onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                  className="bg-background/50 terminal-font text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="limit">Spending Limit (tokens)</Label>
                <Input
                  id="limit"
                  type="number"
                  placeholder="1000"
                  value={formData.spendingLimit}
                  onChange={(e) => setFormData({ ...formData, spendingLimit: e.target.value })}
                  className="bg-background/50"
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" variant="neon" className="flex-1">
                  Register Agent
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Agents Table */}
      <Card className="bg-card/80 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Registered Agents ({agents.length})
          </CardTitle>
          <CardDescription>
            Manage AI agents and their payment permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Agent Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Wallet Address</TableHead>
                <TableHead>Spending Limit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id} className="border-border/50">
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>
                    <RoleBadge role={agent.role} />
                  </TableCell>
                  <TableCell className="terminal-font text-sm text-muted-foreground">
                    {agent.walletAddress.slice(0, 6)}...{agent.walletAddress.slice(-4)}
                  </TableCell>
                  <TableCell>{agent.spendingLimit.toLocaleString()} tokens</TableCell>
                  <TableCell>
                    <Badge variant={agent.status === "Active" ? "default" : "secondary"}>
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(agent.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}