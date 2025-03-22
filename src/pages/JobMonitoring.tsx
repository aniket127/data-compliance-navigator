
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PlayCircle, 
  PauseCircle, 
  StopCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RefreshCw, 
  AlertTriangle, 
  Download, 
  Filter, 
  Search, 
  MoreHorizontal, 
  FileText,
  ArrowUpDown,
  Activity,
  Terminal,
  BarChart
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

const JobMonitoring = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLogJob, setSelectedLogJob] = useState<null | any>(null);
  const navigate = useNavigate();
  
  // Dummy data
  const jobs = [
    { 
      id: 1, 
      name: 'Customer Database GDPR Profiling', 
      status: 'in-progress', 
      progress: 67, 
      regulation: 'GDPR',
      dataSource: 'Customer Database',
      sourceType: 'PostgreSQL',
      startTime: '2023-10-15 10:34:12',
      estimatedCompletion: '2023-10-15 11:15:00',
      tables: 8,
      processedTables: 6,
      user: 'admin@example.com'
    },
    { 
      id: 2, 
      name: 'Employee Records HIPAA Check', 
      status: 'completed', 
      progress: 100, 
      regulation: 'HIPAA',
      dataSource: 'HR Database',
      sourceType: 'MySQL',
      startTime: '2023-10-14 15:20:45',
      endTime: '2023-10-14 16:05:22',
      tables: 4,
      processedTables: 4,
      user: 'john.smith@example.com'
    },
    { 
      id: 3, 
      name: 'Payment Transactions PCI Scan', 
      status: 'failed', 
      progress: 35, 
      regulation: 'PCI DSS',
      dataSource: 'Payment System',
      sourceType: 'Oracle',
      startTime: '2023-10-13 08:12:30',
      endTime: '2023-10-13 08:35:11',
      tables: 12,
      processedTables: 4,
      error: 'Connection timeout after 900 seconds',
      user: 'jane.doe@example.com'
    },
    { 
      id: 4, 
      name: 'User Activity Logs Analysis', 
      status: 'queued', 
      progress: 0, 
      regulation: 'GDPR',
      dataSource: 'Web Server Logs',
      sourceType: 'CSV Files',
      queueTime: '2023-10-15 11:00:00',
      tables: 3,
      processedTables: 0,
      user: 'admin@example.com'
    },
    { 
      id: 5, 
      name: 'Product Catalog Data Check', 
      status: 'paused', 
      progress: 52, 
      regulation: 'CCPA',
      dataSource: 'Product Database',
      sourceType: 'Microsoft SQL Server',
      startTime: '2023-10-14 09:45:30',
      pauseTime: '2023-10-14 10:12:15',
      tables: 5,
      processedTables: 3,
      user: 'sarah.wilson@example.com'
    },
  ];
  
  const getLogs = (jobId: number) => {
    // Simulated logs based on job status
    const job = jobs.find(j => j.id === jobId);
    if (!job) return [];
    
    const baseTime = new Date();
    const logs = [];
    
    if (job.status === 'in-progress' || job.status === 'completed' || job.status === 'paused' || job.status === 'failed') {
      logs.push({
        time: new Date(baseTime.getTime() - 600000).toISOString(),
        level: 'INFO',
        message: `Starting profiling job "${job.name}"`
      });
      
      logs.push({
        time: new Date(baseTime.getTime() - 590000).toISOString(),
        level: 'INFO',
        message: `Connecting to ${job.sourceType} data source "${job.dataSource}"`
      });
      
      logs.push({
        time: new Date(baseTime.getTime() - 585000).toISOString(),
        level: 'INFO',
        message: `Successfully connected to data source`
      });
      
      logs.push({
        time: new Date(baseTime.getTime() - 580000).toISOString(),
        level: 'INFO',
        message: `Retrieved ${job.tables} tables for profiling`
      });
    }
    
    if (job.status === 'in-progress' || job.status === 'completed' || job.status === 'paused') {
      for (let i = 0; i < job.processedTables; i++) {
        logs.push({
          time: new Date(baseTime.getTime() - (570000 - i*60000)).toISOString(),
          level: 'INFO',
          message: `Processing table ${i+1} of ${job.tables}`
        });
        
        logs.push({
          time: new Date(baseTime.getTime() - (565000 - i*60000)).toISOString(),
          level: 'INFO',
          message: `Collecting basic statistics for table ${i+1}`
        });
        
        logs.push({
          time: new Date(baseTime.getTime() - (560000 - i*60000)).toISOString(),
          level: 'INFO',
          message: `Analyzing data patterns for table ${i+1}`
        });
        
        if (i === 2 && job.regulation === 'GDPR') {
          logs.push({
            time: new Date(baseTime.getTime() - (555000 - i*60000)).toISOString(),
            level: 'WARNING',
            message: `Potential personal data identified in column "customer_email"`
          });
        }
        
        if (i === 1 && job.regulation === 'PCI DSS') {
          logs.push({
            time: new Date(baseTime.getTime() - (554000 - i*60000)).toISOString(),
            level: 'WARNING',
            message: `Possible credit card numbers detected in column "payment_details"`
          });
        }
        
        logs.push({
          time: new Date(baseTime.getTime() - (550000 - i*60000)).toISOString(),
          level: 'INFO',
          message: `Completed profiling for table ${i+1}`
        });
      }
    }
    
    if (job.status === 'paused') {
      logs.push({
        time: job.pauseTime,
        level: 'INFO',
        message: `Job paused by user ${job.user}`
      });
    }
    
    if (job.status === 'completed') {
      logs.push({
        time: job.endTime,
        level: 'INFO',
        message: `All tables processed successfully. Job completed.`
      });
      
      logs.push({
        time: new Date(job.endTime).toISOString(),
        level: 'INFO',
        message: `Generating compliance report for ${job.regulation}`
      });
      
      logs.push({
        time: new Date(new Date(job.endTime).getTime() + 5000).toISOString(),
        level: 'INFO',
        message: `Report generated and saved successfully`
      });
    }
    
    if (job.status === 'failed') {
      logs.push({
        time: job.endTime,
        level: 'ERROR',
        message: job.error
      });
      
      logs.push({
        time: new Date(new Date(job.endTime).getTime() + 1000).toISOString(),
        level: 'ERROR',
        message: `Job failed due to error. See details above.`
      });
    }
    
    // Sort logs by time
    return logs.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case 'in-progress':
        return <PlayCircle className="h-5 w-5 text-info animate-pulse" />;
      case 'queued':
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      case 'paused':
        return <PauseCircle className="h-5 w-5 text-warning" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  const getActionButtons = (job: any) => {
    switch (job.status) {
      case 'in-progress':
        return (
          <>
            <Button 
              variant="outline" 
              size="sm"
              className="h-8"
              onClick={() => {
                toast.success(`Job "${job.name}" paused`);
              }}
            >
              <PauseCircle className="h-4 w-4 mr-1" />
              Pause
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="h-8 text-destructive hover:text-destructive"
              onClick={() => {
                toast.success(`Job "${job.name}" cancelled`);
              }}
            >
              <StopCircle className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </>
        );
      case 'paused':
        return (
          <Button 
            variant="outline" 
            size="sm"
            className="h-8"
            onClick={() => {
              toast.success(`Job "${job.name}" resumed`);
            }}
          >
            <PlayCircle className="h-4 w-4 mr-1" />
            Resume
          </Button>
        );
      case 'queued':
        return (
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 text-destructive hover:text-destructive"
            onClick={() => {
              toast.success(`Job "${job.name}" removed from queue`);
            }}
          >
            <XCircle className="h-4 w-4 mr-1" />
            Remove
          </Button>
        );
      case 'completed':
        return (
          <Button 
            variant="outline" 
            size="sm"
            className="h-8"
            onClick={() => navigate(`/results/${job.id}`)}
          >
            <BarChart className="h-4 w-4 mr-1" />
            View Results
          </Button>
        );
      case 'failed':
        return (
          <Button 
            variant="outline" 
            size="sm"
            className="h-8"
            onClick={() => {
              toast.success(`Job "${job.name}" restarted`);
            }}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Retry
          </Button>
        );
      default:
        return null;
    }
  };
  
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.dataSource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleViewLogs = (job: any) => {
    setSelectedLogJob(job);
  };
  
  const handleDownloadLogs = (jobId: number) => {
    toast.success('Logs downloaded successfully');
  };
  
  const getLogLevelClass = (level: string) => {
    switch (level) {
      case 'INFO':
        return 'text-info';
      case 'WARNING':
        return 'text-warning';
      case 'ERROR':
        return 'text-destructive';
      default:
        return '';
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Monitoring</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your data profiling jobs
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-[250px]">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search jobs..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="queued">Queued</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Card>
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <CardTitle>Active and Recent Jobs</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-md border">
              <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground bg-secondary/50">
                <div className="col-span-6 md:col-span-5 flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="p-0 h-8 hover:bg-transparent">
                    <ArrowUpDown className="h-3 w-3 mr-1" />
                    Job Name
                  </Button>
                </div>
                <div className="col-span-3 md:col-span-2 flex items-center justify-center">Status</div>
                <div className="col-span-3 md:col-span-3 hidden md:flex items-center justify-center">Progress</div>
                <div className="col-span-2 flex items-center justify-end">Actions</div>
              </div>
              
              {filteredJobs.length > 0 ? (
                <div className="divide-y">
                  {filteredJobs.map(job => (
                    <div key={job.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                      <div className="col-span-6 md:col-span-5 flex flex-col">
                        <div className="font-medium truncate">{job.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Badge variant="outline">{job.regulation}</Badge>
                          <span className="mx-1">•</span>
                          <span>{job.dataSource}</span>
                        </div>
                      </div>
                      
                      <div className="col-span-3 md:col-span-2 flex justify-center">
                        <div className="flex items-center gap-1.5">
                          {getStatusIcon(job.status)}
                          <span className="capitalize text-sm hidden sm:inline">{job.status}</span>
                        </div>
                      </div>
                      
                      <div className="col-span-3 md:col-span-3 hidden md:block">
                        <div className="w-full flex items-center gap-2">
                          <Progress value={job.progress} className="h-2" />
                          <span className="text-xs w-9 text-right">{job.progress}%</span>
                        </div>
                      </div>
                      
                      <div className="col-span-3 md:col-span-2 flex justify-end gap-2">
                        {getActionButtons(job)}
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewLogs(job)}>
                              <Terminal className="mr-2 h-4 w-4" />
                              View Logs
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownloadLogs(job.id)}>
                              <Download className="mr-2 h-4 w-4" />
                              Download Logs
                            </DropdownMenuItem>
                            {job.status === 'completed' && (
                              <DropdownMenuItem onClick={() => navigate(`/results/${job.id}`)}>
                                <FileText className="mr-2 h-4 w-4" />
                                View Report
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Activity className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No jobs found</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {searchQuery || statusFilter !== 'all'
                      ? "Try adjusting your search filters"
                      : "Create a new profiling job to get started"
                    }
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Dialog open={!!selectedLogJob} onOpenChange={(open) => !open && setSelectedLogJob(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Job Logs</DialogTitle>
              <DialogDescription>
                {selectedLogJob?.name} - {selectedLogJob?.dataSource}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="logs">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="logs">
                  <Terminal className="mr-2 h-4 w-4" />
                  Log Output
                </TabsTrigger>
                <TabsTrigger value="details">
                  <FileText className="mr-2 h-4 w-4" />
                  Job Details
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="logs" className="mt-4">
                <ScrollArea className="h-[400px] w-full rounded-md border bg-secondary/30 p-4">
                  <div className="font-mono text-sm">
                    {selectedLogJob && getLogs(selectedLogJob.id).map((log, idx) => (
                      <div key={idx} className="py-1">
                        <span className="text-muted-foreground">
                          {new Date(log.time).toLocaleTimeString()}
                        </span>
                        <span className={`mx-2 font-semibold ${getLogLevelClass(log.level)}`}>
                          [{log.level}]
                        </span>
                        <span className="">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => selectedLogJob && handleDownloadLogs(selectedLogJob.id)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Logs
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="mt-4">
                {selectedLogJob && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Job Name</p>
                        <p className="font-medium">{selectedLogJob.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Status</p>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(selectedLogJob.status)}
                          <span className="capitalize font-medium">{selectedLogJob.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Data Source</p>
                        <p className="font-medium">{selectedLogJob.dataSource}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Source Type</p>
                        <p className="font-medium">{selectedLogJob.sourceType}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Regulation</p>
                        <p className="font-medium">{selectedLogJob.regulation}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Initiated By</p>
                        <p className="font-medium">{selectedLogJob.user}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Start Time</p>
                        <p className="font-medium">{selectedLogJob.startTime || 'Not started'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          {selectedLogJob.status === 'completed' ? 'End Time' : 
                           selectedLogJob.status === 'failed' ? 'Failed At' :
                           selectedLogJob.status === 'paused' ? 'Paused At' :
                           selectedLogJob.status === 'in-progress' ? 'Est. Completion' : 'Queue Time'}
                        </p>
                        <p className="font-medium">
                          {selectedLogJob.endTime || 
                           selectedLogJob.pauseTime ||
                           selectedLogJob.estimatedCompletion ||
                           selectedLogJob.queueTime || 'N/A'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Tables</p>
                        <p className="font-medium">{selectedLogJob.processedTables} / {selectedLogJob.tables}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Progress</p>
                        <div className="w-full flex items-center gap-2">
                          <Progress value={selectedLogJob.progress} className="h-2 flex-1" />
                          <span className="text-sm w-9 text-right">{selectedLogJob.progress}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {selectedLogJob.error && (
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                          <div>
                            <p className="font-medium text-destructive">Error</p>
                            <p className="text-sm">{selectedLogJob.error}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default JobMonitoring;
