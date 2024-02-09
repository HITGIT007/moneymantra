import React from "react";
import "../css/App.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import * as XLSX from 'xlsx';

const OrderDetails = ({ orders }) => {
  const formatTimestamp = (timestampArray) => {
    if (!timestampArray) return "";
    const [year, month, day, hour, minute, second] = timestampArray;
    return new Date(
      year,
      month - 1,
      day,
      hour,
      minute,
      second
    ).toLocaleString();
  };
  const renderTooltip = (order) => (
    <Tooltip id={`tooltip-${order.id}`} className="my-tooltip">
      <div className="text-start">
        <strong>Features:</strong>
        <div>Market Order ID: {order.features.marketOrderId}</div>
        <div>Stoploss Order ID: {order.features.stoplossOrderId}</div>
        <div>Square Off Order ID: {order.features.squareOffOrderId}</div>
        <div>Limit Order ID: {order.features.limitOrderId}</div>
        <div>Real Order: {order.features.placeRealOrder ? "Yes" : "No"}</div>
        <div>Past Tick: {order.features.pastTickTimeStamp ? "Yes" : "No"}</div>
        <div>
          Trigger Tick Time:{" "}
          {formatTimestamp(order.features.triggerTickTimeStamp)}
        </div>
        <div>Trigger Tick ID: {order.features.triggerTickId}</div>
        <div>Parent Order: {order.features.parentOrder ? "Yes" : "No"}</div>
        <div>Child Order: {order.features.childOrder ? "Yes" : "No"}</div>
      </div>
    </Tooltip>
  );
  const handleExcel = (orders) => {
    const wb = XLSX.utils.book_new();
    const wsData = [];
  
    wsData.push([
      'ID',
      'Instrument Token',
      'Order Type',
      'Transaction Type',
      'Quantity',
      'Price',
      'Status',
      'Strategy',
      'Timestamp',
      'Child Order',
      'Limit Order ID',
      'Market Order ID',
      'Parent Order',
      'Past Tick Time Stamp',
      'Place Real Order',
      'Square Off Order ID',
      'Stoploss Order ID',
      'Trigger Tick ID',
    ]);
  
    orders.forEach((order) => {
      wsData.push([
        order.id,
        order.instrumentToken,
        order.orderType,
        order.transactionType,
        order.quantity,
        order.price,
        order.orderStatus,
        order.tradingStrategy,
        formatTimestamp(order.timestamp),
        order.features.childOrder ? 'Yes' : 'No',
        order.features.limitOrderId,
        order.features.marketOrderId,
        order.features.parentOrder ? 'Yes' : 'No',
        order.features.pastTickTimeStamp ? 'Yes' : 'No',
        order.features.placeRealOrder ? 'Yes' : 'No',
        order.features.squareOffOrderId,
        order.features.stoplossOrderId,
        order.features.triggerTickId,
      ]);
    });
  
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
  
    XLSX.writeFile(wb, 'Orders.xlsx');
  };
  const handleExcelEach = (orders, key) => {
   
    const wb = XLSX.utils.book_new();
  
    const wsData = [
      [
        'ID',
        'Instrument Token',
        'Order Type',
        'Transaction Type',
        'Quantity',
        'Price',
        'Status',
        'Strategy',
        'Timestamp',
        'Child Order',
        'Limit Order ID',
        'Market Order ID',
        'Parent Order',
        'Past Tick Time Stamp',
        'Place Real Order',
        'Square Off Order ID',
        'Stoploss Order ID',
        'Trigger Tick ID',
      ],
    ];
  
    orders.forEach((order) => {
      wsData.push([
        order.id,
        order.instrumentToken,
        order.orderType,
        order.transactionType,
        order.quantity,
        order.price,
        order.orderStatus,
        order.tradingStrategy,
        formatTimestamp(order.timestamp),
        order.features?.childOrder ? 'Yes' : 'No',
        order.features?.limitOrderId ?? '',
        order.features?.marketOrderId ?? '',
        order.features?.parentOrder ? 'Yes' : 'No',
        order.features?.pastTickTimeStamp ? formatTimestamp(order.features.triggerTickTimeStamp) : 'No',
        order.features?.placeRealOrder ? 'Yes' : 'No',
        order.features?.squareOffOrderId ?? '',
        order.features?.stoplossOrderId ?? '',
        order.features?.triggerTickId ?? '',
      ]);
    });
  
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'OrderDetails');
  

    XLSX.writeFile(wb, `${key} - ${orders[0].tradingStrategy}.xlsx`);
  };
  
  
  return (
    <div className="container-fluid  my-2 py-2">
      <div className="d-flex align-items-center mb-3 text-warning btn">
      <div className="me-2" onClick={() => handleExcel(Object.values(orders).flat())}>
                <img src={require("../assets/images/excel.png")} alt="excel" style={{height:'27px'}}/>
              </div> DOWNLAOD ALL
      </div>
      
      <div className="row">
        {Object.keys(orders).map((key) => (
          <div
            key={key}
            className="col-6 d-flex flex-column border-1 overflow-scroll no-scrollbar"
            style={{ maxHeight: "80vh" }}
          >
            <div className="text-light bg-dark p-2 mt-4 rounded d-flex align-items-center justify-content-between">
              <h3 >{key}</h3>
              <div className="" onClick={() => handleExcelEach(orders[key],key)}>
                <img src={require("../assets/images/excel.png")} alt="excel" style={{height:'27px'}}/>
              </div>
            </div>

            {orders[key].length > 0 && (
              <div className="row text-light bg-secondary rounded-top ">
                <div className="col p-2">ID</div>
                <div className="col p-2">Instrument Token</div>
                <div className="col p-2">Order Type</div>
                <div className="col p-2">Transaction Type</div>
                <div className="col p-2">Quantity</div>
                <div className="col p-2">Price</div>
                <div className="col p-2">Status</div>
                <div className="col p-2">Timestamp</div>
                <div className="col p-2">Strategy</div>
              </div>
            )}

            {orders[key].length > 0 &&
              orders[key].map((order) => (
                <div
                  className="row bg-dark text-light border-bottom border-secondary "
                  key={order.id}
                >
                  <div className="col p-2">{order.id}</div>
                  <div className="col p-2">{order.instrumentToken}</div>
                  <div className="col p-2">{order.orderType}</div>
                  <div className="col p-2">{order.transactionType}</div>
                  <div className="col p-2">{order.quantity}</div>
                  <div className="col p-2">{order.price}</div>
                  <div className="col p-2">{order.orderStatus}</div>
                  <div className="col p-2">{formatTimestamp(order.timestamp)}</div>
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip(order)}
                  >
                    <div className="col p-2">{order.tradingStrategy}</div>
                  </OverlayTrigger>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
