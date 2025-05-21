import React from 'react';
import { Post } from 'contentlayer/generated';
import Link from 'next/link';
import { CopyButton } from '@/components/copy-button'; // Assuming CopyButton is in this path

interface FeaturedPostSectionProps {
  post: Post | null;
  createPostContent: (post: Post) => string;
}

const FeaturedPostSection: React.FC<FeaturedPostSectionProps> = ({ post, createPostContent }) => {
  if (!post) return null;

  return (
    <section className="mb-16 relative"> {/* Changed mb-12 to mb-16, added relative for the decorative line */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Featured Post</h2>
      <article key={post._id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-semibold mb-3 text-blue-600 dark:text-blue-400">
            <Link href={post.slug} className="hover:underline">
              {post.title}
            </Link>
          </h3>
          <CopyButton text={createPostContent(post)} />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {new Date(post.date).toLocaleDateString()}
          {post.tags && post.tags.length > 0 && (
            <span className="ml-2 text-gray-600 dark:text-gray-300">| Tags: {post.tags.join(', ')}</span>
          )}
        </p>
        {post.summary && (
          <p className="text-gray-700 dark:text-gray-300 mb-4">{post.summary}</p>
        )}
        <Link href={post.slug} className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200">
          Read more &rarr;
        </Link>
      </article>
      {/* Replicating the ::after pseudo-element for the bottom line */}
      <div className="absolute -bottom-8 left-0 w-8 h-px bg-gray-100 dark:bg-gray-700"></div>
    </section>
  );
};

export default FeaturedPostSection;
