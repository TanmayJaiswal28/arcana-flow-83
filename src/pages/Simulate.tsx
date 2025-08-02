import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Package, Cog, Repeat, CheckCircle, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock agents data
const mockAgents = [
  { id: "agent-001", name: "ComputeBot-Alpha", role: "Compute" },
  { id: "agent-002", name: "StorageNode-Beta", role: "Storage" },
  { id: "agent-003", name: "OrchestratorPrime", role: "Orchestrator" },
  { id: "agent-004", name: "ComputeBot-Gamma", role: "Compute" },
]

const serviceTypes = [
  { value: "Compute", label: "🧠 Compute Processing", rate: 2.5 },
  { value: "Storage", label: "📦 Data Storage", rate: 1.8 },
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

export default function Simulate() {
  const [formData, setFormData] = useState({
    senderAgent: "",
    recipientAgent: "",
    serviceType: "",
    usageUnits: ""
  })
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationResult, setSimulationResult] = useState<any>(null)
  const { toast } = useToast()

  const selectedSender = mockAgents.find(a => a.id === formData.senderAgent)
  const selectedRecipient = mockAgents.find(a => a.id === formData.recipientAgent)
  const selectedService = serviceTypes.find(s => s.value === formData.serviceType)
  
  const calculateAmount = () => {
    if (!formData.usageUnits || !selectedService) return 0
    return parseFloat(formData.usageUnits) * selectedService.rate
  }

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.senderAgent || !formData.recipientAgent || !formData.serviceType || !formData.usageUnits) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    if (formData.senderAgent === formData.recipientAgent) {
      toast({
        title: "Invalid Configuration",
        description: "Sender and recipient agents must be different",
        variant: "destructive"
      })
      return
    }

    setIsSimulating(true)
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const amount = calculateAmount()
    const result = {
      transactionId: `sim-${Date.now()}`,
      sender: selectedSender,
      recipient: selectedRecipient,
      serviceType: formData.serviceType,
      usageUnits: parseInt(formData.usageUnits),
      amount: amount,
      timestamp: new Date(),
      status: "completed"
    }
    
    setSimulationResult(result)
    setIsSimulating(false)
    
    toast({
      title: "Simulation Completed",
      description: `Payment of ${amount.toFixed(2)} tokens processed successfully`,
    })
  }

  const resetForm = () => {
    setFormData({ senderAgent: "", recipientAgent: "", serviceType: "", usageUnits: "" })
    setSimulationResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Simulate Interaction
          </h1>
          <p className="text-muted-foreground">
            Test AI agent payment interactions in a safe environment
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Simulation Form */}
        <Card className="bg-card/80 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Repeat className="h-5 w-5 text-primary" />
              Configure Interaction
            </CardTitle>
            <CardDescription>
              Set up a simulated payment between AI agents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSimulate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sender">Sender Agent</Label>
                <Select value={formData.senderAgent} onValueChange={(value) => setFormData({ ...formData, senderAgent: value })}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select sending agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAgents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        <div className="flex items-center gap-2">
                          <RoleIcon role={agent.role} />
                          {agent.name} ({agent.role})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Agent</Label>
                <Select value={formData.recipientAgent} onValueChange={(value) => setFormData({ ...formData, recipientAgent: value })}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select receiving agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAgents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        <div className="flex items-center gap-2">
                          <RoleIcon role={agent.role} />
                          {agent.name} ({agent.role})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Service Type</Label>
                <Select value={formData.serviceType} onValueChange={(value) => setFormData({ ...formData, serviceType: value })}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label} ({service.rate} tokens/unit)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="units">Usage Units</Label>
                <Input
                  id="units"
                  type="number"
                  placeholder="100"
                  value={formData.usageUnits}
                  onChange={(e) => setFormData({ ...formData, usageUnits: e.target.value })}
                  className="bg-background/50"
                />
              </div>

              {/* Payment Preview */}
              {formData.usageUnits && selectedService && (
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                  <div className="text-sm text-accent font-medium mb-2">Payment Preview</div>
                  <div className="text-2xl font-bold text-accent">
                    {calculateAmount().toFixed(2)} tokens
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formData.usageUnits} units × {selectedService.rate} tokens/unit
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button 
                  type="submit" 
                  variant="neon" 
                  disabled={isSimulating}
                  className="flex-1"
                >
                  {isSimulating ? "Simulating..." : "Run Simulation"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={resetForm}
                >
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Simulation Result */}
        <Card className="bg-card/80 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-accent" />
              Simulation Result
            </CardTitle>
            <CardDescription>
              Real-time simulation output and transaction details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSimulating && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground">Processing simulation...</p>
              </div>
            )}

            {simulationResult && (
              <div className="space-y-4">
                <div className="flex items-center justify-center py-4">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center neon-glow-accent">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold text-accent">Transaction Successful</h3>
                  <p className="text-sm text-muted-foreground terminal-font">
                    ID: {simulationResult.transactionId}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <span className="text-sm text-muted-foreground">From</span>
                    <div className="flex items-center gap-2">
                      <RoleIcon role={simulationResult.sender.role} />
                      <span className="font-medium">{simulationResult.sender.name}</span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <span className="text-sm text-muted-foreground">To</span>
                    <div className="flex items-center gap-2">
                      <RoleIcon role={simulationResult.recipient.role} />
                      <span className="font-medium">{simulationResult.recipient.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <span className="text-sm text-muted-foreground">Service</span>
                    <span className="font-medium">{simulationResult.serviceType}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <span className="text-sm text-muted-foreground">Units</span>
                    <span className="font-medium">{simulationResult.usageUnits}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border border-accent/30">
                    <span className="text-sm text-accent font-medium">Amount Paid</span>
                    <span className="font-bold text-accent text-lg">
                      {simulationResult.amount.toFixed(2)} tokens
                    </span>
                  </div>
                </div>
              </div>
            )}

            {!simulationResult && !isSimulating && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 text-muted-foreground">
                <Repeat className="w-12 h-12 opacity-50" />
                <p>Configure and run a simulation to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}