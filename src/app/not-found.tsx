export const runtime = "edge";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <title>404: This page could not be found.</title>
      <div className="text-center">
        <h1 className="next-error-h1 text-4xl">404</h1>
        <div>
          <h2>This page could not be found.</h2>
        </div>
      </div>
    </main>
  );
}
