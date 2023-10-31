import React from 'react';
import { ReactNode } from 'react';

export class Spinner extends React.Component {
  render(): ReactNode {
    return (
      <>
        <img
          width={60}
          src="/public/spinner.gif"
          alt="loading"
          style={{ margin: '20px' }}
        />
      </>
    );
  }
}
