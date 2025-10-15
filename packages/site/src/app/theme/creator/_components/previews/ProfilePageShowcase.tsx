'use client';

import { Card, Badge } from '@binarygarden/flora/ui';
import { Button } from '@binarygarden/flora/form';
import { useState } from 'react';
import {
  getStatusBadgeVariant,
  getLevelBadgeVariant,
  getTabStyle,
} from '../../../../../utils/colorMappingUtils';

interface Skill {
  name: string;
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
  category: 'Technical' | 'Design' | 'Management' | 'Soft Skills';
  color: 'primary' | 'secondary' | 'tertiary' | 'success';
}

interface TabData {
  id: string;
  label: string;
  color: 'primary' | 'secondary' | 'tertiary';
  content: React.ReactNode;
  badge?: string;
}

export function ProfilePageShowcase() {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock projects data
  const recentProjects = [
    {
      name: 'E-commerce Platform',
      status: 'In Progress',
      role: 'Lead Designer',
      color: 'primary',
      completion: 85,
    },
    {
      name: 'Mobile Banking App',
      status: 'Review',
      role: 'UI Designer',
      color: 'secondary',
      completion: 95,
    },
    {
      name: 'Analytics Dashboard',
      status: 'Planning',
      role: 'UX Researcher',
      color: 'tertiary',
      completion: 25,
    },
    {
      name: 'Design System v2',
      status: 'Complete',
      role: 'Design Lead',
      color: 'success',
      completion: 100,
    },
  ];

  // Mock achievements
  const achievements = [
    {
      title: 'Team Player',
      description: 'Collaborated on 50+ projects',
      icon: '🤝',
      color: 'primary',
    },
    {
      title: 'Innovation Leader',
      description: 'Introduced 3 new design processes',
      icon: '💡',
      color: 'secondary',
    },
    {
      title: 'Mentor',
      description: 'Guided 10+ junior designers',
      icon: '👩‍🏫',
      color: 'tertiary',
    },
    {
      title: 'Quality Champion',
      description: 'Maintained 98% client satisfaction',
      icon: '⭐',
      color: 'success',
    },
  ];

  // Skills data
  const skills: Skill[] = [
    // Technical Skills (Primary)
    { name: 'React', level: 'Expert', category: 'Technical', color: 'primary' },
    {
      name: 'TypeScript',
      level: 'Expert',
      category: 'Technical',
      color: 'primary',
    },
    {
      name: 'Node.js',
      level: 'Advanced',
      category: 'Technical',
      color: 'primary',
    },
    {
      name: 'GraphQL',
      level: 'Advanced',
      category: 'Technical',
      color: 'primary',
    },
    {
      name: 'Docker',
      level: 'Intermediate',
      category: 'Technical',
      color: 'primary',
    },

    // Design Skills (Secondary)
    { name: 'Figma', level: 'Expert', category: 'Design', color: 'secondary' },
    {
      name: 'UI/UX Design',
      level: 'Expert',
      category: 'Design',
      color: 'secondary',
    },
    {
      name: 'Prototyping',
      level: 'Advanced',
      category: 'Design',
      color: 'secondary',
    },
    {
      name: 'Design Systems',
      level: 'Advanced',
      category: 'Design',
      color: 'secondary',
    },
    {
      name: 'Adobe Creative Suite',
      level: 'Intermediate',
      category: 'Design',
      color: 'secondary',
    },

    // Management Skills (Tertiary)
    {
      name: 'Project Management',
      level: 'Advanced',
      category: 'Management',
      color: 'tertiary',
    },
    {
      name: 'Team Leadership',
      level: 'Advanced',
      category: 'Management',
      color: 'tertiary',
    },
    {
      name: 'Agile/Scrum',
      level: 'Expert',
      category: 'Management',
      color: 'tertiary',
    },
    {
      name: 'Strategic Planning',
      level: 'Intermediate',
      category: 'Management',
      color: 'tertiary',
    },

    // Soft Skills (Success color)
    {
      name: 'Communication',
      level: 'Expert',
      category: 'Soft Skills',
      color: 'success',
    },
    {
      name: 'Problem Solving',
      level: 'Expert',
      category: 'Soft Skills',
      color: 'success',
    },
    {
      name: 'Mentoring',
      level: 'Advanced',
      category: 'Soft Skills',
      color: 'success',
    },
    {
      name: 'Cross-functional Collaboration',
      level: 'Advanced',
      category: 'Soft Skills',
      color: 'success',
    },
  ];

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      color: 'primary' as const,
      badge: '2',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4
                className="font-semibold mb-3"
                style={{ color: 'var(--on-surface)' }}
              >
                Personal Information
              </h4>
              <div className="space-y-3">
                <div>
                  <label
                    className="text-sm opacity-70"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Full Name
                  </label>
                  <div
                    className="font-medium"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Sarah Johnson
                  </div>
                </div>
                <div>
                  <label
                    className="text-sm opacity-70"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Role
                  </label>
                  <div className="flex items-center gap-2">
                    <span
                      className="font-medium"
                      style={{ color: 'var(--on-surface)' }}
                    >
                      Senior Designer
                    </span>
                    <Badge variant="primary" size="small">
                      Active
                    </Badge>
                  </div>
                </div>
                <div>
                  <label
                    className="text-sm opacity-70"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Department
                  </label>
                  <div
                    className="font-medium"
                    style={{ color: 'var(--primary)' }}
                  >
                    Product Design
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4
                className="font-semibold mb-3"
                style={{ color: 'var(--on-surface)' }}
              >
                Contact Details
              </h4>
              <div className="space-y-3">
                <div>
                  <label
                    className="text-sm opacity-70"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Email
                  </label>
                  <div
                    className="font-medium"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    sarah.johnson@company.com
                  </div>
                </div>
                <div>
                  <label
                    className="text-sm opacity-70"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Phone
                  </label>
                  <div
                    className="font-medium"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    +1 (555) 123-4567
                  </div>
                </div>
                <div>
                  <label
                    className="text-sm opacity-70"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Location
                  </label>
                  <div
                    className="font-medium"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    San Francisco, CA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'settings',
      label: 'Settings',
      color: 'secondary' as const,
      badge: undefined,
      content: (
        <div className="space-y-6">
          <div>
            <h4
              className="font-semibold mb-3"
              style={{ color: 'var(--on-surface)' }}
            >
              Preferences
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className="font-medium"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Email Notifications
                  </div>
                  <div
                    className="text-sm opacity-70"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Receive updates about your account
                  </div>
                </div>
                <div
                  className="w-12 h-6 rounded-full flex items-center px-1 cursor-pointer"
                  style={{ backgroundColor: 'var(--secondary)' }}
                >
                  <div
                    className="w-4 h-4 rounded-full transition-transform translate-x-6"
                    style={{ backgroundColor: 'var(--on-secondary)' }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div
                    className="font-medium"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Two-Factor Authentication
                  </div>
                  <div
                    className="text-sm opacity-70"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Additional security for your account
                  </div>
                </div>
                <Badge variant="success" size="small">
                  Enabled
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h4
              className="font-semibold mb-3"
              style={{ color: 'var(--on-surface)' }}
            >
              Privacy
            </h4>
            <div className="space-y-3">
              <div
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ backgroundColor: 'var(--background)' }}
              >
                <span
                  className="font-medium"
                  style={{ color: 'var(--on-background)' }}
                >
                  Profile Visibility
                </span>
                <select
                  className="text-sm px-2 py-1 rounded border"
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)',
                    color: 'var(--on-surface)',
                  }}
                >
                  <option>Public</option>
                  <option>Team Only</option>
                  <option>Private</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'activity',
      label: 'Activity',
      color: 'tertiary' as const,
      badge: undefined,
      content: (
        <div className="space-y-4">
          <h4
            className="font-semibold mb-4"
            style={{ color: 'var(--on-surface)' }}
          >
            Recent Activity
          </h4>
          <div className="space-y-3">
            {[
              {
                action: 'Updated profile picture',
                time: '2 hours ago',
                type: 'profile',
              },
              {
                action: 'Changed password',
                time: '1 day ago',
                type: 'security',
              },
              {
                action: 'Joined Design Team',
                time: '3 days ago',
                type: 'team',
              },
              {
                action: 'Completed onboarding',
                time: '1 week ago',
                type: 'system',
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ backgroundColor: 'var(--background)' }}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor:
                      activity.type === 'profile'
                        ? 'var(--primary)'
                        : activity.type === 'security'
                          ? 'var(--success)'
                          : activity.type === 'team'
                            ? 'var(--secondary)'
                            : 'var(--tertiary)',
                  }}
                />
                <div className="flex-1">
                  <div
                    className="font-medium"
                    style={{ color: 'var(--on-background)' }}
                  >
                    {activity.action}
                  </div>
                  <div
                    className="text-sm opacity-70"
                    style={{ color: 'var(--on-background)' }}
                  >
                    {activity.time}
                  </div>
                </div>
                <Badge
                  variant={
                    activity.type === 'profile'
                      ? 'primary'
                      : activity.type === 'security'
                        ? 'success'
                        : activity.type === 'team'
                          ? 'secondary'
                          : 'tertiary'
                  }
                  size="small"
                >
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ] as TabData[];

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'Technical':
        return 'Core programming and development skills';
      case 'Design':
        return 'User experience and visual design capabilities';
      case 'Management':
        return 'Leadership and organizational abilities';
      case 'Soft Skills':
        return 'Interpersonal and communication strengths';
      default:
        return '';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Technical':
        return '⚡';
      case 'Design':
        return '🎨';
      case 'Management':
        return '📋';
      case 'Soft Skills':
        return '🤝';
      default:
        return '📌';
    }
  };

  return (
    <Card variant="flat" padding="large">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card variant="elevated" padding="large">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Profile Picture and Basic Info */}
            <div className="flex flex-col items-center md:items-start">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold mb-4"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--on-primary)',
                }}
              >
                SJ
              </div>
              <div className="text-center md:text-left">
                <h1
                  className="text-2xl font-bold mb-1"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Sarah Johnson
                </h1>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="primary" size="small">
                    Senior Designer
                  </Badge>
                  <Badge variant="success" size="small">
                    Available
                  </Badge>
                </div>
                <p
                  className="text-sm opacity-80"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Product Design Team • San Francisco, CA
                </p>
              </div>
            </div>

            {/* Stats and Actions */}
            <div className="flex-1">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: 'var(--primary)' }}
                  >
                    127
                  </div>
                  <div
                    className="text-xs opacity-70"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Projects
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: 'var(--secondary)' }}
                  >
                    4.9
                  </div>
                  <div
                    className="text-xs opacity-70"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Rating
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: 'var(--tertiary)' }}
                  >
                    3.2k
                  </div>
                  <div
                    className="text-xs opacity-70"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Followers
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: 'var(--success)' }}
                  >
                    98%
                  </div>
                  <div
                    className="text-xs opacity-70"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Success Rate
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="primary" className="flex-1">
                  💬 Message
                </Button>
                <Button variant="secondary">👥 Connect</Button>
                <Button variant="outline">📤 Share</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Projects */}
        <Card variant="outlined" padding="medium">
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: 'var(--on-surface)' }}
            >
              Recent Projects
            </h3>
            <Button variant="outline" className="text-xs px-2 py-1">
              View All →
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentProjects.map((project, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border"
                style={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4
                      className="font-medium mb-1"
                      style={{ color: 'var(--on-background)' }}
                    >
                      {project.name}
                    </h4>
                    <p
                      className="text-sm opacity-70"
                      style={{ color: 'var(--on-background)' }}
                    >
                      {project.role}
                    </p>
                  </div>
                  <Badge
                    variant={getStatusBadgeVariant(project.status)}
                    size="small"
                  >
                    {project.status}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div
                    className="flex justify-between text-xs mb-1"
                    style={{ color: 'var(--on-background)' }}
                  >
                    <span>Progress</span>
                    <span>{project.completion}%</span>
                  </div>
                  <div
                    className="w-full bg-opacity-20 rounded-full h-2"
                    style={{ backgroundColor: `var(--${project.color})40` }}
                  >
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: `var(--${project.color})`,
                        width: `${project.completion}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                        style={{
                          backgroundColor:
                            i === 0
                              ? 'var(--primary)'
                              : i === 1
                                ? 'var(--secondary)'
                                : 'var(--tertiary)',
                          color:
                            i === 0
                              ? 'var(--on-primary)'
                              : i === 1
                                ? 'var(--on-secondary)'
                                : 'var(--on-tertiary)',
                          borderColor: 'var(--background)',
                        }}
                      >
                        {i + 1}
                      </div>
                    ))}
                    <div
                      className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs"
                      style={{
                        backgroundColor: 'var(--surface)',
                        color: 'var(--on-surface)',
                        borderColor: 'var(--background)',
                      }}
                    >
                      +5
                    </div>
                  </div>
                  <Button variant="outline" className="text-xs px-2 py-1">
                    View →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Skills Section */}
        <Card variant="outlined" padding="medium">
          <div className="mb-6">
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: 'var(--on-surface)' }}
            >
              Skills & Expertise
            </h3>
            <p
              className="text-sm opacity-70"
              style={{ color: 'var(--on-surface)' }}
            >
              Categorized skills using brand color hierarchy
            </p>
          </div>

          <div className="space-y-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => {
              const firstSkill = categorySkills[0];
              return (
                <div key={category}>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                      style={{
                        backgroundColor: `var(--${firstSkill.color})`,
                        color: `var(--on-${firstSkill.color})`,
                      }}
                    >
                      {getCategoryIcon(category)}
                    </div>
                    <div>
                      <h4
                        className="font-semibold"
                        style={{ color: 'var(--on-surface)' }}
                      >
                        {category}
                      </h4>
                      <p
                        className="text-xs opacity-70"
                        style={{ color: 'var(--on-surface)' }}
                      >
                        {getCategoryDescription(category)}
                      </p>
                    </div>
                    <div
                      className="ml-auto text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `var(--${firstSkill.color})20`,
                        color: `var(--${firstSkill.color})`,
                      }}
                    >
                      {categorySkills.length} skills
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categorySkills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border"
                        style={{
                          backgroundColor: 'var(--background)',
                          borderColor: 'var(--border)',
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant={skill.color} size="small">
                            {skill.name}
                          </Badge>
                        </div>
                        <Badge
                          variant={getLevelBadgeVariant(skill.level)}
                          size="small"
                        >
                          {skill.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Skills Summary */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="text-center">
              <div
                className="text-2xl font-bold mb-1"
                style={{ color: 'var(--primary)' }}
              >
                {groupedSkills['Technical']?.length || 0}
              </div>
              <div
                className="text-xs opacity-70"
                style={{ color: 'var(--on-surface)' }}
              >
                Technical
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl font-bold mb-1"
                style={{ color: 'var(--secondary)' }}
              >
                {groupedSkills['Design']?.length || 0}
              </div>
              <div
                className="text-xs opacity-70"
                style={{ color: 'var(--on-surface)' }}
              >
                Design
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl font-bold mb-1"
                style={{ color: 'var(--tertiary)' }}
              >
                {groupedSkills['Management']?.length || 0}
              </div>
              <div
                className="text-xs opacity-70"
                style={{ color: 'var(--on-surface)' }}
              >
                Management
              </div>
            </div>
            <div className="text-center">
              <div
                className="text-2xl font-bold mb-1"
                style={{ color: 'var(--success)' }}
              >
                {groupedSkills['Soft Skills']?.length || 0}
              </div>
              <div
                className="text-xs opacity-70"
                style={{ color: 'var(--on-surface)' }}
              >
                Soft Skills
              </div>
            </div>
          </div>
        </Card>

        {/* Achievements */}
        <Card variant="outlined" padding="medium">
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: 'var(--on-surface)' }}
          >
            Achievements & Recognition
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-lg"
                style={{ backgroundColor: 'var(--background)' }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mx-auto mb-3"
                  style={{
                    backgroundColor: `var(--${achievement.color})`,
                    color: `var(--on-${achievement.color})`,
                  }}
                >
                  {achievement.icon}
                </div>
                <h4
                  className="font-semibold mb-1"
                  style={{ color: 'var(--on-background)' }}
                >
                  {achievement.title}
                </h4>
                <p
                  className="text-sm opacity-70"
                  style={{ color: 'var(--on-background)' }}
                >
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Notification Center */}
        <Card variant="outlined" padding="medium">
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: 'var(--on-surface)' }}
            >
              Notification Center
            </h3>
            <div className="flex gap-2">
              <Badge variant="info" size="small">
                3 New
              </Badge>
              <button
                className="text-sm hover:underline"
                style={{ color: 'var(--link)' }}
              >
                Mark all as read
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {/* Info Notification */}
            <div
              className="p-4 rounded-lg border-l-4 flex items-start gap-3"
              style={{
                backgroundColor: 'var(--surface)',
                borderLeftColor: 'var(--info)',
              }}
            >
              <span className="text-xl" style={{ color: 'var(--info)' }}>
                ℹ️
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p
                    className="font-semibold text-sm"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    Profile Complete
                  </p>
                  <Badge variant="info" size="small">
                    Info
                  </Badge>
                </div>
                <p
                  className="text-sm opacity-80 mb-2"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Your profile is now 100% complete! This increases your
                  visibility.
                </p>
                <span
                  className="text-xs opacity-60"
                  style={{ color: 'var(--on-surface)' }}
                >
                  2 hours ago
                </span>
              </div>
            </div>

            {/* Highlight Notification */}
            <div
              className="p-4 rounded-lg flex items-start gap-3"
              style={{
                backgroundColor: 'var(--highlight)',
                color: 'var(--on-highlight)',
              }}
            >
              <span className="text-xl">⭐</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-sm">Featured Opportunity</p>
                  <Badge variant="highlight" size="small">
                    NEW
                  </Badge>
                </div>
                <p className="text-sm opacity-90 mb-2">
                  You&apos;ve been selected for an exclusive project
                  opportunity!
                </p>
                <span className="text-xs opacity-70">1 day ago</span>
              </div>
            </div>

            {/* Neutral Notification */}
            <div
              className="p-4 rounded-lg border-l-4 flex items-start gap-3"
              style={{
                backgroundColor: 'var(--surface)',
                borderLeftColor: 'var(--neutral)',
              }}
            >
              <span className="text-xl" style={{ color: 'var(--neutral)' }}>
                📢
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p
                    className="font-semibold text-sm"
                    style={{ color: 'var(--on-surface)' }}
                  >
                    System Update
                  </p>
                  <Badge variant="neutral" size="small">
                    Notice
                  </Badge>
                </div>
                <p
                  className="text-sm opacity-80 mb-2"
                  style={{ color: 'var(--on-surface)' }}
                >
                  Scheduled maintenance on Saturday 2-4 AM. No action required.
                </p>
                <span
                  className="text-xs opacity-60"
                  style={{ color: 'var(--on-surface)' }}
                >
                  3 days ago
                </span>
              </div>
            </div>
          </div>

          {/* Surface Variant Toast Simulation */}
          <div
            className="mt-6 pt-6 border-t"
            style={{ borderColor: 'var(--border)' }}
          >
            <p
              className="text-sm opacity-70 mb-3"
              style={{ color: 'var(--on-surface)' }}
            >
              Toast notifications use surfaceVariant for emphasis:
            </p>
            <div className="flex flex-wrap gap-3">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg"
                style={{
                  backgroundColor: 'var(--surface-variant)',
                  color: 'var(--on-surface-variant)',
                }}
              >
                <span className="text-sm">✓</span>
                <span className="text-sm font-medium">Settings saved</span>
              </div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg"
                style={{
                  backgroundColor: 'var(--surface-variant)',
                  color: 'var(--on-surface-variant)',
                }}
              >
                <span className="text-sm">📸</span>
                <span className="text-sm font-medium">
                  Profile photo updated
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Tabs */}
        <Card variant="outlined" padding="medium">
          <div className="mb-6">
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: 'var(--on-surface)' }}
            >
              User Profile
            </h3>
            <p
              className="text-sm opacity-70"
              style={{ color: 'var(--on-surface)' }}
            >
              Different tab priorities using brand color hierarchy
            </p>
          </div>

          {/* Tab Navigation */}
          <div
            className="flex border-b mb-6"
            style={{ borderColor: 'var(--border)' }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-2 border-b-2 font-medium relative flex items-center gap-2"
                style={getTabStyle(tab.color, activeTab === tab.id)}
              >
                {tab.label}
                {tab.badge && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full min-w-[16px] text-center"
                    style={{
                      backgroundColor:
                        activeTab === tab.id
                          ? 'rgba(255,255,255,0.2)'
                          : 'var(--error)',
                      color:
                        activeTab === tab.id ? 'inherit' : 'var(--on-error)',
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>{tabs.find((tab) => tab.id === activeTab)?.content}</div>
        </Card>
      </div>
    </Card>
  );
}
