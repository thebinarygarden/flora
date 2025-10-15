'use client';

import { Card } from '@binarygarden/flora/ui';
import { Badge } from '@binarygarden/flora/ui';
import { Button } from '@binarygarden/flora/form';
import { useState } from 'react';

export function SettingsShowcase() {
  const [activeTab, setActiveTab] = useState('account');
  const [expandedSection, setExpandedSection] = useState<string | null>(
    'notifications'
  );

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h2
          className="text-3xl font-bold"
          style={{ color: 'var(--on-background)' }}
        >
          Settings Dashboard
        </h2>
        <p
          className="text-lg opacity-70"
          style={{ color: 'var(--on-background)' }}
        >
          Showcasing surfaceVariant in settings panels, forms, and configuration
          tables
        </p>
      </div>

      {/* Settings Navigation */}
      <div
        className="flex gap-2 p-2 rounded-lg overflow-x-auto"
        style={{
          backgroundColor: 'var(--surface-variant)',
          color: 'var(--on-surface-variant)',
        }}
      >
        {['account', 'security', 'notifications', 'billing', 'api'].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded capitalize whitespace-nowrap transition-all"
              style={{
                backgroundColor:
                  activeTab === tab ? 'var(--primary)' : 'transparent',
                color:
                  activeTab === tab
                    ? 'var(--on-primary)'
                    : 'var(--on-surface-variant)',
              }}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Account Settings */}
      <Card>
        <div className="p-6 space-y-6">
          <h3
            className="text-xl font-bold"
            style={{ color: 'var(--on-background)' }}
          >
            Account Settings
          </h3>

          {/* Profile Information with surfaceVariant */}
          <div
            className="p-5 rounded-lg space-y-4"
            style={{
              backgroundColor: 'var(--surface-variant)',
              color: 'var(--on-surface-variant)',
            }}
          >
            <h4 className="font-semibold text-lg">Profile Information</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <input
                  type="text"
                  defaultValue="John"
                  className="w-full px-3 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--surface)',
                    color: 'var(--on-surface)',
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  defaultValue="Doe"
                  className="w-full px-3 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--surface)',
                    color: 'var(--on-surface)',
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="w-full px-3 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--surface)',
                    color: 'var(--on-surface)',
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-3 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--surface)',
                    color: 'var(--on-surface)',
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline">Cancel</Button>
              <Button variant="primary">Save Changes</Button>
            </div>
          </div>

          {/* Preferences with surfaceVariant */}
          <div
            className="p-5 rounded-lg space-y-4"
            style={{
              backgroundColor: 'var(--surface-variant)',
              color: 'var(--on-surface-variant)',
            }}
          >
            <h4 className="font-semibold text-lg">Preferences</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Language</p>
                  <p className="text-sm opacity-70">
                    Select your preferred language
                  </p>
                </div>
                <select
                  className="px-3 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--surface)',
                    color: 'var(--on-surface)',
                  }}
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Time Zone</p>
                  <p className="text-sm opacity-70">Your current time zone</p>
                </div>
                <select
                  className="px-3 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--surface)',
                    color: 'var(--on-surface)',
                  }}
                >
                  <option>UTC-8 (PST)</option>
                  <option>UTC-5 (EST)</option>
                  <option>UTC+0 (GMT)</option>
                  <option>UTC+1 (CET)</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Date Format</p>
                  <p className="text-sm opacity-70">How dates are displayed</p>
                </div>
                <select
                  className="px-3 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--surface)',
                    color: 'var(--on-surface)',
                  }}
                >
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Collapsible Notification Settings */}
      <Card>
        <div className="p-6 space-y-4">
          <h3
            className="text-xl font-bold"
            style={{ color: 'var(--on-background)' }}
          >
            Notification Settings
          </h3>

          {/* Email Notifications - Collapsible with surfaceVariant header */}
          <div className="space-y-2">
            <button
              onClick={() => toggleSection('notifications')}
              className="w-full p-4 rounded-lg flex items-center justify-between text-left"
              style={{
                backgroundColor: 'var(--surface-variant)',
                color: 'var(--on-surface-variant)',
              }}
            >
              <div>
                <h4 className="font-semibold">Email Notifications</h4>
                <p className="text-sm opacity-70">
                  Configure email notification preferences
                </p>
              </div>
              <span className="text-xl">
                {expandedSection === 'notifications' ? '−' : '+'}
              </span>
            </button>
            {expandedSection === 'notifications' && (
              <div className="pl-4 pr-4 pb-4 space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p
                      className="font-medium"
                      style={{ color: 'var(--on-background)' }}
                    >
                      Product Updates
                    </p>
                    <p
                      className="text-sm opacity-70"
                      style={{ color: 'var(--on-background)' }}
                    >
                      News and announcements
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p
                      className="font-medium"
                      style={{ color: 'var(--on-background)' }}
                    >
                      Security Alerts
                    </p>
                    <p
                      className="text-sm opacity-70"
                      style={{ color: 'var(--on-background)' }}
                    >
                      Important security notifications
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p
                      className="font-medium"
                      style={{ color: 'var(--on-background)' }}
                    >
                      Marketing Emails
                    </p>
                    <p
                      className="text-sm opacity-70"
                      style={{ color: 'var(--on-background)' }}
                    >
                      Promotional content and offers
                    </p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p
                      className="font-medium"
                      style={{ color: 'var(--on-background)' }}
                    >
                      Weekly Digest
                    </p>
                    <p
                      className="text-sm opacity-70"
                      style={{ color: 'var(--on-background)' }}
                    >
                      Summary of your activity
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </label>
              </div>
            )}
          </div>

          {/* Push Notifications - Collapsible with surfaceVariant header */}
          <div className="space-y-2">
            <button
              onClick={() => toggleSection('push')}
              className="w-full p-4 rounded-lg flex items-center justify-between text-left"
              style={{
                backgroundColor: 'var(--surface-variant)',
                color: 'var(--on-surface-variant)',
              }}
            >
              <div>
                <h4 className="font-semibold">Push Notifications</h4>
                <p className="text-sm opacity-70">
                  Manage mobile and desktop notifications
                </p>
              </div>
              <span className="text-xl">
                {expandedSection === 'push' ? '−' : '+'}
              </span>
            </button>
            {expandedSection === 'push' && (
              <div className="pl-4 pr-4 pb-4 space-y-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p
                      className="font-medium"
                      style={{ color: 'var(--on-background)' }}
                    >
                      Mobile Notifications
                    </p>
                    <p
                      className="text-sm opacity-70"
                      style={{ color: 'var(--on-background)' }}
                    >
                      Push to your mobile device
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p
                      className="font-medium"
                      style={{ color: 'var(--on-background)' }}
                    >
                      Desktop Notifications
                    </p>
                    <p
                      className="text-sm opacity-70"
                      style={{ color: 'var(--on-background)' }}
                    >
                      Browser notifications
                    </p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </label>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* API Settings */}
      <Card>
        <div className="p-6 space-y-6">
          <h3
            className="text-xl font-bold"
            style={{ color: 'var(--on-background)' }}
          >
            API Settings
          </h3>

          {/* API Keys with surfaceVariant */}
          <div
            className="p-5 rounded-lg space-y-4"
            style={{
              backgroundColor: 'var(--surface-variant)',
              color: 'var(--on-surface-variant)',
            }}
          >
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">API Keys</h4>
              <Button variant="outline">Generate New Key</Button>
            </div>

            {/* Production Key */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Production Key</span>
                <Badge variant="success" size="small">
                  Active
                </Badge>
              </div>
              <div
                className="p-3 rounded font-mono text-sm flex items-center justify-between"
                style={{
                  backgroundColor: 'var(--surface)',
                  color: 'var(--on-surface)',
                }}
              >
                <span>pk_live_51Hx...j8Ks2</span>
                <div className="flex gap-2">
                  <button
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor: 'var(--surface-variant)',
                      color: 'var(--on-surface-variant)',
                    }}
                  >
                    Copy
                  </button>
                  <button
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor: 'var(--surface-variant)',
                      color: 'var(--on-surface-variant)',
                    }}
                  >
                    Revoke
                  </button>
                </div>
              </div>
              <p className="text-xs opacity-70">
                Created on Jan 15, 2024 • Last used 2 hours ago
              </p>
            </div>

            {/* Development Key */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Development Key</span>
                <Badge variant="info" size="small">
                  Test
                </Badge>
              </div>
              <div
                className="p-3 rounded font-mono text-sm flex items-center justify-between"
                style={{
                  backgroundColor: 'var(--surface)',
                  color: 'var(--on-surface)',
                }}
              >
                <span>pk_test_51Hx...a3Lm9</span>
                <div className="flex gap-2">
                  <button
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor: 'var(--surface-variant)',
                      color: 'var(--on-surface-variant)',
                    }}
                  >
                    Copy
                  </button>
                  <button
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      backgroundColor: 'var(--surface-variant)',
                      color: 'var(--on-surface-variant)',
                    }}
                  >
                    Revoke
                  </button>
                </div>
              </div>
              <p className="text-xs opacity-70">
                Created on Dec 1, 2023 • Last used 1 day ago
              </p>
            </div>
          </div>

          {/* Webhook Configuration with surfaceVariant */}
          <div
            className="p-5 rounded-lg space-y-4"
            style={{
              backgroundColor: 'var(--surface-variant)',
              color: 'var(--on-surface-variant)',
            }}
          >
            <h4 className="font-semibold text-lg">Webhook Endpoints</h4>

            <div className="space-y-3">
              <div
                className="p-3 rounded space-y-2"
                style={{
                  backgroundColor: 'var(--surface)',
                  color: 'var(--on-surface)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">
                    https://api.example.com/webhook
                  </span>
                  <Badge variant="success" size="small">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs opacity-70">
                  <span>Events: payment.success, user.created</span>
                  <button className="underline">Edit</button>
                </div>
              </div>

              <div
                className="p-3 rounded space-y-2"
                style={{
                  backgroundColor: 'var(--surface)',
                  color: 'var(--on-surface)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">
                    https://dev.example.com/webhook
                  </span>
                  <Badge variant="warning" size="small">
                    Pending
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs opacity-70">
                  <span>Events: all</span>
                  <button className="underline">Edit</button>
                </div>
              </div>
            </div>

            <Button variant="outline">Add Webhook</Button>
          </div>
        </div>
      </Card>

      {/* Configuration Table */}
      <Card>
        <div className="p-6 space-y-6">
          <h3
            className="text-xl font-bold"
            style={{ color: 'var(--on-background)' }}
          >
            Advanced Configuration
          </h3>

          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-sm">
              <thead
                className="text-left"
                style={{
                  backgroundColor: 'var(--surface-variant)',
                  color: 'var(--on-surface-variant)',
                }}
              >
                <tr>
                  <th className="p-3">Setting</th>
                  <th className="p-3">Value</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className="border-b"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <td className="p-3" style={{ color: 'var(--on-background)' }}>
                    <div>
                      <p className="font-medium">Max Upload Size</p>
                      <p className="text-xs opacity-70">
                        Maximum file upload limit
                      </p>
                    </div>
                  </td>
                  <td
                    className="p-3 font-mono"
                    style={{ color: 'var(--on-background)' }}
                  >
                    10MB
                  </td>
                  <td className="p-3" style={{ color: 'var(--on-background)' }}>
                    Integer
                  </td>
                  <td className="p-3">
                    <Badge variant="success" size="small">
                      Active
                    </Badge>
                  </td>
                  <td className="p-3">
                    <button
                      className="text-xs underline"
                      style={{ color: 'var(--primary)' }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                <tr
                  className="border-b"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <td className="p-3" style={{ color: 'var(--on-background)' }}>
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-xs opacity-70">
                        Auto-logout after inactivity
                      </p>
                    </div>
                  </td>
                  <td
                    className="p-3 font-mono"
                    style={{ color: 'var(--on-background)' }}
                  >
                    30m
                  </td>
                  <td className="p-3" style={{ color: 'var(--on-background)' }}>
                    Duration
                  </td>
                  <td className="p-3">
                    <Badge variant="success" size="small">
                      Active
                    </Badge>
                  </td>
                  <td className="p-3">
                    <button
                      className="text-xs underline"
                      style={{ color: 'var(--primary)' }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                <tr
                  className="border-b"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <td className="p-3" style={{ color: 'var(--on-background)' }}>
                    <div>
                      <p className="font-medium">Two-Factor Auth</p>
                      <p className="text-xs opacity-70">
                        Require 2FA for login
                      </p>
                    </div>
                  </td>
                  <td
                    className="p-3 font-mono"
                    style={{ color: 'var(--on-background)' }}
                  >
                    Enabled
                  </td>
                  <td className="p-3" style={{ color: 'var(--on-background)' }}>
                    Boolean
                  </td>
                  <td className="p-3">
                    <Badge variant="success" size="small">
                      Active
                    </Badge>
                  </td>
                  <td className="p-3">
                    <button
                      className="text-xs underline"
                      style={{ color: 'var(--primary)' }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                <tr
                  className="border-b"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <td className="p-3" style={{ color: 'var(--on-background)' }}>
                    <div>
                      <p className="font-medium">API Rate Limit</p>
                      <p className="text-xs opacity-70">Requests per minute</p>
                    </div>
                  </td>
                  <td
                    className="p-3 font-mono"
                    style={{ color: 'var(--on-background)' }}
                  >
                    100/min
                  </td>
                  <td className="p-3" style={{ color: 'var(--on-background)' }}>
                    Rate
                  </td>
                  <td className="p-3">
                    <Badge variant="success" size="small">
                      Active
                    </Badge>
                  </td>
                  <td className="p-3">
                    <button
                      className="text-xs underline"
                      style={{ color: 'var(--primary)' }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3" style={{ color: 'var(--on-background)' }}>
                    <div>
                      <p className="font-medium">Data Retention</p>
                      <p className="text-xs opacity-70">
                        How long to keep logs
                      </p>
                    </div>
                  </td>
                  <td
                    className="p-3 font-mono"
                    style={{ color: 'var(--on-background)' }}
                  >
                    90 days
                  </td>
                  <td className="p-3" style={{ color: 'var(--on-background)' }}>
                    Duration
                  </td>
                  <td className="p-3">
                    <Badge variant="info" size="small">
                      Custom
                    </Badge>
                  </td>
                  <td className="p-3">
                    <button
                      className="text-xs underline"
                      style={{ color: 'var(--primary)' }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
