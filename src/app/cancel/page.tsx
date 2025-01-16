// app/cancel/page.tsx
'use client';

import { useRouter } from 'next/navigation';

const CancelPage = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-gray-50 via-red-50 to-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <img
            src="/sad-icon.png" // Substitua por um ícone adequado
            alt="Pedido Cancelado"
            className="w-24 h-24 mx-auto"
          />
        </div>
        <h1 className="text-4xl font-bold text-red-600 mb-4">Pedido Cancelado</h1>
        <p className="text-gray-700 text-lg mb-6">
          Sentimos muito por você ter cancelado seu pedido. Estamos aqui caso mude de ideia ou queira explorar mais opções.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push('/')}
            className="bg-gray-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transition duration-300 ease-in-out shadow-lg"
          >
            Voltar para a Página Inicial
          </button>
          <button
            onClick={() => router.push('/products')}
            className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition duration-300 ease-in-out shadow-lg"
          >
            Ver Produtos Novamente
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-8">
          Não encontrou o que estava procurando? Entre em contato com nosso <a href="/support" className="text-blue-500 hover:underline">suporte</a>.
        </p>
      </div>
    </div>
  );
};

export default CancelPage;
