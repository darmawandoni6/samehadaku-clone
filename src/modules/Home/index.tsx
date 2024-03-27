import Image from 'next/image';
import styles from './styles.module.scss';
import cx from 'classnames';
import Link from 'next/link';
import Sidebar from './components/Sidebar';
import { useScalping } from '../../hooks/Scalping';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const {
    data: { home },
    action,
  } = useScalping();
  const router = useRouter();

  const [active, setActive] = useState({
    genre: 0,
  });

  const { next, prev } = useMemo(() => {
    const { page } = router.query;

    if (page) {
      const pg = page as string;
      return {
        next: parseInt(pg, 10) + 1,
        prev: parseInt(pg, 10) - 1,
      };
    }
    return {
      next: 2,
      prev: 0,
    };
  }, [router.query]);

  useEffect(() => {
    const { page } = router.query;
    if (page) {
      const time = setTimeout(() => {
        action.geLatest(parseInt(page as string, 10));
      }, 300);

      return () => {
        clearTimeout(time);
      };
    }
  }, [router.query]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.postbody}>
        <div className={cx(styles.bixbox, styles.bbnofrm)}>
          <div className={cx(styles.releases, styles.hothome)}>
            <h2>Popular Today</h2>
          </div>
          <div className={cx(styles.listupd, styles.normal)}>
            <div className={styles.excstf}>
              {home.data.populer.map((item, i) => (
                <article className={cx(styles.bs, styles.styleegg)} key={i}>
                  <div className={styles.bsx}>
                    <Link href={window.origin + '/anime' + item.anime} className={styles.tip}>
                      <div className={styles.limit}>
                        <div className={styles.hotbadge}>
                          <i className="fas fa-fire-alt"></i>
                        </div>
                        <div className={styles.bt}></div>
                        <div className={styles.ply}>
                          <i className="far fa-play-circle"></i>
                        </div>
                        <div className={styles.egghead}>
                          <div className={styles.eggtitle}>{item.title}</div>
                          <div className={styles.eggmeta}>
                            <div className={cx(styles.eggtype, styles[item.type])}>{item.type}</div>
                            <div className={styles.eggepisode}>{item.episode}</div>
                          </div>
                        </div>
                        <Image src={item.img} title={item.anime} alt={item.anime} width="247" height="350" />
                      </div>
                      <div className={styles.tt}>
                        <h2>{item.anime}</h2>
                      </div>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
        <div className={cx(styles.bixbox, styles.bbnofrm)}>
          <div className={cx(styles.releases, styles.latesthome)}>
            <h3>Latest Release</h3>
            <Link
              className={styles.vl}
              href={{
                pathname: '/anime',
                query: {
                  status: '',
                  type: '',
                  order: 'update',
                },
              }}
            >
              View All
            </Link>
          </div>
          <div className={cx(styles.listupd, styles.normal)}>
            <div className={styles.excstf}>
              {home.data.latest.map((item, i) => (
                <article className={styles.stylesix} key={i}>
                  <div className={styles.bsx}>
                    <div className={styles.thumb}>
                      <Link href={'/anime' + item.anime} className={styles.tip} title={item.title}>
                        {item.hotbadge && (
                          <div className={styles.hotbadge}>
                            <i className="fas fa-fire-alt"></i>
                          </div>
                        )}
                        <div className={cx(styles.typez, styles[item.type])}>{item.type}</div>
                        <Image src={item.img} title={item.title} width={141} height={200} alt={item.title} />
                        <div className={styles.bt}>
                          <span className={styles.epx}>{item.episode}</span>
                        </div>
                      </Link>
                    </div>
                    <div className={styles.inf}>
                      <h2>
                        <Link href={'/anime' + item.anime} title={item.title}>
                          {item.title}
                        </Link>
                      </h2>
                      <ul
                        dangerouslySetInnerHTML={{
                          __html: item.ul,
                        }}
                      />
                    </div>
                    <div className={styles.upscore}>
                      <span className={styles.scrt}>score</span>
                      <span className={styles.scr}>{item.score}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className={styles.hpage}>
              {prev > 0 && (
                <Link href={{ pathname: '/', query: { page: prev } }} className={styles.l} style={{ marginRight: 10 }}>
                  <i className="fas fa-angle-left" aria-hidden="true"></i> Previous
                </Link>
              )}
              <Link href={{ pathname: '/', query: { page: next } }} className={styles.r}>
                Next <i className="fas fa-angle-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className={cx(styles.bixbox, styles.bbnofrm)}>
          <div className={styles.releases}>
            <h3>Recommendation</h3>
          </div>
          <div className={styles['series-gen']}>
            <ul className={styles['nav-tabs']}>
              {home.data.genre.map((item, i) => (
                <li
                  className={cx({ [styles.active]: i === active.genre })}
                  key={i}
                  onClick={() => setActive((prev) => ({ ...prev, genre: i }))}
                  style={{ cursor: 'pointer' }}
                >
                  <a>{item}</a>
                </li>
              ))}
            </ul>
            <div className={styles.listupd}>
              <div id="series-26" className={cx(styles['tab-pane'], styles.active)}>
                {home.data.recommendation[active.genre]?.map((item, i) => (
                  <article className={styles.bs} key={i}>
                    <div className={styles.bsx}>
                      <Link href={'/anime' + item.anime} className={styles.tip} title={item.title}>
                        <div className={styles.limit}>
                          {item.isCompleted && <div className={cx(styles.status, styles.Completed)}>Completed</div>}
                          <div className={cx(styles.typez, styles[item.type])}>{item.type}</div>
                          <div className={styles.ply}>
                            <i className="far fa-play-circle"></i>
                          </div>
                          <div className={styles.bt}>
                            <span className={styles.epx}>{item.epx}</span>
                          </div>
                          <Image src={item.image} alt={item.title} width="247" height="350" />
                        </div>
                        <div className={styles.tt}>
                          {item.title}
                          <h2>{item.title}</h2>
                        </div>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Home;
