
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  FileSpreadsheet, 
  Play, 
  Info, 
  Settings, 
  Shield, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  HelpCircle, 
  ChevronRight,
  FileQuestion,
  Table,
  Eye,
  EyeOff,
  Lock
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const DataProfiling = () => {
  const navigate = useNavigate();
  const [selectedDataSource, setSelectedDataSource] = useState<string>('');
  const [selectedRegulation, setSelectedRegulation] = useState<string>('gdpr');
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [profilingName, setProfilingName] = useState<string>('');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  
  // Dummy data
  const dataSources = [
    { id: 'ds1', name: 'Customer Database', type: 'PostgreSQL' },
    { id: 'ds2', name: 'Employee Records', type: 'MySQL' },
    { id: 'ds3', name: 'Transaction Logs', type: 'CSV File' },
    { id: 'ds4', name: 'Product Catalog', type: 'Microsoft SQL Server' },
  ];
  
  const regulations = [
    { 
      id: 'gdpr', 
      name: 'General Data Protection Regulation (GDPR)', 
      description: 'European Union data protection and privacy regulation.' 
    },
    { 
      id: 'hipaa', 
      name: 'Health Insurance Portability and Accountability Act (HIPAA)', 
      description: 'United States legislation for data privacy in healthcare.' 
    },
    { 
      id: 'pci', 
      name: 'Payment Card Industry Data Security Standard (PCI DSS)', 
      description: 'Information security standard for organizations that handle credit cards.' 
    },
    { 
      id: 'ccpa', 
      name: 'California Consumer Privacy Act (CCPA)', 
      description: 'State statute intended to enhance privacy rights for California residents.' 
    },
  ];
  
  const availableTables = [
    { id: 't1', name: 'customers', schema: 'public', rows: 25000 },
    { id: 't2', name: 'orders', schema: 'public', rows: 103420 },
    { id: 't3', name: 'products', schema: 'inventory', rows: 5230 },
    { id: 't4', name: 'employees', schema: 'hr', rows: 342 },
    { id: 't5', name: 'transactions', schema: 'finance', rows: 1250000 },
    { id: 't6', name: 'logs', schema: 'system', rows: 8500000 },
  ];
  
  const handleToggleTable = (tableId: string) => {
    setSelectedTables((prev) => 
      prev.includes(tableId)
        ? prev.filter(id => id !== tableId)
        : [...prev, tableId]
    );
  };
  
  const handleSelectAllTables = () => {
    if (selectedTables.length === availableTables.length) {
      setSelectedTables([]);
    } else {
      setSelectedTables(availableTables.map(table => table.id));
    }
  };
  
  const handleStartProfiling = () => {
    if (!profilingName) {
      toast.error('Please enter a name for this profiling job');
      return;
    }
    
    if (!selectedDataSource) {
      toast.error('Please select a data source');
      return;
    }
    
    if (selectedTables.length === 0) {
      toast.error('Please select at least one table to profile');
      return;
    }
    
    toast.success('Data profiling job started successfully!');
    navigate('/job-monitoring');
  };
  
  const getRegulationIcon = (regulationId: string) => {
    switch (regulationId) {
      case 'gdpr':
        return <Shield className="h-5 w-5 text-primary" />;
      case 'hipaa':
        return <Shield className="h-5 w-5 text-info" />;
      case 'pci':
        return <Lock className="h-5 w-5 text-warning" />;
      case 'ccpa':
        return <Shield className="h-5 w-5 text-accent" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };
  
  const renderSelectedRegulationDetails = () => {
    const regulation = regulations.find(r => r.id === selectedRegulation);
    if (!regulation) return null;
    
    return (
      <Card className="bg-secondary/50 border-primary/20">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            {getRegulationIcon(regulation.id)}
            <CardTitle className="text-lg">{regulation.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{regulation.description}</p>
          
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">Key requirements:</p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              {regulation.id === 'gdpr' && (
                <>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Identify and classify personal data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Detect sensitive personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Identify potential data retention issues</span>
                  </li>
                </>
              )}
              
              {regulation.id === 'hipaa' && (
                <>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Identify protected health information (PHI)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Check for appropriate safeguards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Validate data access controls</span>
                  </li>
                </>
              )}
              
              {regulation.id === 'pci' && (
                <>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Identify cardholder data presence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Check data encryption status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Validate appropriate data storage</span>
                  </li>
                </>
              )}
              
              {regulation.id === 'ccpa' && (
                <>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Identify California residents' personal information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Validate data disclosure tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Check for consumer request handling capabilities</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Profiling</h1>
          <p className="text-muted-foreground mt-1">
            Create and configure new data profiling jobs
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configure Profiling Job</CardTitle>
                <CardDescription>
                  Select data sources and set profiling parameters
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="job-name">Profiling Job Name</Label>
                  <Input 
                    id="job-name" 
                    placeholder="E.g., Customer Database GDPR Profiling" 
                    value={profilingName}
                    onChange={(e) => setProfilingName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="data-source">Data Source</Label>
                  <Select value={selectedDataSource} onValueChange={setSelectedDataSource}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a data source" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataSources.map(source => (
                        <SelectItem key={source.id} value={source.id}>
                          <div className="flex items-center">
                            {source.type.includes('File') ? (
                              <FileSpreadsheet className="mr-2 h-4 w-4" />
                            ) : (
                              <Database className="mr-2 h-4 w-4" />
                            )}
                            {source.name} ({source.type})
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tables">Select Tables to Profile</Label>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleSelectAllTables}
                      className="h-8 px-2 text-xs"
                    >
                      {selectedTables.length === availableTables.length 
                        ? 'Deselect All' 
                        : 'Select All'}
                    </Button>
                  </div>
                  
                  <div className="border rounded-md divide-y max-h-60 overflow-y-auto">
                    {availableTables.map(table => (
                      <div 
                        key={table.id} 
                        className="flex items-center justify-between p-3 hover:bg-secondary/50"
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id={`table-${table.id}`} 
                            checked={selectedTables.includes(table.id)}
                            onCheckedChange={() => handleToggleTable(table.id)}
                          />
                          <div>
                            <Label 
                              htmlFor={`table-${table.id}`} 
                              className="cursor-pointer font-medium"
                            >
                              {table.name}
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              {table.schema} • {table.rows.toLocaleString()} rows
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {table.rows > 1000000 ? 'Large' : table.rows > 100000 ? 'Medium' : 'Small'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="regulation">Compliance Regulation</Label>
                  <Select value={selectedRegulation} onValueChange={setSelectedRegulation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {regulations.map(regulation => (
                        <SelectItem key={regulation.id} value={regulation.id}>
                          <div className="flex items-center">
                            {getRegulationIcon(regulation.id)}
                            <span className="ml-2">{regulation.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center justify-between"
                    onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                  >
                    <span className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Advanced Settings
                    </span>
                    <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${showAdvancedSettings ? 'rotate-90' : ''}`} />
                  </Button>
                  
                  {showAdvancedSettings && (
                    <div className="mt-4 space-y-4 p-4 border rounded-md bg-secondary/30">
                      <div className="space-y-2">
                        <Label htmlFor="sample-size">Sample Size</Label>
                        <Select defaultValue="full">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full">Full Dataset</SelectItem>
                            <SelectItem value="10000">10,000 rows (Random Sample)</SelectItem>
                            <SelectItem value="5000">5,000 rows (Random Sample)</SelectItem>
                            <SelectItem value="1000">1,000 rows (Random Sample)</SelectItem>
                            <SelectItem value="custom">Custom Sample Size</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-4">
                        <Label>Profiling Options</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-start space-x-2">
                            <Checkbox id="option-1" defaultChecked />
                            <div className="grid gap-1.5 leading-none">
                              <Label htmlFor="option-1" className="text-sm font-medium">
                                Basic Statistics
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Min, max, avg, null count, cardinality
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Checkbox id="option-2" defaultChecked />
                            <div className="grid gap-1.5 leading-none">
                              <Label htmlFor="option-2" className="text-sm font-medium">
                                Value Distribution
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Frequency analysis of values
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Checkbox id="option-3" defaultChecked />
                            <div className="grid gap-1.5 leading-none">
                              <Label htmlFor="option-3" className="text-sm font-medium">
                                Pattern Recognition
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Identify common patterns in data
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Checkbox id="option-4" defaultChecked />
                            <div className="grid gap-1.5 leading-none">
                              <Label htmlFor="option-4" className="text-sm font-medium">
                                Sensitive Data Detection
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Identify PIIs like SSN, credit cards, etc.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="schedule">Schedule</Label>
                        <Select defaultValue="once">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="once">Run Once</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="custom">Custom Schedule</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  Save as Template
                </Button>
                <Button 
                  onClick={handleStartProfiling}
                  disabled={!selectedDataSource || selectedTables.length === 0 || !profilingName}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Profiling
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            {renderSelectedRegulationDetails()}
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Help & Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-secondary p-2 rounded-full mt-0.5">
                    <FileQuestion className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">What is Data Profiling?</p>
                    <p className="text-xs text-muted-foreground">
                      Data profiling is the process of examining data to collect statistics and information about it.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-secondary p-2 rounded-full mt-0.5">
                    <Table className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Choose Tables Wisely</p>
                    <p className="text-xs text-muted-foreground">
                      For large databases, start with the most critical tables that may contain sensitive data.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-secondary p-2 rounded-full mt-0.5">
                    <Eye className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sample vs. Full Profiling</p>
                    <p className="text-xs text-muted-foreground">
                      For tables with millions of rows, consider using sampling for faster results.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-secondary p-2 rounded-full mt-0.5">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Regulatory Compliance</p>
                    <p className="text-xs text-muted-foreground">
                      Select the regulations that apply to your organization for targeted analysis.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DataProfiling;
