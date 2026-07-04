import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-[#003366]">
            <div className="w-full px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/" className="text-white text-xl font-bold">MyStore</Link>
                </div>
                <div className="flex space-x-4">
                    <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                    <Link to="/checkout" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Cart</Link>
                </div>
                <div className="flex items-center space-x-3">
                    <Link to="/auth" className="bg-white text-[#003366] hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">Login</Link>
                    <Link to="/auth" className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">Register</Link>
                </div>
            </div>
        </nav>
    )
}