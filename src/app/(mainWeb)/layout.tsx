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
      <div className="py-20">
        {children}
      </div>
    </div>
  )
}

export default MainLayout;