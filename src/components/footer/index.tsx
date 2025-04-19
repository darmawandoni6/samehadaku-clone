import Link from 'next/link';

import { AnimeType } from '@/lib/constants';

const Footer = () => {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold mb-4">
              <span className="text-primary">Anime</span>
              <span>Hub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your ultimate destination for anime streaming and information. Discover, watch, and enjoy your favorite
              anime series and movies.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={{ pathname: '/', query: { tab: AnimeType.list } }}
                  className="text-muted-foreground hover:text-primary"
                >
                  List
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: '/', query: { tab: AnimeType.airing } }}
                  className="text-muted-foreground hover:text-primary"
                >
                  New Releases
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: '/', query: { tab: AnimeType.movie } }}
                  className="text-muted-foreground hover:text-primary"
                >
                  Movie
                </Link>
              </li>
              <li>
                <Link
                  href={{ pathname: '/', query: { tab: AnimeType.complete } }}
                  className="text-muted-foreground hover:text-primary"
                >
                  Complete
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Feature</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/list" className="text-muted-foreground hover:text-primary">
                  My List
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-muted-foreground hover:text-primary">
                  Schedule
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 AnimeHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
