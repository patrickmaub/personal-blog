'use client';

import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  label?: string;
  tooltip?: string;
}

export function CopyButton({ text, label = 'Copy', tooltip = 'Copy content for AI tools' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err: unknown) { // Typed err as unknown
      if (err instanceof Error) {
        console.error('Failed to copy text: ', err.message);
      } else {
        console.error('Failed to copy text: An unknown error occurred');
      }
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs text-gray-400 bg-transparent p-1 rounded border-none cursor-pointer transition-colors duration-200 ease-linear whitespace-nowrap hover:text-black dark:hover:text-white focus:outline-none"
      aria-label={label}
      title={tooltip}
    >
      {copied ? (
        <>
          <span className="inline-flex">✓</span>
          <span>Copied!</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-flex" // Applied inline-flex directly
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>{label}</span>
        </>
      )}
    </button>
  );
} 