import { ReactNode } from 'react';
import { HueScope } from './_components/HueScope';
import { SectionCarousel } from './_components/SectionCarousel';

export default function ComponentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <HueScope head={<SectionCarousel />}>{children}</HueScope>;
}
