'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Head from 'next/head';
import ProductImage from '@/components/Product/ProductImage';
import ProductDetails from '@/components/Product/ProductDetails';
import RelatedProducts from '@/components/Product/RelatedProducts';
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { Footer } from '@/components/home/Footer';
import { Loader } from '@/components/Product/Loader';
import { checkoutHandler } from '@/lib/checkoutHandler';

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
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      setIsLoading(true);
      const response = await fetch(`/api/products/${id}`);
      const data: Product = await response.json();
      setProduct(data);
      setIsLoading(false);
    }

    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 via-white to-purple-100">
        <Loader />
        <p className="mt-4 text-lg text-gray-600 animate-pulse">
          Carregando os detalhes do produto...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12 text-lg text-red-500">
        Não foi possível carregar os detalhes do produto. Tente novamente mais tarde.
      </div>
    );
  }

  const messageWhatsapp = `Olá, gostaria de saber mais sobre o produto "*${product.name}*" no valor de: "*${product.price}*" vi no site.`;

 {/* handleCheckout */}
  const handleCheckout = async () => {
    await checkoutHandler({
      productId: product.id,
      checkoutid: 1,
    });
  };

  return (
    <>
      <Head>
        <title>{product.name} | Detalhes do Produto</title>
        <meta name="description" content={product.description || 'Confira os detalhes do produto.'} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description || 'Saiba mais sobre este produto incrível.'} />
        <meta property="og:image" content={product.image} />
        <meta property="og:type" content="product" />
        <meta property="product:price:amount" content={product.price} />
        <meta property="product:price:currency" content="BRL" />
      </Head>
      <div className="bg-gradient-to-r from-blue-100 via-white to-purple-100 py-12 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8">
          <ProductImage image={product.image} name={product.name} />
          <ProductDetails
            name={product.name}
            description={product.description}
            price={product.price}
            category={product.category}
            garantia={product.garantia}
            onBack={() => router.back()}
            onCheckout={handleCheckout}
          />
        </div>
        <RelatedProducts relatedProducts={product.related} />
        <WhatsAppButton productName={product.name} message={messageWhatsapp} />
        <Footer />
      </div>
    </>
  );
};

export default ProductDetailPage;



  // const handleCheckout = async () => {
  //   const response = await fetch('/api/checkout', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       productId: product.id,
  //       quantity: 1,
  //       paymentMethod: 'card',
  //     }),
  //   });
  //   const session = await response.json();
  //   if (session.sessionId) {
  //     window.location.href = session.sessionId;
  //   }
  // };


  // // const handleCheckout = () => {
  // //   router.push(`/checkout/${product.id}`);
  // // };