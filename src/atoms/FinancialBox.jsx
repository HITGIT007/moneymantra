import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const FinancialBox = () => {
  return (
    <div className="container p-0">
     
        <div className="col">
          <div className="text-light  rounded">
            
            <div className="d-flex justify-content-between align-items-center bg-secondary   border-warning  p-1 mb-1 ">
                <div>
                <div className="text-dark fw-bold">Available</div>
                <div className="text-dark fw-bold">margin</div>
                </div>
             
              <span className="text-dark fw-bold ms-4">---</span>
            </div>


            <div className="d-flex justify-content-between align-items-center   p-1 mb-1 bg-secondary ">
                <div>
                <div className="text-dark fw-bold">Used</div>
                <div className="text-dark fw-bold">margin</div>
                </div>
             
              <span className="text-dark fw-bold  ms-4">---</span>
            </div>
            <div className="d-flex justify-content-between align-items-center   p-1 bg-secondary ">
                <div>
                <div className="text-dark fw-bold">Available</div>
                <div className="text-dark fw-bold">cash</div>
                </div>
             
              <span className="text-dark fw-bold  ms-4">---</span>
            </div>
          </div>
        </div>
     
    </div>
  );
}

export default FinancialBox;
