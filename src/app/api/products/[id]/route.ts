import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-12-18.acacia',
});

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

    const price = prices.data[0]?.unit_amount; // Stripe returns the value in cents
    const image = product.images[0] || '';

    return NextResponse.json({
      id: product.id,
      name: product.name,
      description: product.description,
      image,
      price,
      category: product.metadata.category,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
