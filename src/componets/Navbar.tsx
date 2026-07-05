import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { totalItems } = useCart();
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav className="bg-[#003366]">
            <div className="w-full px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/" className="text-white text-xl font-bold tracking-tight">MyStore</Link>
                </div>
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-gray-300 hover:text-white px-1 py-1 text-sm font-medium transition-colors">
                        Home
                    </Link>
                    <Link to="/checkout" className="text-gray-300 hover:text-white px-1 py-1 text-sm font-medium flex items-center gap-1.5 transition-colors">
                        Cart
                        {totalItems > 0 && (
                            <span className="bg-[#0ea5e9] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>
                <div className="flex items-center space-x-3">
                    {isAuthenticated ? (
                        <>
                            <span className="text-blue-100 text-xs font-semibold mr-1 hidden sm:inline">
                                {user?.email}
                            </span>
                            <button
                                onClick={logout}
                                className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm cursor-pointer"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/auth" className="bg-white text-[#003366] hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">Login</Link>
                            <Link to="/auth" className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}