export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">Not found</h1>
        <p className="mx-5 mb-8 text-gray-500">
          Unfortunately, we could not find the requested page.
        </p>
      </div>
    </div>
  );
}
