import React, { useReducer, useState, useMemo, useRef, useEffect } from 'react';
import { initialAttendances } from '../data';
import Dashboard from './Dashboard';
import FilterToolbar from './FilterToolbar';
import AttendanceTable from './AttendanceTable';


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

function getInitialData() {
  const saved = localStorage.getItem('attendances');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
  }
  return initialAttendances;
}

function AttendanceManager() {

  const [state, dispatch] = useReducer(attendanceReducer, getInitialData());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const searchInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('attendances', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === '/') {

        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (activeTag !== 'input' && activeTag !== 'textarea' && activeTag !== 'select') {
          event.preventDefault();
          if (searchInputRef.current) {
            searchInputRef.current.focus();
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  const filteredAttendances = useMemo(() => {
    return state.filter(item => {
      const matchesName = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
      return matchesName && matchesStatus;
    });
  }, [state, searchTerm, statusFilter]);


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


  function handleDelete(id, name) {
    const confirmDelete = window.confirm(`Are you sure you want to delete the attendance record for ${name}?`);
    if (confirmDelete) {
      dispatch({ type: 'DELETE_RECORD', payload: id });
    }
  }

  return (
    <div className="container py-4">
      {/* Page Title */}
      <div className="text-center mb-4">
        <h1 className="display-6 fw-bold text-black">Hệ Thống Quản Lý Điểm Danh Lớp Học</h1>
      </div>

      {/* Toolbar filters */}
      <FilterToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchInputRef={searchInputRef}
      />

      {/* Dashboard statistics */}
      <Dashboard stats={stats} />

      {/* Attendance table */}
      <AttendanceTable
        filteredAttendances={filteredAttendances}
        onToggleStatus={handleToggleStatus}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default AttendanceManager;
