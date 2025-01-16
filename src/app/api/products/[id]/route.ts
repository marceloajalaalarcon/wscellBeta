import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-12-18.acacia',
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
  // Esperar o 'params' ser resolvido corretamente
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Product ID is missing' }, { status: 400 });
  }

  try {
    // Buscar o produto na Stripe com o ID
    const product = await stripe.products.retrieve(id);

    // Buscar o preço do produto
    const prices = await stripe.prices.list({
      product: id,
    });
    // Garantir que o produto e o preço existem
    const price = prices.data[0].unit_amount // Stripe retorna o valor em centavos, por isso dividimos por 100
    const image = product.images[0] || ''; // Garantir que existe uma imagem

    return NextResponse.json({
      id: product.id,
      name: product.name,
      description: product.description,
      image,
      price,
      category: product.metadata.category,
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
