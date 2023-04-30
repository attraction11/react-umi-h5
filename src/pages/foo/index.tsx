import { Button } from 'antd-mobile/2x';
import { Icon, Link } from 'umi';
import styles from './index.less';

const Too = function () {
  // const { data } = useClientLoaderData();
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Link to="/user">Users Page</Link>
      <Icon icon="local:demo" width='30' height='30' flip='horizontal' />
      <Button color="primary" fill="solid">
        Solid
      </Button>
      {/* <div>{data}</div> */}
    </div>
  );
};

// export async function clientLoader() {
//   const data = await fetch('/api/data');
//   return data;
// }

export default Too;
