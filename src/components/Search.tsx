
import React from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchProps {
  className?: string;
}

const Search: React.FC<SearchProps> = ({ className }) => {
  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <input
          type="search"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-hvcg-blue focus:border-transparent"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      </div>
    </div>
  );
};

export default Search;
