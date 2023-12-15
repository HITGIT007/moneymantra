const Strategies = () => {
    const strategies = [
        {
          id: 1,
          name: 'Strategy 1',
          value: 100, // Positive for profit
          totalOrder: 1000
        },
        {
          id: 2,
          name: 'Strategy 2',
          value: -80, // Negative for loss
          totalOrder: 2000
        }
      ];
    
      // Function to format the value with Profit/Loss and appropriate color
      const formatValue = (value) => {
        const valueText = value >= 0 ? `Profit: +${value}` : `Loss: ${value}`;
        const valueColor = value >= 0 ? 'text-success' : 'text-danger';
        return <div className={valueColor}>{valueText}</div>;
      };
    
      return (
        <div className="d-flex">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="card me-3 p-2" style={{ minWidth: "120px" }}>
              <div>{strategy.name}</div>
              {formatValue(strategy.value)}
              <div>Total Order: {strategy.totalOrder}</div>
            </div>
          ))}
        </div>
      );
    };
  
  export default Strategies;
  