import React from "react";
import "../css/App.css";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
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

  return (
    <div className="container-fluid  mt-5">
      <div className="row">
        {Object.keys(orders).map((key) => (
          <div
            key={key}
            className="col-6 d-flex flex-column border-1 overflow-scroll no-scrollbar"
            style={{ maxHeight: "80vh" }}
          >
            <h2 className="text-light bg-dark p-2 mt-4 rounded ">{key}</h2>

            {orders[key].length > 0 && (
              <div className="row text-light bg-secondary rounded-top ">
                <div className="col p-2">ID</div>
                <div className="col p-2">Instrument Token</div>
                <div className="col p-2">Order Type</div>
                <div className="col p-2">Transaction Type</div>
                <div className="col p-2">Quantity</div>
                <div className="col p-2">Price</div>
                <div className="col p-2">Status</div>
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
                  <div className="col p-2">
                    {order.orderType}
                  </div>
                  <div className="col p-2">
                    {order.transactionType}
                  </div>
                  <div className="col p-2">{order.quantity}</div>
                  <div className="col p-2">{order.price}</div>
                  <div className="col p-2">
                    {order.orderStatus}
                  </div>
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
