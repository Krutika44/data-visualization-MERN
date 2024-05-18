import React from 'react';

const CardWrapper2 = ({ children }) => {
  return (
    <div className="w-[45rem] bg-teal-200 bg-opacity-10 shadow-lg rounded-lg overflow-hidden m-4">
      <div className="px-4 py-2">{children}</div>
    </div>
  );
};

export default CardWrapper2;
