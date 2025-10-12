import React from 'react';
import { createRoot } from 'react-dom/client';
import { type IconProps, type StrokeWidth } from 'bgflora/icons';

export const downloadSVG = async (
  iconName: string,
  IconComponent: React.ComponentType<IconProps>,
  selectedSize: number,
  selectedColor: string,
  selectedStrokeWidth: StrokeWidth
) => {
  try {
    // Create hidden container
    const container = document.createElement('div');
    Object.assign(container.style, {
      position: 'absolute',
      left: '-9999px',
      visibility: 'hidden'
    });
    document.body.appendChild(container);

    // Render icon
    const root = createRoot(container);
    await new Promise<void>((resolve) => {
      root.render(
        React.createElement(IconComponent, {
          size: selectedSize,
          color: selectedColor,
          strokeWidth: selectedStrokeWidth
        })
      );
      setTimeout(resolve, 100);
    });

    // Extract and download SVG
    const svgElement = container.querySelector('svg');
    if (!svgElement) {
      console.error('SVG element not found after rendering icon component');
      root.unmount();
      document.body.removeChild(container);
      return;
    }

    // Set size attributes and get content
    svgElement.setAttribute('width', selectedSize.toString());
    svgElement.setAttribute('height', selectedSize.toString());

    // Create and trigger download
    const blob = new Blob([svgElement.outerHTML], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    Object.assign(link, {
      href: url,
      download: `${iconName.toLowerCase()}-${selectedSize}px-${selectedStrokeWidth}.svg`
    });

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Cleanup
    root.unmount();
    document.body.removeChild(container);
  } catch (error) {
    console.error('Failed to download SVG:', error);
  }
};