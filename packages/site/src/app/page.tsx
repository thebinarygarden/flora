import { Button } from '@flora/library';

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Flora Component Library Demo</h1>
      <div className="space-y-4">
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="ghost">Ghost Button</Button>
      </div>
    </div>
  );
}
