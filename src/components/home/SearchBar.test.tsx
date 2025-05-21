import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  const mockSetSearchQuery = jest.fn();

  it('should render the search input', () => {
    render(
      <SearchBar
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        noResults={false}
      />
    );
    expect(screen.getByPlaceholderText('Search posts...')).toBeInTheDocument();
  });

  it('should call setSearchQuery when input value changes', () => {
    render(
      <SearchBar
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        noResults={false}
      />
    );
    const inputElement = screen.getByPlaceholderText('Search posts...');
    fireEvent.change(inputElement, { target: { value: 'test query' } });
    expect(mockSetSearchQuery).toHaveBeenCalledWith('test query');
  });

  it('should display "No posts found." message when noResults is true', () => {
    render(
      <SearchBar
        searchQuery="some query"
        setSearchQuery={mockSetSearchQuery}
        noResults={true}
      />
    );
    expect(screen.getByText('No posts found.')).toBeInTheDocument();
  });

  it('should not display "No posts found." message when noResults is false', () => {
    render(
      <SearchBar
        searchQuery=""
        setSearchQuery={mockSetSearchQuery}
        noResults={false}
      />
    );
    expect(screen.queryByText('No posts found.')).not.toBeInTheDocument();
  });

  it('should reflect the searchQuery prop in the input value', () => {
    render(
      <SearchBar
        searchQuery="initial query"
        setSearchQuery={mockSetSearchQuery}
        noResults={false}
      />
    );
    expect(screen.getByPlaceholderText('Search posts...')).toHaveValue('initial query');
  });
});
