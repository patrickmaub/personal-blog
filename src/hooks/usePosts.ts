import { useState, useMemo } from 'react';
import { Post, allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

interface UsePostsReturn {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  featuredPost: Post | null;
  aiPostsToDisplay: Post[];
  remainingPosts: Post[];
  noResults: boolean;
  allPosts: Post[];
}

export const usePosts = (): UsePostsReturn => {
  const [searchQuery, setSearchQuery] = useState('');

  const sortedPosts = useMemo(() => {
    return allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  }, []);

  const filteredPosts = useMemo(() => {
    return sortedPosts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [sortedPosts, searchQuery]);

  const featuredPost = useMemo(() => {
    return filteredPosts.find(post => post.featured) || null;
  }, [filteredPosts]);

  const aiPosts = useMemo(() => {
    return filteredPosts.filter(post => post.tags?.includes('AI'));
  }, [filteredPosts]);

  const aiPostsToDisplay = useMemo(() => {
    if (featuredPost && aiPosts.some(post => post._id === featuredPost._id)) {
      return aiPosts.filter(post => post._id !== featuredPost._id);
    }
    return aiPosts;
  }, [aiPosts, featuredPost]);

  const remainingPosts = useMemo(() => {
    const displayedIds = new Set<string>();
    if (featuredPost) {
      displayedIds.add(featuredPost._id);
    }
    aiPostsToDisplay.forEach(post => displayedIds.add(post._id));

    return filteredPosts.filter(post => !displayedIds.has(post._id));
  }, [filteredPosts, featuredPost, aiPostsToDisplay]);

  const noResults = filteredPosts.length === 0;

  return {
    searchQuery,
    setSearchQuery,
    featuredPost,
    aiPostsToDisplay,
    remainingPosts,
    noResults,
    allPosts: sortedPosts // Exporting all sorted posts for potential use elsewhere
  };
};
