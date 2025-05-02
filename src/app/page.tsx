'use client';

import { allPosts } from 'contentlayer/generated';
import type { Post } from '../types/contentlayer';
import Link from 'next/link';
import { CopyButton } from '../components/CopyButton';
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  // Sort posts by date (newest first)
  const sortedPosts = allPosts.sort((a: Post, b: Post) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Function to filter posts based on search query
  const filterPosts = (posts: Post[]) => {
    if (!searchQuery.trim()) return posts;
    
    return posts.filter(post => {
      const searchTerms = searchQuery.toLowerCase().split(' ');
      const title = post.title.toLowerCase();
      const tags = post.tags?.join(' ').toLowerCase() || '';
      const body = post.body.raw.toLowerCase();
      
      return searchTerms.every(term => 
        title.includes(term) || tags.includes(term) || body.includes(term)
      );
    });
  };

  // Find the featured post (if any)
  const featuredPost = sortedPosts.find((post: Post) => post.featured);
  
  // Track displayed post IDs to prevent duplicates
  const displayedPostIds = new Set<string>();
  
  // Add featured post to displayed posts if it exists
  if (featuredPost) {
    displayedPostIds.add(featuredPost._id);
  }

  // Group posts by topic for better organization
  const aiPosts = sortedPosts.filter((post: Post) => 
    post.tags?.some(tag => 
      ['ai', 'artificial intelligence', 'machine learning', 'ml'].includes(tag.toLowerCase())
    )
  );
  
  // Get AI posts to display (limited to 3)
  const aiPostsToDisplay = searchQuery ? filterPosts(aiPosts) : aiPosts.slice(0, 3);
  
  // Add AI posts to displayed posts
  aiPostsToDisplay.forEach(post => displayedPostIds.add(post._id));

  // Get remaining posts to display
  const remainingPosts = searchQuery 
    ? filterPosts(sortedPosts).filter(post => !displayedPostIds.has(post._id))
    : sortedPosts.filter(post => !displayedPostIds.has(post._id));

  // Function to create content for a single post
  const createPostContent = (post: Post) => `
Title: ${post.title}
Date: ${post.formattedDate}
Tags: ${post.tags?.join(', ') || ''}
URL: https://patrick.mauboussin.me${post.url}

${post.body.raw}
  `;

  // Function to create content for all posts
  const createAllPostsContent = () => {
    return sortedPosts.map(post => createPostContent(post)).join('\n\n---\n\n');
  };

  // If searching and no results, show a message
  const noResults = searchQuery && filterPosts(sortedPosts).length === 0;

  return (
    <>
      {!searchQuery && (
        <section className="bio-section">
          <h2 className="visually-hidden">About Patrick Mauboussin</h2>
          <div className="bio-content">
            <p>
              Welcome to the official blog of <strong>Patrick Mauboussin</strong>. 
              Here you'll find <strong>Patrick Mauboussin</strong>'s thoughts and insights 
              on artificial intelligence, healthcare technology, and business strategy.
            </p>
            <p>
              As a professional focused on the intersection of AI and healthcare, 
              <strong> Patrick Mauboussin</strong> shares practical knowledge 
              gained from years of experience in the field. 
              Browse through the articles below or use the search function to 
              find specific topics of interest.
            </p>
          </div>
        </section>
      )}

      <div className="search-and-copy-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search posts"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="search-clear-button"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        <div className="copy-all-container">
          <CopyButton 
            text={createAllPostsContent()} 
            label="Copy All Posts" 
            tooltip="Copy content from all posts for AI tools" 
          />
        </div>
      </div>

      {noResults && (
        <div className="no-results">
          <p>No posts found matching "{searchQuery}"</p>
        </div>
      )}

      {!searchQuery && featuredPost && (
        <section className="featured-section">
          <h2 className="section-label">Featured Post</h2>
          <div className="post-item-with-copy">
            <Link href={featuredPost.url} className="post-link">
              <h3 className="post-title">
                {featuredPost.title}
              </h3>
              <p className="post-date">{featuredPost.formattedDate}</p>
            </Link>
            <CopyButton text={createPostContent(featuredPost)} label="Copy" tooltip="Copy the full article to paste into AI" />
          </div>
        </section>
      )}

      {aiPostsToDisplay.length > 0 && (
        <section className="ai-posts-section">
          <h2 className="section-label">
            {searchQuery ? 'Search Results in AI & Machine Learning' : 'AI & Machine Learning'}
          </h2>
          <ul className="post-list">
            {aiPostsToDisplay.map((post: Post) => (
              <li key={post._id} className="post-item-with-copy">
                <Link href={post.url} className="post-link">
                  <h3 className="post-title">
                    {post.title}
                  </h3>
                  <p className="post-date">{post.formattedDate}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="post-tags-small">
                      {post.tags.map((tag: string) => (
                        <span key={tag} className="post-tag-small">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
                <CopyButton text={createPostContent(post)} label="Copy" tooltip="Copy the full article to paste into AI" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {remainingPosts.length > 0 && (
        <section className="all-posts-section">
          <h2 className="section-label">
            {searchQuery ? 'Other Search Results' : 'All Posts'}
          </h2>
          <ul className="post-list">
            {remainingPosts.map((post: Post) => (
              <li key={post._id} className="post-item-with-copy">
                <div className="post-content">
                  <Link href={post.url} className="post-link">
                    <h3 className="post-title">
                      {post.title}
                    </h3>
                    <p className="post-date">{post.formattedDate}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="post-tags-small">
                        {post.tags.map((tag: string) => (
                          <span key={tag} className="post-tag-small">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </div>
                <CopyButton text={createPostContent(post)} label="Copy" tooltip="Copy the full article to paste into AI" />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
