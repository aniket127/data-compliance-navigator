
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui/logo';
import { 
  LayoutDashboard, 
  Database, 
  FileSpreadsheet,
  Activity,
  BarChart,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => setIsOpen(!isOpen);
  
  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    { 
      name: 'Data Sources', 
      path: '/data-sources',
      icon: <Database className="h-5 w-5" />
    },
    { 
      name: 'Data Profiling', 
      path: '/data-profiling',
      icon: <FileSpreadsheet className="h-5 w-5" />
    },
    { 
      name: 'Job Monitoring', 
      path: '/job-monitoring',
      icon: <Activity className="h-5 w-5" />
    },
    { 
      name: 'Results', 
      path: '/results',
      icon: <BarChart className="h-5 w-5" />
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b p-4">
        <div className="flex justify-between items-center">
          <Logo size="sm" />
          <Button 
            variant="outline" 
            size="icon"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Sidebar for both Mobile and Desktop */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 shrink-0 border-r overflow-y-auto glass-card transition-all duration-300 ease-in-out",
        isMobile ? 
          (isOpen ? "translate-x-0" : "-translate-x-full") : 
          "relative translate-x-0 hidden md:block"
      )}>
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6">
          <Logo />
        </div>
        
        <Separator />
        
        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm font-medium group",
                isActive(item.path) 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-secondary text-muted-foreground hover:text-foreground"
              )}
              onClick={() => isMobile && setIsOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
              {isActive(item.path) && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />
              )}
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <Link to="/login">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => isMobile && setIsOpen(false)}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </Link>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isMobile ? "pt-16" : ""
      )}>
        <div className="container h-full py-6 md:py-8 px-4 md:px-6 max-w-7xl mx-auto animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
