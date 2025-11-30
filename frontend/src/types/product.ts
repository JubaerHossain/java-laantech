export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  createdAt: string
}

export interface ProductFormData {
  name: string
  description: string
  price: string
  category: string
}

export interface ProductCreateRequest {
  name: string
  description: string
  price: number
  category: string
}