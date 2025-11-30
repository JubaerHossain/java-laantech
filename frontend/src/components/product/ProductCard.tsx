import { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onImageClick?: (imageUrl: string) => void
}

export const ProductCard = ({ product, onImageClick }: ProductCardProps) => {
  const handleImageClick = () => {
    if (onImageClick) {
      onImageClick(product.imageUrl)
    }
  }

  return (
    <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
      {/* Gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden rounded-t-3xl">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover cursor-pointer group-hover:scale-110 transition-transform duration-700"
          onClick={handleImageClick}
        />
        
        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Zoom icon */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-white/50">
          <span className="text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {product.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Product name */}
        <div>
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-900 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        
        {/* Price and actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <button className="group/btn relative px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"></div>
            <div className="relative flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">View</span>
            </div>
          </button>
        </div>
        
        {/* Created date */}
        <div className="flex items-center space-x-2 text-xs text-gray-500 pt-2 border-t border-gray-100">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Added {new Date(product.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  )
}