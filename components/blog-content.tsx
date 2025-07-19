"use client"

import ReactMarkdown from "react-markdown"

interface BlogContentProps {
  content: string
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-[#1e3352] prose-a:text-[#4ade80] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1e3352] prose-blockquote:border-l-[#4ade80] prose-blockquote:bg-gray-50 prose-blockquote:py-1">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            return inline ? (
              <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            ) : (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code className="font-mono text-sm" {...props}>
                  {children}
                </code>
              </pre>
            )
          },
          h1: ({ children }) => <h1 className="text-4xl font-bold text-[#1e3352] mb-6 mt-8">{children}</h1>,
          h2: ({ children }) => <h2 className="text-3xl font-bold text-[#1e3352] mb-4 mt-8">{children}</h2>,
          h3: ({ children }) => <h3 className="text-2xl font-bold text-[#1e3352] mb-3 mt-6">{children}</h3>,
          p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700">{children}</ol>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#4ade80] bg-gray-50 p-4 my-6 italic">{children}</blockquote>
          ),
          strong: ({ children }) => <strong className="font-bold text-[#1e3352]">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-[#4ade80] hover:text-[#3dc76a] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
