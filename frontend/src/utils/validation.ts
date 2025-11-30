import { ProductFormData } from '@/types'

export interface ValidationError {
  field: string
  message: string
}

export const validateProductForm = (data: ProductFormData): ValidationError[] => {
  const errors: ValidationError[] = []

  if (!data.name.trim()) {
    errors.push({ field: 'name', message: 'Product name is required' })
  }

  if (!data.price.trim()) {
    errors.push({ field: 'price', message: 'Price is required' })
  } else if (isNaN(Number(data.price)) || Number(data.price) <= 0) {
    errors.push({ field: 'price', message: 'Price must be a positive number' })
  }

  return errors
}

export const validateFile = (file: File): ValidationError[] => {
  const errors: ValidationError[] = []
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

  if (file.size > maxSize) {
    errors.push({ field: 'file', message: 'File size must be less than 5MB' })
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push({ field: 'file', message: 'Only JPEG, PNG, and WebP images are allowed' })
  }

  return errors
}