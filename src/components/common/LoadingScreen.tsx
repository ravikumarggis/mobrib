const LoadingScreen = ({ text }: { text?: string }) => {
  return (
    <div className="h-screen min-w-screen fixed inset-0 flex justify-center items-center top-0 backdrop-blur-xs z-999999">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
        <h6 className="dark:text-white">{text ? text : "Getting Data..."}</h6>
      </div>
    </div>
  );
};

export default LoadingScreen;
