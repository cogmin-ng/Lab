import React, { useReducer, useState, useMemo, useEffect } from 'react';
import { initialAttendances } from '../data';
import Dashboard from './Dashboard';
import FilterToolbar from './FilterToolbar';
import AttendanceTable from './AttendanceTable';

// xử lý state điểm danh 
function attendanceReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_STATUS':
      return state.map(item => {
        if (item.id === action.payload) {
          return {
            ...item,
            status: item.status === 'PRESENT' ? 'ABSENT' : 'PRESENT'
          };
        }
        return item;
      });

    case 'DELETE_RECORD':
      return state.filter(item => item.id !== action.payload);

    default:
      return state;
  }
}

// Hàm lấy dữ liệu điểm danh ban đầu từ file data
function getInitialData() {
  return initialAttendances;
}

function AttendanceManager() {
  const [state, dispatch] = useReducer(attendanceReducer, getInitialData());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }

  // Lọc danh sách học sinh 
  const filteredAttendances = useMemo(() => {
    return state.filter(item => {
      const matchesName = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
      return matchesName && matchesStatus;
    });
  }, [state, searchTerm, statusFilter]);

  // Tính tỷ lệ đi học 
  const stats = useMemo(() => {
    const total = filteredAttendances.length;
    const present = filteredAttendances.filter(item => item.status === 'PRESENT').length;

    let percentage = 0;
    if (total > 0) {
      percentage = ((present / total) * 100).toFixed(1);
    }

    return {
      total: total,
      present: present,
      percentage: percentage
    };
  }, [filteredAttendances]);

  function handleToggleStatus(id) {
    dispatch({ type: 'TOGGLE_STATUS', payload: id });
  }

  // Hàm xóa học sinh 
  function handleDelete(id, name) {
    const confirmDelete = window.confirm(`Bạn muốn xóa record này đúng không ${name}?`);
    if (confirmDelete) {
      dispatch({ type: 'DELETE_RECORD', payload: id });
    }
  }


  function handleResetFilters() {
    setSearchTerm('');
    setStatusFilter('ALL');
  }

  return (
    <div className="container py-4">
      <div style={{ position: 'fixed', top: '15px', right: '15px', zIndex: 1050 }}>
        <button className="btn btn-outline-secondary shadow-sm" onClick={toggleTheme}>
          {theme === 'light' ? 'Tối' : 'Sáng'}
        </button>
      </div>

      <div className="text-center mb-4">
        <h1 className={`display-6 fw-bold ${theme === 'light' ? 'text-black' : 'text-white'}`}>
          Hệ Thống Quản Lý Điểm Danh Lớp Học
        </h1>
      </div>

      <FilterToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onReset={handleResetFilters}
      />

      <Dashboard stats={stats} theme={theme} />

      <AttendanceTable
        filteredAttendances={filteredAttendances}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AttendanceManager;
