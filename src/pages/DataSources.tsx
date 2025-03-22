
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Server, 
  FileUp, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  XCircle, 
  Search, 
  FileCog, 
  RefreshCcw,
  Copy,
  FileSpreadsheet,
  FileCode
} from 'lucide-react';
import { toast } from 'sonner';

const DataSources = () => {
  const [isCreatingSource, setIsCreatingSource] = useState(false);
  const [newConnectionType, setNewConnectionType] = useState('database');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dummy data
  const dataSources = [
    { 
      id: 1, 
      name: 'Customer Database',
      type: 'PostgreSQL',
      host: 'db-server-prod.example.com',
      port: 5432,
      username: 'db_user',
      created: '2023-09-15',
      lastChecked: '2023-10-12',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Employee Records',
      type: 'MySQL',
      host: 'mysql-hr.example.com',
      port: 3306,
      username: 'hr_admin',
      created: '2023-08-22',
      lastChecked: '2023-10-10',
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Transaction Logs',
      type: 'CSV File',
      path: '/data/transactions/logs_2023.csv',
      size: '42.5 MB',
      created: '2023-10-05',
      lastChecked: '2023-10-05',
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Product Catalog',
      type: 'Microsoft SQL Server',
      host: 'sql-prod.example.com',
      port: 1433,
      username: 'catalog_user',
      created: '2023-07-11',
      lastChecked: '2023-09-30',
      status: 'inactive'
    },
    { 
      id: 5, 
      name: 'User Activity Logs',
      type: 'JSON File',
      path: '/data/logs/user_activity.json',
      size: '18.2 MB',
      created: '2023-09-28',
      lastChecked: '2023-09-28',
      status: 'active'
    }
  ];
  
  const databaseTypes = [
    'PostgreSQL',
    'MySQL',
    'Microsoft SQL Server',
    'Oracle',
    'MongoDB',
    'SQLite'
  ];
  
  const filteredDataSources = dataSources.filter(ds => 
    ds.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    ds.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      toast.success(`File "${file.name}" uploaded successfully`);
    }
  };
  
  const handleCreateDataSource = () => {
    toast.success('New data source created successfully!');
    setIsCreatingSource(false);
    setUploadedFileName(null);
  };
  
  const handleDeleteDataSource = (id: number) => {
    toast.success('Data source deleted successfully');
  };
  
  const handleTestConnection = () => {
    toast.success('Connection test successful!');
  };
  
  const renderFileIcon = (fileType: string) => {
    if (fileType.includes('CSV')) {
      return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    } else if (fileType.includes('JSON')) {
      return <FileCode className="h-5 w-5 text-amber-500" />;
    } else {
      return <FileUp className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Data Sources</h1>
            <p className="text-muted-foreground mt-1">
              Manage your database and file connections for data profiling
            </p>
          </div>
          
          <Dialog open={isCreatingSource} onOpenChange={setIsCreatingSource}>
            <DialogTrigger asChild>
              <Button className="btn-hover-effect">
                <Plus className="mr-2 h-4 w-4" />
                New Data Source
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card max-w-3xl animate-scale-in">
              <DialogHeader>
                <DialogTitle>Add New Data Source</DialogTitle>
                <DialogDescription>
                  Create a new connection to a database or file system
                </DialogDescription>
              </DialogHeader>
              
              <Tabs 
                defaultValue="database"
                value={newConnectionType}
                onValueChange={setNewConnectionType}
                className="mt-4"
              >
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="database">
                    <Database className="mr-2 h-4 w-4" />
                    Database
                  </TabsTrigger>
                  <TabsTrigger value="file">
                    <FileUp className="mr-2 h-4 w-4" />
                    File Upload
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="database" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="connectionName">Connection Name</Label>
                      <Input id="connectionName" placeholder="E.g., Production Database" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="databaseType">Database Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select database type" />
                        </SelectTrigger>
                        <SelectContent>
                          {databaseTypes.map(type => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="jdbcUrl">JDBC URL (Optional)</Label>
                    <Input id="jdbcUrl" placeholder="jdbc:postgresql://hostname:port/database" />
                    <p className="text-xs text-muted-foreground">
                      If provided, the connection details below will be ignored
                    </p>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hostname">Host Name</Label>
                      <Input id="hostname" placeholder="E.g., db.example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="port">Port</Label>
                      <Input id="port" placeholder="E.g., 5432" type="number" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dbName">Database Name</Label>
                      <Input id="dbName" placeholder="E.g., customer_data" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schemaName">Schema (Optional)</Label>
                      <Input id="schemaName" placeholder="E.g., public" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" placeholder="Database username" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" placeholder="Database password" />
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleTestConnection}
                  >
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Test Connection
                  </Button>
                </TabsContent>
                
                <TabsContent value="file" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="connectionName">Connection Name</Label>
                    <Input id="connectionName" placeholder="E.g., Customer Data CSV" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fileType">File Type</Label>
                    <Select defaultValue="csv">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="xml">XML</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fileUpload">Upload File</Label>
                    <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-6 bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-pointer">
                      <label htmlFor="fileUpload" className="cursor-pointer text-center w-full">
                        <div className="flex flex-col items-center gap-2">
                          <FileUp className="h-8 w-8 text-muted-foreground" />
                          <p className="font-medium">
                            {uploadedFileName 
                              ? uploadedFileName 
                              : 'Click to upload or drag and drop'
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">
                            CSV, JSON, XML, Excel files up to 50MB
                          </p>
                        </div>
                        <Input id="fileUpload" type="file" className="hidden" onChange={handleFileUpload} />
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fileDescription">Description (Optional)</Label>
                    <Input id="fileDescription" placeholder="Brief description of this data file" />
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setIsCreatingSource(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateDataSource}>
                  Create Data Source
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search data sources..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDataSources.map(source => (
            <Card key={source.id} className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge variant={source.status === 'active' ? 'default' : 'secondary'} className="mb-2">
                    {source.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteDataSource(source.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="flex items-center gap-2">
                  {source.type.includes('File') ? (
                    renderFileIcon(source.type)
                  ) : (
                    <Database className="h-5 w-5 text-primary" />
                  )}
                  {source.name}
                </CardTitle>
                <CardDescription>
                  {source.type}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {source.type.includes('File') ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Path:</span>
                        <span className="font-medium truncate max-w-[180px]">{source.path}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Size:</span>
                        <span className="font-medium">{source.size}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Host:</span>
                        <span className="font-medium truncate max-w-[180px]">{source.host}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Port:</span>
                        <span className="font-medium">{source.port}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">User:</span>
                        <span className="font-medium">{source.username}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span className="font-medium">{source.created}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Checked:</span>
                    <span className="font-medium">{source.lastChecked}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button
                  variant="secondary"
                  className="w-full"
                >
                  <FileCog className="mr-2 h-4 w-4" />
                  Profile Data
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredDataSources.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 bg-secondary/30 rounded-lg border border-dashed">
            <Database className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">No data sources found</h3>
            <p className="text-muted-foreground text-center mt-1 mb-4">
              {searchQuery 
                ? `No results matching "${searchQuery}"`
                : "Create your first data source to get started with profiling"
              }
            </p>
            {searchQuery ? (
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            ) : (
              <Button onClick={() => setIsCreatingSource(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Data Source
              </Button>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DataSources;
