import * as React from "react";

export interface LoremProps {
  size: 'small' | 'medium' | 'large';
  className?: string;
}

const baseSentence = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const loremContent = {
  small: baseSentence,
  medium: Array(3).fill(baseSentence).join(' '),
  large: Array(20).fill(Array(5).fill(baseSentence).join(' ')).join('\n\n')
};

export const Lorem: React.FC<LoremProps> = ({ size, className = '' }) => {
  if (size === 'large') {
    return (
      <div className={className}>
        {loremContent[size].split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  return (
    <p className={className}>
      {loremContent[size]}
    </p>
  );
};