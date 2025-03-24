
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
