
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface MarkdownMessageProps {
  content: string;
  isUser: boolean;
}

const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content, isUser }) => {
  return (
    <ReactMarkdown
      className={cn(
        "prose prose-sm max-w-none",
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
      )}
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
          <li className="leading-relaxed">{children}</li>
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
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownMessage;
