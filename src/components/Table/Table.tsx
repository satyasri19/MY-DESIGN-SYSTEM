import React, { useState, useMemo } from 'react';

export interface Column<T> {
  key: keyof T;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

function Table<T extends Record<string, any>>({ columns, data, className }: TableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);

  const sortedFilteredData = useMemo(() => {
    let filteredData = data;

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filteredData = filteredData.filter(row =>
          String(row[key as keyof T]).toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    // Apply sorting
    if (sortKey) {
      filteredData = [...filteredData].sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        if (aValue === bValue) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    return filteredData;
  }, [data, filters, sortKey, sortOrder]);

  const toggleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const onFilterChange = (key: keyof T, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`overflow-x-auto ${className || ''}`}>
      <table className="min-w-full border border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {columns.map(col => (
              <th
                key={String(col.key)}
                scope="col"
                className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                style={{ width: col.width }}
                onClick={() => col.sortable && toggleSort(col.key)}
                aria-sort={
                  sortKey === col.key ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'
                }
                tabIndex={col.sortable ? 0 : undefined}
                onKeyDown={e => {
                  if (col.sortable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    toggleSort(col.key);
                  }
                }}
              >
                <div className="flex items-center space-x-1">
                  <span>{col.header}</span>
                  {col.sortable && (
                    <SortIndicator active={sortKey === col.key} direction={sortOrder} />
                  )}
                </div>
                {col.filterable && (
                  <input
                    type="text"
                    value={filters[col.key] || ''}
                    onChange={e => onFilterChange(col.key, e.target.value)}
                    placeholder={`Filter ${col.header}`}
                    className="mt-1 block w-full rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-2 py-1 text-sm text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    aria-label={`Filter ${col.header}`}
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedFilteredData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">
                No data found.
              </td>
            </tr>
          ) : (
            sortedFilteredData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}
              >
                {columns.map(col => (
                  <td
                    key={String(col.key)}
                    className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap"
                  >
                    {String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

interface SortIndicatorProps {
  active: boolean;
  direction: 'asc' | 'desc';
}

const SortIndicator: React.FC<SortIndicatorProps> = ({ active, direction }) => {
  return (
    <svg
      className={`w-3 h-3 text-gray-400 ${active ? 'text-blue-500' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {direction === 'asc' ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      )}
    </svg>
  );
};

export default Table;
