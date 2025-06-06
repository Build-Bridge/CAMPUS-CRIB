const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full mt-10">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export const WhiteLoader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full size-4 border-t-2 border-b-2 border-white"></div>
    </div>
  )
}

export default Loader;