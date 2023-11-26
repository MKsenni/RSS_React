import style from './layout.module.css';
import React from 'react';
import Search from './search/search';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className={style.title}>
        Star Wars <p className={style.subtitle}>: heroes</p>
      </h1>
      <Search />
      {children}
    </>
  );
}
