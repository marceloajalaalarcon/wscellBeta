'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('/api/products');
      const data: CategoryProducts = await response.json();
      setCategories(data);
    }

    fetchProducts();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-100 via-white to-purple-100 py-16 px-6 lg:px-16">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
          Bem-vindo à nossa Loja!
        </h1>
        <p className="text-center text-lg text-gray-600 mb-16">
          Explore nossas categorias e descubra produtos incríveis para você.
        </p>
        {Object.keys(categories).map((category) => (
          <div key={category} className="mb-16">
            <h2 className="text-4xl font-bold text-center text-purple-800 mb-8">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {categories[category].map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
                >
                  <a
                    onClick={() => router.push(`/product/${product.id}`)}
                    className="block cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:opacity-90 transition duration-300 ease-in-out"
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out flex justify-center items-center">
                        <span className="text-white text-lg font-semibold bg-purple-600 px-4 py-2 rounded-lg shadow-lg">
                          Ver Detalhes
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mt-2 truncate">
                        {product.description}
                      </p>
                      <p className="text-purple-700 mt-4 font-bold text-lg">
                        {product.price}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <footer className="bg-gray-800 text-gray-200 py-8 mt-16 rounded-2xl">
  <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-lg font-bold mb-4">Sobre Nós</h3>
        <p className="text-gray-400">
          Somos uma loja comprometida em oferecer os melhores produtos com qualidade e preço justo. Agradecemos por sua visita!
        </p>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-4">Contato</h3>
        <ul>
          <li>Email: contato@loja.com</li>
          <li>Telefone: (11) 1234-5678</li>
          <li>Endereço: Rua Exemplo, 123, São Paulo, SP</li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-4">Siga-nos</h3>
        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-gray-200 transition">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-200 transition">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-200 transition">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </div>
    <div className="text-center text-gray-500 mt-8">
      &copy; {new Date().getFullYear()} Loja Exemplo. Todos os direitos reservados.
    </div>
  </div>
</footer>


    </div>
  );
};

export default ProductsPage;
