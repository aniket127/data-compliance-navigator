
import React, { useState } from 'react';
import MainLayout from '@/components/layout/main-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, ChevronRight, Info } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const Results = () => {
  const [selectedReport, setSelectedReport] = useState(mockReports[0]);

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Profiling Results</h1>
          <p className="text-muted-foreground">
            View and analyze data profiling results and compliance reports
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reports List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Report History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReports.map((report) => (
                  <div 
                    key={report.id}
                    className={`p-4 rounded-lg border flex justify-between items-center cursor-pointer transition-colors ${
                      selectedReport.id === report.id ? 'bg-muted border-primary' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">{report.name}</div>
                      <div className="text-xs text-muted-foreground">{report.date}</div>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Report Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{selectedReport.name}</CardTitle>
                <Button size="sm" variant="outline">
                  <Download size={16} className="mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="data-quality">Data Quality</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="summary" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{selectedReport.summary.tables}</div>
                          <p className="text-sm text-muted-foreground">Tables Analyzed</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{selectedReport.summary.columns}</div>
                          <p className="text-sm text-muted-foreground">Columns Profiled</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{selectedReport.summary.rows}</div>
                          <p className="text-sm text-muted-foreground">Total Rows</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Data Quality Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Completeness</span>
                            <div className="w-32 bg-secondary rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${selectedReport.quality.completeness}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{selectedReport.quality.completeness}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Consistency</span>
                            <div className="w-32 bg-secondary rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${selectedReport.quality.consistency}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{selectedReport.quality.consistency}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Accuracy</span>
                            <div className="w-32 bg-secondary rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${selectedReport.quality.accuracy}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{selectedReport.quality.accuracy}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Compliance Overview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Compliance Score</span>
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <Info size={14} className="text-muted-foreground cursor-help" />
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                  <div className="space-y-2">
                                    <h4 className="text-sm font-semibold">Compliance Score</h4>
                                    <p className="text-sm">
                                      This score represents the overall compliance level against {selectedReport.compliance.regulation}.
                                      A score above 90 is considered good, while below 70 requires attention.
                                    </p>
                                  </div>
                                </HoverCardContent>
                              </HoverCard>
                            </div>
                            <div className="text-2xl font-bold">{selectedReport.compliance.score}/100</div>
                          </div>
                          
                          <div className="mt-2 text-center">
                            <p className="text-sm text-muted-foreground">Compliance Rating</p>
                            <Badge 
                              variant={selectedReport.compliance.score >= 90 ? "default" : 
                                     selectedReport.compliance.score >= 70 ? "outline" : "destructive"}
                              className="mt-1"
                            >
                              {selectedReport.compliance.score >= 90 ? "Good" : 
                               selectedReport.compliance.score >= 70 ? "Fair" : "Poor"}
                            </Badge>
                          </div>
                          
                          <div className="pt-2">
                            <div className="flex justify-between text-sm">
                              <span>Regulation</span>
                              <span className="font-medium">{selectedReport.compliance.regulation}</span>
                            </div>
                            <div className="flex justify-between text-sm mt-2">
                              <span>Issues Found</span>
                              <span className="font-medium">{selectedReport.compliance.issuesFound}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="data-quality">
                  <div className="space-y-4">
                    <p>Detailed data quality metrics and analysis results for each column.</p>
                    
                    {selectedReport.qualityDetails.map((table) => (
                      <Card key={table.name}>
                        <CardHeader>
                          <CardTitle className="text-lg">{table.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-2 px-2 font-medium">Column</th>
                                  <th className="text-left py-2 px-2 font-medium">Type</th>
                                  <th className="text-left py-2 px-2 font-medium">Nulls %</th>
                                  <th className="text-left py-2 px-2 font-medium">Unique %</th>
                                  <th className="text-left py-2 px-2 font-medium">Issues</th>
                                </tr>
                              </thead>
                              <tbody>
                                {table.columns.map((column, index) => (
                                  <tr key={column.name} className={index % 2 === 0 ? 'bg-muted/50' : ''}>
                                    <td className="py-2 px-2">{column.name}</td>
                                    <td className="py-2 px-2">{column.type}</td>
                                    <td className="py-2 px-2">{column.nullPercent}%</td>
                                    <td className="py-2 px-2">{column.uniquePercent}%</td>
                                    <td className="py-2 px-2">
                                      {column.issues.length > 0 ? (
                                        <div className="flex items-center gap-1">
                                          <span className="text-destructive font-medium">{column.issues.length}</span>
                                          <HoverCard>
                                            <HoverCardTrigger asChild>
                                              <Info size={14} className="text-muted-foreground cursor-help" />
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-80">
                                              <div className="space-y-2">
                                                <h4 className="text-sm font-semibold">Issues Found</h4>
                                                <ul className="text-sm space-y-1">
                                                  {column.issues.map((issue, i) => (
                                                    <li key={i}>• {issue}</li>
                                                  ))}
                                                </ul>
                                              </div>
                                            </HoverCardContent>
                                          </HoverCard>
                                        </div>
                                      ) : (
                                        <span className="text-muted-foreground">None</span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="compliance">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold">{selectedReport.compliance.regulation}</div>
                            <p className="text-sm text-muted-foreground">Regulation</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold">{selectedReport.compliance.score}/100</div>
                            <p className="text-sm text-muted-foreground">Overall Score</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold">{selectedReport.compliance.issuesFound}</div>
                            <p className="text-sm text-muted-foreground">Issues Found</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Compliance Issues</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedReport.complianceIssues.length > 0 ? (
                          <div className="space-y-4">
                            {selectedReport.complianceIssues.map((issue, index) => (
                              <div key={index} className="p-4 border rounded-lg">
                                <div className="flex items-start gap-2">
                                  <FileText size={18} className="text-muted-foreground mt-1" />
                                  <div className="flex-1">
                                    <div className="font-medium">{issue.title}</div>
                                    <div className="text-sm text-muted-foreground mt-1">{issue.description}</div>
                                    
                                    <div className="mt-3 text-sm">
                                      <div><span className="font-medium">Location:</span> {issue.location}</div>
                                      <div><span className="font-medium">Severity:</span> {issue.severity}</div>
                                      <div><span className="font-medium">Recommendation:</span> {issue.recommendation}</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">No compliance issues found</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedReport.recommendations.map((rec, index) => (
                            <div key={index} className="border-l-4 border-primary pl-4 py-2">
                              <div className="font-medium">{rec.title}</div>
                              <div className="text-sm text-muted-foreground mt-1">{rec.description}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

// Mock data for demonstration
const mockReports = [
  {
    id: '1',
    name: 'Customer Database Profiling',
    date: '2023-05-15',
    summary: {
      tables: 12,
      columns: 86,
      rows: '2.5M',
    },
    quality: {
      completeness: 94,
      consistency: 88,
      accuracy: 92,
    },
    compliance: {
      regulation: 'GDPR',
      score: 92,
      issuesFound: 3,
    },
    qualityDetails: [
      {
        name: 'Customers',
        columns: [
          {
            name: 'customer_id',
            type: 'INTEGER',
            nullPercent: 0,
            uniquePercent: 100,
            issues: [],
          },
          {
            name: 'email',
            type: 'VARCHAR',
            nullPercent: 2.5,
            uniquePercent: 99.8,
            issues: ['3 duplicate emails found'],
          },
          {
            name: 'phone_number',
            type: 'VARCHAR',
            nullPercent: 8.2,
            uniquePercent: 97.5,
            issues: ['12 invalid phone number formats'],
          },
          {
            name: 'address',
            type: 'VARCHAR',
            nullPercent: 4.1,
            uniquePercent: 68.9,
            issues: [],
          },
        ],
      },
      {
        name: 'Orders',
        columns: [
          {
            name: 'order_id',
            type: 'INTEGER',
            nullPercent: 0,
            uniquePercent: 100,
            issues: [],
          },
          {
            name: 'customer_id',
            type: 'INTEGER',
            nullPercent: 0.1,
            uniquePercent: 21.3,
            issues: ['5 missing foreign keys'],
          },
          {
            name: 'order_date',
            type: 'TIMESTAMP',
            nullPercent: 0,
            uniquePercent: 16.7,
            issues: [],
          },
          {
            name: 'total_amount',
            type: 'DECIMAL',
            nullPercent: 0,
            uniquePercent: 8.2,
            issues: [],
          },
        ],
      },
    ],
    complianceIssues: [
      {
        title: 'Unencrypted Personal Data',
        description: 'Customer phone numbers are stored in plain text without encryption.',
        location: 'Customers.phone_number',
        severity: 'High',
        recommendation: 'Implement encryption for all personal identifiable information fields.',
      },
      {
        title: 'Missing Data Retention Policy',
        description: 'Customer data is stored indefinitely without a clear retention period.',
        location: 'Customers table',
        severity: 'Medium',
        recommendation: 'Implement a data retention policy and automated purging of old customer records.',
      },
      {
        title: 'Excessive Data Collection',
        description: 'Social security numbers are collected but not required for business operations.',
        location: 'Customers.ssn',
        severity: 'High',
        recommendation: 'Remove unnecessary personal data collection to comply with data minimization principles.',
      },
    ],
    recommendations: [
      {
        title: 'Implement Data Encryption',
        description: 'Encrypt all personally identifiable information fields to enhance data protection.',
      },
      {
        title: 'Establish Data Retention Policy',
        description: 'Define clear retention periods for different data categories and implement automated cleanup.',
      },
      {
        title: 'Enhance Consent Management',
        description: 'Improve the consent management system to track user permissions for specific data usage.',
      },
      {
        title: 'Data Minimization Review',
        description: 'Conduct a comprehensive review to identify and remove unnecessary data collection.',
      },
    ],
  },
  {
    id: '2',
    name: 'Financial Records Analysis',
    date: '2023-06-22',
    summary: {
      tables: 8,
      columns: 64,
      rows: '1.8M',
    },
    quality: {
      completeness: 97,
      consistency: 91,
      accuracy: 95,
    },
    compliance: {
      regulation: 'SOX',
      score: 88,
      issuesFound: 5,
    },
    qualityDetails: [
      // Similar structure to the first report
      {
        name: 'Transactions',
        columns: [
          {
            name: 'transaction_id',
            type: 'INTEGER',
            nullPercent: 0,
            uniquePercent: 100,
            issues: [],
          },
          {
            name: 'amount',
            type: 'DECIMAL',
            nullPercent: 0,
            uniquePercent: 12.5,
            issues: [],
          },
        ],
      },
    ],
    complianceIssues: [
      // Similar structure to the first report
      {
        title: 'Inadequate Audit Trail',
        description: 'Financial transactions lack complete audit trail information.',
        location: 'Transactions table',
        severity: 'High',
        recommendation: 'Enhance logging to capture all required audit information for financial transactions.',
      },
    ],
    recommendations: [
      // Similar structure to the first report
      {
        title: 'Improve Audit Logging',
        description: 'Enhance the audit logging system to capture all required information for financial compliance.',
      },
    ],
  },
  {
    id: '3',
    name: 'Healthcare Data Compliance',
    date: '2023-07-05',
    summary: {
      tables: 15,
      columns: 112,
      rows: '3.2M',
    },
    quality: {
      completeness: 89,
      consistency: 82,
      accuracy: 91,
    },
    compliance: {
      regulation: 'HIPAA',
      score: 78,
      issuesFound: 8,
    },
    qualityDetails: [
      // Similar structure to the first report
      {
        name: 'Patients',
        columns: [
          {
            name: 'patient_id',
            type: 'INTEGER',
            nullPercent: 0,
            uniquePercent: 100,
            issues: [],
          },
          {
            name: 'medical_record_number',
            type: 'VARCHAR',
            nullPercent: 1.2,
            uniquePercent: 99.8,
            issues: ['2 duplicate records found'],
          },
        ],
      },
    ],
    complianceIssues: [
      // Similar structure to the first report
      {
        title: 'Insufficient Access Controls',
        description: 'Patient records accessible by non-authorized personnel.',
        location: 'Patients table',
        severity: 'Critical',
        recommendation: 'Implement role-based access controls for all patient data.',
      },
    ],
    recommendations: [
      // Similar structure to the first report
      {
        title: 'Enhance Access Controls',
        description: 'Implement stricter role-based access controls for patient information.',
      },
    ],
  },
];

export default Results;
