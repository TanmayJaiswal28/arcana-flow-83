import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ConnectWallet } from "@/components/ConnectWallet"
import { Toaster } from "@/components/ui/toaster"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center justify-between border-b border-border bg-card/30 backdrop-blur-md px-6 relative overflow-hidden">
            <div className="absolute inset-0 scanning-line w-1 opacity-30"></div>
            <div className="flex items-center gap-4 z-10">
              <SidebarTrigger className="hover:bg-primary/10 hover:text-primary transition-colors p-2 rounded-lg" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center neon-glow">
                  <span className="text-sm font-bold text-primary-foreground">AP</span>
                </div>
                <div>
                  <h1 className="font-bold text-xl gradient-primary bg-clip-text text-transparent">
                    AutoPayAI
                  </h1>
                  <p className="text-xs text-muted-foreground terminal-font">
                    Monad Blockchain
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 z-10">
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse neon-glow-accent"></div>
                <span className="terminal-font">Network Online</span>
              </div>
              <ConnectWallet />
            </div>
          </header>
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}