import Link from 'next/link';
import styles from '../styles.module.scss';
import Image from 'next/image';
import cx from 'classnames';
const Recommended = () => {
  return (
    <div className={styles.bixbox}>
      <div className={styles.releases}>
        <h3>
          <span>Recommended Series</span>
        </h3>
      </div>
      <div className={styles.listupd}>
        <article className={styles.bs}>
          <div className={styles.bsx}>
            <Link
              href="https://oploverz.news/anime/sword-art-online-alicization/"
              className={styles.tip}
              title="Sword Art Online Alicization"
            >
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
                  src="https://i1.wp.com/oploverz.news/wp-content/uploads/manga-images/thumbnail/sword-art-online-alicization.jpg?resize=247,350"
                  title="Sword Art Online Alicization"
                  width="247"
                  height="350"
                  alt="Sword Art Online Alicization"
                />
              </div>
              <div className={styles.tt}>
                Sword Art Online Alicization
                <h2>Sword Art Online Alicization</h2>
              </div>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Recommended;
