import "./globals.css";
import Link from "next/link";
import ErrorBoundary from "../components/ErrorBoundary";

export const metadata = {
  title: "Ebrahim Samad",
  description: "A Next.js project with JSON Server and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/products">
              <h1 className="text-2xl font-bold">Ebrahim Samad</h1>
            </Link>
            <nav>
              <Link href="/products" className="mr-4 hover:underline">
                Products
              </Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4">
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
