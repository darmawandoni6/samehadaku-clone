import Image from 'next/image';
import Link from 'next/link';
import type { FunctionComponent } from 'react';
import type { Anime } from '../../../pages/api/home';
import styles from '../styles.module.scss';

interface Props {
  title: string;
  allView?: boolean;
  data: Anime[];
}
const ListAnime: FunctionComponent<Props> = ({ title, data, allView }) => {
  return (
    <section>
      <header>
        <h3>{title}</h3>
        {allView && <button className={styles.allView}>Lihat Semua</button>}
      </header>
      <div className={styles.newAnime}>
        {data.map((item) => (
          <div className={styles.anime} key={item.link}>
            <div className={styles.thumb}>
              <Link href={item.link as string}>
                <Image src={item.img ?? ''} width={154} height={104} alt={item.title} />
              </Link>
            </div>
            <div className={styles.desc}>
              <Link href={item.link as string}>
                <h2>{item.title}</h2>
              </Link>
              <span>
                <i className="dashicons dashicons-controls-play"></i> <b>Episode</b> {item.episode}
              </span>
              <span>
                <i className="dashicons dashicons-admin-users"></i> <b>Posted by</b>: {item.postBy}
              </span>
              <span
                dangerouslySetInnerHTML={{
                  __html: item.realese as string,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

ListAnime.defaultProps = {
  allView: false,
};

export default ListAnime;
