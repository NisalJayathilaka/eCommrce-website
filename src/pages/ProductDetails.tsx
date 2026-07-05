import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../context/CartContext";
import type { Product } from "../types/Product";

async function fetchProduct(id: string): Promise<Product> {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
        throw new Error("Product fetch failed");
    }
    return response.json();
}

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();

    const { data: product, isLoading, error } = useQuery<Product>({
        queryKey: ["product", id],
        queryFn: () => fetchProduct(id || ""),
        enabled: !!id,
    });

    return (
        <div className="container mx-auto px-6 py-12 font-sans">
            {/* Back Button */}
            <div className="mb-8">
                <Link
                    to="/"
                    className="inline-flex items-center text-sm font-semibold text-[#003366] hover:underline"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to products
                </Link>
            </div>

            {isLoading && (
                <div className="flex flex-col md:flex-row gap-8 animate-pulse">
                    <div className="w-full md:w-1/2 h-[450px] bg-gray-200 rounded-lg"></div>
                    <div className="w-full md:w-1/2 space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-24 bg-gray-200 rounded w-full"></div>
                        <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            )}

            {error && (
                <div className="text-red-500 bg-red-50 p-4 rounded-md border border-red-200 text-center font-medium">
                    Failed to load product details. Please try again later.
                </div>
            )}

            {product && (
                <div className="flex flex-col md:flex-row gap-12 bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm">
                    {/* Left Column: Image */}
                    <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-100 min-h-[350px] md:min-h-[450px]">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-[400px] object-contain hover:scale-102 transition-transform duration-300"
                        />
                    </div>

                    {/* Right Column: Details */}
                    <div className="w-full md:w-1/2 flex flex-col justify-between">
                        <div>
                            <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                                {product.category}
                            </span>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2 mb-4 leading-tight">
                                {product.title}
                            </h1>

                            {/* Ratings */}
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="flex items-center text-yellow-500 bg-yellow-50 px-2.5 py-1 rounded text-sm font-semibold">
                                    <svg className="w-4 h-4 fill-current mr-1.5" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    {product.rating?.rate}
                                </div>
                                <span className="text-sm text-gray-500 font-medium">
                                    ({product.rating?.count} customer reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="text-3xl font-extrabold text-[#003366] mb-6">
                                ${product.price.toFixed(2)}
                            </div>

                            {/* Description */}
                            <div className="border-t border-gray-100 pt-6">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                                    Description
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-normal">
                                    {product.description}
                                </p>
                            </div>
                        </div>

                        {/* Add to Cart Action */}
                        <div className="mt-8 border-t border-gray-100 pt-6">
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full sm:w-auto bg-[#003366] hover:bg-[#002244] text-white py-3.5 px-8 font-bold text-sm rounded shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}