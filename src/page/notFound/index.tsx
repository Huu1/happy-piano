import React from 'react';
import { ErrorBlock } from 'antd-mobile';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <ErrorBlock
      fullPage
      status='empty'
      style={{
        '--image-height': '150px',
        '--image-height-full-page': '100vw'
      }}
      description={
        <span>
          返回首页 <Link to='/'>Home</Link>
        </span>
      }
    />
  );
};

export default Index;
