
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Database, FileSpreadsheet, BarChart, ArrowRight } from 'lucide-react';
import Logo from '@/components/ui/logo';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative px-6 lg:px-8 h-screen flex flex-col justify-center items-center">
        {/* Background gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-1/3 h-1/3 bg-accent/5 rounded-full filter blur-3xl" />
        </div>
        
        <div className="absolute inset-x-0 top-0 z-50 py-6 px-8 flex justify-between items-center animate-fade-in">
          <Logo size="md" />
          
          <Button 
            variant="outline" 
            className="btn-hover-effect" 
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        </div>
        
        <div className="max-w-3xl mx-auto text-center z-10 animate-scale-in">
          <div className="mx-auto mb-6">
            <ShieldCheck className="h-20 w-20 text-primary mx-auto" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Data Compliance
            <span className="block text-primary ml-1">Companion Agent</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Simplify data privacy compliance with automated profiling, analysis, and actionable insights for your organization's data.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="btn-hover-effect text-lg px-8 py-6"
              onClick={() => navigate('/login')}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-hover-effect text-lg px-8 py-6"
              onClick={() => navigate('/login')}
            >
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-fade-in">
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Scroll to explore</span>
            <svg
              className="h-8 w-8 mt-1 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-24 px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Comprehensive Compliance Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides everything you need to ensure your data practices comply with global privacy regulations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl card-hover">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Data Source Connections</h3>
              <p className="text-muted-foreground mb-4">
                Connect to databases, files, and cloud storage to comprehensively analyze your data landscape.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Multiple database types support</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>CSV, JSON, and Excel file processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Secure credential management</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-8 rounded-xl card-hover">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6">
                <FileSpreadsheet className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Data Profiling</h3>
              <p className="text-muted-foreground mb-4">
                Automatically analyze data structures and content to identify compliance risks and sensitive information.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Pattern recognition for PII detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Regulation-specific analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Scheduled and on-demand profiling</span>
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-8 rounded-xl card-hover">
              <div className="h-12 w-12 rounded-lg bg-info/10 flex items-center justify-center mb-6">
                <BarChart className="h-6 w-6 text-info" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compliance Reporting</h3>
              <p className="text-muted-foreground mb-4">
                Generate detailed reports with actionable insights to address compliance gaps and demonstrate due diligence.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Visual compliance dashboards</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Specific remediation recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <span>Exportable audit-ready documents</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-24 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Ready to simplify your data compliance?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join organizations that trust our platform to navigate complex data privacy regulations and protect sensitive information.
          </p>
          <Button 
            size="lg" 
            className="btn-hover-effect text-lg px-8 py-6"
            onClick={() => navigate('/login')}
          >
            Start Your Free Trial
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 bg-secondary/50 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Logo size="sm" />
            <div className="text-sm text-muted-foreground ml-8">
              © 2023 Data Compliance Companion Agent
            </div>
          </div>
          
          <div className="flex gap-6">
            <Button variant="ghost" className="text-sm text-muted-foreground">
              Privacy Policy
            </Button>
            <Button variant="ghost" className="text-sm text-muted-foreground">
              Terms of Service
            </Button>
            <Button variant="ghost" className="text-sm text-muted-foreground">
              Contact Us
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
