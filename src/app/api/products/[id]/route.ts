import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-12-18.acacia',
});

// Função para formatar o preço como R$: valor,00
function formatPrice(amount: number | null): string {
  if (amount === null) return 'R$: 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount / 100); // Dividimos por 100 porque o valor vem em centavos
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // Awaitable `params`
) {
  const { id } = await context.params; // Await the `params`

  if (!id) {
    return NextResponse.json({ error: 'Product ID is missing' }, { status: 400 });
  }

  try {
    const product = await stripe.products.retrieve(id);
    const prices = await stripe.prices.list({ product: id });

    // Obter o preço do produto (ou 0 se não existir)
    const price = prices.data[0]?.unit_amount ?? null;

    // Pegar a primeira imagem ou uma string vazia
    const image = product.images[0] || '';

    return NextResponse.json({
      id: product.id,
      name: product.name,
      description: product.description,
      image,
      price: formatPrice(price), // Formatar o preço
      category: product.metadata.category || 'Uncategorized',
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: '2024-12-18.acacia',
// });

// export async function GET(
//   req: Request,
//   context: { params: Promise<{ id: string }> } // Awaitable `params`
// ) {
//   const { id } = await context.params; // Await the `params`

//   if (!id) {
//     return NextResponse.json({ error: 'Product ID is missing' }, { status: 400 });
//   }

//   try {
//     const product = await stripe.products.retrieve(id);
//     const prices = await stripe.prices.list({ product: id });

//     const price = (prices.data[0]?.unit_amount ?? 0)/100; // Stripe returns the value in cents
//     const image = product.images[0] || '';

//     return NextResponse.json({
//       id: product.id,
//       name: product.name,
//       description: product.description,
//       image,
//       price,
//       category: product.metadata.category,
//     });
//   } catch (error: unknown) {
//     const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }
