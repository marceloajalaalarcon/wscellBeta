interface RelatedProduct {
    id: string;
    name: string;
    description: string;
    image: string;
    price: string;
  }
  
  interface RelatedProductsProps {
    relatedProducts?: RelatedProduct[];
  }
  
  const RelatedProducts = ({ relatedProducts }: RelatedProductsProps) => (
    <div className="mt-16 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Você também pode gostar
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts && relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <a
              key={product.id}
              href={`/product/${product.id}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-2 truncate">{product.description}</p>
                <p className="text-purple-700 font-bold mt-2">{product.price}</p>
              </div>
            </a>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-4">
            Nenhum produto relacionado encontrado.
          </p>
        )}
      </div>
    </div>
  );
  
  export default RelatedProducts;
  