import { allPosts } from 'contentlayer/generated';
import { getMDXComponent } from 'next-contentlayer/hooks';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Post } from '../../../types/contentlayer';
import Link from 'next/link';
import Script from 'next/script';
import { CopyButton } from '../../../components/CopyButton';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allPosts.map((post: Post) => ({
    slug: post._raw.flattenedPath.replace('posts/', ''),
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = allPosts.find(
    (post: Post) => post._raw.flattenedPath.replace('posts/', '') === params.slug
  );

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const tags = post.tags || [];
  const keywords = [...tags, 'Patrick Mauboussin', 'AI', 'Tech Blog'];

  return {
    title: `${post.title} | Patrick Mauboussin`,
    description: post.title,
    keywords: keywords,
    openGraph: {
      title: post.title,
      description: post.title,
      type: 'article',
      publishedTime: post.date,
      authors: ['Patrick Mauboussin'],
      tags: tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.title,
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = allPosts.find(
    (post: Post) => post._raw.flattenedPath.replace('posts/', '') === params.slug
  );

  if (!post) {
    notFound();
  }

  const MDXContent = getMDXComponent(post.body.code);
  const tags = post.tags || [];

  // Create content for AI summary
  const postContent = `
Title: ${post.title}
Date: ${post.formattedDate}
Tags: ${tags.join(', ')}
URL: https://patrick.mauboussin.me${post.url}

${post.body.raw}
  `;

  return (
    <>
      <article>
        <header>
          <div className="post-header-top">
            <Link href="/" className="back-link">
              ← Back to home
            </Link>
            <CopyButton text={postContent} label="Copy for AI" />
          </div>
          <h1 className="post-title">{post.title}</h1>
          <p className="post-date">{post.formattedDate}</p>
          {tags.length > 0 && (
            <div className="post-tags">
              {tags.map((tag: string) => (
                <span key={tag} className="post-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        <div className="prose">
          <MDXContent />
        </div>
        
        <footer className="post-footer">
          <p>Thanks for reading!</p>
          <p>Written by Patrick Mauboussin on {post.formattedDate}</p>
        </footer>
      </article>

      {/* Structured data for blog post */}
      <Script id="schema-blogposting" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "${post.title}",
            "datePublished": "${post.date}",
            "dateModified": "${post.date}",
            "author": {
              "@type": "Person",
              "name": "Patrick Mauboussin"
            },
            "publisher": {
              "@type": "Person",
              "name": "Patrick Mauboussin",
              "url": "https://patrick.mauboussin.me"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://patrick.mauboussin.me${post.url}"
            },
            "keywords": ${JSON.stringify(tags)}
          }
        `}
      </Script>
    </>
  );
} 