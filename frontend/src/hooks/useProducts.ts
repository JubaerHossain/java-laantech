import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Product, ApiResponse, PagedResponse } from '@/types'
import { productApi } from '@/api'

export const useProducts = (initialPage = 0, pageSize = 6) => {
  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async (page = currentPage) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await productApi.getProducts(page, pageSize)
      if (result.success) {
        setProducts(result.data.content)
        setCurrentPage(result.data.page)
        setTotalPages(result.data.totalPages)
      } else {
        setError(result.message)
      }
    } catch (err) {
      const errorMessage = 'Failed to fetch products'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const goToPage = (page: number) => {
    if (page >= 0 && page < totalPages) {
      fetchProducts(page)
    }
  }

  const refresh = () => fetchProducts(currentPage)

  return {
    products,
    currentPage,
    totalPages,
    loading,
    error,
    goToPage,
    refresh
  }
}