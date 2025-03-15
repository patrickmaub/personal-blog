import { allPosts } from 'contentlayer/generated';
import type { Post } from '../types/contentlayer';
import Link from 'next/link';
import { CopyButton } from '../components/CopyButton';

export default function Home() {
  // Sort posts by date (newest first)
  const sortedPosts = allPosts.sort((a: Post, b: Post) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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
  const aiPostsToDisplay = aiPosts.slice(0, 3);
  
  // Add AI posts to displayed posts
  aiPostsToDisplay.forEach(post => displayedPostIds.add(post._id));

  // Function to create content for a single post
  const createPostContent = (post: Post) => `
Title: ${post.title}
Date: ${post.formattedDate}
Tags: ${post.tags?.join(', ') || ''}
URL: https://patrick.mauboussin.me${post.url}

${post.body.raw}
  `;

  return (
    <>
      {featuredPost && (
        <section className="featured-section">
          <h2 className="section-label">Featured Post</h2>
          <div className="post-item-with-copy">
            <Link href={featuredPost.url} className="post-link">
              <h3 className="post-title">
                {featuredPost.title}
              </h3>
              <p className="post-date">{featuredPost.formattedDate}</p>
            </Link>
            <CopyButton text={createPostContent(featuredPost)} label="Copy for AI" tooltip="Copy the full article to paste into AI" />
          </div>
        </section>
      )}

      {aiPostsToDisplay.length > 0 && (
        <section className="ai-posts-section">
          <h2 className="section-label">AI & Machine Learning</h2>
          <ul className="post-list">
            {aiPostsToDisplay.map((post: Post) => (
              <li key={post._id} className="post-item-with-copy">
                <Link href={post.url} className="post-link">
                  <h3 className="post-title">
                    {post.title}
                  </h3>
                  <p className="post-date">{post.formattedDate}</p>
                </Link>
                <CopyButton text={createPostContent(post)} label="Copy for AI" tooltip="Copy the full article to paste into AI" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="all-posts-section">
        <h2 className="section-label">All Posts</h2>
        <ul className="post-list">
          {sortedPosts
            .filter((post: Post) => !displayedPostIds.has(post._id))
            .map((post: Post) => (
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
              <CopyButton text={createPostContent(post)} label="Copy for AI" tooltip="Copy the full article to paste into AI" />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
