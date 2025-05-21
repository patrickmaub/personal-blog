import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AIPostsSection from './AIPostsSection';
import { Post } from 'contentlayer/generated';
import { allPosts as mockPostsData } from '../../__mocks__/contentlayer/generated';

// Mock CopyButton to simplify testing
jest.mock('@/components/copy-button', () => ({
  CopyButton: ({ text }: { text: string }) => <button>Copy: {text}</button>,
}));

const mockCreatePostContent = jest.fn((post: Post) => `Content for ${post.title}`);

describe('AIPostsSection Component', () => {
  const aiPostsMock = mockPostsData.filter(p => p.tags?.includes('AI'));

  it('should render the title and posts if AI posts are available', () => {
    render(
      <AIPostsSection
        posts={aiPostsMock}
        createPostContent={mockCreatePostContent}
        title="AI Insights"
        emptyMessage="No AI posts."
      />
    );

    expect(screen.getByText('AI Insights')).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBe(aiPostsMock.length);

    aiPostsMock.forEach(post => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      // Check if CopyButton received text for each post
      expect(screen.getByText(`Content for ${post.title}`)).toBeInTheDocument();
    });
  });

  it('should render the title and empty message if no AI posts are available', () => {
    render(
      <AIPostsSection
        posts={[]}
        createPostContent={mockCreatePostContent}
        title="AI Insights"
        emptyMessage="No AI posts available at this moment."
      />
    );

    expect(screen.getByText('AI Insights')).toBeInTheDocument();
    expect(screen.getByText('No AI posts available at this moment.')).toBeInTheDocument();
    expect(screen.queryAllByRole('article').length).toBe(0);
  });

  it('should use default title and empty message if not provided', () => {
    render(
      <AIPostsSection
        posts={[]}
        createPostContent={mockCreatePostContent}
      />
    );
    // Default title from component: "AI Posts"
    // Default emptyMessage from component: "No AI posts found."
    expect(screen.getByText('AI Posts')).toBeInTheDocument();
    expect(screen.getByText('No AI posts found.')).toBeInTheDocument();
  });

  it('should render correct number of posts', () => {
    const limitedPosts = aiPostsMock.slice(0, 2);
    render(
      <AIPostsSection
        posts={limitedPosts}
        createPostContent={mockCreatePostContent}
        title="Test AI Posts"
      />
    );
    expect(screen.getAllByRole('article').length).toBe(limitedPosts.length);
  });
});
