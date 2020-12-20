import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import Shippy from './Shippy'

export default (): React.ReactNode => {  
  return (
    <div>
      <Row justify="center">
        <Col span={16}><Shippy /></Col>        
      </Row>
    </div>
  );
};
