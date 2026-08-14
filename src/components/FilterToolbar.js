import React from 'react';

// Component thanh công cụ tìm kiếm và lọc dữ liệu học sinh
function FilterToolbar({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, onReset }) {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        <div className="row g-3 align-items-center">
          <div className="col-md-5">
            <input
              id="nameFilter"
              type="text"
              className="form-control"
              placeholder="Search by student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-5">
            <select
              id="statusFilter"
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              <option value="PRESENT">Present</option>
              <option value="ABSENT">Absent</option>
            </select>
          </div>
          <div className="col-md-2">
            <button className="btn btn-secondary w-100" onClick={onReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterToolbar;
