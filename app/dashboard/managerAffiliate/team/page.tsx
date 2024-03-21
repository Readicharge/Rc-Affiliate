import React from 'react';
import TreeGraph from './component/PageComponent';

function page() {
  return (
    <div className=' h-full'>
      <TreeGraph width={1400} height={800} />
    </div>
  );
}

export default page;
