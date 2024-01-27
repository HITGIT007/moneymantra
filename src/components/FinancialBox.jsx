import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const FinancialBox = () => {
  return (
    <div className="container p-0">
     
        <div className="col">
          <div className="text-light  rounded">
            
            <div className="d-flex justify-content-between align-items-center border border-2 border-warning rounded p-1 mb-1 bg-dark ">
                <div>
                <div className="text-light">Available</div>
                <div className="text-light">margin</div>
                </div>
             
              <span className="text-light ms-4">---</span>
            </div>


            <div className="d-flex justify-content-between align-items-center border border-2 border-warning rounded p-1 mb-1 bg-dark ">
                <div>
                <div className="text-light">Used</div>
                <div className="text-light">margin</div>
                </div>
             
              <span className="text-light  ms-4">---</span>
            </div>
            <div className="d-flex justify-content-between align-items-center border border-2 border-warning rounded p-1 bg-dark ">
                <div>
                <div className="text-light">Available</div>
                <div className="text-light">cash</div>
                </div>
             
              <span className="text-light  ms-4">---</span>
            </div>
          </div>
        </div>
     
    </div>
  );
}

export default FinancialBox;
