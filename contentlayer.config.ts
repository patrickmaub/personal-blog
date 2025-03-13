import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { format, parseISO } from 'date-fns';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: false,
    },
    featured: {
      type: 'boolean',
      required: false,
      default: false,
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath.replace('posts/', '')}`,
    },
    formattedDate: {
      type: 'string',
      resolve: (post) => {
        return format(parseISO(post.date), 'MMMM d, yyyy');
      },
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
}); 