// components/home/LoadingSpinner.tsx

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-16 h-16 border-4 border-purple-600 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
