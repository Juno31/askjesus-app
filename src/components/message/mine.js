import React from 'react';

function UserBubble({ children }) {
  return (
    <div className="max-w-full rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl bg-gray-200 px-4 py-3 font-normal text-black">
      {children}
    </div>
  );
}

export default UserBubble;
