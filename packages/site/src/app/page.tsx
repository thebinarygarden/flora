import { Button } from '@flora/library/input';
import { IconInfo, IconGithub } from '@flora/library/icons';

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Flora Component Library Demo</h1>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="primary">Primary Button</Button>
          <IconInfo size={24} />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="secondary">Secondary Button</Button>
          <IconGithub size={24} />
        </div>
        <Button variant="ghost">Ghost Button</Button>
      </div>
    </div>
  );
}
