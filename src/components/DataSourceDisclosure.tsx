import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Database, Clock, Shield } from 'lucide-react';

interface DataSource {
  name: string;
  description: string;
  url?: string;
  updateFrequency: string;
  reliability: 'high' | 'medium' | 'low';
  lastUpdate?: string;
}

interface DataSourceDisclosureProps {
  sources: DataSource[];
  className?: string;
}

const DataSourceDisclosure: React.FC<DataSourceDisclosureProps> = ({ sources, className }) => {
  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getReliabilityIcon = (reliability: string) => {
    switch (reliability) {
      case 'high': return '🟢';
      case 'medium': return '🟡';
      case 'low': return '🟠';
      default: return '⚪';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Database className="h-5 w-5" />
          Data Sources & Methodology
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Our dashboard aggregates data from multiple trusted sources to provide comprehensive market insights. 
          All data is processed and updated according to source availability.
        </p>
        
        <div className="grid gap-4">
          {sources.map((source, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium flex items-center gap-2">
                    {source.name}
                    {source.url && (
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                        aria-label={`Visit ${source.name} website`}
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </h4>
                  <p className="text-sm text-muted-foreground">{source.description}</p>
                </div>
                <Badge className={getReliabilityColor(source.reliability)}>
                  {getReliabilityIcon(source.reliability)} {source.reliability.toUpperCase()}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Updates: {source.updateFrequency}
                </div>
                {source.lastUpdate && (
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Last updated: {new Date(source.lastUpdate).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-3 bg-muted/50 rounded-lg">
          <h5 className="font-medium text-sm mb-2">Data Processing & Privacy</h5>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• All data is aggregated and anonymized according to privacy standards</li>
            <li>• Market insights are generated using statistical analysis and trends</li>
            <li>• Data accuracy depends on source reliability and update frequency</li>
            <li>• Sample data may be shown when live data is unavailable</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSourceDisclosure;