import React from 'react';

// Component hiển thị bảng danh sách điểm danh học sinh
function AttendanceTable({ filteredAttendances, onToggleStatus, onDelete }) {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col" className="ps-3" style={{ width: '80px' }}>No</th>
                <th scope="col">Student Name</th>
                <th scope="col">Class ID</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col" className="text-end pe-3" style={{ width: '120px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendances.length > 0 ? (
                filteredAttendances.map((item, index) => (
                  <tr key={item.id}>
                    <td className="ps-3 fw-semibold text-secondary">{index + 1}</td>
                    <td className="fw-bold">{item.name}</td>
                    <td>{item.classId}</td>
                    <td>{item.date ? item.date.split('T')[0] : 'N/A'}</td>
                    <td>
                      <span
                        className={`badge px-3 py-2 ${
                          item.status === 'PRESENT' ? 'bg-success' : 'bg-danger'
                        }`}
                        style={{ cursor: 'pointer', userSelect: 'none', minWidth: '85px' }}
                        title="Click to toggle status"
                        onClick={() => onToggleStatus(item.id)}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="text-end pe-3">
                      <button
                        className="btn btn-danger btn-sm text-white"
                        onClick={() => onDelete(item.id, item.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No records match the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AttendanceTable;
