import { apiClient } from './client'
import { ApiResponse, PagedResponse, Product, ProductCreateRequest } from '@/types'

export const productApi = {
  async getProducts(page = 0, size = 6): Promise<ApiResponse<PagedResponse<Product>>> {
    return apiClient.get(`/api/products?page=${page}&size=${size}`)
  },

  async bulkUpload(
    images: File[],
    productData: ProductCreateRequest[],
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<Product[]>> {
    const formData = new FormData()
    
    images.forEach(file => formData.append('images', file))
    formData.append('productData', JSON.stringify(productData))

    return apiClient.uploadWithProgress('/api/products/bulk-upload', formData, onProgress)
  }
}