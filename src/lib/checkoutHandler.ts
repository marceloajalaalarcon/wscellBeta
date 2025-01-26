type CheckoutFunction = (productId: string) => Promise<void>;

const checkouts: Record<number, CheckoutFunction> = {
  1: async (productId) => {
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
    } else {
      console.error('Erro ao iniciar o checkout via API.');
    }
  },
  2: async (productId) => {
    window.location.href = `/checkout/${productId}`;
  },
  3: async (productId) => {
    console.log(`Checkout 3 para o produto ${productId}`);
    alert('Este é o checkout 3.');
  },
  // Adicione novos checkouts facilmente aqui
};

export const checkoutHandler = async ({
  productId,
  checkoutid,
}: {
  productId: string;
  checkoutid: number;
}) => {
  const checkout = checkouts[checkoutid];
  if (checkout) {
    await checkout(productId);
  } else {
    console.error('Checkout inválido.');
  }
};
