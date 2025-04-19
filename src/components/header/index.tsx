import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 py-8">
        <div className="flex items-center gap-2">
          <nav className="md:flex items-center gap-6 text-sm">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-primary">Anime</span>
              <span>Hub</span>
            </Link>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/list" className="hover:text-primary">
              My List
            </Link>
            <Link href="/categories" className="hover:text-primary">
              Categories
            </Link>
            <Link href="/schedule" className="hover:text-primary">
              Schedule
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
