'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const SuccessPageContent = () => {
  const [statusMessage, setStatusMessage] = useState('Verificando o pagamento...');
  const [statusColor, setStatusColor] = useState('gray'); // Estado inicial neutro
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Chamar o endpoint de verificação da cidade
      fetch(`/api/verify-city?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.isValidCity) {
            setStatusMessage(data.message); // Pagamento aprovado
            setStatusColor('green'); // Cor verde para aprovado
          } else {
            setStatusMessage(data.message); // Pagamento cancelado
            setStatusColor('red'); // Cor vermelha para cancelado
          }
        })
        .catch((err) => {
          console.error('Erro na verificação do pagamento:', err);
          setStatusMessage('Ocorreu um erro ao verificar o pagamento.');
          setStatusColor('red'); // Cor vermelha para erro
        });
    }
  }, [sessionId]);

  // Determinar a cor do gradiente com base no status
  const backgroundClass = {
    gray: 'bg-gradient-to-r from-gray-100 to-gray-200',
    green: 'bg-gradient-to-r from-green-50 to-green-100',
    red: 'bg-gradient-to-r from-red-50 to-red-100',
  }[statusColor];

  const textColor = {
    gray: 'text-gray-600',
    green: 'text-green-600',
    red: 'text-red-600',
  }[statusColor];

  const buttonColor = {
    gray: 'bg-gray-600 hover:bg-gray-700',
    green: 'bg-green-600 hover:bg-green-700',
    red: 'bg-red-600 hover:bg-red-700',
  }[statusColor];

  return (
    <div className={`${backgroundClass} min-h-screen flex items-center justify-center`}>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className={`text-4xl font-bold ${textColor} mb-4`}>Status do Pagamento</h1>
        <p className="text-gray-700 text-lg mb-6">{statusMessage}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push('/')}
            className={`${buttonColor} text-white px-6 py-3 rounded-full font-semibold transition duration-300 ease-in-out shadow-lg`}
          >
            Voltar para a Página Inicial
          </button>
        </div>
      </div>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SuccessPageContent />
    </Suspense>
  );
};

export default SuccessPage;
