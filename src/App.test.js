import { render, screen } from '@testing-library/react';
import App from './App';

test('renders student attendance management heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Hệ Thống Quản Lý Điểm Danh Lớp Học/i);
  expect(headingElement).toBeInTheDocument();
});
