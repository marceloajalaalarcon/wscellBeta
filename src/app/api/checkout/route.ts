// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Extrair o corpo da requisição
    const { productId, quantity, paymentMethod } = body;

    // Verificar se os dados necessários foram fornecidos
    if (!productId || !quantity || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields: productId, quantity, or paymentMethod' }, { status: 400 });
    }

    // Buscar o produto específico da Stripe
    const product = await stripe.products.retrieve(productId);

    // Verificar se o produto foi encontrado
    if (!product) {
      return NextResponse.json({ error: `Product with ID ${productId} not found` }, { status: 404 });
    }

    // Buscar os preços do produto
    const prices = await stripe.prices.list({
      product: product.id,
    });

    // Verificar se algum preço foi encontrado
    if (!prices.data || prices.data.length === 0) {
      return NextResponse.json({ error: `No prices found for product ${productId}` }, { status: 404 });
    }

    // A primeira opção de preço
    const productPrice = prices.data[0].unit_amount;

    // Verificar se o preço não é nulo
    if (productPrice === null) {
      return NextResponse.json({ error: `Price is null for product ${productId}` }, { status: 400 });
    }

    // Criar a sessão de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
            },
            unit_amount: productPrice,
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.SITE_URL || 'http://localhost:3000'}/success`,
      cancel_url: `${process.env.SITE_URL || 'http://localhost:3000'}/cancel`,
    });
    
    // console.log('Sessão de checkout criada:', session); // Verifique a resposta da Stripe
    
    return NextResponse.json({ sessionId: session.url });
  } catch (error) {
    console.error('Checkout error:', error);

    // Verifique se o erro tem uma resposta detalhada
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
}
