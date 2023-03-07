import React from 'react';
import Image from 'next/image';

function Jesus() {
  return (
    <div className="min-w-max">
      <Image
        src={'/icons/jesus-icon.svg'}
        width={48}
        height={48}
        className={'min-w-6'}
      />
    </div>
  );
}

export default Jesus;
