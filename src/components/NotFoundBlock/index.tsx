import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        😕
        <br />
        404 error
      </h1>
    </div>
  );
};

export default NotFoundBlock;
