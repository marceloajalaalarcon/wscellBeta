import React from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  return (
    <div
      className="group relative bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      <div className="relative">
        <div className="w-full h-48 sm:h-64 lg:h-80 flex justify-center items-center overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full sm:object-contain"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out flex justify-center items-center">
          <span className="text-white text-lg font-semibold bg-purple-600 px-4 py-2 rounded-lg shadow-lg">
            Ver Detalhes
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 truncate">{product.name}</h3>
        <p className="text-gray-600 mt-2 truncate">{product.description}</p>
        <p className="text-purple-700 mt-4 font-bold text-lg">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
