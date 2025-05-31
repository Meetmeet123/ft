// PaymentDetails.jsx
"use client";
import React, { useState } from 'react';

export default function PaymentDetailsModal({ payment, onClose }) {
  const [status, setStatus] = useState('Approve');
  const [amount, setAmount] = useState(payment?.amount || 200.00);
  const [fine, setFine] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the update - in a real app, you would send this data to your API
    console.log({
      requestId: payment.requestId,
      status,
      amount,
      fine,
      comment
    });
    
    // Close the modal
    onClose();
  };

  return (
    <div className="bg-white rounded shadow-lg w-full max-w-6xl mx-auto">
      <div className="p-6">
        <h2 className="text-xl font-medium text-gray-800 mb-6">Payment Details</h2>
        
        {/* Student Details Section */}
        <div className="mb-8">
          <h3 className="text-base font-medium text-gray-700 mb-4">Student Details</h3>
          
          <div className="flex flex-col md:flex-row">
            {/* Left column */}
            <div className="w-full md:w-1/2 md:pr-4">
              <div className="bg-gray-50 p-3 mb-4">
                <div className="mb-1">
                  <span className="text-gray-600 font-medium">Admission No</span>
                </div>
                <div>{payment?.admissionNo || '18005'}</div>
              </div>
              
              <div className="mb-4">
                <div className="mb-1">
                  <span className="text-gray-600 font-medium">Name</span>
                </div>
                <div>{payment?.name || 'Glen Stark'}</div>
              </div>
              
              <div className="mb-4">
                <div className="mb-1">
                  <span className="text-gray-600 font-medium">Class</span>
                </div>
                <div>{payment?.class || 'Class 2(A)'}</div>
              </div>
              
              <div className="mb-4">
                <div className="mb-1">
                  <span className="text-gray-600 font-medium">Mobile Number</span>
                </div>
                <div>9658471234</div>
              </div>
              
              <div className="mb-4">
                <div className="mb-1">
                  <span className="text-gray-600 font-medium">Email</span>
                </div>
                <div>glen@gmail.com</div>
              </div>
            </div>
            
            {/* Right column */}
            <div className="w-full md:w-1/2 md:pl-4">
              <div className="mb-4">
                <div className="text-blue-600 font-medium">Request ID : {payment?.requestId || '53'}</div>
              </div>
              
              <div className="mb-6">
                <div className="mb-2">
                  <span className="text-gray-600 font-medium">Status</span>
                </div>
                <div className="flex items-center space-x-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-blue-600"
                      name="status"
                      value="Approve"
                      checked={status === 'Approve'}
                      onChange={() => setStatus('Approve')}
                    />
                    <span className="ml-2">Approve</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-red-600"
                      name="status"
                      value="Reject"
                      checked={status === 'Reject'}
                      onChange={() => setStatus('Reject')}
                    />
                    <span className="ml-2">Reject</span>
                  </label>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="mb-1">
                  <span className="text-gray-600 font-medium">Amount ($) <span className="text-red-500">*</span></span>
                </div>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <div className="mb-1">
                  <span className="text-gray-600 font-medium">Fine ($)</span>
                </div>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={fine}
                  onChange={(e) => setFine(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <div className="mb-1">
                  <span className="text-gray-600 font-medium">Comment / Reason</span>
                </div>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded h-24"
                  placeholder="Enter your reply"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              
              <div className="text-right">
                <button
                  onClick={handleSubmit}
                  className="btn-primary px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment Details Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-medium text-gray-700">Payment Details</h3>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-medium">
              {payment?.status || 'Pending'}
            </span>
          </div>
          
          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-x-8 gap-y-4">
            <div>
              <div className="mb-1">
                <span className="text-gray-600 font-medium">Fees Group</span>
              </div>
              <div>March Fees (Bus-fees)</div>
            </div>
            
            <div>
              <div className="mb-1">
                <span className="text-gray-600 font-medium">Fees Code</span>
              </div>
              <div>Bus-fees</div>
            </div>
            
            <div>
              <div className="mb-1">
                <span className="text-gray-600 font-medium">Date Of Submission</span>
              </div>
              <div>{payment?.submitDate || '03/23/2023 12:14 pm'}</div>
            </div>
            
            <div>
              <div className="mb-1">
                <span className="text-gray-600 font-medium">Approved / Rejected Date</span>
              </div>
              <div>{payment?.statusDate || ''}</div>
            </div>
            
            <div>
              <div className="mb-1">
                <span className="text-gray-600 font-medium">Amount</span>
              </div>
              <div>${payment?.amount?.toFixed(2) || '200.00'}</div>
            </div>
            
            <div>
              <div className="mb-1">
                <span className="text-gray-600 font-medium">Reference</span>
              </div>
              <div>teacher</div>
            </div>
            
            <div>
              <div className="mb-1">
                <span className="text-gray-600 font-medium">Date Of Payment</span>
              </div>
              <div>{payment?.paymentDate || '03/23/2023'}</div>
            </div>
            
            <div>
              <div className="mb-1">
                <span className="text-gray-600 font-medium">Payment Mode</span>
              </div>
              <div>Offline</div>
            </div>
            
            <div>
              <div className="mb-1">
                <span className="text-gray-600 font-medium">Payment From</span>
              </div>
              <div>Bank</div>
            </div>
            
            <div>
              <div className="mb-1">
                <span className="text-gray-600 font-medium">Proof Of Payment</span>
              </div>
              <div></div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="mb-1">
              <span className="text-gray-600 font-medium">Comment / Reason :</span>
            </div>
            <div>{payment?.existingComment || ''}</div>
          </div>
        </div>
      </div>
    </div>
  );
}