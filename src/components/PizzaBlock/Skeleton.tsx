import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    // width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="140" cy="128" r="128" />
    <rect x="0" y="272" rx="10" ry="10" width="280" height="35" />
    <rect x="0" y="315" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="411" rx="10" ry="10" width="95" height="30" />
    <rect x="130" y="410" rx="10" ry="10" width="150" height="30" />
  </ContentLoader>
);

export default Skeleton;
