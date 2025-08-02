import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, Filter, Download, Brain, Package, Cog } from "lucide-react"

// Mock payment logs data
const mockPaymentLogs = [
  {
    id: "tx-001",
    timestamp: new Date("2024-01-15T10:30:00"),
    sender: "ComputeBot-Alpha",
    senderRole: "Compute",
    recipient: "StorageNode-Beta", 
    recipientRole: "Storage",
    serviceType: "Compute",
    units: 150,
    amount: 375,
    status: "Completed"
  },
  {
    id: "tx-002",
    timestamp: new Date("2024-01-15T10:25:00"),
    sender: "OrchestratorPrime",
    senderRole: "Orchestrator",
    recipient: "ComputeBot-Gamma",
    recipientRole: "Compute", 
    serviceType: "Storage",
    units: 200,
    amount: 360,
    status: "Completed"
  },
  {
    id: "tx-003",
    timestamp: new Date("2024-01-15T10:20:00"),
    sender: "StorageNode-Delta",
    senderRole: "Storage",
    recipient: "ComputeBot-Alpha",
    recipientRole: "Compute",
    serviceType: "Compute",
    units: 128,
    amount: 320,
    status: "Completed"
  },
  {
    id: "tx-004",
    timestamp: new Date("2024-01-15T10:15:00"),
    sender: "ComputeBot-Beta",
    senderRole: "Compute", 
    recipient: "OrchestratorPrime",
    recipientRole: "Orchestrator",
    serviceType: "Storage",
    units: 108,
    amount: 194.4,
    status: "Failed"
  },
  {
    id: "tx-005",
    timestamp: new Date("2024-01-15T10:10:00"),
    sender: "StorageNode-Beta",
    senderRole: "Storage",
    recipient: "ComputeBot-Gamma",
    recipientRole: "Compute",
    serviceType: "Compute", 
    units: 95,
    amount: 237.5,
    status: "Completed"
  }
]

function RoleIcon({ role }: { role: string }) {
  const icons = {
    Compute: Brain,
    Storage: Package,
    Orchestrator: Cog
  }
  const Icon = icons[role as keyof typeof icons] || Brain
  return <Icon className="h-3 w-3" />
}

export default function PaymentLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredLogs = mockPaymentLogs.filter(log => {
    const matchesSearch = searchTerm === "" || 
      log.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesService = serviceFilter === "all" || log.serviceType === serviceFilter
    const matchesStatus = statusFilter === "all" || log.status === statusFilter
    
    return matchesSearch && matchesService && matchesStatus
  })

  const totalTransactions = filteredLogs.length
  const totalVolume = filteredLogs.reduce((sum, log) => sum + log.amount, 0)
  const successRate = (filteredLogs.filter(log => log.status === "Completed").length / filteredLogs.length * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Payment Logs
          </h1>
          <p className="text-muted-foreground">
            Complete transaction history and payment analytics
          </p>
        </div>
        <Button variant="neon-accent" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/80 backdrop-blur border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-2xl font-bold">{totalTransactions}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/80 backdrop-blur border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold">{totalVolume.toFixed(2)} tokens</p>
              </div>
              <Package className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/80 backdrop-blur border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{successRate}%</p>
              </div>
              <Brain className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card/80 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filter Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by agent name or transaction ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-background/50"
                />
              </div>
            </div>
            <div className="sm:w-48">
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Service Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="Compute">Compute</SelectItem>
                  <SelectItem value="Storage">Storage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:w-32">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Logs Table */}
      <Card className="bg-card/80 backdrop-blur border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Transaction History
          </CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {mockPaymentLogs.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>Transaction ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="border-border/50">
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {log.id}
                  </TableCell>
                  <TableCell className="text-sm">
                    {log.timestamp.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <RoleIcon role={log.senderRole} />
                      <span className="font-medium text-sm">{log.sender}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <RoleIcon role={log.recipientRole} />
                      <span className="font-medium text-sm">{log.recipient}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {log.serviceType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{log.units}</TableCell>
                  <TableCell className="font-medium text-accent">
                    {log.amount.toFixed(2)} tokens
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={log.status === "Completed" ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {log.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No transactions found matching your filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}