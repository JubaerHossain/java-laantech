import { Product } from '@/types'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  onImageClick?: (imageUrl: string) => void
}

export const ProductGrid = ({ products, loading = false, onImageClick }: ProductGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="group relative bg-white/50 backdrop-blur-sm rounded-3xl overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-[shimmer_2s_infinite] rounded-3xl"></div>
            
            {/* Image skeleton */}
            <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-3xl animate-pulse"></div>
            
            {/* Content skeleton */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 animate-pulse"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-20 animate-pulse"></div>
                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-16 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="relative text-center py-20">
        {/* Background decoration */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <svg className="w-64 h-64 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-8 shadow-lg">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          
          <div className="space-y-4 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-900">No Products Yet</h3>
            <p className="text-gray-600 leading-relaxed">
              Your product catalog is empty. Start by uploading your first product with images to build your inventory.
            </p>
            
            <div className="flex items-center justify-center space-x-6 mt-8">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Bulk Upload</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-500"></div>
                <span>Real-time Progress</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-1000"></div>
                <span>Smart Validation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard
              product={product}
              onImageClick={onImageClick}
            />
          </div>
        ))}
      </div>
      
      {/* Floating stats */}
      <div className="mt-12 flex justify-center">
        <div className="inline-flex items-center space-x-6 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">
              {products.length} Product{products.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">All Loaded</span>
          </div>
        </div>
      </div>
    </div>
  )
}