import { renderHook, act } from '@testing-library/react';
import { usePosts } from './usePosts';
import { allPosts as mockPostsData } from '../__mocks__/contentlayer/generated'; // Using the mock

// Explicitly mock contentlayer/generated if not already handled by jest.config.js for all tests
// jest.mock('contentlayer/generated', () => ({
//   allPosts: mockPostsData,
// }));
// The above is not needed due to jest.config.js moduleNameMapper

describe('usePosts Hook', () => {
  it('should sort posts by date in descending order', () => {
    const { result } = renderHook(() => usePosts());
    expect(result.current.allPosts[0].title).toBe('AI Advancements'); // Newest based on mock data dates
    expect(result.current.allPosts[1].title).toBe('Another AI Post');
    expect(result.current.allPosts[result.current.allPosts.length - 1].title).toBe('Oldest Post on AI'); // Oldest
  });

  it('should identify the featured post', () => {
    const { result } = renderHook(() => usePosts());
    expect(result.current.featuredPost).not.toBeNull();
    expect(result.current.featuredPost?.title).toBe('First Post'); // Marked as featured in mock data
  });

  it('should filter posts by search query (title, summary, tags)', async () => {
    const { result } = renderHook(() => usePosts());

    await act(async () => {
      result.current.setSearchQuery('React');
    });
    expect(result.current.featuredPost).toBeNull(); // Featured post does not match 'React'
    expect(result.current.aiPostsToDisplay.length).toBe(0);
    expect(result.current.remainingPosts.length).toBe(1);
    expect(result.current.remainingPosts[0].title).toBe('React Best Practices');
    expect(result.current.noResults).toBe(false);

    await act(async () => {
      result.current.setSearchQuery('deep learning');
    });
    expect(result.current.aiPostsToDisplay.length).toBe(1);
    expect(result.current.aiPostsToDisplay[0].title).toBe('Deep Learning Basics');
    expect(result.current.remainingPosts.length).toBe(0);
    expect(result.current.noResults).toBe(false);
    
    await act(async () => {
      result.current.setSearchQuery('Summary of first'); // Search in summary
    });
    expect(result.current.featuredPost?.title).toBe('First Post');
    expect(result.current.remainingPosts.length).toBe(0); // Featured post is the only match
    expect(result.current.noResults).toBe(false);


    await act(async () => {
      result.current.setSearchQuery('Legacy'); // Search in tags
    });
    expect(result.current.aiPostsToDisplay.length).toBe(1); // Oldest Post on AI is an AI post by tag
    expect(result.current.aiPostsToDisplay[0].title).toBe('Oldest Post on AI');
    expect(result.current.noResults).toBe(false);
  });

  it('should handle no results found', async () => {
    const { result } = renderHook(() => usePosts());
    await act(async () => {
      result.current.setSearchQuery('NonExistentQueryString');
    });
    expect(result.current.featuredPost).toBeNull();
    expect(result.current.aiPostsToDisplay.length).toBe(0);
    expect(result.current.remainingPosts.length).toBe(0);
    expect(result.current.noResults).toBe(true);
  });

  it('should return all posts (excluding featured from AI if applicable) when search query is empty', () => {
    const { result } = renderHook(() => usePosts());
    // featuredPost: 'First Post' (Tech, WebDev)
    // aiPostsToDisplay: 'AI Advancements', 'Deep Learning Basics', 'Another AI Post', 'Oldest Post on AI'
    // remainingPosts: 'React Best Practices', 'Generic Post'
    
    expect(result.current.featuredPost?.title).toBe('First Post');
    expect(result.current.aiPostsToDisplay.length).toBe(4); // All AI posts
    expect(result.current.aiPostsToDisplay.map(p => p.title)).toEqual(
      expect.arrayContaining(['AI Advancements', 'Deep Learning Basics', 'Another AI Post', 'Oldest Post on AI'])
    );
    // 'First Post' is featured, not AI, so it's not removed from aiPostsToDisplay
    // 'React Best Practices' is WebDev, not AI
    // 'Generic Post' has no tags
    expect(result.current.remainingPosts.length).toBe(2);
    expect(result.current.remainingPosts.map(p => p.title)).toEqual(
      expect.arrayContaining(['React Best Practices', 'Generic Post'])
    );
    expect(result.current.noResults).toBe(false);
  });

  it('should exclude featured post from aiPostsToDisplay if it is also an AI post', () => {
    // Temporarily modify mock data for this specific test case
    const originalFeaturedPost = mockPostsData.find(p => p.title === 'First Post');
    const aiFeaturedPost = { ...originalFeaturedPost!, featured: true, tags: ['AI', 'Tech'] };
    
    // Find 'First Post' in mockPostsData and update it
    const tempAllPosts = mockPostsData.map(p => p._id === aiFeaturedPost._id ? aiFeaturedPost : p);
    
    jest.isolateModules(() => {
      // Mock allPosts within this scope if moduleNameMapper wasn't enough or for specific overrides
      jest.doMock('contentlayer/generated', () => ({
        allPosts: tempAllPosts,
        // Re-export Post type if needed by the hook, though it should be using its own import
      }));
      const { usePosts: usePostsWithModifiedData } = require('./usePosts');
      const { result } = renderHook(() => usePostsWithModifiedData());

      expect(result.current.featuredPost?.title).toBe('First Post');
      expect(result.current.featuredPost?.tags).toContain('AI');
      // Now 'First Post' is featured AND an AI post. It should not be in aiPostsToDisplay.
      expect(result.current.aiPostsToDisplay.find(p => p._id === aiFeaturedPost._id)).toBeUndefined();
      expect(result.current.aiPostsToDisplay.length).toBe(4); // 'AI Advancements', 'Deep Learning Basics', 'Oldest Post on AI', 'Another AI Post'
    });
  });
  
  it('should exclude featured and AI posts from remainingPosts', () => {
    const { result } = renderHook(() => usePosts());
    const featuredId = result.current.featuredPost?._id;
    const aiPostIds = new Set(result.current.aiPostsToDisplay.map(p => p._id));

    result.current.remainingPosts.forEach(post => {
      expect(post._id).not.toBe(featuredId);
      expect(aiPostIds.has(post._id)).toBe(false);
    });
  });
});
