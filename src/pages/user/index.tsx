
import Hello from '@/components/Hello';
import { useModel, Link } from 'umi';

export default () => {
  const { user, fetchUser } = useModel('user', (model: any) => ({
    user: model.user,
    fetchUser: model.fetchUser,
  }));
  return (
    <div>
      <Link to="/foo">Foo Page</Link>
      <div onClick={() => fetchUser()}>hello {user}</div>
      <Hello></Hello>
    </div>
  );
};
