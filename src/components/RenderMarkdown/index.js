import ReactMarkdown  from 'react-markdown';
import gfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeSanitize from 'rehype-sanitize';

import './index.css';

export default function RenderMarkdown(props) {
  const { source, className, options } = props;

  if (options && typeof options !== 'object') {
    throw new Error('options must be objects');
  }

  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      rehypePlugins={[
        rehypeHighlight,
        rehypeAutolinkHeadings,
        rehypeSlug,
        [rehypeSanitize, {
          clobberPrefix: '',
        }],
      ]}
      children={source}
      components={options}
      className={`readme-preview ${className}`}
    />
  )
}
