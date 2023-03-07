import React from 'react';

function JesusMessage({ children }) {
  return (
    <div className="fade-up-target animate rounded-bl-3xl rounded-tr-3xl rounded-br-3xl bg-purple-600 px-3 py-4 font-light text-white">
      {children}
    </div>
  );
}

export default JesusMessage;
