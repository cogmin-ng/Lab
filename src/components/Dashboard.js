import React from 'react';

function Dashboard({ stats }) {
  return (
    <div className="row g-3 mb-4">
      <div className="col-md-4">
        <div className="card shadow-sm border-0 bg-light py-2 px-3">
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted fw-semibold">Tổng số bản ghi:</span>
            <span className="fw-bold text-black fs-5">{stats.total}</span>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card shadow-sm border-0 bg-light py-2 px-3">
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted fw-semibold">Có mặt:</span>
            <span className="fw-bold text-black fs-5">{stats.present}</span>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card shadow-sm border-0 bg-light py-2 px-3">
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted fw-semibold">Tỷ lệ đi học:</span>
            <span className="fw-bold text-black fs-5">{stats.percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
