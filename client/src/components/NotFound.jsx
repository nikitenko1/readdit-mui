import React from 'react';

const NotFound = () => {
  return (
    <div
      className="text-black/80 dark:text-white/75 relative"
      style={{ minHeight: 'calc(100vh - 70px' }}
    >
      <h5
        className="absolute"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        404 | NotFound
      </h5>
    </div>
  );
};

export default NotFound;
