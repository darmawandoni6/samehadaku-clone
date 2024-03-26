import { useState } from 'react';
import { useScalping } from '../../../hooks/Scalping';
import styles from '../styles.module.scss';
import cx from 'classnames';

const Sidebar = () => {
  const {
    data: { home },
  } = useScalping();

  const [active, setActive] = useState<string>('');

  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <div className={styles.releases}>
          <h3>Cari</h3>
        </div>
        <div className={styles.quickfilter}>
          <form className={styles.filters}>
            {home.data.filter.type.map((item, i) => (
              <div className={cx(styles.filter, styles.dropdown)} key={i}>
                <button
                  type="button"
                  className={styles['dropdown-toggle']}
                  data-toggle="dropdown"
                  onClick={() => {
                    let text = item;
                    if (active === item) {
                      text = '';
                    }
                    setActive(text);
                  }}
                >
                  {item}
                  <i className="fa fa-angle-down" aria-hidden="true"></i>
                </button>
                <ul className={cx({ [styles.active]: active === item })}>
                  {home.data.filter.list[item].map((lt, i) => (
                    <li key={i}>
                      <input type="checkbox" name={item} id={lt || 'all'} />
                      <label htmlFor={lt || 'all'}>{lt}</label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className={cx(styles.filter, styles.submit)}>
              <button type="submit" className={cx(styles.btn, styles['btn-custom-search'])}>
                <i className="fa fa-search" aria-hidden="true"></i> Search
              </button>
            </div>
          </form>
        </div>
        <div className={styles.clear}></div>
      </div>
    </div>
  );
};

export default Sidebar;
