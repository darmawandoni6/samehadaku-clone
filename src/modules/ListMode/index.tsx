import Link from 'next/link';
import styles from './styles.module.scss';
import cx from 'classnames';
import { useScalping } from '../../hooks/Scalping';

const ListMode = () => {
  const {
    data: { listMode },
  } = useScalping();

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
            {/* <div className={styles.advancedsearch}>
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
                        {home.data.filter.list[item].map((lt, i) => (
                          <li key={i}>
                            <input type="checkbox" name={item} id={lt || 'all'} />
                            <label htmlFor={lt || 'all'}>{lt}</label>
                          </li>
                        ))}
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
            </div> */}
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
              {Object.entries(listMode).map((item, i) => (
                <div className={styles.blix} key={i}>
                  <span>
                    <a id={item[0] === '#' ? '##' : item[0]}>{item[0]}</a>
                  </span>
                  <ul>
                    {item[1].map((list, l) => (
                      <li key={l}>
                        <Link className={cx(styles.series, styles.tip)} href={list.href}>
                          {list.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.clear}></div>
      </div>
    </div>
  );
};

export default ListMode;
