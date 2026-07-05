import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
    const {
        cart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
        totalItems,
    } = useCart();

    const handlePlaceOrder = () => {
        alert('Order placed successfully! Thank you for shopping with ShopHub.');
        clearCart();
    };

    return (
        <div className="container mx-auto px-6 py-12 font-sans">
            <h1 className="text-3xl font-extrabold text-[#222222] mb-8 tracking-tight">
                Shopping Cart
            </h1>

            {cart.length === 0 ? (
                <div className="text-center py-16 bg-white border border-gray-150 rounded-xl shadow-sm">
                    <svg
                        className="w-16 h-16 mx-auto text-gray-300 mb-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                    </svg>
                    <h2 className="text-xl font-bold text-gray-700 mb-2">
                        Your cart is empty
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Looks like you haven't added anything to your cart yet.
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center bg-[#003366] hover:bg-[#002244] text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Left Column: Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-150">
                            {cart.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="p-6 flex flex-col sm:flex-row items-center gap-6"
                                >
                                    {/* Image */}
                                    <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg p-2 border border-gray-100">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.title}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>

                                    {/* Text Info */}
                                    <div className="flex-grow text-center sm:text-left">
                                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                                            {item.product.category}
                                        </span>
                                        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mt-0.5">
                                            <Link to={`/product/${item.product.id}`} className="hover:underline">
                                                {item.product.title}
                                            </Link>
                                        </h3>
                                        <div className="text-base font-extrabold text-[#003366] mt-1">
                                            ${item.product.price.toFixed(2)}
                                        </div>
                                    </div>

                                    {/* Controls: Quantity + Remove */}
                                    <div className="flex items-center gap-4 flex-shrink-0">
                                        <div className="flex items-center border border-gray-250 rounded-md">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.product.id, item.quantity - 1)
                                                }
                                                className="px-3 py-1 text-gray-500 hover:bg-gray-50 font-bold transition-colors cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span className="px-3 py-1 text-sm font-semibold text-gray-800 bg-gray-50 border-x border-gray-250 min-w-[36px] text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.product.id, item.quantity + 1)
                                                }
                                                className="px-3 py-1 text-gray-500 hover:bg-gray-50 font-bold transition-colors cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.product.id)}
                                            className="text-gray-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                                            title="Remove item"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Order Summary (Totals) */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm space-y-6">
                        <h2 className="text-lg font-bold text-gray-900 pb-3 border-b border-gray-100">
                            Order Summary
                        </h2>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Items ({totalItems})</span>
                                <span className="font-semibold text-gray-900">
                                    ${totalPrice.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="font-semibold text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax</span>
                                <span className="font-semibold text-gray-900">$0.00</span>
                            </div>

                            <div className="border-t border-gray-100 pt-4 flex justify-between text-base font-bold text-gray-900">
                                <span>Order Total</span>
                                <span className="text-xl text-[#003366]">
                                    ${totalPrice.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            className="w-full bg-[#003366] hover:bg-[#002244] text-white py-3.5 rounded-lg text-sm font-semibold tracking-wide shadow-sm hover:shadow transition-all cursor-pointer text-center"
                        >
                            Place Order
                        </button>

                        <div className="text-center">
                            <Link
                                to="/"
                                className="text-xs text-gray-450 hover:text-gray-700 font-semibold"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}