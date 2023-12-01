import style from './layout.module.css';
import React, { PropsWithChildren } from 'react';
import Search from './search/search';

export default function Layout({ children }: PropsWithChildren) {
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
