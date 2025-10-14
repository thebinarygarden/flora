"use client";

import {Card} from '@binarygarden/flora/ui';
import {Badge} from '@binarygarden/flora/ui';
import {Button} from '@binarygarden/flora/form';

export function EcommerceShowcase() {
    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold" style={{ color: 'var(--on-background)' }}>
                    E-commerce Store
                </h2>
                <p className="text-lg opacity-70" style={{ color: 'var(--on-background)' }}>
                    Showcasing surfaceVariant in product displays, filters, and checkout
                </p>
            </div>

            {/* Product Grid with Filters Sidebar */}
            <div className="grid lg:grid-cols-4 gap-6">
                {/* Filters Sidebar with surfaceVariant */}
                <div className="lg:col-span-1">
                    <div
                        className="p-6 rounded-lg space-y-6 sticky top-4"
                        style={{
                            backgroundColor: 'var(--surface-variant)',
                            color: 'var(--on-surface-variant)'
                        }}
                    >
                        <h3 className="text-lg font-semibold">Filters</h3>

                        {/* Category Filter */}
                        <div className="space-y-2">
                            <h4 className="font-medium text-sm opacity-90">Category</h4>
                            <div className="space-y-2 text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded" defaultChecked />
                                    <span>Electronics</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded" />
                                    <span>Clothing</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded" />
                                    <span>Home & Garden</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded" />
                                    <span>Sports</span>
                                </label>
                            </div>
                        </div>

                        {/* Price Range */}
                        <div className="space-y-2">
                            <h4 className="font-medium text-sm opacity-90">Price Range</h4>
                            <div className="space-y-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    defaultValue="500"
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs opacity-75">
                                    <span>$0</span>
                                    <span>$1000</span>
                                </div>
                            </div>
                        </div>

                        {/* Rating Filter */}
                        <div className="space-y-2">
                            <h4 className="font-medium text-sm opacity-90">Rating</h4>
                            <div className="space-y-2 text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded" />
                                    <span>⭐⭐⭐⭐⭐ & up</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded" />
                                    <span>⭐⭐⭐⭐ & up</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded" />
                                    <span>⭐⭐⭐ & up</span>
                                </label>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            className="w-full text-sm"
                        >
                            Clear Filters
                        </Button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="lg:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {/* Product 1 */}
                    <Card className="overflow-hidden">
                        <div className="aspect-square" style={{ backgroundColor: 'var(--surface)' }}>
                            <div className="w-full h-full flex items-center justify-center text-6xl">
                                📱
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-semibold text-sm" style={{ color: 'var(--on-background)' }}>
                                    Smartphone Pro
                                </h3>
                                <Badge variant="success" size="sm">New</Badge>
                            </div>
                            <p className="text-xs opacity-70" style={{ color: 'var(--on-background)' }}>
                                Latest flagship with advanced features
                            </p>
                            <div className="flex items-center gap-2 text-xs">
                                <span>⭐⭐⭐⭐⭐</span>
                                <span className="opacity-60">(247 reviews)</span>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-lg font-bold" style={{ color: 'var(--primary)' }}>
                                    $899.99
                                </span>
                                <Button size="sm">Add to Cart</Button>
                            </div>
                        </div>
                    </Card>

                    {/* Product 2 */}
                    <Card className="overflow-hidden">
                        <div className="aspect-square" style={{ backgroundColor: 'var(--surface)' }}>
                            <div className="w-full h-full flex items-center justify-center text-6xl">
                                💻
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-semibold text-sm" style={{ color: 'var(--on-background)' }}>
                                    Laptop Ultra
                                </h3>
                                <Badge variant="warning" size="sm">Sale</Badge>
                            </div>
                            <p className="text-xs opacity-70" style={{ color: 'var(--on-background)' }}>
                                High-performance laptop for professionals
                            </p>
                            <div className="flex items-center gap-2 text-xs">
                                <span>⭐⭐⭐⭐</span>
                                <span className="opacity-60">(189 reviews)</span>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold" style={{ color: 'var(--primary)' }}>
                                        $1,299.99
                                    </span>
                                    <span className="text-sm line-through opacity-50">$1,599.99</span>
                                </div>
                                <Button size="sm">Add to Cart</Button>
                            </div>
                        </div>
                    </Card>

                    {/* Product 3 */}
                    <Card className="overflow-hidden">
                        <div className="aspect-square" style={{ backgroundColor: 'var(--surface)' }}>
                            <div className="w-full h-full flex items-center justify-center text-6xl">
                                🎧
                            </div>
                        </div>
                        <div className="p-4 space-y-2">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-semibold text-sm" style={{ color: 'var(--on-background)' }}>
                                    Wireless Headphones
                                </h3>
                                <Badge variant="info" size="sm">Popular</Badge>
                            </div>
                            <p className="text-xs opacity-70" style={{ color: 'var(--on-background)' }}>
                                Noise-cancelling with premium sound
                            </p>
                            <div className="flex items-center gap-2 text-xs">
                                <span>⭐⭐⭐⭐⭐</span>
                                <span className="opacity-60">(512 reviews)</span>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-lg font-bold" style={{ color: 'var(--primary)' }}>
                                    $299.99
                                </span>
                                <Button size="sm">Add to Cart</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Product Detail Section */}
            <Card>
                <div className="p-6 space-y-6">
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--on-background)' }}>
                        Product Details
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Product Specifications with surfaceVariant */}
                        <div
                            className="p-5 rounded-lg space-y-3"
                            style={{
                                backgroundColor: 'var(--surface-variant)',
                                color: 'var(--on-surface-variant)'
                            }}
                        >
                            <h4 className="font-semibold text-lg">Technical Specifications</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="opacity-80">Display</span>
                                    <span className="font-medium">6.7" OLED</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-80">Processor</span>
                                    <span className="font-medium">Octa-core 3.2GHz</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-80">RAM</span>
                                    <span className="font-medium">12GB</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-80">Storage</span>
                                    <span className="font-medium">256GB / 512GB</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-80">Battery</span>
                                    <span className="font-medium">5000mAh</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-80">Camera</span>
                                    <span className="font-medium">108MP Triple</span>
                                </div>
                            </div>
                        </div>

                        {/* Features with surfaceVariant */}
                        <div
                            className="p-5 rounded-lg space-y-3"
                            style={{
                                backgroundColor: 'var(--surface-variant)',
                                color: 'var(--on-surface-variant)'
                            }}
                        >
                            <h4 className="font-semibold text-lg">Key Features</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                    <span className="opacity-70">✓</span>
                                    <span>5G connectivity for ultra-fast speeds</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="opacity-70">✓</span>
                                    <span>AI-powered camera with night mode</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="opacity-70">✓</span>
                                    <span>Water and dust resistant (IP68)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="opacity-70">✓</span>
                                    <span>Wireless charging & reverse charging</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="opacity-70">✓</span>
                                    <span>In-display fingerprint sensor</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="opacity-70">✓</span>
                                    <span>Stereo speakers with Dolby Atmos</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Shopping Cart Drawer Simulation */}
            <Card>
                <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold" style={{ color: 'var(--on-background)' }}>
                        Shopping Cart
                    </h3>

                    <div
                        className="p-5 rounded-lg space-y-4"
                        style={{
                            backgroundColor: 'var(--surface-variant)',
                            color: 'var(--on-surface-variant)'
                        }}
                    >
                        {/* Cart Item 1 */}
                        <div className="flex gap-4 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
                            <div className="w-20 h-20 rounded flex items-center justify-center text-3xl" style={{ backgroundColor: 'var(--surface)' }}>
                                📱
                            </div>
                            <div className="flex-1 space-y-1">
                                <h4 className="font-semibold">Smartphone Pro</h4>
                                <p className="text-sm opacity-70">Color: Midnight Black</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <button className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--surface)' }}>-</button>
                                        <span>1</span>
                                        <button className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--surface)' }}>+</button>
                                    </div>
                                    <span className="font-bold">$899.99</span>
                                </div>
                            </div>
                            <button className="text-sm opacity-70 hover:opacity-100">Remove</button>
                        </div>

                        {/* Cart Item 2 */}
                        <div className="flex gap-4 pb-4">
                            <div className="w-20 h-20 rounded flex items-center justify-center text-3xl" style={{ backgroundColor: 'var(--surface)' }}>
                                🎧
                            </div>
                            <div className="flex-1 space-y-1">
                                <h4 className="font-semibold">Wireless Headphones</h4>
                                <p className="text-sm opacity-70">Color: Silver</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <button className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--surface)' }}>-</button>
                                        <span>2</span>
                                        <button className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--surface)' }}>+</button>
                                    </div>
                                    <span className="font-bold">$599.98</span>
                                </div>
                            </div>
                            <button className="text-sm opacity-70 hover:opacity-100">Remove</button>
                        </div>

                        {/* Cart Summary */}
                        <div className="pt-4 border-t space-y-2" style={{ borderColor: 'var(--border)' }}>
                            <div className="flex justify-between text-sm">
                                <span className="opacity-80">Subtotal</span>
                                <span>$1,499.97</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="opacity-80">Shipping</span>
                                <span>$9.99</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="opacity-80">Tax</span>
                                <span>$120.00</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                                <span>Total</span>
                                <span>$1,629.96</span>
                            </div>
                        </div>

                        <Button variant="primary" className="w-full">
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Checkout Steps */}
            <Card>
                <div className="p-6 space-y-6">
                    <h3 className="text-xl font-bold" style={{ color: 'var(--on-background)' }}>
                        Checkout Process
                    </h3>

                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Step 1: Shipping with surfaceVariant */}
                        <div
                            className="p-5 rounded-lg space-y-3"
                            style={{
                                backgroundColor: 'var(--surface-variant)',
                                color: 'var(--on-surface-variant)'
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}>
                                    1
                                </div>
                                <h4 className="font-semibold">Shipping</h4>
                            </div>
                            <div className="space-y-2 text-sm">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="w-full px-3 py-2 rounded"
                                    style={{ backgroundColor: 'var(--surface)', color: 'var(--on-surface)' }}
                                />
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="w-full px-3 py-2 rounded"
                                    style={{ backgroundColor: 'var(--surface)', color: 'var(--on-surface)' }}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        className="px-3 py-2 rounded"
                                        style={{ backgroundColor: 'var(--surface)', color: 'var(--on-surface)' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="ZIP"
                                        className="px-3 py-2 rounded"
                                        style={{ backgroundColor: 'var(--surface)', color: 'var(--on-surface)' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Payment with surfaceVariant */}
                        <div
                            className="p-5 rounded-lg space-y-3"
                            style={{
                                backgroundColor: 'var(--surface-variant)',
                                color: 'var(--on-surface-variant)'
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}>
                                    2
                                </div>
                                <h4 className="font-semibold">Payment</h4>
                            </div>
                            <div className="space-y-2 text-sm">
                                <input
                                    type="text"
                                    placeholder="Card Number"
                                    className="w-full px-3 py-2 rounded"
                                    style={{ backgroundColor: 'var(--surface)', color: 'var(--on-surface)' }}
                                />
                                <input
                                    type="text"
                                    placeholder="Cardholder Name"
                                    className="w-full px-3 py-2 rounded"
                                    style={{ backgroundColor: 'var(--surface)', color: 'var(--on-surface)' }}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        className="px-3 py-2 rounded"
                                        style={{ backgroundColor: 'var(--surface)', color: 'var(--on-surface)' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="CVV"
                                        className="px-3 py-2 rounded"
                                        style={{ backgroundColor: 'var(--surface)', color: 'var(--on-surface)' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 3: Review with surfaceVariant */}
                        <div
                            className="p-5 rounded-lg space-y-3"
                            style={{
                                backgroundColor: 'var(--surface-variant)',
                                color: 'var(--on-surface-variant)'
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: 'var(--primary)', color: 'var(--on-primary)' }}>
                                    3
                                </div>
                                <h4 className="font-semibold">Review</h4>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="opacity-80">Items</span>
                                    <span>3</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-80">Delivery</span>
                                    <span>Standard (3-5 days)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="opacity-80">Payment</span>
                                    <span>•••• 4242</span>
                                </div>
                                <div className="pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                                    <div className="flex justify-between font-bold">
                                        <span>Total</span>
                                        <span>$1,629.96</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
