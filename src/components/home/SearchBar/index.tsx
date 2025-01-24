import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Pesquisar produtos..."
      className="flex-grow p-2 border border-gray-300 rounded-2xl shadow-sm text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
};

export default SearchBar;
