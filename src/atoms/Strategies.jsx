import React, { useState } from "react";
import { Card } from "react-bootstrap";

const Strategies = ({ orderSummaries }) => {
  console.log("orderSummaries +++===>", orderSummaries);
  const [activeStrategy, setActiveStrategy] = useState(null);
  const groupByStrategy = (summaries) => {
    const grouped = {};
    Object.values(summaries).forEach((summary) => {
      const strategy = summary.tradingStrategy;
      if (!grouped[strategy]) {
        grouped[strategy] = {
          totalProfit: 0,
          totalLoss: 0,
          details: [],
        };
      }
      if (summary.profit >= 0) {
        grouped[strategy].totalProfit += summary.profit;
      } else {
        grouped[strategy].totalLoss += summary.profit; // Assuming profit negative is a loss
      }
      grouped[strategy].details.push(summary);
    });
    return grouped;
  };
  const groupedSummaries = groupByStrategy(orderSummaries);
  const formatValue = (value) => {
    const valueText = value >= 0 ? `+${value}` : `${value}`;
    const valueColor = value >= 0 ? "success" : "danger";
    return (
      <Card.Text className={`text-${valueColor}`} style={{ fontSize: "14px" }}>
        {value >= 0 ? "Profit:" : "Loss:"} {valueText}
      </Card.Text>
    );
  };
  const handleStrategyClick = (strategy) => {
    setActiveStrategy(strategy);
  };
  return (
    <div className="d-flex align-items-center mb-3 justify-content-between w-100">
      <div
        className={`flex-wrap justify-content-evenly ${
          Object.keys(orderSummaries).length > 0
            ? "border border-2 border-info"
            : ""
        } `}
      >
        {Object.entries(groupedSummaries).map(([strategy, summary]) => (
          <Card
            key={strategy}
            className={`m-2 ${
              strategy === activeStrategy
                ? "bg-warning bg-gradient border"
                : "bg-white border "
            }`}
            style={{ width: "22rem" }}
            onClick={() => handleStrategyClick(strategy)}
          >
            <Card.Body>
              <Card.Title>{strategy}</Card.Title>
              {/* Display Total Profit or Loss for each Strategy */}
              <Card.Text>
                Total Profit: {formatValue(summary.totalProfit.toFixed(2))}
              </Card.Text>
              <Card.Text>
                Total Loss: {formatValue(summary.totalLoss.toFixed(2))}
              </Card.Text>
              {/* <div>
              {summary.details.map((detail, index) => (
                <div key={index}>
                  <hr />
                  <Card.Text>Profit/Loss: {formatValue(detail.profit)}</Card.Text>
                </div>
              ))}
            </div> */}
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="d-flex flex-wrap justify-content-evenly">
        {Object.entries(orderSummaries).map(([key, summary]) => (
          <Card
            key={key}
            className={`my-2 ${
              summary.tradingStrategy === activeStrategy
                ? "bg-dark bg-gradient border border-4 border-info text-white"
                : "bg-white border border-4 border-white"
            }`}
            style={{ width: "22rem" }}
          >
            <Card.Body className="p-1">
              <Card.Title>{key}</Card.Title>
              <Card.Text>{summary.tradingStrategy}</Card.Text>
              <div className="" style={{ fontSize: "12px" }}>
                Money in Market: {summary.moneyInMarket}
              </div>
              <div className="" style={{ fontSize: "12px" }}>
                Total Unit Bought: {summary.totalUnitBought}
              </div>
              <div className="" style={{ fontSize: "12px" }}>
                Total Unit Sold: {summary.totalUnitSold}
              </div>
              <div className="" style={{ fontSize: "12px" }}>
                Total Money Put: {summary.totalMoneyPut}
              </div>
              <div className="" style={{ fontSize: "12px" }}>
                Total Money Withdrawn: {summary.totalMoneyWithdrawn.toFixed(2)}
              </div>
              {/* Display Profit or Loss */}
              <div className="badge bg-light">
                {formatValue(summary.profit.toFixed(2))}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Strategies;
