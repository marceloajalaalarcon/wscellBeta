interface ProductImageProps {
    image: string;
    name: string;
  }
  
  const ProductImage = ({ image, name }: ProductImageProps) => (
    <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-opacity duration-500"
      />
    </div>
  );
  
  export default ProductImage;
  