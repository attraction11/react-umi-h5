import NoSupport from '@/pages/noSupport';
import { isMobile } from '@/utils';
import { Navigate, Outlet } from 'umi';

//假的权限验证
const useAuth = () => {
  const isLogin = true;
  return { isLogin };
};

export default () => {
  // 判断当前设备的类型，pc或移动端
  const flage = isMobile();

  const { isLogin } = useAuth();
  if (!flage) {
    return <NoSupport />;
  }
  if (isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
