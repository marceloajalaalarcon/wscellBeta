'use client';

import { useEffect, useState, useRef } from 'react';
import { Footer } from '@/components/home/Footer';
import ProductCard from '@/components/home/ProductCard';
import SearchBar from '@/components/home/SearchBar';
import LoadingSpinner from '@/components/home/LoadingSpinner';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
}

interface CategoryProducts {
  [category: string]: Product[];
}

const ProductsPage = () => {
  const [categories, setCategories] = useState<CategoryProducts>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isBlurred, setIsBlurred] = useState(false); // Estado para efeito de scroll
  const [isLoading, setIsLoading] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false); // Estado para exibir mais categorias
  const productsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products');
      const data: CategoryProducts = await response.json();
      setCategories(data);
      setFilteredProducts(Object.values(data).flat());
      setIsLoading(false);
    }

    fetchProducts();

    const handleScroll = () => {
      if (productsSectionRef.current) {
        const { top } = productsSectionRef.current.getBoundingClientRect();
        setIsBlurred(top <= 80); // Atualiza o estado baseado na posição de rolagem
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    const productsToFilter = category
      ? categories[category] || []
      : Object.values(categories).flat();
    setFilteredProducts(
      productsToFilter.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
    const productsToFilter = selectedCategory
      ? categories[selectedCategory] || []
      : Object.values(categories).flat();
    setFilteredProducts(
      productsToFilter.filter((product) =>
        product.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const filteredCategories = Object.keys(categories).filter(
    (category) => category !== 'Uncategorized' // Oculta categorias específicas
  );

  const displayedCategories = showAllCategories
    ? filteredCategories
    : filteredCategories.slice(0, 5); // Mostra apenas 5 categorias inicialmente

  return (
    <div className="bg-gradient-to-r from-blue-100 via-white to-purple-100 py-16 px-6 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
          Bem-vindo à nossa Loja!
        </h1>
        <p className="text-center text-lg text-gray-600 mb-6">
          Explore nossas categorias e descubra produtos incríveis para você.
        </p>

        {/* Barra fixa com busca */}
        <div
          className={`${
            isBlurred
              ? 'fixed top-0 left-0 right-0 z-20 bg-white bg-opacity-80 backdrop-blur-md shadow-lg transition-all duration-300'
              : 'relative bg-transparent'
          }`}
        >
          <div className="max-w-screen-lg mx-auto px-4 py-4 flex items-center gap-4">
            <img src="/foda.jpg" alt="Logo" className="w-12 h-12 object-contain" />
            <SearchBar value={searchTerm} onChange={handleSearch} />
          </div>
        </div>

        {/* Filtro de categorias */}
        <div className="flex flex-wrap justify-center gap-4 mt-5 mb-11">
          <button
            onClick={() => handleCategorySelect(null)}
            className={`px-6 py-2 text-lg font-semibold rounded-full transition ${
              !selectedCategory
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-800'
            } hover:bg-purple-500 hover:text-white`}
          >
            Todas as Categorias
          </button>
          {displayedCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`px-6 py-2 text-lg font-semibold rounded-full transition ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              } hover:bg-purple-500 hover:text-white`}
            >
              {category}
            </button>
          ))}
          {filteredCategories.length > 5 && (
            <button
              onClick={() => setShowAllCategories((prev) => !prev)}
              className="px-6 py-2 text-lg font-semibold rounded-full bg-gray-300 text-gray-800 hover:bg-purple-500 hover:text-white transition"
            >
              {showAllCategories ? 'Mostrar Menos' : 'Mais Categorias'}
            </button>
          )}
        </div>

        <div ref={productsSectionRef}>
          {isLoading ? (
            <LoadingSpinner />
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 cursor-pointer">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">Nenhum produto encontrado.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
