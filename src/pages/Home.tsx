import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '../types/Product';

async function fetchProducts(): Promise<Product[]> {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const itemsPerPage = 8;

    const { data: products, isLoading, error } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    // Filter and Pagination calculations
    const filteredProducts = products
        ? products.filter((product) =>
              product.category.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="container mx-auto px-6 py-12">
            {/* Centered Welcome text */}
            <div className="text-center mb-12">
                <h1 className="text-[32px] font-bold text-[#222222] tracking-tight mb-2 font-sans">
                    Welcome to ShopHub
                </h1>
                <p className="text-[15px] text-[#888888] font-normal font-sans">
                    Discover amazing products at great prices
                </p>
            </div>

            {/* Left-aligned Our Products Header & List */}
            <div className="text-left mt-16">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-2 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-[#222222]">
                        Our products
                    </h2>
                    <div className="relative w-full sm:w-72">
                        <input
                            type="text"
                            placeholder="Search by category..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#003366] focus:border-transparent font-sans"
                        />
                        <svg
                            className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                {isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[...Array(itemsPerPage)].map((_, i) => (
                            <div key={i} className="border border-gray-100 rounded p-4 animate-pulse bg-white">
                                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="flex justify-between items-center">
                                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <div className="text-red-500 bg-red-50 p-4 rounded-md border border-red-200 text-center font-medium">
                        Failed to load products. Please try again later.
                    </div>
                )}

                {products && filteredProducts.length === 0 && (
                    <div className="text-center py-12 text-gray-500 font-medium">
                        No products found in this category.
                    </div>
                )}

                {products && filteredProducts.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {paginatedProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="border border-gray-100 rounded-lg p-4 flex flex-col justify-between hover:shadow-md transition-shadow bg-white"
                                >
                                    <div>
                                        <div className="h-48 w-full flex items-center justify-center overflow-hidden mb-4 bg-gray-50 rounded">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                                            {product.category}
                                        </span>
                                        <h3
                                            className="text-sm font-semibold text-gray-800 line-clamp-2 mt-1 min-h-[40px] leading-snug"
                                            title={product.title}
                                        >
                                            {product.title}
                                        </h3>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-base font-bold text-gray-900">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        <div className="flex items-center text-yellow-500 text-xs font-semibold bg-yellow-50 px-2 py-0.5 rounded">
                                            <svg className="w-3.5 h-3.5 fill-current mr-1" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            {product.rating.rate}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-2 mt-12">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => {
                                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
                                >
                                    Previous
                                </button>
                                {[...Array(totalPages)].map((_, index) => {
                                    const pageNum = index + 1;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => {
                                                setCurrentPage(pageNum);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className={`w-10 h-10 flex items-center justify-center border text-sm font-semibold rounded transition-colors ${
                                                currentPage === pageNum
                                                    ? 'bg-[#003366] border-[#003366] text-white'
                                                    : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'
                                            }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() => {
                                        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="px-4 py-2 border border-gray-200 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}