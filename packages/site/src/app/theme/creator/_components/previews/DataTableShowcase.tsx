'use client';

import { Card } from '@binarygarden/flora/ui';
import { Badge } from '@binarygarden/flora/ui';
import { Button } from '@binarygarden/flora/form';
import { useState, Fragment } from 'react';

export function DataTableShowcase() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleRowSelection = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleRowExpansion = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const users = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      role: 'Admin',
      status: 'Active',
      joined: '2023-01-15',
      lastLogin: '2 hours ago',
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@example.com',
      role: 'Editor',
      status: 'Active',
      joined: '2023-03-22',
      lastLogin: '1 day ago',
    },
    {
      id: 3,
      name: 'Carol White',
      email: 'carol@example.com',
      role: 'Viewer',
      status: 'Inactive',
      joined: '2023-05-10',
      lastLogin: '2 weeks ago',
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david@example.com',
      role: 'Editor',
      status: 'Active',
      joined: '2023-07-08',
      lastLogin: '5 minutes ago',
    },
    {
      id: 5,
      name: 'Emma Davis',
      email: 'emma@example.com',
      role: 'Admin',
      status: 'Active',
      joined: '2023-09-14',
      lastLogin: '1 hour ago',
    },
    {
      id: 6,
      name: 'Frank Wilson',
      email: 'frank@example.com',
      role: 'Viewer',
      status: 'Pending',
      joined: '2024-01-20',
      lastLogin: 'Never',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h2
          className="text-3xl font-bold"
          style={{ color: 'var(--on-background)' }}
        >
          Data Tables
        </h2>
        <p
          className="text-lg opacity-70"
          style={{ color: 'var(--on-background)' }}
        >
          Showcasing surfaceVariant in table headers, rows, filters, and
          pagination
        </p>
      </div>

      {/* Search and Filters with surfaceVariant */}
      <Card>
        <div
          className="p-5 space-y-4"
          style={{
            backgroundColor: 'var(--surface-variant)',
            color: 'var(--on-surface-variant)',
          }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full px-4 py-2 rounded"
                style={{
                  backgroundColor: 'var(--surface)',
                  color: 'var(--on-surface)',
                }}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 rounded"
                style={{
                  backgroundColor: 'var(--surface)',
                  color: 'var(--on-surface)',
                }}
              >
                <option>All Roles</option>
                <option>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              </select>
              <select
                className="px-4 py-2 rounded"
                style={{
                  backgroundColor: 'var(--surface)',
                  color: 'var(--on-surface)',
                }}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>Pending</option>
              </select>
              <Button>Filter</Button>
            </div>
          </div>

          {selectedRows.length > 0 && (
            <div
              className="flex items-center justify-between p-3 rounded"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--on-primary)',
              }}
            >
              <span className="text-sm font-medium">
                {selectedRows.length} row(s) selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline">Export</Button>
                <Button variant="outline">Delete</Button>
                <Button variant="outline" onClick={() => setSelectedRows([])}>
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Main Data Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table Header with surfaceVariant */}
            <thead
              className="text-left sticky top-0 z-10"
              style={{
                backgroundColor: 'var(--surface-variant)',
                color: 'var(--on-surface-variant)',
              }}
            >
              <tr>
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows(users.map((u) => u.id));
                      } else {
                        setSelectedRows([]);
                      }
                    }}
                    checked={selectedRows.length === users.length}
                    className="w-4 h-4"
                  />
                </th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Joined</th>
                <th className="p-4 font-semibold w-12"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <Fragment key={user.id}>
                  <tr
                    className={`border-b ${selectedRows.includes(user.id) ? 'selected' : ''}`}
                    style={{
                      backgroundColor: selectedRows.includes(user.id)
                        ? 'var(--primary)'
                        : index % 2 === 0
                          ? 'var(--surface)'
                          : 'var(--surface-variant)',
                      color: selectedRows.includes(user.id)
                        ? 'var(--on-primary)'
                        : index % 2 === 0
                          ? 'var(--on-surface)'
                          : 'var(--on-surface-variant)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(user.id)}
                        onChange={() => toggleRowSelection(user.id)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4 opacity-80">{user.email}</td>
                    <td className="p-4">
                      <Badge
                        variant={
                          user.role === 'Admin'
                            ? 'error'
                            : user.role === 'Editor'
                              ? 'info'
                              : 'neutral'
                        }
                        size="small"
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          user.status === 'Active'
                            ? 'success'
                            : user.status === 'Inactive'
                              ? 'neutral'
                              : 'warning'
                        }
                        size="small"
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4 opacity-80">{user.joined}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleRowExpansion(user.id)}
                        className="text-lg hover:opacity-70"
                      >
                        {expandedRow === user.id ? '▼' : '▶'}
                      </button>
                    </td>
                  </tr>
                  {/* Expandable Row Details with surfaceVariant */}
                  {expandedRow === user.id && (
                    <tr
                      style={{
                        backgroundColor: 'var(--surface-variant)',
                        color: 'var(--on-surface-variant)',
                      }}
                    >
                      <td colSpan={7} className="p-6">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-lg">
                            User Details
                          </h4>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm opacity-70">Full Name</p>
                                <p className="font-medium">{user.name}</p>
                              </div>
                              <div>
                                <p className="text-sm opacity-70">
                                  Email Address
                                </p>
                                <p className="font-medium">{user.email}</p>
                              </div>
                              <div>
                                <p className="text-sm opacity-70">
                                  Account Type
                                </p>
                                <p className="font-medium">{user.role}</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm opacity-70">Status</p>
                                <p className="font-medium">{user.status}</p>
                              </div>
                              <div>
                                <p className="text-sm opacity-70">
                                  Joined Date
                                </p>
                                <p className="font-medium">{user.joined}</p>
                              </div>
                              <div>
                                <p className="text-sm opacity-70">Last Login</p>
                                <p className="font-medium">{user.lastLogin}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button variant="primary">Edit User</Button>
                            <Button variant="outline">Send Message</Button>
                            <Button variant="outline">View Activity</Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer with surfaceVariant */}
        <div
          className="p-4 flex items-center justify-between border-t"
          style={{
            backgroundColor: 'var(--surface-variant)',
            color: 'var(--on-surface-variant)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="text-sm opacity-80">
            Showing {(currentPage - 1) * 10 + 1} to{' '}
            {Math.min(currentPage * 10, 50)} of 50 results
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 rounded text-sm font-medium"
                  style={{
                    backgroundColor:
                      currentPage === page
                        ? 'var(--primary)'
                        : 'var(--surface)',
                    color:
                      currentPage === page
                        ? 'var(--on-primary)'
                        : 'var(--on-surface)',
                  }}
                >
                  {page}
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
              disabled={currentPage === 5}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Compact Table Example */}
      <Card>
        <div className="p-6 space-y-4">
          <h3
            className="text-xl font-bold"
            style={{ color: 'var(--on-background)' }}
          >
            Compact Table Style
          </h3>
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-xs">
              <thead
                className="text-left"
                style={{
                  backgroundColor: 'var(--surface-variant)',
                  color: 'var(--on-surface-variant)',
                }}
              >
                <tr>
                  <th className="p-2 font-semibold">Transaction ID</th>
                  <th className="p-2 font-semibold">Date</th>
                  <th className="p-2 font-semibold">Description</th>
                  <th className="p-2 font-semibold">Amount</th>
                  <th className="p-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: 'TXN-001',
                    date: '2024-01-15',
                    desc: 'Payment received',
                    amount: '+$1,234.56',
                    status: 'Completed',
                  },
                  {
                    id: 'TXN-002',
                    date: '2024-01-14',
                    desc: 'Refund processed',
                    amount: '-$89.00',
                    status: 'Completed',
                  },
                  {
                    id: 'TXN-003',
                    date: '2024-01-14',
                    desc: 'Subscription renewal',
                    amount: '+$49.99',
                    status: 'Pending',
                  },
                  {
                    id: 'TXN-004',
                    date: '2024-01-13',
                    desc: 'Payment received',
                    amount: '+$2,500.00',
                    status: 'Completed',
                  },
                  {
                    id: 'TXN-005',
                    date: '2024-01-12',
                    desc: 'Chargeback',
                    amount: '-$150.00',
                    status: 'Failed',
                  },
                ].map((txn, index) => (
                  <tr
                    key={txn.id}
                    className="border-b"
                    style={{
                      backgroundColor:
                        index % 2 === 0
                          ? 'var(--surface)'
                          : 'var(--surface-variant)',
                      color:
                        index % 2 === 0
                          ? 'var(--on-surface)'
                          : 'var(--on-surface-variant)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <td className="p-2 font-mono">{txn.id}</td>
                    <td className="p-2 opacity-80">{txn.date}</td>
                    <td className="p-2">{txn.desc}</td>
                    <td
                      className="p-2 font-medium"
                      style={{
                        color: txn.amount.startsWith('+')
                          ? 'var(--success)'
                          : 'var(--error)',
                      }}
                    >
                      {txn.amount}
                    </td>
                    <td className="p-2">
                      <Badge
                        variant={
                          txn.status === 'Completed'
                            ? 'success'
                            : txn.status === 'Pending'
                              ? 'warning'
                              : 'error'
                        }
                        size="small"
                      >
                        {txn.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Analytics Table */}
      <Card>
        <div className="p-6 space-y-4">
          <h3
            className="text-xl font-bold"
            style={{ color: 'var(--on-background)' }}
          >
            Analytics Summary
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
                  <th className="p-3 font-semibold">Metric</th>
                  <th className="p-3 font-semibold text-right">Today</th>
                  <th className="p-3 font-semibold text-right">This Week</th>
                  <th className="p-3 font-semibold text-right">This Month</th>
                  <th className="p-3 font-semibold text-right">Change</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className="border-b"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--on-background)',
                  }}
                >
                  <td className="p-3 font-medium">Page Views</td>
                  <td className="p-3 text-right">1,234</td>
                  <td className="p-3 text-right">8,567</td>
                  <td className="p-3 text-right">32,456</td>
                  <td
                    className="p-3 text-right"
                    style={{ color: 'var(--success)' }}
                  >
                    +12.5%
                  </td>
                </tr>
                <tr
                  className="border-b"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--on-background)',
                  }}
                >
                  <td className="p-3 font-medium">Unique Visitors</td>
                  <td className="p-3 text-right">892</td>
                  <td className="p-3 text-right">5,234</td>
                  <td className="p-3 text-right">21,345</td>
                  <td
                    className="p-3 text-right"
                    style={{ color: 'var(--success)' }}
                  >
                    +8.3%
                  </td>
                </tr>
                <tr
                  className="border-b"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--on-background)',
                  }}
                >
                  <td className="p-3 font-medium">Bounce Rate</td>
                  <td className="p-3 text-right">42%</td>
                  <td className="p-3 text-right">38%</td>
                  <td className="p-3 text-right">41%</td>
                  <td
                    className="p-3 text-right"
                    style={{ color: 'var(--error)' }}
                  >
                    +3.2%
                  </td>
                </tr>
                <tr
                  className="border-b"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--on-background)',
                  }}
                >
                  <td className="p-3 font-medium">Avg. Session</td>
                  <td className="p-3 text-right">3m 24s</td>
                  <td className="p-3 text-right">4m 12s</td>
                  <td className="p-3 text-right">3m 56s</td>
                  <td
                    className="p-3 text-right"
                    style={{ color: 'var(--success)' }}
                  >
                    +5.1%
                  </td>
                </tr>
                <tr style={{ color: 'var(--on-background)' }}>
                  <td className="p-3 font-medium">Conversions</td>
                  <td className="p-3 text-right">45</td>
                  <td className="p-3 text-right">312</td>
                  <td className="p-3 text-right">1,234</td>
                  <td
                    className="p-3 text-right"
                    style={{ color: 'var(--success)' }}
                  >
                    +18.7%
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
