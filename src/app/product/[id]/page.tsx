'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Footer } from '@/components/home/Footer';

import WhatsAppButton from '@/components/shared/WhatsAppButton';

interface Product {
  id: string;
  name: string;
  description: string;
  category?: string;
  garantia?: string;
  image: string;
  price: string;
  related?: RelatedProduct[];
}

interface RelatedProduct {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
}

const ProductDetailPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();
  const router = useRouter();

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

  const category = product.category ?? null;
  const garantia = product.garantia ?? null;

  const messageWhatsapp = `Olá, gostaria de saber mais sobre o produto "*${product.name}*" no valor de: ${product.price}.`;

  return (
    <div className="bg-gradient-to-r from-blue-100 via-white to-purple-100 py-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8">
        {/* Imagem do produto */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-500`}
          />
        </div>

        {/* Detalhes do produto e Categoria */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          {category && (
                <p className="text-sm text-gray-500">
                Categoria: <span className="font-bold text-gray-900">{category}</span>
              </p>
              )}
          
          <p className="text-gray-700 text-lg leading-relaxed mb-6">{product.description}</p>

          {/* Preço */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-4xl font-bold text-indigo-600">{product.price}</p>
          </div>

          {/* Benefícios do produto */}
          <div className="bg-indigo-50 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-bold text-indigo-600 mb-2">Por que comprar?</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Alta qualidade garantida</li>
              <li>Entrega rápida e segura</li>
              {garantia && (
                <li>
                  <span className="font-bold text-gray-900">Garantia de {garantia}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Botões de ação */}
          <div className="flex space-x-4">
            <button
              onClick={() => router.back()}
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-400 transition duration-300 ease-in-out shadow-lg"
            >
              Voltar
            </button>
            <button
              onClick={() => handleCheckout(product.id)}
              className="bg-indigo-600 text-white px-4 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out shadow-lg"
            >
              Comprar Agora
            </button>
          </div>
        </div>
      </div>
    
      {/* Produtos relacionados */}
      <div className="mt-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Você também pode gostar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
     
        {product.related && product.related.length > 0 ? (
         
          product.related.map((relatedProduct) => (
            <a
              key={relatedProduct.id}
              href={`/product/${relatedProduct.id}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <img
                src={relatedProduct.image}
                alt={relatedProduct.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {relatedProduct.name}
                </h3>
                <p className="text-gray-600 mt-2 truncate">{relatedProduct.description}</p>
                <p className="text-purple-700 font-bold mt-2">{relatedProduct.price}</p>
              </div>
            </a>
            
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-4">
            Nenhum produto relacionado encontrado.
          </p>
        )}

        </div>
      </div>
       {/* Botão whatsapp */}
       <WhatsAppButton productName={product.name} message={messageWhatsapp} />
      <Footer/>
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
