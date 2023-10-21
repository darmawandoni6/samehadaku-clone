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
      <header>
        <section>
          <Link href="/">
            <Image src={images.logo} width={190} height={44} alt="logo" />
          </Link>
          <ul>
            {menu.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </header>
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
