import Header from '../../components/layouts/header';
import { ReactNode } from 'react';

const MainLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}

export default MainLayout;