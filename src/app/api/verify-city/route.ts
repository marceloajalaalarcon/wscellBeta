import { NextResponse } from 'next/server';

import Stripe from '@/lib/Stripe';
// Lista de cidades permitidas
const allowedCities = [
  { city: 'dourados', state: 'ms' },
  { city: 'campo grande', state: 'ms' },
  { city: 'ponta porã', state: 'ms' },
];

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');
  
    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });
    }
  
    try {
      // Recuperar a sessão de checkout
      const session = await Stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent', 'shipping_details'],
      });
  
      // Extrair o ID do Payment Intent
      const paymentIntentId =
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id; // Caso seja um objeto expandido
  
      if (!paymentIntentId) {
        return NextResponse.json({ error: 'Payment Intent ID not found' }, { status: 400 });
      }
  
      const shippingDetails = session.shipping_details;
  
      if (!shippingDetails || !shippingDetails.address) {
        return NextResponse.json({ error: 'No shipping address found' }, { status: 400 });
      }
  
      const { city, state } = shippingDetails.address;
  
      // Verificar se a cidade e o estado estão na lista de permitidos
      const isValidCity = allowedCities.some(
        (allowed) =>
          allowed.city === city?.toLowerCase() && allowed.state === state?.toLowerCase()
      );
  
      if (!isValidCity) {
        // Cancelar o pagamento
        await Stripe.paymentIntents.cancel(paymentIntentId);
  
        return NextResponse.json({
          isValidCity: false,
          message: 'Pagamento cancelado. Apenas entregamos em cidades específicas.',
        });
      }
  
      // Capturar o pagamento
      await Stripe.paymentIntents.capture(paymentIntentId);
  
      return NextResponse.json({
        isValidCity: true,
        message: 'Pagamento aprovado. Obrigado por sua compra!',
      });
    } catch (error) {
      console.error('Error verifying city or handling payment:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  
