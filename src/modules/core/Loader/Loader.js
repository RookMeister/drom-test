import React from 'react';

import  "./Loader.css";

const Loader = () => (
  <div className='spinner'>
    <div className='container'>
      <div className='loader'/>
    </div>
    <div className='shims'></div>
  </div>
);

export default Loader;