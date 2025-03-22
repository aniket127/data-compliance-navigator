
import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Database, 
  FileSpreadsheet, 
  BarChart3, 
  Users, 
  Calendar, 
  Settings, 
  FileCode, 
  PlayCircle, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  PauseCircle,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Dummy data
  const recentJobs = [
    { id: 1, name: 'Customer Database Profiling', status: 'completed', regulation: 'GDPR', date: '2 hours ago' },
    { id: 2, name: 'Healthcare Records Analysis', status: 'in-progress', regulation: 'HIPAA', date: 'Just now' },
    { id: 3, name: 'Financial Data Review', status: 'pending', regulation: 'PCI DSS', date: '1 day ago' },
    { id: 4, name: 'User Activity Logs', status: 'failed', regulation: 'GDPR', date: '3 days ago' },
  ];
  
  const dataSources = [
    { id: 1, name: 'Customer Database', type: 'PostgreSQL', tables: 12, status: 'active' },
    { id: 2, name: 'User Records', type: 'MySQL', tables: 8, status: 'active' },
    { id: 3, name: 'Transaction Logs', type: 'CSV Files', tables: 0, status: 'inactive' },
    { id: 4, name: 'Product Inventory', type: 'Oracle', tables: 5, status: 'active' },
  ];
  
  const complianceStats = {
    gdpr: 76,
    hipaa: 82,
    pci: 94,
    ccpa: 68
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'in-progress':
        return <PlayCircle className="h-4 w-4 text-info" />;
      case 'pending':
        return <PauseCircle className="h-4 w-4 text-warning" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your Data Compliance Companion dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Data Sources</p>
                  <h2 className="text-3xl font-bold">{dataSources.length}</h2>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <Database className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                  <h2 className="text-3xl font-bold">2</h2>
                </div>
                <div className="p-2 bg-info/10 rounded-full">
                  <Activity className="h-5 w-5 text-info" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Profiled Tables</p>
                  <h2 className="text-3xl font-bold">24</h2>
                </div>
                <div className="p-2 bg-warning/10 rounded-full">
                  <FileSpreadsheet className="h-5 w-5 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Compliance Score</p>
                  <h2 className="text-3xl font-bold">86%</h2>
                </div>
                <div className="p-2 bg-success/10 rounded-full">
                  <ShieldCheck className="h-5 w-5 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 card-hover">
            <CardHeader>
              <CardTitle>Recent Jobs</CardTitle>
              <CardDescription>
                Status of your most recent data profiling jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentJobs.map(job => (
                  <div 
                    key={job.id} 
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(job.status)}
                      <div>
                        <p className="font-medium">{job.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{job.date}</span>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">{job.regulation}</Badge>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate(`/job-monitoring/${job.id}`)}
                    >
                      View
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full" onClick={() => navigate('/job-monitoring')}>
                  View All Jobs
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Compliance Overview</CardTitle>
              <CardDescription>
                Your regulatory compliance scores
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">GDPR</p>
                  <p className="text-sm text-muted-foreground">{complianceStats.gdpr}%</p>
                </div>
                <Progress value={complianceStats.gdpr} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">HIPAA</p>
                  <p className="text-sm text-muted-foreground">{complianceStats.hipaa}%</p>
                </div>
                <Progress value={complianceStats.hipaa} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">PCI DSS</p>
                  <p className="text-sm text-muted-foreground">{complianceStats.pci}%</p>
                </div>
                <Progress value={complianceStats.pci} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">CCPA</p>
                  <p className="text-sm text-muted-foreground">{complianceStats.ccpa}%</p>
                </div>
                <Progress value={complianceStats.ccpa} className="h-2" />
              </div>
              
              <Separator />
              
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => navigate('/results')}
              >
                View Detailed Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Start a new data profiling job or add a new data source
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  className="h-20 btn-hover-effect" 
                  onClick={() => navigate('/data-sources')}
                >
                  <Database className="mr-2 h-5 w-5" />
                  Add Data Source
                </Button>
                <Button 
                  className="h-20 btn-hover-effect" 
                  onClick={() => navigate('/data-profiling')}
                >
                  <FileSpreadsheet className="mr-2 h-5 w-5" />
                  New Profiling Job
                </Button>
                <Button 
                  className="h-20 btn-hover-effect" 
                  variant="outline"
                  onClick={() => navigate('/results')}
                >
                  <BarChart3 className="mr-2 h-5 w-5" />
                  View Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
