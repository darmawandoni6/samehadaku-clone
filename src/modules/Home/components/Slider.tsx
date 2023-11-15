import type { FunctionComponent, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import styles from '../styles.module.scss';

interface Props {
  title: string;
  children: ReactNode;
}

const Slider: FunctionComponent<Props> = ({ title, children }) => {
  const [pagination, setPagination] = useState({
    prev: '',
    next: '',
  });
  const swiper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tag = title.replace(/ /g, '_').toLocaleLowerCase();
    const nextEl = `.next_${tag}`;
    const prevEl = `.prev_${tag}`;

    setPagination({
      prev: prevEl.replace('.', ''),
      next: nextEl.replace('.', ''),
    });
  }, []);

  useEffect(() => {
    if (swiper.current && pagination.next) {
      let rdm = Math.random() * 10;
      let rdm2 = Math.random() * 10;
      rdm = Math.floor(rdm) * 10;
      rdm2 = Math.floor(rdm2) * 10;
      rdm = rdm2 * 10;

      const nextEl = `.${pagination.next}`;
      const prevEl = `.${pagination.prev}`;

      const main = new Swiper(swiper.current, {
        slidesPerView: 2,
        spaceBetween: 0,
        loop: true,
        autoplay: {
          pauseOnMouseEnter: true,
          delay: 2500 + rdm,
        },
        navigation: {
          nextEl,
          prevEl,
        },
        breakpoints: {
          1024: {
            slidesPerView: 5,
          },
          768: {
            slidesPerView: 4,
          },
          640: {
            slidesPerView: 3,
          },
        },
      });
      return () => {
        main.destroy(true, true);
      };
    }
  }, [pagination]);

  return (
    <section>
      <header>
        <h3>{title}</h3>
        <div className={styles.paginination}>
          <button className={pagination.prev}>
            <i className="fa fa-caret-left"></i>
          </button>
          <button className={pagination.next}>
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
