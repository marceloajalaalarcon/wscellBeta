'use client';

import { useEffect, useState, useRef } from 'react';
import { Footer } from '@/components/home/Footer';
import ProductCard from '@/components/home/ProductCard';
import SearchBar from '@/components/home/SearchBar';
import LoadingSpinner from '@/components/home/LoadingSpinner';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

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
  const [isBlurred, setIsBlurred] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const productsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        const data: CategoryProducts = await response.json();
        console.log('Total de produtos recebidos:', Object.values(data).flat().length);
        setCategories(data);
        setFilteredProducts(Object.values(data).flat());
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();

    const handleScroll = () => {
      if (productsSectionRef.current) {
        const { top } = productsSectionRef.current.getBoundingClientRect();
        setIsBlurred(top <= 80);
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
    (category) => category !== 'Uncategorized'
  );

  const displayedCategories = showAllCategories
    ? filteredCategories
    : filteredCategories.slice(0, 4);

  return (
    <div className="bg-gradient-to-r from-blue-100 via-white to-purple-100 py-8 px-4 sm:px-6">
 

      {/* inicio page */}
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-800 mb-8">
          Bem-vindo à nossa Loja!
        </h1>
        <p className="text-center text-base sm:text-lg text-gray-600 mb-4">
          Explore nossas categorias e descubra produtos incríveis.
        </p>

        {/* Barra fixa com busca */}
        <div
          className={`${
            isBlurred
              ? 'fixed top-0 left-0 right-0 z-20 bg-white bg-opacity-90 backdrop-blur-md shadow-md transition-all duration-300'
              : 'relative bg-transparent'
          }`}
        >
          <div className="max-w-screen-lg mx-auto px-4 py-3 flex items-center gap-4">
            <img
              src="/foda.jpg"
              alt="Logo"
              className="w-10 h-10 object-contain rounded-2xl shadow"
            />
            <SearchBar value={searchTerm} onChange={handleSearch} />
          </div>
        </div>

        {/* Filtro de categorias */}
        <div className="flex flex-wrap justify-center gap-3 mt-5 mb-8 ">
          <button
            onClick={() => handleCategorySelect(null)}
            className={`px-5 py-2 text-sm sm:text-base font-medium rounded-xl transition  ${
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
              className={`px-5 py-2 text-sm sm:text-base font-medium rounded-xl transition ${
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
              className="px-5 py-2 text-sm sm:text-base font-medium rounded-full bg-gray-300 text-gray-800 hover:bg-purple-500 hover:text-white transition cursor-pointer"
            >
              {showAllCategories ? 'Mostrar Menos' : 'Mais Categorias'}
            </button>
          )}
        </div>

        {/* Produtos */}
        <div ref={productsSectionRef}>
        {/* Loading */}
        {isLoading ? (
          // <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-purple-100 z-50">
            
            <div className="fixed inset-0 min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 via-white to-purple-100 z-50">
                 <LoadingSpinner />
                 <p className="mt-4 text-lg text-gray-600 animate-pulse">
                   Carregando produtos
                 </p>
               </div>
        ) : (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 text-base sm:text-lg">
                Nenhum produto encontrado.
              </p>
            )}
          </>
        )}

        </div>
      </div>
        {/* Botão whatsapp */}
        <WhatsAppButton message="Olá, estou interessado nos produtos disponíveis no site!" />
      <Footer />
    </div>
  );
};

export default ProductsPage;
