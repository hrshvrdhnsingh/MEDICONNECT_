import React from 'react';

const Pin = ({ size, image }) => {
  return (
    <svg
      height={size}
      viewBox='0 0 24 24'
      style={{
        fill: '#d00',
        transform: `translate(${-size / 2}px,${-size}px)`,
      }}
    >
      <path d='M12 2C8.13 2 5 5.13 5 9c0 4.25 7 13 7 13s7-8.75 7-13c0-3.87-3.13-7-7-7zm0 10c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z'></path>
    </svg>
  );
};

export default Pin;
