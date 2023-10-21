import cx from 'classnames';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';

import Link from 'next/link';
import { useScalping } from '../../../hooks/Scalping';
import styles from '../styles.module.scss';
import ListAnime from './ListAnime';
import Slider from './Slider';

const Left = () => {
  const swiper = useRef<HTMLDivElement | null>(null);
  const { data } = useScalping();
  const {
    data: { animeMovie, animePopuler, batchAnime, komikPopuler, newAnime },
  } = data.home;

  useEffect(() => {
    if (swiper.current) {
      var main = new Swiper(swiper.current, {
        slidesPerView: 5,
        spaceBetween: 0,
        autoplay: {
          pauseOnMouseEnter: true,
          delay: 2500,
        },
        navigation: {
          nextEl: '.next',
          prevEl: '.prev',
        },
      });
      return () => {
        main.destroy(true, true);
      };
    }
  }, []);

  return (
    <div className={styles.Left}>
      <Slider title="Anime Terpopuler Hari Ini">
        {animePopuler.map((item) => (
          <div className={cx(styles.anime, 'swiper-slide')} key={item.link}>
            <div className={styles.thumbnail}>
              <Image src={item.img ?? ''} width={144} height={202} alt={item.title} />
              <Link href={item.link as string}>
                <div className={styles.ply}>
                  <i className="fa fa-play"></i>
                </div>
              </Link>
              <div className={styles.type}>{item.type}</div>
              {item.score && (
                <div className={styles.score}>
                  <i className="fa fa-star"></i>
                  <span> {item.score}</span>
                </div>
              )}
            </div>
            <p>{item.title}</p>
            <span>{item.status}</span>
          </div>
        ))}
      </Slider>

      <Slider title="Komik Terpopuler Hari Ini">
        {komikPopuler.map((item) => (
          <div className={cx(styles.anime, 'swiper-slide')} key={item.link}>
            <div className={styles.thumbnail}>
              <img src={item.img} width={144} height={202} alt={item.title} />
              <Link href={item.link as string}>
                <div className={styles.ply}>
                  <i className="fa fa-book"></i>
                </div>
              </Link>
            </div>
            <p>{item.title}</p>
            <span>{item.status}</span>
          </div>
        ))}
      </Slider>

      <ListAnime title="Anime Terbaru" data={newAnime} />
      <ListAnime title="Download Batch Anime" data={batchAnime} allView />

      <Slider title="Nonton Movie Anime">
        {animeMovie.map((item) => (
          <div className={cx(styles.anime, 'swiper-slide')} key={item.link}>
            <div className={styles.thumbnail}>
              <Image src={item.img ?? ''} width={144} height={202} alt={item.title} />
              <div className={styles.ply}>
                <i className="fa fa-play"></i>
              </div>
              <div className={styles.type}>{item.type}</div>
              {item.score && (
                <div className={styles.score}>
                  <i className="fa fa-star"></i>
                  <span> {item.score}</span>
                </div>
              )}
            </div>
            <p>{item.title}</p>
            <span>{item.status}</span>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Left;
