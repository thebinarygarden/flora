"use client";

import { Card, Badge } from '@binarygarden/flora/ui';
import { Button } from '@binarygarden/flora/form';

interface StatData {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    icon: string;
    color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'error' | 'warning';
}

interface ChartData {
    label: string;
    primary: number;
    secondary: number;
    tertiary: number;
}

export function DashboardShowcase() {
    // Mock data for stats
    const stats: StatData[] = [
        {
            title: 'Total Revenue',
            value: '$45,231',
            change: '+20.1%',
            changeType: 'positive',
            icon: '💰',
            color: 'primary'
        },
        {
            title: 'Active Users',
            value: '2,340',
            change: '+180',
            changeType: 'positive',
            icon: '👥',
            color: 'secondary'
        },
        {
            title: 'Conversion Rate',
            value: '12.5%',
            change: '+2.3%',
            changeType: 'positive',
            icon: '📈',
            color: 'tertiary'
        },
        {
            title: 'Bounce Rate',
            value: '34.2%',
            change: '-5.1%',
            changeType: 'positive',
            icon: '📉',
            color: 'success'
        },
        {
            title: 'Server Errors',
            value: '23',
            change: '+12',
            changeType: 'negative',
            icon: '⚠️',
            color: 'error'
        },
        {
            title: 'Pending Orders',
            value: '156',
            change: '+45',
            changeType: 'neutral',
            icon: '📦',
            color: 'warning'
        }
    ];

    // Mock chart data
    const chartData: ChartData[] = [
        { label: 'Jan', primary: 65, secondary: 45, tertiary: 30 },
        { label: 'Feb', primary: 78, secondary: 62, tertiary: 45 },
        { label: 'Mar', primary: 82, secondary: 55, tertiary: 38 },
        { label: 'Apr', primary: 94, secondary: 73, tertiary: 52 },
        { label: 'May', primary: 88, secondary: 68, tertiary: 48 },
        { label: 'Jun', primary: 96, secondary: 82, tertiary: 65 }
    ];

    // Mock data for recent activity
    const recentActivity = [
        { user: 'John Doe', action: 'created', item: 'Project Alpha', time: '2 hours ago', status: 'success' },
        { user: 'Sarah Smith', action: 'updated', item: 'Design System', time: '4 hours ago', status: 'primary' },
        { user: 'Mike Johnson', action: 'deleted', item: 'Old Component', time: '1 day ago', status: 'error' },
        { user: 'Lisa Chen', action: 'reviewed', item: 'Pull Request #42', time: '1 day ago', status: 'secondary' },
        { user: 'Alex Turner', action: 'deployed', item: 'Version 2.1.0', time: '2 days ago', status: 'tertiary' }
    ];

    // Mock data for team status
    const teamMembers = [
        { name: 'John Doe', role: 'Frontend Dev', status: 'online', tasks: 12, color: 'primary' },
        { name: 'Sarah Smith', role: 'UI Designer', status: 'busy', tasks: 8, color: 'secondary' },
        { name: 'Mike Johnson', role: 'Backend Dev', status: 'online', tasks: 15, color: 'tertiary' },
        { name: 'Lisa Chen', role: 'QA Engineer', status: 'away', tasks: 6, color: 'success' },
        { name: 'Alex Turner', role: 'DevOps', status: 'offline', tasks: 3, color: 'warning' }
    ];

    const maxValue = Math.max(...chartData.flatMap(d => [d.primary, d.secondary, d.tertiary]));

    const getColorStyle = (color: StatData['color']) => {
        switch (color) {
            case 'primary':
                return { backgroundColor: 'var(--primary)', color: 'var(--on-primary)' };
            case 'secondary':
                return { backgroundColor: 'var(--secondary)', color: 'var(--on-secondary)' };
            case 'tertiary':
                return { backgroundColor: 'var(--tertiary)', color: 'var(--on-tertiary)' };
            case 'success':
                return { backgroundColor: 'var(--success)', color: 'var(--on-success)' };
            case 'error':
                return { backgroundColor: 'var(--error)', color: 'var(--on-error)' };
            case 'warning':
                return { backgroundColor: 'var(--warning)', color: 'var(--on-warning)' };
        }
    };

    const getChangeColor = (changeType: StatData['changeType']) => {
        switch (changeType) {
            case 'positive':
                return 'var(--success)';
            case 'negative':
                return 'var(--error)';
            case 'neutral':
                return 'var(--warning)';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'var(--success)';
            case 'busy': return 'var(--error)';
            case 'away': return 'var(--warning)';
            case 'offline': return 'var(--disabled)';
            default: return 'var(--border)';
        }
    };

    const getStatusBadgeVariant = (status: string): 'primary' | 'secondary' | 'tertiary' | 'success' | 'error' | 'warning' | 'outline' => {
        switch (status) {
            case 'success': return 'success';
            case 'primary': return 'primary';
            case 'error': return 'error';
            case 'secondary': return 'secondary';
            case 'tertiary': return 'tertiary';
            default: return 'outline';
        }
    };

    return (
        <Card variant="flat" padding="large">
            <div className="space-y-6">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2
                            className="text-2xl font-bold mb-2"
                            style={{ color: 'var(--on-background)' }}
                        >
                            Project Dashboard
                        </h2>
                        <div className="flex items-center gap-4">
                            <Badge variant="primary" size="small">Q4 2024</Badge>
                            <span
                                className="text-sm opacity-70"
                                style={{ color: 'var(--on-background)' }}
                            >
                                Last updated: 2 minutes ago
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="secondary" className="text-sm px-3 py-2">
                            📊 Export
                        </Button>
                        <Button variant="primary" className="text-sm px-3 py-2">
                            ➕ New Project
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div>
                    <h3
                        className="text-lg font-semibold mb-4"
                        style={{ color: 'var(--on-background)' }}
                    >
                        Key Metrics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {stats.map((stat, index) => (
                            <Card key={index} variant="outlined" padding="medium">
                                <div className="flex items-start justify-between mb-4">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                                        style={getColorStyle(stat.color)}
                                    >
                                        {stat.icon}
                                    </div>
                                    <div
                                        className="text-xs px-2 py-1 rounded-full font-medium"
                                        style={{
                                            color: getChangeColor(stat.changeType),
                                            backgroundColor: `${getChangeColor(stat.changeType)}20`
                                        }}
                                    >
                                        {stat.change}
                                    </div>
                                </div>

                                <div>
                                    <div
                                        className="text-2xl font-bold mb-1"
                                        style={{ color: 'var(--on-surface)' }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div
                                        className="text-sm opacity-70"
                                        style={{ color: 'var(--on-surface)' }}
                                    >
                                        {stat.title}
                                    </div>
                                </div>

                                {/* Progress indicator using the stat's color */}
                                <div className="mt-4">
                                    <div
                                        className="w-full bg-opacity-20 rounded-full h-1"
                                        style={{ backgroundColor: `${getColorStyle(stat.color).backgroundColor}40` }}
                                    >
                                        <div
                                            className="h-1 rounded-full transition-all duration-300"
                                            style={{
                                                backgroundColor: getColorStyle(stat.color).backgroundColor,
                                                width: `${65 + (index * 10)}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Charts and Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Chart Section */}
                    <Card variant="outlined" padding="medium">
                        <div className="mb-6">
                            <h3
                                className="text-lg font-semibold mb-2"
                                style={{ color: 'var(--on-surface)' }}
                            >
                                Revenue Breakdown
                            </h3>
                            <p
                                className="text-sm opacity-70"
                                style={{ color: 'var(--on-surface)' }}
                            >
                                Monthly performance across product lines
                            </p>
                        </div>

                        {/* Legend */}
                        <div className="flex gap-6 mb-6">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: 'var(--primary)' }}
                                />
                                <span
                                    className="text-sm font-medium"
                                    style={{ color: 'var(--on-surface)' }}
                                >
                                    Enterprise
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: 'var(--secondary)' }}
                                />
                                <span
                                    className="text-sm font-medium"
                                    style={{ color: 'var(--on-surface)' }}
                                >
                                    Professional
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: 'var(--tertiary)' }}
                                />
                                <span
                                    className="text-sm font-medium"
                                    style={{ color: 'var(--on-surface)' }}
                                >
                                    Starter
                                </span>
                            </div>
                        </div>

                        {/* Bar Chart */}
                        <div className="space-y-4">
                            {chartData.map((data, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div
                                        className="w-8 text-xs font-medium text-right"
                                        style={{ color: 'var(--on-surface)', opacity: 0.7 }}
                                    >
                                        {data.label}
                                    </div>
                                    <div className="flex-1 relative h-8 flex items-center gap-1">
                                        {/* Primary bar */}
                                        <div
                                            className="h-6 rounded-sm transition-all duration-700 ease-out"
                                            style={{
                                                backgroundColor: 'var(--primary)',
                                                width: `${(data.primary / maxValue) * 100}%`,
                                                animationDelay: `${index * 100}ms`
                                            }}
                                        />
                                        {/* Secondary bar */}
                                        <div
                                            className="h-6 rounded-sm transition-all duration-700 ease-out"
                                            style={{
                                                backgroundColor: 'var(--secondary)',
                                                width: `${(data.secondary / maxValue) * 100}%`,
                                                animationDelay: `${index * 100 + 50}ms`
                                            }}
                                        />
                                        {/* Tertiary bar */}
                                        <div
                                            className="h-6 rounded-sm transition-all duration-700 ease-out"
                                            style={{
                                                backgroundColor: 'var(--tertiary)',
                                                width: `${(data.tertiary / maxValue) * 100}%`,
                                                animationDelay: `${index * 100 + 100}ms`
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="w-12 text-xs text-right font-mono"
                                        style={{ color: 'var(--on-surface)', opacity: 0.7 }}
                                    >
                                        {data.primary + data.secondary + data.tertiary}k
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary stats using brand colors */}
                        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
                            <div className="text-center">
                                <div
                                    className="text-lg font-bold"
                                    style={{ color: 'var(--primary)' }}
                                >
                                    $2.4M
                                </div>
                                <div
                                    className="text-xs opacity-70"
                                    style={{ color: 'var(--on-surface)' }}
                                >
                                    Enterprise
                                </div>
                            </div>
                            <div className="text-center">
                                <div
                                    className="text-lg font-bold"
                                    style={{ color: 'var(--secondary)' }}
                                >
                                    $1.8M
                                </div>
                                <div
                                    className="text-xs opacity-70"
                                    style={{ color: 'var(--on-surface)' }}
                                >
                                    Professional
                                </div>
                            </div>
                            <div className="text-center">
                                <div
                                    className="text-lg font-bold"
                                    style={{ color: 'var(--tertiary)' }}
                                >
                                    $1.2M
                                </div>
                                <div
                                    className="text-xs opacity-70"
                                    style={{ color: 'var(--on-surface)' }}
                                >
                                    Starter
                                </div>
                            </div>
                        </div>

                        {/* Growth indicators using semantic colors */}
                        <div className="flex justify-between items-center mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                            <div className="flex items-center gap-2">
                                <span
                                    className="text-xs px-2 py-1 rounded-full font-medium"
                                    style={{
                                        backgroundColor: 'var(--success)',
                                        color: 'var(--on-success)'
                                    }}
                                >
                                    +24% growth
                                </span>
                                <span
                                    className="text-xs opacity-60"
                                    style={{ color: 'var(--on-surface)' }}
                                >
                                    vs last quarter
                                </span>
                            </div>
                            <div
                                className="text-xs opacity-60"
                                style={{ color: 'var(--on-surface)' }}
                            >
                                Updated 2 hours ago
                            </div>
                        </div>
                    </Card>

                    {/* Recent Activity */}
                    <Card variant="outlined" padding="medium">
                        <div className="flex items-center justify-between mb-4">
                            <h3
                                className="text-lg font-semibold"
                                style={{ color: 'var(--on-surface)' }}
                            >
                                Recent Activity
                            </h3>
                            <Button variant="outline" className="text-xs px-2 py-1">
                                View All →
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {recentActivity.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 rounded-lg"
                                    style={{ backgroundColor: 'var(--background)' }}
                                >
                                    <div
                                        className="w-2 h-2 rounded-full flex-shrink-0"
                                        style={{
                                            backgroundColor: activity.status === 'success' ? 'var(--success)' :
                                                activity.status === 'primary' ? 'var(--primary)' :
                                                    activity.status === 'error' ? 'var(--error)' :
                                                        activity.status === 'secondary' ? 'var(--secondary)' :
                                                            'var(--tertiary)'
                                        }}
                                    />
                                    <div className="flex-1">
                                        <div
                                            className="text-sm"
                                            style={{ color: 'var(--on-background)' }}
                                        >
                                            <span className="font-medium">{activity.user}</span>
                                            {' '}{activity.action}{' '}
                                            <span
                                                className="font-medium"
                                                style={{
                                                    color: activity.status === 'success' ? 'var(--success)' :
                                                        activity.status === 'primary' ? 'var(--primary)' :
                                                            activity.status === 'error' ? 'var(--error)' :
                                                                activity.status === 'secondary' ? 'var(--secondary)' :
                                                                    'var(--tertiary)'
                                                }}
                                            >
                                                {activity.item}
                                            </span>
                                        </div>
                                        <div
                                            className="text-xs opacity-60"
                                            style={{ color: 'var(--on-background)' }}
                                        >
                                            {activity.time}
                                        </div>
                                    </div>
                                    <Badge
                                        variant={getStatusBadgeVariant(activity.status)}
                                        size="small"
                                    >
                                        {activity.action}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Team Status */}
                <Card variant="outlined" padding="medium">
                    <div className="flex items-center justify-between mb-4">
                        <h3
                            className="text-lg font-semibold"
                            style={{ color: 'var(--on-surface)' }}
                        >
                            Team Status
                        </h3>
                        <div className="flex gap-2">
                            <Button variant="tertiary" className="text-xs px-2 py-1">
                                📊 Analytics
                            </Button>
                            <Button variant="secondary" className="text-xs px-2 py-1">
                                👥 Manage Team
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-3 rounded-lg border"
                                style={{
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'var(--border)'
                                }}
                            >
                                <div className="relative">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                                        style={{
                                            backgroundColor: `var(--${member.color})`,
                                            color: `var(--on-${member.color})`
                                        }}
                                    >
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div
                                        className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2"
                                        style={{
                                            backgroundColor: getStatusColor(member.status),
                                            borderColor: 'var(--background)'
                                        }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <div
                                        className="font-medium text-sm"
                                        style={{ color: 'var(--on-background)' }}
                                    >
                                        {member.name}
                                    </div>
                                    <div
                                        className="text-xs opacity-70"
                                        style={{ color: 'var(--on-background)' }}
                                    >
                                        {member.role}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div
                                        className="text-sm font-bold"
                                        style={{ color: `var(--${member.color})` }}
                                    >
                                        {member.tasks}
                                    </div>
                                    <div
                                        className="text-xs opacity-60"
                                        style={{ color: 'var(--on-background)' }}
                                    >
                                        tasks
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Quick Actions */}
                <Card variant="outlined" padding="medium">
                    <h3
                        className="text-lg font-semibold mb-4"
                        style={{ color: 'var(--on-surface)' }}
                    >
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Button variant="primary" className="justify-start text-left">
                            <div>
                                <div className="font-medium">New Task</div>
                                <div className="text-xs opacity-80">Create work item</div>
                            </div>
                        </Button>
                        <Button variant="secondary" className="justify-start text-left">
                            <div>
                                <div className="font-medium">Add Member</div>
                                <div className="text-xs opacity-80">Invite to team</div>
                            </div>
                        </Button>
                        <Button variant="tertiary" className="justify-start text-left">
                            <div>
                                <div className="font-medium">Schedule</div>
                                <div className="text-xs opacity-80">Plan meetings</div>
                            </div>
                        </Button>
                        <Button variant="outline" className="justify-start text-left">
                            <div>
                                <div className="font-medium">Reports</div>
                                <div className="text-xs opacity-80">View analytics</div>
                            </div>
                        </Button>
                    </div>
                </Card>
            </div>
        </Card>
    );
}
