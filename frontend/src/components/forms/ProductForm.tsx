import { ProductFormData } from '@/types'

interface ProductFormProps {
  data: ProductFormData
  onChange: (field: keyof ProductFormData, value: string) => void
  errors?: Record<string, string>
}

export const ProductForm = ({ data, onChange, errors = {} }: ProductFormProps) => {
  const inputClasses = "w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-500 font-medium"
  const errorClasses = "border-red-300 focus:border-red-500 focus:ring-red-500/20"
  const labelClasses = "block text-sm font-semibold text-gray-700 mb-2"

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Product Name */}
      <div className="space-y-2">
        <label className={labelClasses}>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span>Product Name *</span>
          </div>
        </label>
        <input
          type="text"
          placeholder="Enter product name"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          className={`${inputClasses} ${errors.name ? errorClasses : ''}`}
        />
        {errors.name && (
          <div className="flex items-center space-x-2 text-red-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">{errors.name}</p>
          </div>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className={labelClasses}>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>Category</span>
          </div>
        </label>
        <input
          type="text"
          placeholder="e.g., Electronics, Clothing"
          value={data.category}
          onChange={(e) => onChange('category', e.target.value)}
          className={`${inputClasses} ${errors.category ? errorClasses : ''}`}
        />
        {errors.category && (
          <div className="flex items-center space-x-2 text-red-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">{errors.category}</p>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="space-y-2">
        <label className={labelClasses}>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span>Price *</span>
          </div>
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</div>
          <input
            type="number"
            placeholder="0.00"
            value={data.price}
            onChange={(e) => onChange('price', e.target.value)}
            className={`${inputClasses} pl-8 ${errors.price ? errorClasses : ''}`}
            step="0.01"
            min="0"
          />
        </div>
        {errors.price && (
          <div className="flex items-center space-x-2 text-red-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">{errors.price}</p>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className={labelClasses}>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Description</span>
          </div>
        </label>
        <textarea
          placeholder="Describe your product features and benefits"
          value={data.description}
          onChange={(e) => onChange('description', e.target.value)}
          className={`${inputClasses} resize-none h-24 ${errors.description ? errorClasses : ''}`}
          rows={3}
        />
        {errors.description && (
          <div className="flex items-center space-x-2 text-red-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">{errors.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}