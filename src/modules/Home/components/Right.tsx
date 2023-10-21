import Image from 'next/image';
import Link from 'next/link';
import { useScalping } from '../../../hooks/Scalping';
import styles from '../styles.module.scss';

const Right = () => {
  const { data } = useScalping();
  const {
    data: { rekomendasiAnime },
  } = data.home;

  return (
    <div className={styles.Right}>
      <h3>Rekomendasi Anime</h3>
      <section>
        {rekomendasiAnime.map((item, i) => (
          <div className={styles.list} key={i}>
            {item.file && (
              <Link href={item.link as string}>
                <Image src={item.file} width={60} height={85} alt={item.title} />
              </Link>
            )}
            <div className={styles.lftinfo}>
              <Link href={item.link as string}>
                <h2>{item.title}</h2>
              </Link>
              <span>
                <b>Genres : </b>
                {item.genre.join(', ')}
              </span>
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Right;
