import Link from 'next/link';
import styles from './styles.module.scss';
import cx from 'classnames';
import Image from 'next/image';
import Sidebar from '@modules/Home/components/Sidebar';

const Genre = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.postbody}>
        <div className={cx(styles.bixbox, styles.bbnofrm)}>
          <div className={styles.releases}>
            <h1>
              <span>Adventure</span>
            </h1>
          </div>
          <div className={styles.listupd}>
            <article className={styles.bs}>
              <div className={styles.bsx}>
                <Link href="https://oploverz.news/anime/ajin/" className={styles.tip} rel="315" title="Ajin">
                  <div className={styles.limit}>
                    <div className={cx(styles.status, styles.Completed)}>Completed</div>
                    <div className={cx(styles.typez, styles.TV)}>TV</div>
                    <div className={styles.ply}>
                      <i className="far fa-play-circle"></i>
                    </div>
                    <div className={styles.bt}>
                      <span className={styles.epx}>Completed</span>
                    </div>
                    <Image
                      src="https://i3.wp.com/oploverz.news/wp-content/uploads/manga-images/thumbnail/ajin.jpg?resize=247,350"
                      title="Ajin"
                      alt="Ajin"
                      width="247"
                      height="350"
                    />
                  </div>
                  <div className={styles.tt}>
                    Ajin
                    <h2>Ajin</h2>
                  </div>
                </Link>
              </div>
            </article>
          </div>
          <div className={styles.pagination}>
            <a className="prev page-numbers" href="https://oploverz.news/genres/adventure/">
              « Previous
            </a>
            <span aria-current="page" className="page-numbers current">
              1
            </span>
            <a className="page-numbers" href="https://oploverz.news/genres/adventure/page/2/">
              2
            </a>
            <a className="page-numbers" href="https://oploverz.news/genres/adventure/page/3/">
              3
            </a>
            <span className="page-numbers dots">…</span>
            <a className="page-numbers" href="https://oploverz.news/genres/adventure/page/9/">
              9
            </a>
            <a className="next page-numbers" href="https://oploverz.news/genres/adventure/page/2/">
              Next »
            </a>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Genre;
