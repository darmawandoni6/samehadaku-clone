import Link from 'next/link';
import styles from './styles.module.scss';
import cx from 'classnames';
import Image from 'next/image';
import Sidebar from '@modules/Home/components/Sidebar';

const JadwalRilis = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.postbody}>
        <div className={styles.bixbox}>
          <div className={styles.releases}>
            <h1>
              <span>Jadwal Rilis</span>
            </h1>
          </div>
          <div className={styles.listupd} style={{ lineHeight: '22px' }}>
            This schedule is only an estimate based on the last update last week. So there is a chance that this{' '}
            {`week's`}
            episode will release early or late.
            <br />
          </div>
        </div>
        <div className={styles.clear}></div>
        <div className={cx(styles.bixbox, styles.schedulepage, styles.sch_tuesday)}>
          <div className={styles.releases}>
            <h3>
              <span>Tuesday</span>
            </h3>
          </div>
          <div className={styles.listupd}>
            <div className={styles.bs}>
              <div className={styles.bsx}>
                <Link
                  href="https://oploverz.news/anime/isekai-de-cheat-skill-wo-te-ni-shita-ore-wa-genjitsu-sekai-wo-mo-musou-suru-level-up-wa-jinsei-wo-kaeta/"
                  title="Isekai de Cheat Skill wo Te ni Shita Ore wa Genjitsu Sekai wo mo Musou Suru: Level Up wa Jinsei wo Kaeta"
                >
                  <div className={styles.limit}>
                    <div className={styles.ply}>
                      <i className="far fa-play-circle" aria-hidden="true"></i>
                    </div>
                    <div className={styles.bt}>
                      <span className={cx(styles.epx, styles.cndwn)} data-cndwn="60602" data-rlsdt="1711429272">
                        at 05:01
                      </span>
                      <span className={cx(styles.sb, styles.Sub)}>13</span>
                    </div>
                    <Image
                      width="225"
                      height="321"
                      src="https://i2.wp.com/oploverz.news/wp-content/uploads/2023/04/127169l.jpg?resize=247,350"
                      alt="Isekai de Cheat Skill wo Te ni Shita Ore wa Genjitsu Sekai wo mo Musou Suru: Level Up wa Jinsei wo Kaeta"
                    />
                  </div>
                  <div className={styles.tt}>
                    Isekai de Cheat Skill wo Te ni Shita Ore wa Genjitsu Sekai wo mo Musou Suru: Level Up wa Jinsei wo
                    Kaeta
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default JadwalRilis;
