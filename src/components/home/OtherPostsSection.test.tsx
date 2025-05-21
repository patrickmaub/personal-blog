import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import OtherPostsSection from './OtherPostsSection';
import { Post } from 'contentlayer/generated';
import { allPosts as mockPostsData } from '../../__mocks__/contentlayer/generated';

// Mock CopyButton to simplify testing
jest.mock('@/components/copy-button', () => ({
  CopyButton: ({ text }: { text: string }) => <button>Copy: {text}</button>,
}));

const mockCreatePostContent = jest.fn((post: Post) => `Content for ${post.title}`);

describe('OtherPostsSection Component', () => {
  // Mock posts that are neither featured nor AI for this section
  const otherPostsMock = mockPostsData.filter(
    p => !p.featured && !p.tags?.includes('AI') && !p.tags?.includes('Deep Learning') && !p.tags?.includes('Machine Learning') && !p.tags?.includes('Legacy')
  );

  it('should render the title and posts if other posts are available', () => {
    render(
      <OtherPostsSection
        posts={otherPostsMock}
        createPostContent={mockCreatePostContent}
        title="More Discoveries"
        emptyMessage="No other posts."
      />
    );

    expect(screen.getByText('More Discoveries')).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBe(otherPostsMock.length);

    otherPostsMock.forEach(post => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      // Check if CopyButton received text for each post
      expect(screen.getByText(`Content for ${post.title}`)).toBeInTheDocument();
    });
  });

  it('should render the title and empty message if no other posts are available', () => {
    render(
      <OtherPostsSection
        posts={[]}
        createPostContent={mockCreatePostContent}
        title="More Discoveries"
        emptyMessage="Nothing else to see here."
      />
    );

    expect(screen.getByText('More Discoveries')).toBeInTheDocument();
    expect(screen.getByText('Nothing else to see here.')).toBeInTheDocument();
    expect(screen.queryAllByRole('article').length).toBe(0);
  });

  it('should use default title and empty message if not provided', () => {
    render(
      <OtherPostsSection
        posts={[]}
        createPostContent={mockCreatePostContent}
      />
    );
    // Default title from component: "Other Posts"
    // Default emptyMessage from component: "No other posts to display."
    expect(screen.getByText('Other Posts')).toBeInTheDocument();
    expect(screen.getByText('No other posts to display.')).toBeInTheDocument();
  });

  it('should render correct number of posts', () => {
    const limitedPosts = otherPostsMock.slice(0, 1); // e.g., only 'React Best Practices'
     if (limitedPosts.length === 0 && otherPostsMock.length > 0) {
        // This case means filtering logic for otherPostsMock might be too aggressive
        // or mock data doesn't have suitable "other" posts.
        // For the sake of the test, let's ensure at least one "other" post is used if available.
        const firstOther = mockPostsData.find(p => !p.featured && !p.tags?.includes('AI'));
        if (firstOther) limitedPosts.push(firstOther);
    }

    render(
      <OtherPostsSection
        posts={limitedPosts}
        createPostContent={mockCreatePostContent}
        title="Test Other Posts"
      />
    );
    expect(screen.getAllByRole('article').length).toBe(limitedPosts.length);
  });
});
