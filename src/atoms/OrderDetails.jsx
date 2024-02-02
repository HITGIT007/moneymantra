import React, { useState } from 'react';

function OrderDetails({orderDetail}) {

 

  return (
    <div className='' style={{backgroundColor:'#bde6ff'}}>
      
      {orderDetail && (
        <div className='p-4'>
          <h3>Order Details</h3>
          <pre>{JSON.stringify(orderDetail, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;