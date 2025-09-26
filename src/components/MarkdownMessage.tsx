
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MarkdownMessageProps {
  content: string;
  isUser: boolean;
}

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content, isUser }) => {
  const { toast } = useToast();

  // Enhanced table detection to handle various formats
  const detectAndFormatTables = (text: string) => {
    // Detect pipe-separated tables (markdown style)
    const markdownTableRegex = /^\|[^\n\r]*\|[\s]*[\n\r]+\|[-\s:|]+\|[\s]*[\n\r]+((?:\|[^\n\r]*\|[\s]*[\n\r]*)+)/gm;
    
    // Detect space/tab separated data that looks like a table
    const dataTableRegex = /^([A-Za-z\s#]+[|]\s*[A-Za-z\s#]+[|][\s\S]*?)(?=\n\n|\n$|$)/gm;
    
    // Check if content has pipe-separated structured data
    if (text.includes('|') && text.split('\n').filter(line => line.includes('|')).length >= 3) {
      return formatAsTable(text);
    }
    
    return text;
  };

  const formatAsTable = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim() && line.includes('|'));
    
    if (lines.length < 2) return text;
    
    // Parse the table data
    const tableData = lines.map(line => 
      line.split('|')
        .map(cell => cell.trim())
        .filter(cell => cell.length > 0)
    );
    
    if (tableData.length === 0) return text;
    
    const headers = tableData[0];
    const rows = tableData.slice(1);
    
    // Filter out any separator rows (lines with mostly dashes)
    const dataRows = rows.filter(row => 
      !row.every(cell => /^[-\s]+$/.test(cell))
    );
    
    if (dataRows.length === 0) return text;
    
    return { type: 'table', headers, rows: dataRows, originalText: text };
  };

  const copyTableData = (headers: string[], rows: string[][]) => {
    // Format as tab-separated values for easy pasting into Excel/Sheets
    const tsvData = [
      headers.join('\t'),
      ...rows.map(row => row.join('\t'))
    ].join('\n');
    
    navigator.clipboard.writeText(tsvData).then(() => {
      toast({
        title: "Table copied!",
        description: "Data copied as tab-separated values. You can paste it directly into Excel or Google Sheets.",
      });
    }).catch(() => {
      toast({
        title: "Copy failed",
        description: "Please try again.",
        variant: "destructive"
      });
    });
  };

  const processedContent = detectAndFormatTables(content);
  
  // If we detected a table, render it specially
  if (typeof processedContent === 'object' && processedContent.type === 'table') {
    const { headers, rows, originalText } = processedContent;
    
    return (
      <div className="space-y-4">
        <div className="bg-background rounded-lg border overflow-hidden">
          <div className="flex items-center justify-between p-2 bg-muted border-b">
            <span className="text-sm font-medium">Data Table</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyTableData(headers, rows)}
              className="h-7 px-2"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy for Excel/Sheets
            </Button>
          </div>
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="min-w-max">
              <Table className="table-auto">
                <TableHeader>
                  <TableRow>
                    {headers.map((header, index) => (
                      <TableHead key={index} className="text-table font-semibold uppercase tracking-wide px-4 py-2 bg-muted/70 text-foreground/80 first:rounded-tl-lg last:rounded-tr-lg">
                        {header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell key={cellIndex} className="text-table leading-6 px-4 py-3 align-top border-r last:border-r-0 whitespace-normal">
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        
        {/* Show any remaining content that wasn't part of the table */}
        {originalText.replace(/^\|[^\n\r]*\|[\s]*[\n\r]+\|[-\s:|]+\|[\s]*[\n\r]+((?:\|[^\n\r]*\|[\s]*[\n\r]*)+)/gm, '').trim() && (
          <div className={cn(
            "prose prose-base md:prose-lg max-w-none",
            isUser ? "prose-invert" : "prose-gray",
            "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
          )}>
            <ReactMarkdown>
              {originalText.replace(/^\|[^\n\r]*\|[\s]*[\n\r]+\|[-\s:|]+\|[\s]*[\n\r]+((?:\|[^\n\r]*\|[\s]*[\n\r]*)+)/gm, '').trim()}
            </ReactMarkdown>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={cn(
      "prose prose-base md:prose-lg max-w-none",
      isUser ? "prose-invert" : "prose-gray",
      // Custom prose styling for chat messages
      "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
      "[&>p]:my-1",
      "[&>ul]:my-2 [&>ol]:my-2",
      "[&>ul>li]:my-0 [&>ol>li]:my-0",
      "[&>h1]:text-base [&>h1]:font-semibold [&>h1]:my-2",
      "[&>h2]:text-sm [&>h2]:font-semibold [&>h2]:my-1",
      "[&>h3]:text-sm [&>h3]:font-medium [&>h3]:my-1",
      "[&>blockquote]:border-l-2 [&>blockquote]:pl-3 [&>blockquote]:my-2",
      "[&>code]:text-xs [&>code]:px-1 [&>code]:py-0.5 [&>code]:rounded",
      isUser 
        ? "[&>code]:bg-blue-600 [&>code]:text-blue-100" 
        : "[&>code]:bg-gray-200 [&>code]:text-gray-800"
    )}>
      <ReactMarkdown
        components={{
          // Custom components for better styling
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed flex">
              <span className="flex-1">{children}</span>
            </li>
          ),
          code: ({ children }) => (
            <code className="font-mono">{children}</code>
          ),
          blockquote: ({ children }) => (
            <blockquote className={cn(
              "border-l-4 pl-4 italic",
              isUser ? "border-blue-300" : "border-gray-300"
            )}>
              {children}
            </blockquote>
          ),
          p: ({ children }) => (
            <p className="my-1">{children}</p>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownMessage;
