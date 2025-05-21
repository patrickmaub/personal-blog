import React from 'react';
import { Post } from 'contentlayer/generated';
import Link from 'next/link';
import { CopyButton } from '@/components/copy-button'; // Assuming CopyButton is in this path

interface OtherPostsSectionProps {
  posts: Post[];
  createPostContent: (post: Post) => string;
  title?: string;
  emptyMessage?: string;
}

const OtherPostsSection: React.FC<OtherPostsSectionProps> = ({
  posts,
  createPostContent,
  title = "Other Posts",
  emptyMessage = "No other posts to display."
}) => {
  if (posts.length === 0) {
    // Optionally render nothing or a message if there are no "other" posts
    // This might be common if all posts are e.g. AI posts or featured.
    return (
        <section className="mb-8"> {/* Changed mb-12 to mb-8 */}
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">{title}</h2>
            <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
        </section>
    );
  }

  return (
    <section className="mb-8"> {/* Added mb-8 */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">{title}</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post._id} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  <Link href={post.slug} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <CopyButton text={createPostContent(post)} />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {new Date(post.date).toLocaleDateString()}
                {post.tags && post.tags.length > 0 && (
                  <span className="ml-2 text-gray-600 dark:text-gray-300">| Tags: {post.tags.join(', ')}</span>
                )}
              </p>
              {post.summary && (
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">{post.summary}</p>
              )}
            </div>
            <Link href={post.slug} className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 self-start mt-auto">
              Read more &rarr;
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OtherPostsSection;
