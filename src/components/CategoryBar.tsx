import React from 'react';
import { Search, X } from 'lucide-react';
import { MENU_CATEGORIES } from '../data/breadtalkMenu';
import { MenuCategoryId } from '../types/menu';

interface CategoryBarProps {
  activeCategory: MenuCategoryId;
  onSelectCategory: (id: MenuCategoryId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="sticky top-16 z-30 bg-white border-b border-neutral-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-2.5 sm:py-0 sm:h-14">
        {/* Search in menu input */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search
            className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search in menu"
            aria-label="Search in BreadTalk menu"
            className="w-full h-9 pl-9 pr-8 rounded-full bg-neutral-100 text-sm text-neutral-900 placeholder:text-neutral-500 border border-transparent focus:border-neutral-300 focus:bg-white focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear menu search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Horizontal scrollable category anchor tabs */}
        <nav
          aria-label="Menu categories"
          className="flex items-center gap-6 overflow-x-auto no-scrollbar sm:h-full"
        >
          {MENU_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className={`relative sm:h-full py-1.5 sm:py-0 inline-flex items-center text-sm whitespace-nowrap shrink-0 cursor-pointer transition-colors border-b-2 ${
                  isActive
                    ? 'border-[#D70F64] text-[#D70F64] font-semibold'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900 font-medium'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
