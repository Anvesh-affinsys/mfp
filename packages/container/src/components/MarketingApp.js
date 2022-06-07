// import mount  from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';

export default () => {

  const ref = useRef(null);

  useEffect(() => {

    const x=async ()=>{
      const {mount}= await import("marketing/MarketingApp")
      mount(ref.current)
    }
    x();
  },[]);

  return <div ref={ref} />;
};
