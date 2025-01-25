interface ProductDetailsProps {
    name: string;
    description: string;
    price: string;
    category?: string | null;
    garantia?: string | null;
    onBack: () => void;
    onCheckout: () => void;
  }
  
  const ProductDetails = ({
    name,
    description,
    price,
    category,
    garantia,
    onBack,
    onCheckout,
  }: ProductDetailsProps) => (
    <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{name}</h1>
      {category && (
        <p className="text-sm text-gray-500">
          Categoria: <span className="font-bold text-gray-900">{category}</span>
        </p>
      )}
      <p className="text-gray-700 text-lg leading-relaxed mb-6">{description}</p>
      <div className="flex items-center justify-between mb-6">
        <p className="text-4xl font-bold text-indigo-600">{price}</p>
      </div>
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
      <div className="flex space-x-4">
        <button
          onClick={onBack}
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-400 transition duration-300 ease-in-out shadow-lg"
        >
          Voltar
        </button>
        <button
          onClick={onCheckout}
          className="bg-indigo-600 text-white px-4 py-3 rounded-full font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out shadow-lg"
        >
          Comprar Agora
        </button>
      </div>
    </div>
  );
  
  export default ProductDetails;
  