import React from 'react';
import { Card } from 'react-bootstrap';

const Strategies = ({ orderSummaries }) => {
  const formatValue = (value) => {
    const valueText = value >= 0 ? `+${value}` : `${value}`;
    const valueColor = value >= 0 ? 'success' : 'danger';
    return (
      <Card.Text className={`text-${valueColor}`}>
        {value >= 0 ? 'Profit:' : 'Loss:'} {valueText}
      </Card.Text>
    );
  };

  return (
    <div className="d-flex flex-wrap justify-content-evenly">
      {Object.entries(orderSummaries).map(([key, summary]) => (
        <Card key={key} className="m-2" style={{ minWidth: '18rem', maxWidth: '22rem' }}>
          <Card.Body>
            <Card.Title>Strategy: {key}</Card.Title>
            <Card.Text>Money in Market: {summary.moneyInMarket}</Card.Text>
            <Card.Text>Total Unit Bought: {summary.totalUnitBought}</Card.Text>
            <Card.Text>Total Unit Sold: {summary.totalUnitSold}</Card.Text>
            <Card.Text>Total Money Put: {summary.totalMoneyPut}</Card.Text>
            <Card.Text>Total Money Withdrawn: {summary.totalMoneyWithdrawn}</Card.Text>
            {/* Display Profit or Loss */}
            {formatValue(summary.profit)}
            <Card.Text>Subscription ID: {summary.subscriptionId}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Strategies;
