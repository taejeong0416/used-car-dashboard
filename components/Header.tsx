import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Used Cars
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-gray-700 hover:text-black">
            Home
          </Link>
          <Link href="/dashboard" className="text-gray-700 hover:text-black">
            Dashboard
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-black">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
