import { useState } from 'react'
import toast from 'react-hot-toast'
import { ProductCreateRequest } from '@/types'
import { productApi } from '@/api'

export const useUpload = () => {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const uploadProducts = async (
    files: File[],
    productData: ProductCreateRequest[]
  ): Promise<boolean> => {
    if (files.length === 0 || files.length !== productData.length) {
      setError('Files and product data must match')
      return false
    }

    setUploading(true)
    setProgress(0)
    setError(null)

    try {
      const result = await productApi.bulkUpload(files, productData, setProgress)
      
      if (result.success) {
        setProgress(100)
        toast.success(`Successfully uploaded ${files.length} product${files.length !== 1 ? 's' : ''}!`)
        return true
      } else {
        setError(result.message)
        toast.error(result.message)
        return false
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      setError(errorMessage)
      toast.error(errorMessage)
      return false
    } finally {
      setUploading(false)
    }
  }

  const reset = () => {
    setUploading(false)
    setProgress(0)
    setError(null)
  }

  return {
    uploading,
    progress,
    error,
    uploadProducts,
    reset
  }
}