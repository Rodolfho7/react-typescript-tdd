import Styles from './header-styles.module.scss';
import { useContext } from 'react';
import ApiContext, { ApiContextProps } from '../../contexts/api/api-context';
import { useLogout } from '../../hooks/use-logout';

export function Header() {
  const logout = useLogout();
  const { getCurrentAccount } = useContext(ApiContext) as ApiContextProps;

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    logout();
  }
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <h1 className={Styles.logo}>Logo</h1>
        <div className={Styles.logoutWrap}>
          <span data-testid='username'>{getCurrentAccount?.()?.name}</span>
          <a onClick={handleLogout}>Sair</a>
        </div>
      </div>
    </header>
  )
}
