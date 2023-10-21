import type { FunctionComponent, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import styles from '../styles.module.scss';

interface Props {
  title: string;
  children: ReactNode;
}

const Slider: FunctionComponent<Props> = ({ title, children }) => {
  const swiper = useRef<HTMLDivElement | null>(null);

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
    <section>
      <header>
        <h3>{title}</h3>
        <div className={styles.paginination}>
          <button className="prev">
            <i className="fa fa-caret-left"></i>
          </button>
          <button className="next">
            <i className="fa fa-caret-right"></i>
          </button>
        </div>
      </header>
      <div className={styles.list}>
        <div className={styles.container} ref={swiper}>
          <div className="swiper-wrapper">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
