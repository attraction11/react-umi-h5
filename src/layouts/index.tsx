import theme from '@/theme';
import { ConfigProvider } from 'antd';
import { Outlet } from 'umi';

export default function Layout() {
  return (
    <ConfigProvider theme={theme}>
      <Outlet />
    </ConfigProvider>
  );
}
