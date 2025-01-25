import { NextResponse } from 'next/server';
import Stripe from '@/lib/Stripe';

export async function POST(req: Request) {
  try {
    const { productId, promoCode, address, city, zip, price } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: 'Product ID ausente.' }, { status: 400 });
    }

    let finalPrice = price;

    // Recupera o produto e o preço padrão caso o preço não seja enviado
    if (!finalPrice || typeof finalPrice !== 'number') {
      const product = await Stripe.products.retrieve(productId);
      if (!product) {
        return NextResponse.json({ error: `Produto com ID ${productId} não encontrado.` }, { status: 404 });
      }

      const prices = await Stripe.prices.list({ product: product.id });
      const productPrice = prices.data[0]?.unit_amount;

      if (!productPrice) {
        return NextResponse.json({ error: `Nenhum preço encontrado para o produto ${productId}.` }, { status: 404 });
      }

      finalPrice = productPrice; // Usa o preço padrão do produto
    }

    // Aplica desconto, se houver código promocional válido
    if (promoCode) {
      const promo = await Stripe.promotionCodes.list({ code: promoCode });
      const promoValid = promo.data[0];

      if (promoValid && promoValid.active) {
        const discount = 
          promoValid.coupon.amount_off || 
          (finalPrice * (promoValid.coupon.percent_off || 0)) / 100;
        finalPrice -= discount;
      } else {
        return NextResponse.json({ error: 'Código promocional inválido ou expirado.' }, { status: 400 });
      }
    }

    // Cria o PaymentIntent com o preço final calculado
    const paymentIntent = await Stripe.paymentIntents.create({
      amount: finalPrice,
      currency: 'brl',
      payment_method_types: ['card'],
      metadata: { productId, address, city, zip },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret, 
      productName: productId, // Apenas o ID, pois o nome do produto já deve ser conhecido no frontend 
      finalPrice 
    });
  } catch (error) {
    console.error('Erro ao criar PaymentIntent:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
