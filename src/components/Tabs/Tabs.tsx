import React, { useState, ReactNode, KeyboardEvent } from 'react';

export interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  selectedId,
  onSelect,
  orientation = 'horizontal',
  size = 'md',
  className = '',
}) => {
  const [currentSelectedId, setCurrentSelectedId] = useState<string | undefined>(selectedId || (tabs.length > 0 ? tabs[0].id : undefined));

  const handleSelect = (id: string, disabled?: boolean) => {
    if (disabled) return;
    setCurrentSelectedId(id);
    onSelect && onSelect(id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex(tab => tab.id === currentSelectedId);
    if (currentIndex === -1) return;

    let newIndex = currentIndex;

    if (orientation === 'horizontal') {
      if (e.key === 'ArrowRight') {
        newIndex = (currentIndex + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft') {
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }
    } else {
      if (e.key === 'ArrowDown') {
        newIndex = (currentIndex + 1) % tabs.length;
      } else if (e.key === 'ArrowUp') {
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }
    }

    if (newIndex !== currentIndex) {
      e.preventDefault();
      const newTab = tabs[newIndex];
      if (!newTab.disabled) {
        handleSelect(newTab.id);
      }
    }
  };

  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  return (
    <div className={`flex ${orientation === 'vertical' ? 'flex-row' : 'flex-col'} ${className}`}>
      <div
        role="tablist"
        aria-orientation={orientation}
        className={`flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} border-b border-gray-300 dark:border-gray-700`}
        onKeyDown={onKeyDown}
      >
        {tabs.map(tab => {
          const isSelected = tab.id === currentSelectedId;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => handleSelect(tab.id, tab.disabled)}
              className={`flex items-center space-x-2 border-b-2 focus:outline-none ${
                isSelected
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
              } ${sizeClasses[size]} ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-2">
        {tabs.map(tab => {
          const isSelected = tab.id === currentSelectedId;
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`panel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              hidden={!isSelected}
              className="focus:outline-none"
              tabIndex={0}
            >
              {isSelected && tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
