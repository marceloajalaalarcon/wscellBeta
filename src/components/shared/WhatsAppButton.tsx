import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
  productName?: string; // Nome do produto (opcional)
  message: string; // Mensagem que será enviada no WhatsApp
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  productName,
  message,
}) => {
  const [showNotification, setShowNotification] = useState(false); // Inicialmente oculto
  const phone = "5567992909877"; // Substitua pelo número de telefone com código do país e DDD
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  useEffect(() => {
    // Exibe a notificação ao carregar
    setShowNotification(true);

    // Configura o tempo para a notificação desaparecer (5 segundos)
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    // Limpa o temporizador quando o componente é desmontado
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex items-center gap-2">
      {/* Notificação com animação */}
      <div
        className={`${
          showNotification
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        } transition-all duration-500 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg shadow-md`}
      >
        {productName
          ? `📢 Dúvidas sobre o produto "${productName}"? Entre em contato!`
          : `📢 Dúvidas? Entre em contato!`}
      </div>

      {/* Botão do WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center justify-center"
      >
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
};

export default WhatsAppButton;
