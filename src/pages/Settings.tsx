import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Settings as SettingsIcon, Shield, Bell, Database, Network, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function Settings() {
  const [settings, setSettings] = useState({
    autoPayment: true,
    manualApproval: false,
    maxTransactionAmount: 1000,
    networkTimeout: 30,
    enableNotifications: true,
    enableAnalytics: true,
    dataRetention: "90",
    defaultSpendingLimit: 500
  })

  const { toast } = useToast()

  const handleSave = () => {
    // In a real app, this would save to backend
    toast({
      title: "Settings Saved",
      description: "Your configuration has been updated successfully.",
    })
  }

  const handleReset = () => {
    setSettings({
      autoPayment: true,
      manualApproval: false,
      maxTransactionAmount: 1000,
      networkTimeout: 30,
      enableNotifications: true,
      enableAnalytics: true,
      dataRetention: "90",
      defaultSpendingLimit: 500
    })
    
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Configure payment system preferences and security options
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <Button variant="neon" onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payment Settings */}
        <Card className="bg-card/80 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              Payment Configuration
            </CardTitle>
            <CardDescription>
              Configure how AI agents handle payments and transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Auto-Payment</Label>
                <p className="text-xs text-muted-foreground">
                  Automatically process payments without confirmation
                </p>
              </div>
              <Switch
                checked={settings.autoPayment}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, autoPayment: checked })
                }
              />
            </div>

            <Separator className="bg-border/50" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Manual Approval</Label>
                <p className="text-xs text-muted-foreground">
                  Require manual approval for high-value transactions
                </p>
              </div>
              <Switch
                checked={settings.manualApproval}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, manualApproval: checked })
                }
              />
            </div>

            <Separator className="bg-border/50" />

            <div className="space-y-2">
              <Label htmlFor="maxAmount">Maximum Transaction Amount</Label>
              <div className="relative">
                <Input
                  id="maxAmount"
                  type="number"
                  value={settings.maxTransactionAmount}
                  onChange={(e) => 
                    setSettings({ ...settings, maxTransactionAmount: parseInt(e.target.value) || 0 })
                  }
                  className="bg-background/50 pr-16"
                />
                <span className="absolute right-3 top-3 text-sm text-muted-foreground">
                  tokens
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultLimit">Default Agent Spending Limit</Label>
              <div className="relative">
                <Input
                  id="defaultLimit"
                  type="number"
                  value={settings.defaultSpendingLimit}
                  onChange={(e) => 
                    setSettings({ ...settings, defaultSpendingLimit: parseInt(e.target.value) || 0 })
                  }
                  className="bg-background/50 pr-16"
                />
                <span className="absolute right-3 top-3 text-sm text-muted-foreground">
                  tokens
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network Settings */}
        <Card className="bg-card/80 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5 text-secondary" />
              Network Configuration
            </CardTitle>
            <CardDescription>
              Configure network connectivity and timeout settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="timeout">Network Timeout</Label>
              <div className="relative">
                <Input
                  id="timeout"
                  type="number"
                  value={settings.networkTimeout}
                  onChange={(e) => 
                    setSettings({ ...settings, networkTimeout: parseInt(e.target.value) || 0 })
                  }
                  className="bg-background/50 pr-20"
                />
                <span className="absolute right-3 top-3 text-sm text-muted-foreground">
                  seconds
                </span>
              </div>
            </div>

            <Separator className="bg-border/50" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Enable Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Receive real-time notifications for transactions
                </p>
              </div>
              <Switch
                checked={settings.enableNotifications}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, enableNotifications: checked })
                }
              />
            </div>

            <Separator className="bg-border/50" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Analytics Tracking</Label>
                <p className="text-xs text-muted-foreground">
                  Collect analytics data for performance monitoring
                </p>
              </div>
              <Switch
                checked={settings.enableAnalytics}
                onCheckedChange={(checked) => 
                  setSettings({ ...settings, enableAnalytics: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-card/80 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-accent" />
              Security & Privacy
            </CardTitle>
            <CardDescription>
              Manage security protocols and data privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-accent" />
                <span className="font-medium text-accent text-sm">Security Status</span>
              </div>
              <p className="text-xs text-muted-foreground">
                All security protocols are active and functioning normally
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Encryption Level
                </Label>
                <Select defaultValue="aes256">
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aes128">AES-128 (Standard)</SelectItem>
                    <SelectItem value="aes256">AES-256 (Recommended)</SelectItem>
                    <SelectItem value="rsa2048">RSA-2048 (High Security)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Authentication Method
                </Label>
                <Select defaultValue="multi">
                  <SelectTrigger className="bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Authentication</SelectItem>
                    <SelectItem value="multi">Multi-Factor Authentication</SelectItem>
                    <SelectItem value="biometric">Biometric + MFA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="bg-card/80 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-secondary" />
              Data Management
            </CardTitle>
            <CardDescription>
              Configure data retention and backup policies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="retention">Data Retention Period</Label>
              <Select 
                value={settings.dataRetention} 
                onValueChange={(value) => setSettings({ ...settings, dataRetention: value })}
              >
                <SelectTrigger className="bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">6 months</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="forever">Forever</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="bg-border/50" />

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Database className="h-4 w-4 mr-2" />
                Export Transaction Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="h-4 w-4 mr-2" />
                Generate Security Report
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                <Database className="h-4 w-4 mr-2" />
                Clear All Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}