import Link from 'next/link';
import styles from './styles.module.scss';
import cx from 'classnames';
import Image from 'next/image';
import Recommended from './component/Recommended';
import Sidebar from '@modules/Home/components/Sidebar';
const Anime = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.postbody}>
        <article>
          <div className={cx(styles['ts-breadcrumb'], styles.bixbox)}>
            <div>
              <span>
                <Link href="https://oploverz.news/">Home</Link>
              </span>
              {'			 › 						'}
              <span>
                <Link href="https://oploverz.news/anime/accel-world/">Accel World</Link>
              </span>
            </div>
          </div>
          <div className={cx(styles.bixbox, styles.animefull)}>
            <div className={cx(styles.bigcontent, styles.nobigcv)}>
              <div className={styles.thumbook}>
                <div className={styles.thumb}>
                  <Image
                    src="https://i2.wp.com/oploverz.news/wp-content/uploads/manga-images/thumbnail/accel-world.jpg?resize=247,350"
                    title="Accel World"
                    alt="Accel World"
                    width="247"
                    height="350"
                  />
                </div>
                <div className={styles.rt}>
                  <div className={styles.rating}>
                    <strong>Rating 7.70</strong>
                    <div className={styles['rating-prc']}>
                      <div className={styles.rtp}>
                        <div className={styles.rtb}>
                          <span style={{ width: '77%' }}></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div data-id="92" className={styles.bookmark}>
                    <i className="far fa-bookmark" aria-hidden="true"></i> Bookmark
                  </div>
                  <div className={styles.bmc}>Followed 2 people</div>
                </div>
              </div>
              <div className={styles.infox}>
                <h1 className={styles['entry-title']}>Accel World</h1>

                <div className={styles.ninfo}>
                  <div className={styles.mindesc}>
                    <b>Watch full episodes Accel World</b>, download Accel World english subbed, Accel World eng sub,
                    download Accel World eng sub, stream Accel World at oploverz.best | Situs Oploverz yang asli.
                  </div>
                  <div className={styles['info-content']}>
                    <div className={styles.spe}>
                      <span>
                        <b>Status:</b> Completed
                      </span>
                      <span>
                        <b>Studio:</b>
                        <a href="https://oploverz.news/studio/sunrise/" rel="tag">
                          Sunrise
                        </a>
                      </span>
                      <span>
                        <b>Duration:</b> 24 menit per episode
                      </span>
                      <span>
                        <b>Season:</b>
                        <a href="https://oploverz.news/season/spring-2012/" rel="tag">
                          Spring 2012
                        </a>
                      </span>
                      <span>
                        <b>Type:</b> TV
                      </span>
                      <span className={styles.split}>
                        <b>Casts:</b>{' '}
                      </span>
                      <span className={cx(styles.author, styles.vcard)}>
                        <b>Posted by:</b> <i className="fn">Admin</i>
                      </span>
                      <span className={styles.split}>
                        <b>Released on:</b>
                        <time dateTime="2022-11-10T11:11:09+00:00" className={styles.updated}>
                          November 10, 2022
                        </time>
                      </span>
                      <span className={styles.split}>
                        <b>Updated on:</b>
                        <time dateTime="2022-11-10T18:11:35+00:00">November 10, 2022</time>
                      </span>
                    </div>
                    <div className={styles.genxed}>
                      <a href="https://oploverz.news/genres/action/" rel="tag">
                        Action
                      </a>
                      <a href="https://oploverz.news/genres/game/" rel="tag">
                        Game
                      </a>
                      <a href="https://oploverz.news/genres/romance/" rel="tag">
                        Romance
                      </a>
                      <a href="https://oploverz.news/genres/school/" rel="tag">
                        School
                      </a>
                      <a href="https://oploverz.news/genres/sci-fi/" rel="tag">
                        Sci-Fi
                      </a>
                      <a href="https://oploverz.news/genres/shounen/" rel="tag">
                        Shounen
                      </a>
                    </div>
                    <div className={styles.desc}>
                      Watch streaming <b>Accel World English Subbed</b> on oploverz.best | Situs Oploverz yang asli. You
                      can also download free Accel World Eng Sub, <span>{`don't`}</span> forget to watch online
                      streaming of various quality 720P 360P 240P 480P according to your connection to save internet
                      quota, Accel World on oploverz.best | Situs Oploverz yang asli MP4 MKV hardsub softsub English
                      subbed is already contained in the video.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx(styles.bixbox, styles.synp)}>
            <div className={styles.releases}>
              <h2>Synopsis Accel World</h2>
            </div>
            <div className={styles['entry-content']}>
              <p>
                Haruyuki Arita adalah seorang anak muda yang selalu diganggu oleh teman sekelasnya. Malu dengan
                kehidupannya yang miris,, Haruyuki hanya dapat mengatasi semua itu dengan permainan virtual. Tapi itu
                semua berubah ketika Kuroyukihime, gadis paling populer di sekolah, memperkenalkan dia program misterius
                yang disebut Brain Burst dan realitas maya yang disebut Dunia Accel.
              </p>
            </div>
          </div>
          <Recommended />
        </article>
      </div>
      <Sidebar />
    </div>
  );
};

export default Anime;
