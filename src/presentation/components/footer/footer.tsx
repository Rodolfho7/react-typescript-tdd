import { memo } from 'react';
import Styles from './footer.module.scss';

export const Footer = memo(function Footer() {
  return (
    <footer className={Styles.footer}></footer>
  )
});
