'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Importando useParams e useRouter

interface Product {
  id: string;
  name: string;
  description: string;
  metadata: {
    category: string;
  };
  image: string; // Adicionando a propriedade para imagem do produto
  price: string; // Corrigido para incluir o preço
}

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams(); // Pegando o id da URL
  const router = useRouter(); // Para navegação

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      const response = await fetch(`/api/products/${id}`);
      const data: Product = await response.json();
      setProduct(data);
    }

    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center py-12 text-lg">Carregando...</div>;

  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 py-12 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Imagem do produto */}
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 w-full md:w-1/2">
          {/* Nome e descrição do produto */}
          <h1 className="text-5xl font-bold text-gray-800 mb-6">{product.name}</h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">{product.description}</p>

          {/* Categoria e preço */}
          <div className="flex items-center justify-between mb-6">
            {/* <p className="text-sm text-gray-500">Categoria: {product.metadata.category}</p> */}
            <p className="text-3xl font-semibold text-purple-700">{product.price}</p>
          </div>

          {/* Botão de checkout */}
          <div className="flex justify-center md:justify-start space-x-4">
            <button
              onClick={() => router.back()}
              className="bg-gray-300 text-gray-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-400 transition duration-300 ease-in-out shadow-lg"
            >
              Voltar
            </button>
            <button
              onClick={() => handleCheckout(product.id)}
              className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out shadow-lg"
            >
              Comprar Agora
            </button>
          </div>
        </div>
      </div>

      {/* Seção de produtos relacionados */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Produtos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Exemplo de produtos relacionados */}
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <img
                src="/placeholder.jpg"
                alt="Produto relacionado"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  Nome do Produto
                </h3>
                <p className="text-gray-600 mt-2 truncate">Descrição curta do produto</p>
                <p className="text-purple-700 font-bold mt-2">R$ 99,99</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  async function handleCheckout(productId: string) {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId,
        quantity: 1,
        paymentMethod: 'card',
      }),
    });
    const session = await response.json();
    if (session.sessionId) {
      window.location.href = session.sessionId;
    }
  }
};

export default ProductDetailPage;
