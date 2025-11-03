import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from './login';

describe('Login Page', () => {
  it('should render with required fields', () => {
    render(<Login />);
   
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login in' })).toBeInTheDocument();
    expect(screen.getByLabelText('Remember Me')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
  });
});
