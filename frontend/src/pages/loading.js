export default function () {
  return (
    <div className="flex space-x-2 justify-center items-center bg-[#111827] h-screen dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-gray-200 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-gray-200 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-gray-200 rounded-full animate-bounce"></div>
    </div>
  );
}
