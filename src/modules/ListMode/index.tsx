import Link from 'next/link';
import styles from './styles.module.scss';
import cx from 'classnames';
import { useScalping } from '../../hooks/Scalping';
import { useState } from 'react';

const ListMode = () => {
  const {
    data: { home },
  } = useScalping();

  const [active, setActive] = useState<string>('');

  return (
    <div className={styles.wrapper}>
      <div className={styles.postbody}>
        <div className={cx(styles.bixbox, styles.bixboxarc, styles.bbnofrm)}>
          <div className={styles.releases}>
            <h1>
              <span>Anime Lists</span>
            </h1>
          </div>
          <div className={styles.mrgn}>
            <div className={styles.advancedsearch}>
              <div className={styles.quickfilter}>
                <form className={styles.filters}>
                  {home.data.filter.type.map((item, i) => (
                    <div className={cx(styles.filter, styles.dropdown)} key={i}>
                      <button
                        type="button"
                        className={styles['dropdown-toggle']}
                        data-toggle="dropdown"
                        onClick={() => {
                          let text = item;
                          if (active === item) {
                            text = '';
                          }
                          setActive(text);
                        }}
                      >
                        {item} <i className="fa fa-angle-down" aria-hidden="true"></i>
                      </button>
                      <ul className={cx({ [styles.active]: active === item })}>
                        <li>
                          <input type="checkbox" id="genre-" name="genre[]" value="" />
                          <label htmlFor="genre-"></label>
                        </li>
                      </ul>
                    </div>
                  ))}
                  <div className={cx(styles.filter, styles.submit)}>
                    <button type="submit" className={cx(styles.btn, styles['btn-custom-search'])}>
                      <i className="fa fa-search" aria-hidden="true"></i> Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className={styles.nav_apb} id="tsnlistssc">
              <Link href="##">#</Link>
              <Link href="#A">A</Link>
              <Link href="#B">B</Link>
              <Link href="#C">C</Link>
              <Link href="#D">D</Link>
              <Link href="#F">F</Link>
              <Link href="#G">G</Link>
              <Link href="#H">H</Link>
              <Link href="#I">I</Link>
              <Link href="#J">J</Link>
              <Link href="#K">K</Link>
              <Link href="#L">L</Link>
              <Link href="#M">M</Link>
              <Link href="#N">N</Link>
              <Link href="#O">O</Link>
              <Link href="#P">P</Link>
              <Link href="#R">R</Link>
              <Link href="#S">S</Link>
              <Link href="#T">T</Link>
              <Link href="#U">U</Link>
              <Link href="#V">V</Link>
              <Link href="#W">W</Link>
              <Link href="#Y">Y</Link>
              <Link href="#Z">Z</Link>
            </div>
            <div className={styles.clear}></div>
            <div className={styles.soralist}>
              <div className={styles.lxx}></div>
              <div className={styles.blix}>
                <span>
                  <a id="#">#</a>
                </span>
                <ul>
                  <li>
                    <a
                      className={cx(styles.series, styles.tip)}
                      rel="301"
                      href="https://oploverz.news/anime/3d-kanojo-real-girl-s2/"
                      data-hasqtip="0"
                    >
                      3D Kanojo Real Girl S2
                    </a>
                  </li>
                  <li>
                    <a
                      className={cx(styles.series, styles.tip)}
                      rel="5"
                      href="https://oploverz.news/anime/3d-kanojo-real-girl/"
                      data-hasqtip="1"
                    >
                      3D Kanojo: Real Girl
                    </a>
                  </li>
                  <li>
                    <a
                      className={cx(styles.series, styles.tip)}
                      rel="21"
                      href="https://oploverz.news/anime/86-eighty-six-part-1/"
                      data-hasqtip="2"
                    >
                      86 Eighty-Six Part 1
                    </a>
                  </li>
                  <li>
                    <a
                      className={cx(styles.series, styles.tip)}
                      rel="34"
                      href="https://oploverz.news/anime/86-eighty-six-part-2/"
                      data-hasqtip="3"
                    >
                      86 Eighty-Six Part 2
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.clear}></div>
      </div>
    </div>
  );
};

export default ListMode;
