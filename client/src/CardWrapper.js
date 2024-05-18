import React from 'react';

const CardWrapper = ({ children }) => {
  return (
    <div className="max-w max-h mx-auto bg-teal-200 bg-opacity-10 shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-5">{children}</div>
    </div>

  );
};

export default CardWrapper;
 