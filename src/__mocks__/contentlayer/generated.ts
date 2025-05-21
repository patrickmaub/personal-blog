import type { Post } from 'contentlayer/generated'; // Import the actual Post type for structure

// Helper to create a mock Post object
const createMockPost = (id: string, date: string, title: string, featured: boolean, tags: string[], summary: string, slug: string, bodyRaw: string = 'Default body content'): Post => ({
  _id: id,
  type: 'Post',
  title,
  date,
  featured,
  tags,
  summary,
  slug: slug || `/blog/${title.toLowerCase().replace(/\s+/g, '-')}`,
  url: slug || `/blog/${title.toLowerCase().replace(/\s+/g, '-')}`, // Assuming url is same as slug for mock
  formattedDate: new Date(date).toLocaleDateString('en-US', { // Ensure formattedDate is present
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  body: {
    raw: bodyRaw + ` ${title} ${tags.join(' ')} ${summary}`, // Include searchable content in raw body
    code: '<div>Mocked HTML or code</div>', // Mocked code, not used by usePosts directly
  },
  _raw: { // Mock _raw properties as needed, though not directly used by usePosts logic
    flattenedPath: `blog/${title.toLowerCase().replace(/\s+/g, '-')}`,
    sourceFilePath: '',
    sourceFileName: '',
    sourceFileDir: '',
    contentType: 'mdx',
  },
  // Add any other fields that your Post type might have and are used in your components/hooks
});

export const allPosts: Post[] = [
  createMockPost('post1', '2023-01-15T10:00:00.000Z', 'First Post', true, ['Tech', 'WebDev'], 'Summary of first post', '/blog/first-post'),
  createMockPost('post2', '2023-03-20T10:00:00.000Z', 'AI Advancements', false, ['AI', 'Machine Learning'], 'Exploring new AI tech', '/blog/ai-advancements'),
  createMockPost('post3', '2023-02-01T10:00:00.000Z', 'Deep Learning Basics', false, ['AI', 'Deep Learning'], 'Introduction to deep learning', '/blog/deep-learning-basics'),
  createMockPost('post4', '2023-04-05T10:00:00.000Z', 'React Best Practices', false, ['WebDev', 'React'], 'Tips for writing better React code', '/blog/react-best-practices'),
  createMockPost('post5', '2022-12-25T10:00:00.000Z', 'Oldest Post on AI', false, ['AI', 'Legacy'], 'An older post about AI', '/blog/oldest-post-ai'),
  createMockPost('post6', '2023-03-25T10:00:00.000Z', 'Another AI Post', false, ['AI', 'Tech'], 'Yet another AI discussion', '/blog/another-ai-post'),
  createMockPost('post7', '2023-01-01T10:00:00.000Z', 'Generic Post', false, [], 'A post with no specific tags or features.', '/blog/generic-post', "Body content for generic post"),
];

// If you have other named exports from 'contentlayer/generated', mock them as well.
// For example, if there's an `allPages` or similar:
// export const allPages: Page[] = [];
// export { Post } from 'contentlayer/generated'; // Re-exporting Post type might be tricky with mocks.
// It's usually better to import the actual Post type in your tests or mocks if needed for typing.
// The jest.config.js moduleNameMapper handles the overall module mock.
