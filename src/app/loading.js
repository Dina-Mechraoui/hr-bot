export default function Loading() {
  console.log("Loading component rendered");
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-12 h-12 border-4 border-[#468585] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}