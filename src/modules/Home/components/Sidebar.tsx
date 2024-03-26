import styles from '../styles.module.scss';
import cx from 'classnames';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.section}>
        <div className={styles.releases}>
          <h3>Cari</h3>
        </div>
        <div className={styles.quickfilter}>
          <form className={styles.filters}>
            <div className={cx(styles.filter, styles.dropdown)}>
              <button type="button" className={styles['dropdown-toggle']} data-toggle="dropdown">
                Genre <span id="filtercount">All</span>
                <i className="fa fa-angle-down" aria-hidden="true"></i>
              </button>
              <ul className="dropdown-menu c4 scrollz">
                <li>
                  <input type="checkbox" id="genre-action" name="genre[]" value="action" />
                  <label htmlFor="genre-action">Action</label>
                </li>
              </ul>
            </div>
            <div className={cx(styles.filter, styles.dropdown)}>
              <button type="button" className={styles['dropdown-toggle']} data-toggle="dropdown">
                Season <span id="filtercount">All</span>
                <i className="fa fa-angle-down" aria-hidden="true"></i>
              </button>
              <ul className="dropdown-menu c4 scrollz">
                <li>
                  <input type="checkbox" id="season-fall-1999" name="season[]" value="fall-1999" />
                  <label htmlFor="season-fall-1999">Fall 1999</label>
                </li>
              </ul>
            </div>
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
