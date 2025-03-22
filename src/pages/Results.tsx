
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Download, 
  Filter, 
  BarChart, 
  AlertCircle, 
  CheckCircle2, 
  Shield, 
  Table, 
  Database, 
  FileSpreadsheet, 
  ChevronRight, 
  ChevronDown,
  FileText,
  Eye,
  ListFilter,
  Share2,
  Printer
} from 'lucide-react';
import { 
  BarChart as RechartBarChart,
  LineChart as RechartLineChart,
  PieChart as RechartPieChart,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
  Pie,
  Cell
} from 'recharts';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

const Results = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [regulationFilter, setRegulationFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  
  // Dummy data
  const reports = [
    {
      id: 1,
      name: 'Customer Database GDPR Profiling',
      regulation: 'GDPR',
      dataSource: 'Customer Database',
      date: '2023-10-15',
      tables: 8,
      compliance: {
        score: 76,
        issues: 12,
        critical: 2,
        medium: 5,
        low: 5
      },
      summary: 'The customer database shows overall good compliance with GDPR, with some issues requiring attention.',
      charts: {
        issuesByCategory: [
          { name: 'Personal Data', value: 5 },
          { name: 'Consent', value: 3 },
          { name: 'Data Retention', value: 2 },
          { name: 'Cross-border Transfers', value: 1 },
          { name: 'Subject Access', value: 1 }
        ],
        tableCompliance: [
          { name: 'customers', score: 65 },
          { name: 'customer_orders', score: 82 },
          { name: 'customer_payments', score: 58 },
          { name: 'customer_addresses', score: 79 },
          { name: 'marketing_preferences', score: 95 },
          { name: 'support_tickets', score: 72 },
          { name: 'customer_logs', score: 88 },
          { name: 'customer_feedback', score: 75 }
        ]
      },
      issues: [
        {
          id: 'i1',
          severity: 'critical',
          table: 'customers',
          column: 'social_security_number',
          description: 'Unencrypted storage of sensitive personal identifiers',
          recommendation: 'Encrypt this data and consider if storage is necessary'
        },
        {
          id: 'i2',
          severity: 'critical',
          table: 'customer_payments',
          column: 'credit_card_number',
          description: 'Full credit card numbers stored in plain text',
          recommendation: 'Store only last 4 digits or use tokenization'
        },
        {
          id: 'i3',
          severity: 'medium',
          table: 'customers',
          column: 'birth_date',
          description: 'Personal identifiable information without explicit purpose',
          recommendation: 'Document purpose or remove if unnecessary'
        },
        {
          id: 'i4',
          severity: 'medium',
          table: 'customer_logs',
          column: 'ip_address',
          description: 'IP addresses stored without retention policy',
          recommendation: 'Implement retention policy for IP address logs'
        },
        {
          id: 'i5',
          severity: 'low',
          table: 'marketing_preferences',
          column: 'last_updated',
          description: 'Consent record without timestamp',
          recommendation: 'Add timestamp to track consent changes'
        }
      ]
    },
    {
      id: 2,
      name: 'Employee Records HIPAA Check',
      regulation: 'HIPAA',
      dataSource: 'HR Database',
      date: '2023-10-14',
      tables: 4,
      compliance: {
        score: 82,
        issues: 7,
        critical: 1,
        medium: 3,
        low: 3
      },
      summary: 'Employee health records largely comply with HIPAA requirements, with some security concerns identified.',
      charts: {
        issuesByCategory: [
          { name: 'PHI Security', value: 3 },
          { name: 'Access Controls', value: 2 },
          { name: 'Audit Logs', value: 1 },
          { name: 'Disclosure', value: 1 }
        ],
        tableCompliance: [
          { name: 'employees', score: 85 },
          { name: 'health_benefits', score: 78 },
          { name: 'medical_leaves', score: 69 },
          { name: 'health_claims', score: 92 }
        ]
      },
      issues: [
        {
          id: 'i1',
          severity: 'critical',
          table: 'health_claims',
          column: 'diagnosis_code',
          description: 'Health information accessible to non-healthcare staff',
          recommendation: 'Implement role-based access controls'
        },
        {
          id: 'i2',
          severity: 'medium',
          table: 'medical_leaves',
          column: 'reason',
          description: 'Detailed health condition visible in general HR view',
          recommendation: 'Limit detailed view to authorized personnel'
        },
        {
          id: 'i3',
          severity: 'medium',
          table: 'health_benefits',
          column: 'physician_notes',
          description: 'Unencrypted physician notes with sensitive details',
          recommendation: 'Encrypt this field and limit access'
        }
      ]
    },
    {
      id: 3,
      name: 'Payment Transactions PCI Scan',
      regulation: 'PCI DSS',
      dataSource: 'Payment System',
      date: '2023-10-08',
      tables: 6,
      compliance: {
        score: 94,
        issues: 4,
        critical: 0,
        medium: 2,
        low: 2
      },
      summary: 'Payment system shows strong PCI DSS compliance with minor issues in logging and data retention.',
      charts: {
        issuesByCategory: [
          { name: 'Cardholder Data', value: 1 },
          { name: 'Audit Trails', value: 2 },
          { name: 'Encryption', value: 1 }
        ],
        tableCompliance: [
          { name: 'transactions', score: 96 },
          { name: 'payment_methods', score: 90 },
          { name: 'transaction_logs', score: 89 },
          { name: 'refunds', score: 97 },
          { name: 'chargebacks', score: 98 },
          { name: 'payment_gateways', score: 93 }
        ]
      },
      issues: [
        {
          id: 'i1',
          severity: 'medium',
          table: 'transaction_logs',
          column: 'request_payload',
          description: 'Potential card data in API request logs',
          recommendation: 'Sanitize logs to remove sensitive data'
        },
        {
          id: 'i2',
          severity: 'medium',
          table: 'payment_methods',
          column: 'verification_data',
          description: 'Verification data retained after authorization',
          recommendation: 'Delete verification data after authorization'
        }
      ]
    }
  ];
  
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           report.dataSource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegulation = regulationFilter === 'all' || report.regulation === regulationFilter;
    
    return matchesSearch && matchesRegulation;
  });
  
  const getComplianceColor = (score: number) => {
    if (score >= 90) return '#10B981'; // Success
    if (score >= 70) return '#F59E0B'; // Warning
    return '#EF4444'; // Destructive
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-destructive';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-muted-foreground';
      default:
        return '';
    }
  };
  
  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };
  
  const handleDownloadReport = (reportId: number) => {
    toast.success('Report downloaded successfully');
  };
  
  const handleShareReport = () => {
    toast.success('Report sharing options opened');
  };
  
  const handlePrintReport = () => {
    toast.success('Preparing report for printing');
  };
  
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];
  
  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Profiling Results</h1>
            <p className="text-muted-foreground mt-1">
              View and analyze data profiling reports and compliance findings
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-[250px]">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search reports..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={regulationFilter} onValueChange={setRegulationFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regulations</SelectItem>
                <SelectItem value="GDPR">GDPR</SelectItem>
                <SelectItem value="HIPAA">HIPAA</SelectItem>
                <SelectItem value="PCI DSS">PCI DSS</SelectItem>
                <SelectItem value="CCPA">CCPA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map(report => (
            <Card key={report.id} className="card-hover">
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <Badge>{report.regulation}</Badge>
                  <div className="rounded-full bg-secondary px-2 py-1 text-xs font-medium">
                    {report.date}
                  </div>
                </div>
                <CardTitle className="mt-2">{report.name}</CardTitle>
                <CardDescription>{report.dataSource}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Compliance Score</p>
                    <div className="text-2xl font-bold flex items-baseline">
                      {report.compliance.score}
                      <span className="text-xs text-muted-foreground ml-1">/100</span>
                    </div>
                  </div>
                  
                  <div className="h-20 w-20">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartPieChart>
                        <Pie
                          data={[
                            { name: 'Score', value: report.compliance.score },
                            { name: 'Gap', value: 100 - report.compliance.score }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={35}
                          paddingAngle={2}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                        >
                          <Cell fill={getComplianceColor(report.compliance.score)} />
                          <Cell fill="#e2e8f0" />
                        </Pie>
                      </RechartPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 text-center mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Issues</p>
                    <p className="text-lg font-semibold">{report.compliance.issues}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Critical</p>
                    <p className="text-lg font-semibold text-destructive">{report.compliance.critical}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Tables</p>
                    <p className="text-lg font-semibold">{report.tables}</p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {report.summary}
                </p>
              </CardContent>
              
              <CardFooter className="flex justify-between pt-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownloadReport(report.id)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setSelectedReport(report)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredReports.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 bg-secondary/30 rounded-lg border border-dashed">
            <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No reports found</h3>
            <p className="text-muted-foreground text-center mt-1 mb-4">
              {searchQuery || regulationFilter !== 'all'
                ? `No results matching your search criteria`
                : "Run a profiling job to generate compliance reports"
              }
            </p>
            {(searchQuery || regulationFilter !== 'all') && (
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setRegulationFilter('all');
              }}>
                Clear Filters
              </Button>
            )}
          </div>
        )}
        
        <Dialog open={!!selectedReport} onOpenChange={(open) => !open && setSelectedReport(null)}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center gap-2">
                  <Badge>{selectedReport?.regulation}</Badge>
                  <span>{selectedReport?.name}</span>
                </DialogTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={handleShareReport}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handlePrintReport}>
                    <Printer className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => selectedReport && handleDownloadReport(selectedReport.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <DialogDescription>
                {selectedReport?.dataSource} - {selectedReport?.date}
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto pr-2 -mr-2">
              {selectedReport && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Compliance Score</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col items-center justify-center">
                          <div className="relative h-32 w-32">
                            <ResponsiveContainer width="100%" height="100%">
                              <RechartPieChart>
                                <Pie
                                  data={[
                                    { name: 'Score', value: selectedReport.compliance.score },
                                    { name: 'Gap', value: 100 - selectedReport.compliance.score }
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={40}
                                  outerRadius={55}
                                  paddingAngle={2}
                                  dataKey="value"
                                  startAngle={90}
                                  endAngle={-270}
                                >
                                  <Cell fill={getComplianceColor(selectedReport.compliance.score)} />
                                  <Cell fill="#e2e8f0" />
                                </Pie>
                              </RechartPieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-3xl font-bold">{selectedReport.compliance.score}</div>
                            </div>
                          </div>
                          
                          <div className="mt-2 text-center">
                            <p className="text-sm text-muted-foreground">Compliance Rating</p>
                            <Badge 
                              variant={selectedReport.compliance.score >= 90 ? "success" : 
                                     selectedReport.compliance.score >= 70 ? "default" : "destructive"}
                              className="mt-1"
                            >
                              {selectedReport.compliance.score >= 90 ? "Good" : 
                               selectedReport.compliance.score >= 70 ? "Fair" : "Poor"}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Issues by Severity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="h-3 w-3 rounded-full bg-destructive"></span>
                              <span className="text-sm">Critical</span>
                            </div>
                            <Badge variant="destructive">{selectedReport.compliance.critical}</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="h-3 w-3 rounded-full bg-warning"></span>
                              <span className="text-sm">Medium</span>
                            </div>
                            <Badge variant="default">{selectedReport.compliance.medium}</Badge>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="h-3 w-3 rounded-full bg-muted"></span>
                              <span className="text-sm">Low</span>
                            </div>
                            <Badge variant="secondary">{selectedReport.compliance.low}</Badge>
                          </div>
                          
                          <Separator className="my-1" />
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="h-3 w-3 rounded-full bg-primary"></span>
                              <span className="text-sm font-medium">Total</span>
                            </div>
                            <Badge variant="outline">{selectedReport.compliance.issues}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Issues by Category</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[180px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartBarChart
                              data={selectedReport.charts.issuesByCategory}
                              layout="vertical"
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                              <XAxis type="number" domain={[0, 'dataMax + 1']} />
                              <YAxis 
                                type="category" 
                                dataKey="name" 
                                width={100}
                                tick={{ fontSize: 12 }}
                              />
                              <Tooltip />
                              <Bar dataKey="value" fill="#8884d8" barSize={20} />
                            </RechartBarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Compliance by Table</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartBarChart
                            data={selectedReport.charts.tableCompliance.sort((a, b) => a.score - b.score)}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            <Bar 
                              dataKey="score" 
                              name="Compliance Score" 
                              fill="#8884d8"
                              maxBarSize={60}
                            />
                          </RechartBarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Compliance Issues</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ListFilter className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Filter by Severity</span>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="destructive">Critical</Badge>
                            <Badge variant="default">Medium</Badge>
                            <Badge variant="secondary">Low</Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {selectedReport.issues.map((issue: any) => (
                            <Collapsible key={issue.id} className="border rounded-lg">
                              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 text-left">
                                <div className="flex items-center gap-3">
                                  <Badge variant={getSeverityBadgeVariant(issue.severity)}>
                                    {issue.severity}
                                  </Badge>
                                  <div>
                                    <p className="font-medium">{issue.table}.{issue.column}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {issue.description}
                                    </p>
                                  </div>
                                </div>
                                <ChevronDown className="h-4 w-4 transition-transform ui-open:rotate-180" />
                              </CollapsibleTrigger>
                              <CollapsibleContent className="p-3 border-t bg-secondary/30">
                                <div className="space-y-2">
                                  <div>
                                    <p className="text-sm font-medium">Recommendation:</p>
                                    <p className="text-sm">{issue.recommendation}</p>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-4 pt-2 text-sm">
                                    <div className="space-y-1">
                                      <p className="text-muted-foreground">Table</p>
                                      <p className="font-medium">{issue.table}</p>
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-muted-foreground">Column</p>
                                      <p className="font-medium">{issue.column}</p>
                                    </div>
                                  </div>
                                </div>
                              </CollapsibleContent>
                            </Collapsible>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{selectedReport.summary}</p>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Key Recommendations:</p>
                          <ul className="space-y-1 text-sm">
                            {selectedReport.issues.slice(0, 3).map((issue: any) => (
                              <li key={issue.id} className="flex items-start gap-2">
                                <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                <span>{issue.recommendation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Next Steps:</p>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-start gap-2">
                              <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span>Address all critical issues immediately</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span>Schedule remediation for medium issues</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                              <span>Plan follow-up scan after changes</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Results;
