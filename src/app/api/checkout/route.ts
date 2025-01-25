import { NextResponse } from 'next/server';
import Stripe from '@/lib/Stripe';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, quantity } = body;

    if (!productId || !quantity) {
      return NextResponse.json({ error: 'Missing required fields: productId or quantity' }, { status: 400 });
    }

    const product = await Stripe.products.retrieve(productId);

    if (!product) {
      return NextResponse.json({ error: `Product with ID ${productId} not found` }, { status: 404 });
    }

    const prices = await Stripe.prices.list({
      product: product.id,
    });

    if (!prices.data || prices.data.length === 0) {
      return NextResponse.json({ error: `No prices found for product ${productId}` }, { status: 404 });
    }

    const productPrice = prices.data[0].unit_amount;

    if (productPrice === null) {
      return NextResponse.json({ error: `Price is null for product ${productId}` }, { status: 400 });
    }

    // Criar a sessão de checkout com captura manual
    const session = await Stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: product.name,
            },
            unit_amount: productPrice,
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      payment_intent_data: {
        capture_method: 'manual', // Captura manual do pagamento
      },
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ['BR'], // Apenas Brasil
      },
      success_url: `${process.env.SITE_URL ? process.env.SITE_URL : 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL ? process.env.SITE_URL : 'http://localhost:3000'}/cancel`,
    });

    return NextResponse.json({ sessionId: session.url });
  } catch (error) {
    console.error('Checkout error:', error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
}







