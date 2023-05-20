import { Icon } from 'umi';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.container}>
      <Icon icon="local:noSupport" width="120" height="120" />
      <div className={styles.title}>Sorry! Our website is mobile-only.</div>
      <div className={styles.subTitle}>
        Please switch to a smartphone for the best browsing experience.
      </div>
    </div>
  );
};
