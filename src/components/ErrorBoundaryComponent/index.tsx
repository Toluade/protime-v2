const ErrorBoundaryComponent = () => {
  return (
    <div className="h-svh flex flex-col gap-5 justify-center items-center">
      <p className="text-xl p-2 ring-2 rounded-md ring-red-600 text-red-600 dark:ring-red-500 dark:text-red-500">
        Oops! Something went wrong.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="p-2 px-4 rounded-md bg-red-600 text-gray-50"
      >
        Refresh page
      </button>
    </div>
  );
};

export default ErrorBoundaryComponent;
