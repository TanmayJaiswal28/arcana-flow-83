import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Package, Cog, Plus, Repeat, TrendingUp, Activity, Zap, Coins, Users2, Bot } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Enhanced Web3 mock data
const mockStats = {
  totalAgents: 24,
  totalPayments: 8534,
  activeSimulations: 12,
  totalVolume: 124890,
  gasUsed: 0.0234,
  blockHeight: 2847521
}

const mockRecentTransactions = [
  {
    id: "0x7b8a...3f21",
    sender: "ComputeBot-Alpha",
    senderType: "Compute",
    recipient: "StorageNode-Zeta", 
    recipientType: "Storage",
    amount: 450,
    service: "GPU Compute",
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
    gasUsed: 0.0012,
    status: "confirmed"
  },

  {
    id: "0x9c4d...8a76", 
    sender: "OrchestratorPrime",
    senderType: "Orchestrator",
    recipient: "ComputeBot-Gamma",
    recipientType: "Compute",
    amount: 290,
    service: "Model Training",
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    gasUsed: 0.0008,
    status: "confirmed"
  },
  {
    id: "0x2e1f...6b93",
    sender: "StorageNode-Delta",
    senderType: "Storage", 
    recipient: "ComputeBot-Alpha",
    recipientType: "Compute",
    amount: 180,
    service: "Data Storage",
    timestamp: new Date(Date.now() - 7 * 60 * 1000),
    gasUsed: 0.0005,
    status: "confirmed"
  },
  {
    id: "0x5f82...4d17",
    sender: "ComputeBot-Beta",
    senderType: "Compute",
    recipient: "OrchestratorPrime", 
    recipientType: "Orchestrator",
    amount: 760,
    service: "Inference API",
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    gasUsed: 0.0015,
    status: "pending"
  }
]

function StatsCard({ title, value, icon: Icon, trend, description, highlight = false }: {
  title: string
  value: string | number
  icon: any
  trend?: string
  description?: string
  highlight?: boolean
}) {
  return (
    <Card className={`web3-card hover:border-primary/30 transition-all duration-300 ${highlight ? 'pulse-glow' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${highlight ? 'bg-primary/20' : 'bg-accent/20'}`}>
          <Icon className={`h-4 w-4 ${highlight ? 'text-primary' : 'text-accent'}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${highlight ? 'text-primary' : 'text-foreground'}`}>
          {value}
        </div>
        {trend && (
          <p className="text-xs text-accent flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1 terminal-font">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

function ServiceIcon({ service }: { service: string }) {
  const icons = {
    "GPU Compute": Brain,
    "Model Training": Brain,
    "Inference API": Brain,
    "Data Storage": Package,
    "Orchestrator": Cog
  }
  const Icon = icons[service as keyof typeof icons] || Activity
  return <Icon className="h-4 w-4" />
}

function TransactionRow({ transaction }: { transaction: any }) {
  const timeAgo = Math.floor((Date.now() - transaction.timestamp.getTime()) / (1000 * 60))
  
  return (
    <div className="web3-card p-4 rounded-lg border border-border/30 hover:border-primary/30 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center neon-glow">
            <ServiceIcon service={transaction.service} />
          </div>
          <div>
            <div className="font-medium text-sm terminal-font text-primary">
              {transaction.sender} → {transaction.recipient}
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-2">
              <span>{transaction.service}</span>
              <span>•</span>
              <span>{timeAgo}m ago</span>
              <span>•</span>
              <span className="text-accent">Gas: {transaction.gasUsed} ETH</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-accent text-lg">{transaction.amount} tokens</div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={transaction.status === "confirmed" ? "default" : "secondary"}
              className="text-xs terminal-font"
            >
              {transaction.status}
            </Badge>
            <span className="text-xs text-muted-foreground terminal-font">
              {transaction.id}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Web3 Elements */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
            AutoPayAI Dashboard
          </h1>
          <p className="text-muted-foreground terminal-font">
            Decentralized AI Agent Payment Network • Monad Blockchain
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="web3-card p-3 rounded-lg">
            <div className="text-sm text-muted-foreground terminal-font">Block Height</div>
            <div className="font-bold text-accent">#{mockStats.blockHeight.toLocaleString()}</div>
          </div>
          <div className="text-sm text-muted-foreground terminal-font">
            {time.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid with Web3 Focus */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatsCard
          title="Total Agents"
          value={mockStats.totalAgents}
          icon={Bot}
          trend="+5 this week"
          description="Registered AI agents"
          highlight={true}
        />
        <StatsCard
          title="Total Payments"
          value={mockStats.totalPayments.toLocaleString()}
          icon={Zap}
          trend="+18% this month"
          description="Onchain transactions"
        />
        <StatsCard
          title="Active Simulations"
          value={mockStats.activeSimulations}
          icon={Activity}
          description="Live agent interactions"
        />
        <StatsCard
          title="Total Volume"
          value={`${mockStats.totalVolume.toLocaleString()}`}
          icon={Coins}
          trend="+12% this week"
          description="Tokens transacted"
        />
        <StatsCard
          title="Gas Used"
          value={`${mockStats.gasUsed} ETH`}
          icon={TrendingUp}
          description="Network fees paid"
        />
        <StatsCard
          title="Network Status"
          value="ONLINE"
          icon={Users2}
          description="Monad blockchain"
          highlight={true}
        />
      </div>

      {/* Enhanced Action Buttons */}
      <div className="grid gap-4 md:grid-cols-2">
        <Button 
          variant="gradient" 
          size="lg" 
          onClick={() => navigate('/agents')}
          className="h-16 text-lg font-semibold"
        >
          <Plus className="h-6 w-6 mr-3" />
          <div className="text-left">
            <div>Register New Agent</div>
            <div className="text-sm opacity-80 font-normal">Deploy AI agent to network</div>
          </div>
        </Button>
        <Button 
          variant="neon-secondary" 
          size="lg" 
          onClick={() => navigate('/simulate')}
          className="h-16 text-lg font-semibold"
        >
          <Repeat className="h-6 w-6 mr-3" />
          <div className="text-left">
            <div>Simulate Interaction</div>
            <div className="text-sm opacity-80 font-normal">Test agent payments</div>
          </div>
        </Button>
      </div>

      {/* Enhanced Live Transaction Feed */}
      <Card className="web3-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center neon-glow">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xl">Live Transaction Feed</div>
              <div className="text-sm font-normal text-muted-foreground terminal-font">
                Real-time onchain AI agent payments
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockRecentTransactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
          <div className="pt-4 border-t border-border/50">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/logs')}
              className="w-full text-primary hover:bg-primary/10"
            >
              View Full Transaction History →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}