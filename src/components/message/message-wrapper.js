import React from 'react';

function MessageWrapper({ children, type }) {
  return (
    <div className={`flex flex-1 flex-col ${type === 'jesus' ? 'items-start' : 'items-end'} gap-2`}>
      {children}
    </div>
  );
}

export default MessageWrapper;
