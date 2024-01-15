const Strategies = ({ orderSummaries }) => {

  const formatValue = (value) => {
    const valueText = value >= 0 ? `Profit: +${value}` : `Loss: ${value}`;
    const valueColor = value >= 0 ? "text-success" : "text-danger";
    return <div className={valueColor}>{valueText}</div>;
  };

  return (
    <div className="d-flex plain-background">
      {console.log("orderSummaries====>",orderSummaries)}
      {Object.entries(orderSummaries).map(([key, summary]) => (
        <div key={key} className="card mx-1 p-2" style={{ minWidth: "120px" }}>
          <div>Strategy: {key}</div>
          <div>Money in Market: {summary.moneyInMarket}</div>
          <div>Total Unit Bought: {summary.totalUnitBought}</div>
          <div>Total Unit Sold: {summary.totalUnitSold}</div>
          <div>Total Money Put: {summary.totalMoneyPut}</div>
          <div>Total Money Withdrawn: {summary.totalMoneyWithdrawn}</div>
          {/* Display Profit or Loss */}
          {formatValue(summary.profit)}
          <div>Subscription ID: {summary.subscriptionId}</div>
        </div>
      ))}
    </div>
  );
};

export default Strategies;
