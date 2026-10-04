import { redirect } from 'next/navigation';

// The groups are a carousel above every gallery page, so there is no index
// of its own; start on the first group.
export default function ComponentsIndex() {
  redirect('/components/core');
}
