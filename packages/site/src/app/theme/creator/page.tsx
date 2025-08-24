export default function ThemeCreator() {
  return (
    <div 
      className="min-h-screen p-8"
      style={{ 
        backgroundColor: 'var(--background)',
        color: 'var(--on-background)' 
      }}
    >
      <h1 className="text-3xl font-bold mb-4">Theme Creator</h1>
      <p style={{ color: 'var(--on-surface)' }}>Coming Soon</p>
    </div>
  );
}