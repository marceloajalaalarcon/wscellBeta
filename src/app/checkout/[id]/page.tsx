'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CheckoutForm = ({ productId }: { productId: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [productData, setProductData] = useState({ price: 0, image: '', name: '' });
  const [formData, setFormData] = useState({
    cardName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  useEffect(() => {
    async function fetchProductData() {
      const res = await fetch(`/api/products/${productId}`);
      const data = await res.json();
      setProductData({ price: data.price, image: data.image, name: data.name });
    }
    fetchProductData();
  }, [productId]);

  console.log(productData.price)


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      setError('Stripe não está carregado.');
      return;
    }

    const cardNumber = elements.getElement(CardNumberElement);
    if (!cardNumber) {
      setLoading(false);
      setError('Elemento do número do cartão não encontrado.');
      return;
    }

    const res = await fetch('/api/payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId,
        promoCode,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
      }),
    });

    const { clientSecret, error: serverError } = await res.json();
    if (serverError) {
      setError(serverError);
      setLoading(false);
      return;
    }

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumber,
        billing_details: {
          name: formData.cardName,
          email: formData.email,
        },
      },
    });

    if (paymentResult.error) {
      setError(paymentResult.error.message || 'Erro no pagamento.');
    } else if (paymentResult.paymentIntent?.status === 'succeeded') {
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-white to-purple-100 py-8 px-4 sm:px-6">
      <form onSubmit={handleSubmit} className="max-w-lg w-full p-6 shadow-lg rounded-lg bg-white space-y-6">
        <div className="text-center">
                {productData.image ? (
          <img
            src={productData.image}
            alt={productData.name}
            className="w-24 h-24 mx-auto mb-4 rounded-full"
          />
        ) : null}
          <h1 className="text-2xl font-bold mb-4 text-gray-800">{productData.name}</h1>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success ? (
          <p className="text-green-500 text-center">Pagamento realizado com sucesso!</p>
        ) : (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nome no Cartão</label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                required
                className="w-full border rounded-lg px-3 py-2 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Número do Cartão</label>
              <CardNumberElement className="w-full p-2 border rounded-lg" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">Validade</label>
                <CardExpiryElement className="w-full p-2 border rounded-lg" />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">CVC</label>
                <CardCvcElement className="w-full p-2 border rounded-lg" />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Endereço</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full border rounded-lg px-3 py-2 text-gray-800"
              />
            </div>
            <div className="flex gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Cidade</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 text-gray-800"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">CEP</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 text-gray-800"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Código Promocional</label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Insira o código"
                className="w-full border rounded-lg px-3 py-2 text-gray-800"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              disabled={loading || !stripe}
            >
              {loading ? 'Processando...' : `Pagar ${productData.price}`}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

const CheckoutPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setProductId(resolvedParams.id);
    });
  }, [params]);

  if (!productId) {
    return <p>Carregando...</p>;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm productId={productId} />
    </Elements>
  );
};

export default CheckoutPage;
