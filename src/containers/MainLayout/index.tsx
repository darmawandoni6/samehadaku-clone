import { images } from '@assets/images';
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, type ReactNode } from 'react';
import { useScalping } from '../../hooks/Scalping';
import { menu } from './constants/menu';
import styles from './styles.module.scss';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { getHome } = useScalping();

  useEffect(() => {
    getHome();
  }, []);

  return (
    <div className={cx(styles.MainLayout)}>
      <div className={styles.th}>
        <div className={cx(styles.centernav, styles.bound)}>
          <div className={styles.shme}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
          <header className={styles.mainheader}>
            <div className={cx(styles['site-branding'], styles.logox)}>
              <h1 className={styles.logos}>
                <Link
                  title="oploverz.best | Situs Oploverz yang asli - oploverz.best | Situs Oploverz yang asli"
                  href="https://oploverz.news/"
                >
                  <Image
                    src="https://oploverz.news/wp-content/uploads/2022/10/Web-Gelap-1.png"
                    width="195"
                    height="35"
                    alt="oploverz.best | Situs Oploverz yang asli - oploverz.best | Situs Oploverz yang asli"
                  />
                </Link>
              </h1>
            </div>
          </header>
          <div className={cx(styles.searchx, styles.minmb)}>
            <form>
              <input
                id="s"
                className={styles['search-live']}
                type="text"
                placeholder="Search..."
                name="s"
                autoComplete="off"
              />
              <button type="submit" id="submitsearch" aria-label="search">
                <i className="fas fa-search" aria-hidden="true"></i>
              </button>
              <div className={cx(styles.srcmob, styles.srccls)}>
                <i className="fas fa-times-circle"></i>
              </div>
            </form>
          </div>
          <div className={styles.srcmob}>
            <i className="fas fa-search" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <nav id="main-menu" className={styles.mm}>
        <div className={styles.centernav}>
          <div className={styles.bound}>
            <section>
              <ul id="menu-oploverz" className={styles.menu}>
                <li id="menu-item-400">
                  <Link href="https://oploverz.news" aria-current="page">
                    <span>Home</span>
                  </Link>
                </li>
                <li id="menu-item-399">
                  <Link href="https://oploverz.news/anime/list-mode/">
                    <span>Daftar Isi</span>
                  </Link>
                </li>
                <li id="menu-item-8322">
                  <Link href="https://oploverz.news/jadwal-rilis/">
                    <span>Jadwal Rilis</span>
                  </Link>
                </li>
                <li id="menu-item-8323">
                  <Link href="https://oploverz.news/bookmark/">
                    <span>Bookmark</span>
                  </Link>
                </li>
              </ul>
            </section>
            <Link href="https://oploverz.news/random" className={styles.surprise}>
              <i className="far fa-star" aria-hidden="true"></i> Surprise Me!
            </Link>
            <div className={styles.clear}></div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
      <footer>
        <section />
        <section>
          Copyright © 2011-2023 - <strong>Samehadaku</strong>
        </section>
      </footer>
    </div>
  );
};

export default MainLayout;
