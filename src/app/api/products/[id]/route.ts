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
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: 'Product ID is missing' }, { status: 400 });
  }

  try {
    const product = await stripe.products.retrieve(id);
    const prices = await stripe.prices.list({ product: id });

    // Obter o preço do produto (ou 0 se não existir)
    const price = prices.data[0]?.unit_amount ?? null;

    // Pegar a categoria do produto atual
    const category = product.metadata.category || null;

    // Buscar produtos relacionados com base na categoria
    const relatedProducts = await stripe.products.list({
      active: true,
    });

    const related = [];
for (const p of relatedProducts.data) {
  // Filtrar por categoria e evitar o próprio produto
  if (p.metadata.category === category && p.id !== id) {
    const priceData = await stripe.prices.list({ product: p.id });
    related.push({
      id: p.id,
      name: p.name,
      description: p.description || '',
      image: p.images[0] || '/placeholder.jpg',
      price: formatPrice(priceData.data[0]?.unit_amount ?? null),
    });
  }
}

    return NextResponse.json({
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.images[0] || '',
      price: formatPrice(price),
      category,
      garantia: product.metadata.garantia || null,
      related, // Adicionar os produtos relacionados
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
