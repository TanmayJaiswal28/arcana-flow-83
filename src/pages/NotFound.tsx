import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="w-24 h-24 mx-auto rounded-full gradient-primary flex items-center justify-center mb-6">
          <span className="text-4xl font-bold text-primary-foreground">404</span>
        </div>
        <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
          Page Not Found
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          The page you're looking for doesn't exist in the AI agent network
        </p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors neon-glow"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
