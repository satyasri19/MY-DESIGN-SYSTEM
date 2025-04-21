import React, { useState } from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: NavItem[];
}

export interface SidebarNavigationProps {
  items: NavItem[];
  collapsed?: boolean;
  onSelect?: (id: string) => void;
  selectedId?: string;
  className?: string;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  items,
  collapsed = false,
  onSelect,
  selectedId,
  className = '',
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelect = (id: string, disabled?: boolean) => {
    if (disabled) return;
    onSelect && onSelect(id);
  };

  const renderItems = (navItems: NavItem[], level = 0) => {
    return (
      <ul role={level === 0 ? 'tree' : 'group'} className={`pl-${level * 4}`}>
        {navItems.map(item => {
          const isSelected = selectedId === item.id;
          const isExpanded = expandedItems.has(item.id);
          const hasChildren = item.children && item.children.length > 0;

          return (
            <li
              key={item.id}
              role="treeitem"
              aria-expanded={hasChildren ? isExpanded : undefined}
              aria-selected={isSelected}
              tabIndex={0}
              className={`flex items-center cursor-pointer select-none rounded px-3 py-2 my-1 text-sm ${
                isSelected ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
              } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleSelect(item.id, item.disabled)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (hasChildren) {
                    toggleExpand(item.id);
                  } else {
                    handleSelect(item.id, item.disabled);
                  }
                }
              }}
            >
              {hasChildren && (
                <button
                  aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  onClick={e => {
                    e.stopPropagation();
                    toggleExpand(item.id);
                  }}
                  className="mr-2 focus:outline-none"
                >
                  {isExpanded ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </button>
              )}
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {!isCollapsed && <span>{item.label}</span>}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <nav className={`bg-gray-100 dark:bg-gray-900 p-2 ${className}`} aria-label="Sidebar Navigation">
      <button
        onClick={toggleCollapse}
        aria-pressed={isCollapsed}
        className="mb-2 w-full rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 focus:outline-none"
      >
        {isCollapsed ? 'Expand' : 'Collapse'}
      </button>
      {renderItems(items)}
    </nav>
  );
};

export default SidebarNavigation;
