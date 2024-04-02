import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PropTypes from 'prop-types';
import SideBar from '../components/SideBar/SideBar';
import { useAuth0 } from '@auth0/auth0-react';

jest.mock('@auth0/auth0-react');

// Mocking the MenuItems prop
const mockMenuItems = [
  { icon: <div>Icon 1</div>, value: 'Value 1' },
  { icon: <div>Icon 2</div>, value: 'Value 2' },
];

// Mocking the useAuth0 hook
const mockUser = {
  picture: 'user-picture-url',
  email: 'user@example.com',
};
useAuth0.mockReturnValue({ user: mockUser });

describe('SideBar component', () => {
  test('renders component properly', () => {
    render(
      <SideBar MenuItems={mockMenuItems} isSelected={0} SetIsSelected={() => {}} />
    );
    
    // Check if menu items are rendered
    expect(screen.getByText(/Value 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Value 2/i)).toBeInTheDocument();

    // Check if user avatar and email are rendered
    expect(screen.getByAltText('User Avatar')).toBeInTheDocument();
    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
    expect(screen.getByText(/user@example.com/i)).toBeInTheDocument();
  });

  test('calls SetIsSelected function when menu item is clicked', () => {
    const mockSetIsSelected = jest.fn();
    render(
      <SideBar MenuItems={mockMenuItems} isSelected={0} SetIsSelected={mockSetIsSelected} />
    );
    
    // Click on a menu item
    fireEvent.click(screen.getByText(/Value 1/i));

    // Check if SetIsSelected function is called
    expect(mockSetIsSelected).toHaveBeenCalledWith(0);
  });

  test('prop validation', () => {
    // Suppress console error messages for prop validation
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
    // Valid props
    const validProps = { MenuItems: [{ icon: <div />, value: 'Item 1' }] };
  
    // Render component with valid props
    render(<SideBar {...validProps} />);
  
    // Check if PropTypes warning is not printed in console
    expect(errorSpy).not.toHaveBeenCalled();
  
    // Restore console.error
    errorSpy.mockRestore();
  })  
});
