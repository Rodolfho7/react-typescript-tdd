import { memo } from 'react';
import Styles from './login-header.module.scss';

export const LoginHeader = memo(function LoginHeader() {
  return (
    <header className={Styles.header}>
      <h1>4Dev - enquetes para programadores</h1>
    </header>
  )
});
