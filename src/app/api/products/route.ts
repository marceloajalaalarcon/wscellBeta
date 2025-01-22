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

export async function GET() {
  try {
    const products = await stripe.products.list();
    const prices = await stripe.prices.list();
    const categorizedProducts: Record<string, any[]> = {};

    for (const product of products.data) {
      const category = product.metadata?.category || 'Uncategorized';

      // Filtrar os preços específicos do produto
      const productPrices = prices.data.filter(price => price.product === product.id);

      // Verificar se há preços para o produto e pegar o primeiro preço
      const productPrice: number | null = productPrices.length > 0 ? productPrices[0].unit_amount : null;

      const productData = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: formatPrice(productPrice), // Formatar o preço como R$: valor,00
        image: product.images[0] || '', // Pega a primeira imagem
      };

      if (!categorizedProducts[category]) {
        categorizedProducts[category] = [];
      }
      categorizedProducts[category].push(productData);
    }

    return NextResponse.json(categorizedProducts);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}



// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: '2024-12-18.acacia',
// });

// export async function GET() {
//   try {
//     const products = await stripe.products.list();
//     const prices = await stripe.prices.list();
//     const categorizedProducts: Record<string, any[]> = {};

//     for (const product of products.data) {
//       const category = product.metadata?.category || 'Uncategorized';
//       // Filtrar os preços específicos do produto
//       const productPrices = prices.data.filter(price => price.product === product.id);
      
//       // Verificar se há preços para o produto e pegar o primeiro preço
//       const productPrice: any = `${productPrices.length > 0 ? productPrices[0].unit_amount: null}` // Divide por 100 porque o valor vem em centavos

//       const productData = {
//         id: product.id,
//         name: product.name,
//         description: product.description,
//         price: productPrice/100,
//         image: product.images[0] || '', // Pega a primeira imagem
//       };

//       if (!categorizedProducts[category]) {
//         categorizedProducts[category] = [];
//       }
//       categorizedProducts[category].push(productData);
//     }

//     return NextResponse.json(categorizedProducts);
//   } catch (error) {
//     return NextResponse.json({ error: (error as Error).message }, { status: 500 });
//   }
// }
