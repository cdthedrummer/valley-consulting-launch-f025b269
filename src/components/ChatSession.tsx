
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Trash2 } from "lucide-react";

interface ChatSessionProps {
  id: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
  createdAt: string;
}

const ChatSession: React.FC<ChatSessionProps> = ({
  id,
  title,
  isActive,
  onClick,
  onDelete,
  createdAt,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
        isActive ? 'bg-purple-50 border-purple-200' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <MessageSquare className="h-4 w-4 text-gray-400 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-medium truncate ${
            isActive ? 'text-purple-700' : 'text-gray-900'
          }`}>
            {title}
          </p>
          <p className="text-xs text-gray-500">{formatDate(createdAt)}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
};

export default ChatSession;
