'use client';

import { useRouter } from 'next/navigation';

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <img
            src="/success-icon.png" // Substitua por um ícone apropriado
            alt="Pagamento realizado com sucesso"
            className="w-24 h-24 mx-auto"
          />
        </div>
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Pagamento Realizado com Sucesso!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Obrigado por sua compra! Seu pedido foi processado e em breve será enviado.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push('/')}
            className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition duration-300 ease-in-out shadow-lg"
          >
            Voltar para a Página Inicial
          </button>
          <button
            onClick={() => router.push('/orders')}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300 ease-in-out shadow-lg"
          >
            Ver Meus Pedidos
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
