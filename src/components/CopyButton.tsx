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
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button 
      onClick={handleCopy} 
      className="copy-button"
      aria-label={label}
      title={tooltip}
    >
      {copied ? (
        <>
          <span className="copy-icon">✓</span>
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
            className="copy-icon"
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