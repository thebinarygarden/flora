'use client';

import { Card, Badge } from '@binarygarden/flora/ui';
import { Button } from '@binarygarden/flora/form';

export function LandingPageShowcase() {
  // Mock testimonials
  const testimonials = [
    {
      quote:
        'This design system transformed our workflow. We ship features 3x faster now.',
      author: 'Sarah Chen',
      role: 'Head of Design',
      company: 'TechCorp',
      color: 'primary' as const,
    },
    {
      quote:
        'The component library is incredibly well-documented and easy to customize.',
      author: 'Marcus Johnson',
      role: 'Frontend Lead',
      company: 'StartupXYZ',
      color: 'secondary' as const,
    },
    {
      quote: "Best design system investment we've made. ROI was immediate.",
      author: 'Lisa Rodriguez',
      role: 'Product Manager',
      company: 'Enterprise Co',
      color: 'tertiary' as const,
    },
  ] as const;

  // Mock pricing tiers
  const pricingTiers: Array<{
    name: string;
    price: string;
    period: string;
    description: string;
    color: 'primary' | 'secondary' | 'tertiary';
    popular?: boolean;
    features: string[];
    cta: string;
  }> = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small teams and side projects',
      color: 'tertiary',
      popular: undefined,
      features: [
        '50 Components',
        'Basic Templates',
        'Email Support',
        'Design Tokens',
      ],
      cta: 'Start Free Trial',
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'Ideal for growing teams and businesses',
      color: 'secondary',
      popular: true,
      features: [
        '200+ Components',
        'Advanced Templates',
        'Priority Support',
        'Custom Themes',
        'Figma Integration',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Enterprise',
      price: '$299',
      period: '/month',
      description: 'Full-featured solution for large organizations',
      color: 'primary',
      popular: undefined,
      features: [
        'Unlimited Components',
        'Custom Development',
        'Dedicated Support',
        'On-premise Deployment',
        'SLA Guarantee',
      ],
      cta: 'Contact Sales',
    },
  ];

  // Mock feature highlights
  const features: Array<{
    title: string;
    description: string;
    icon: string;
    color: 'primary' | 'secondary' | 'tertiary' | 'success';
    stats: string;
  }> = [
    {
      title: 'Lightning Fast',
      description:
        'Optimized for performance with tree-shaking and minimal bundle size',
      icon: '⚡',
      color: 'primary',
      stats: '50% faster loading',
    },
    {
      title: 'Fully Customizable',
      description:
        'Theme system that adapts to your brand with CSS custom properties',
      icon: '🎨',
      color: 'secondary',
      stats: '18 theme colors',
    },
    {
      title: 'Developer Friendly',
      description:
        'TypeScript-first with excellent IDE support and documentation',
      icon: '👩‍💻',
      color: 'tertiary',
      stats: '100% typed',
    },
    {
      title: 'Production Ready',
      description: 'Battle-tested components used by thousands of applications',
      icon: '🚀',
      color: 'success',
      stats: '99.9% uptime',
    },
  ];

  return (
    <Card variant="flat" padding="large">
      <div className="space-y-12">
        {/* Navigation Bar Mock */}
        <Card variant="outlined" padding="medium">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div
                className="text-xl font-bold"
                style={{ color: 'var(--primary)' }}
              >
                ✨ Flora UI
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a
                  href="#"
                  className="font-medium hover:opacity-80"
                  style={{ color: 'var(--link)' }}
                >
                  Components
                </a>
                <a
                  href="#"
                  className="hover:opacity-80"
                  style={{ color: 'var(--link)' }}
                >
                  Documentation
                </a>
                <a
                  href="#"
                  className="hover:opacity-80"
                  style={{ color: 'var(--link)' }}
                >
                  Examples
                </a>
                <a
                  href="#"
                  className="hover:opacity-80"
                  style={{ color: 'var(--link)' }}
                >
                  Pricing
                </a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="text-sm">
                Sign In
              </Button>
              <Button variant="primary" className="text-sm">
                Get Started
              </Button>
            </div>
          </div>
        </Card>

        {/* Info Announcement Banner */}
        <div
          className="p-3 rounded-lg flex items-center justify-center gap-2"
          style={{
            backgroundColor: 'var(--info)',
            color: 'var(--on-info)',
          }}
        >
          <span className="text-sm font-medium">
            ℹ️ New: Theme Creator 2.0 is now live!
          </span>
          <a
            href="#"
            className="text-sm font-bold underline hover:opacity-80"
            style={{ color: 'var(--on-info)' }}
            onClick={(e) => e.preventDefault()}
          >
            Learn more →
          </a>
        </div>

        {/* Hero Section */}
        <Card variant="flat" padding="large">
          <div className="text-center max-w-4xl mx-auto">
            {/* Highlighted promotional banner */}
            <div className="mb-6">
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                style={{
                  backgroundColor: 'var(--highlight)',
                  color: 'var(--on-highlight)',
                }}
              >
                ⭐ Limited Offer: 50% off Enterprise plans
              </span>
            </div>

            {/* Main headline */}
            <h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              style={{ color: 'var(--on-background)' }}
            >
              Build Amazing
              <span className="block" style={{ color: 'var(--primary)' }}>
                User Experiences
              </span>
            </h1>

            {/* Supporting text */}
            <p
              className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--on-background)', opacity: 0.8 }}
            >
              Design systems that scale with your team. Create consistent,
              <span style={{ color: 'var(--secondary)' }}>
                {' '}
                beautiful interfaces{' '}
              </span>
              that users love across all your products.
            </p>

            {/* CTA Buttons - Primary, Secondary, Tertiary hierarchy */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button variant="primary" className="px-8 py-3 text-lg">
                Get Started Free
              </Button>
              <Button variant="secondary" className="px-8 py-3 text-lg">
                View Documentation
              </Button>
              <Button variant="outline" className="px-6 py-3">
                Watch Demo →
              </Button>
            </div>

            {/* Trust indicators using tertiary colors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: 'var(--primary)' }}
                >
                  10k+
                </div>
                <div
                  className="text-sm"
                  style={{ color: 'var(--on-background)', opacity: 0.7 }}
                >
                  Active Users
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: 'var(--secondary)' }}
                >
                  500+
                </div>
                <div
                  className="text-sm"
                  style={{ color: 'var(--on-background)', opacity: 0.7 }}
                >
                  Components
                </div>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2"
                  style={{ color: 'var(--tertiary)' }}
                >
                  99.9%
                </div>
                <div
                  className="text-sm"
                  style={{ color: 'var(--on-background)', opacity: 0.7 }}
                >
                  Uptime
                </div>
              </div>
            </div>

            {/* Feature highlights using surface hierarchy */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card variant="outlined" padding="medium" className="text-left">
                <div
                  className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--on-primary)',
                  }}
                >
                  ⚡
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Lightning Fast
                </h3>
                <p
                  className="text-sm opacity-80"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Optimized for performance with tree-shaking and minimal bundle
                  size.
                </p>
              </Card>

              <Card variant="outlined" padding="medium" className="text-left">
                <div
                  className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: 'var(--secondary)',
                    color: 'var(--on-secondary)',
                  }}
                >
                  🎨
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Fully Customizable
                </h3>
                <p
                  className="text-sm opacity-80"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Theme system that adapts to your brand with CSS custom
                  properties.
                </p>
              </Card>

              <Card variant="outlined" padding="medium" className="text-left">
                <div
                  className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center text-sm font-bold"
                  style={{
                    backgroundColor: 'var(--tertiary)',
                    color: 'var(--on-tertiary)',
                  }}
                >
                  📱
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Mobile First
                </h3>
                <p
                  className="text-sm opacity-80"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Responsive by default with touch-friendly interactions.
                </p>
              </Card>
            </div>
          </div>
        </Card>

        {/* Features Section */}
        <Card variant="outlined" padding="large">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: 'var(--on-surface)' }}
            >
              Why Choose Flora UI?
            </h2>
            <p
              className="text-lg opacity-80 max-w-2xl mx-auto"
              style={{ color: 'var(--on-surface)' }}
            >
              Built for modern teams who need to ship quality products fast
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                variant="elevated"
                padding="medium"
                className="text-center"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mx-auto mb-4"
                  style={{
                    backgroundColor: `var(--${feature.color})`,
                    color: `var(--on-${feature.color})`,
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: 'var(--on-surface)' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm opacity-80 mb-3"
                  style={{ color: 'var(--on-surface)' }}
                >
                  {feature.description}
                </p>
                <Badge variant={feature.color} size="small">
                  {feature.stats}
                </Badge>
              </Card>
            ))}
          </div>
        </Card>

        {/* Testimonials Section */}
        <Card variant="outlined" padding="large">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: 'var(--on-surface)' }}
            >
              Trusted by Teams Worldwide
            </h2>
            <p
              className="text-lg opacity-80"
              style={{ color: 'var(--on-surface)' }}
            >
              See what our customers are saying
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} variant="elevated" padding="large">
                <div className="mb-4">
                  <div
                    className="w-1 h-12 rounded-full mb-4"
                    style={{ backgroundColor: `var(--${testimonial.color})` }}
                  />
                  <p
                    className="text-sm italic mb-4"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                    style={{
                      backgroundColor: `var(--${testimonial.color})`,
                      color: `var(--on-${testimonial.color})`,
                    }}
                  >
                    {testimonial.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div
                      className="font-medium text-sm"
                      style={{ color: 'var(--on-surface)' }}
                    >
                      {testimonial.author}
                    </div>
                    <div
                      className="text-xs opacity-70"
                      style={{ color: 'var(--on-surface)' }}
                    >
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Pricing Section */}
        <Card variant="outlined" padding="large">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: 'var(--on-surface)' }}
            >
              Choose Your Plan
            </h2>
            <p
              className="text-lg opacity-80"
              style={{ color: 'var(--on-surface)' }}
            >
              Start free, scale as you grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                variant={tier.popular ? 'elevated' : 'outlined'}
                padding="large"
                className="relative"
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge variant="success" size="small">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span
                      className="text-3xl font-bold"
                      style={{ color: `var(--${tier.color})` }}
                    >
                      {tier.price}
                    </span>
                    <span
                      className="text-sm opacity-70"
                      style={{ color: 'var(--on-surface)' }}
                    >
                      {tier.period}
                    </span>
                  </div>
                  <p
                    className="text-sm opacity-80"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center text-xs"
                        style={{
                          backgroundColor: `var(--${tier.color})`,
                          color: `var(--on-${tier.color})`,
                        }}
                      >
                        ✓
                      </div>
                      <span
                        className="text-sm"
                        style={{ color: 'var(--on-surface)' }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.popular ? tier.color : 'outline'}
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </Card>
            ))}
          </div>
        </Card>

        {/* CTA Section */}
        <Card variant="elevated" padding="large">
          <div className="text-center">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--on-surface)' }}
            >
              Ready to Get Started?
            </h2>
            <p
              className="text-lg opacity-80 mb-6"
              style={{ color: 'var(--on-surface)' }}
            >
              Join thousands of developers building amazing products with Flora
              UI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button variant="primary" className="px-8 py-3">
                Start Building Today
              </Button>
              <Button variant="outline" className="px-8 py-3">
                Book a Demo
              </Button>
            </div>

            {/* Neutral status badges */}
            <div className="flex gap-2 justify-center items-center flex-wrap">
              <Badge variant="neutral" size="small">
                Free tier available
              </Badge>
              <Badge variant="neutral" size="small">
                No credit card required
              </Badge>
              <Badge variant="info" size="small">
                14-day trial
              </Badge>
            </div>
          </div>
        </Card>

        {/* Surface Variant Toast/Notification */}
        <div className="flex justify-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-lg shadow-xl"
            style={{
              backgroundColor: 'var(--surface-variant)',
              color: 'var(--on-surface-variant)',
            }}
          >
            <span className="text-lg">🎉</span>
            <div>
              <p className="text-sm font-semibold">Welcome to Flora UI!</p>
              <p className="text-xs opacity-90 mt-1">
                Your account has been created.{' '}
                <a
                  href="#"
                  className="underline font-medium hover:opacity-80"
                  style={{ color: 'var(--on-surface-variant)' }}
                  onClick={(e) => e.preventDefault()}
                >
                  Get started →
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
