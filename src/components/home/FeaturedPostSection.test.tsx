import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeaturedPostSection from './FeaturedPostSection';
import { Post } from 'contentlayer/generated'; // Using the actual type for mock
import { allPosts as mockPostsData } from '../../__mocks__/contentlayer/generated'; // Using the mock data

// Mock CopyButton to simplify testing
jest.mock('@/components/copy-button', () => ({
  CopyButton: ({ text }: { text: string }) => <button>Copy: {text}</button>,
}));

const mockCreatePostContent = jest.fn((post: Post) => `Content for ${post.title}`);

describe('FeaturedPostSection Component', () => {
  const featuredPostMock = mockPostsData.find(p => p.featured);

  it('should render nothing if no post is provided', () => {
    const { container } = render(
      <FeaturedPostSection post={null} createPostContent={mockCreatePostContent} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render the featured post if provided', () => {
    if (!featuredPostMock) {
      throw new Error('Mock featured post not found for testing.');
    }
    render(
      <FeaturedPostSection post={featuredPostMock} createPostContent={mockCreatePostContent} />
    );

    expect(screen.getByText('Featured Post')).toBeInTheDocument();
    expect(screen.getByText(featuredPostMock.title)).toBeInTheDocument();
    expect(screen.getByText(new Date(featuredPostMock.date).toLocaleDateString())).toBeInTheDocument();
    if (featuredPostMock.summary) {
      expect(screen.getByText(featuredPostMock.summary)).toBeInTheDocument();
    }
    expect(screen.getByRole('link', { name: featuredPostMock.title })).toHaveAttribute('href', featuredPostMock.slug);
    expect(screen.getByRole('link', { name: /read more/i })).toHaveAttribute('href', featuredPostMock.slug);
    expect(mockCreatePostContent).toHaveBeenCalledWith(featuredPostMock);
    expect(screen.getByText(`Content for ${featuredPostMock.title}`)).toBeInTheDocument(); // Check if CopyButton received text
  });

  it('should display tags if available', () => {
    if (!featuredPostMock) {
      throw new Error('Mock featured post not found for testing.');
    }
    // Ensure the mock featured post has tags for this test
    const postWithTags = { ...featuredPostMock, tags: ['TestTag1', 'TestTag2'] };
    render(
      <FeaturedPostSection post={postWithTags} createPostContent={mockCreatePostContent} />
    );
    expect(screen.getByText(/TestTag1, TestTag2/i)).toBeInTheDocument();
  });

  it('should not display summary if not available', () => {
    if (!featuredPostMock) {
      throw new Error('Mock featured post not found for testing.');
    }
    const postWithoutSummary = { ...featuredPostMock, summary: undefined };
    render(
      <FeaturedPostSection post={postWithoutSummary} createPostContent={mockCreatePostContent} />
    );
    // Assuming summary is a specific element, its absence means it's not rendered.
    // This depends on how you'd query for the summary. If it's just a <p>, check its non-existence.
    // For this example, we check that the text "Summary of first post" (from mock data) is NOT there.
    expect(screen.queryByText('Summary of first post')).not.toBeInTheDocument();
  });
});
