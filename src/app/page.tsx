'use client';

import type { Post } from 'contentlayer/generated'; // Changed to use generated Post type
// import { CopyButton } from '../components/CopyButton'; // CopyButton is now used within sub-components
import { usePosts } from '@/hooks/usePosts';
import SearchBar from '@/components/home/SearchBar';
import FeaturedPostSection from '@/components/home/FeaturedPostSection';
import AIPostsSection from '@/components/home/AIPostsSection';
import OtherPostsSection from '@/components/home/OtherPostsSection';
import Link from 'next/link'; // Keep if used in header or footer, otherwise remove if only in subcomponents

// Helper function to generate content for the CopyButton
// This function will be passed to components that use CopyButton
const createPostContent = (post: Post): string => {
  // Ensure summary and tags are handled if potentially undefined
  const summary = post.summary || 'No summary available.';
  const tags = post.tags?.join(', ') || 'No tags';
  const date = post.formattedDate || new Date(post.date).toLocaleDateString(); // Use formattedDate if available

  return `Title: ${post.title}\nDate: ${date}\nTags: ${tags}\nSummary: ${summary}\nLink: https://patrick.mauboussin.me${post.url}\n\n${post.body.raw}`;
};


export default function Home() {
  const {
    searchQuery,
    setSearchQuery,
    featuredPost,
    aiPostsToDisplay,
    remainingPosts,
    noResults,
  } = usePosts();

  return (
    // Using a div container similar to the original structure, instead of fragment, for consistent styling.
    // The class names like "container mx-auto..." from the initial plan might be better,
    // but sticking to minimal changes from original for now.
    <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
      {/* Header can remain here or be moved to a Layout component if it's shared across pages */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">My Tech Blog & Portfolio</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Exploring the frontiers of AI, Web Development, and more.
        </p>
      </header>

      {/* The original search and copy-all container is replaced by the SearchBar component */}
      {/* CopyAll button functionality is removed as per plan, individual copy buttons are in sections */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        noResults={noResults} // Pass noResults to SearchBar to display message
      />

      {/*
        The original `noResults` div is handled by the SearchBar component.
        The logic for displaying sections now relies on the hook's output.
      */}

      {/* Featured Post Section */}
      {/* Show featured post if it exists AND (there's no search query OR it's part of search results) */}
      {featuredPost && (!searchQuery || (featuredPost.title.toLowerCase().includes(searchQuery.toLowerCase()) || featuredPost.summary?.toLowerCase().includes(searchQuery.toLowerCase()))) && (
        <FeaturedPostSection
          post={featuredPost}
          createPostContent={createPostContent}
        />
      )}

      {/* AI Posts Section */}
      <AIPostsSection
        posts={aiPostsToDisplay}
        createPostContent={createPostContent}
        title={searchQuery ? 'Search Results in AI & Machine Learning' : 'AI Insights'}
        emptyMessage={searchQuery ? "No AI posts match your current search." : "No AI posts currently available."}
      />

      {/* Other Posts Section */}
      <OtherPostsSection
        posts={remainingPosts}
        createPostContent={createPostContent}
        title={searchQuery ? 'Other Search Results' : 'More Posts'}
        emptyMessage={searchQuery ? "No other posts match your current search." : "No other posts currently available."}
      />

      {/* Fallback for no posts at all when not searching */}
      {!searchQuery && !featuredPost && aiPostsToDisplay.length === 0 && remainingPosts.length === 0 && !noResults && (
         <section className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">No posts available at the moment.</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Please check back later for new content!</p>
        </section>
      )}
      {/* The `noResults` prop in SearchBar handles "No posts found matching 'query'" when searching. */}
      {/* The above condition handles the case where there are no posts at all, and no search is active. */}
    </div>
  );
}
