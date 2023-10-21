import { HashLoader } from 'react-spinners';
import { useScalping } from '../../hooks/Scalping';
import Left from './components/Left';
import Right from './components/Right';
import styles from './styles.module.scss';

const Home = () => {
  const { data } = useScalping();
  const { loading } = data.home;

  if (loading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <HashLoader color="#00b7e0" />
      </div>
    );

  return (
    <div className={styles.Home}>
      <Left />
      <Right />
    </div>
  );
};

export default Home;
