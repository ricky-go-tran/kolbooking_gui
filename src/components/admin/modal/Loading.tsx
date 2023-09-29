export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-96">
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-8 h-8 border-4 border-blue-600 rounded-full animate-spin"
      ></div>
      <p className="ml-2">Loading...</p>
    </div>
  );
};
