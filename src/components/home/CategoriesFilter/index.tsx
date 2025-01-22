import React, { useState } from 'react';

interface CategoriesFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll ? categories : categories.slice(0, 5);

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-5 mb-12">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-6 py-2 text-lg font-semibold rounded-full transition ${
          !selectedCategory ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
        } hover:bg-purple-500 hover:text-white`}
      >
        Todas as Categorias
      </button>
      {visibleCategories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-2 text-lg font-semibold rounded-full transition ${
            selectedCategory === category
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-800'
          } hover:bg-purple-500 hover:text-white`}
        >
          {category}
        </button>
      ))}
      {categories.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-6 py-2 text-lg font-semibold rounded-full bg-gray-300 text-gray-800 hover:bg-gray-400 transition"
        >
          {showAll ? 'Menos' : 'Mais'}
        </button>
      )}
    </div>
  );
};

export default CategoriesFilter;
