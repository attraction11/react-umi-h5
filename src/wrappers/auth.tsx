import { Navigate, Outlet } from 'umi'

//假的权限验证
const useAuth = ()=>{
  const isLogin = true;
  return {isLogin}
}

export default () => {
  const { isLogin } = useAuth();
  if (isLogin) {
    return <Outlet />;
  } else{
    return <Navigate to="/login" />;
  }
}
