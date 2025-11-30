import { validateProductForm, validateFile } from '@/utils/validation'

describe('validateProductForm', () => {
  it('should return no errors for valid data', () => {
    const validData = {
      name: 'Test Product',
      description: 'Test Description',
      price: '10.99',
      category: 'Test Category'
    }
    
    const errors = validateProductForm(validData)
    expect(errors).toHaveLength(0)
  })

  it('should return error for empty name', () => {
    const invalidData = {
      name: '',
      description: 'Test Description',
      price: '10.99',
      category: 'Test Category'
    }
    
    const errors = validateProductForm(invalidData)
    expect(errors).toHaveLength(1)
    expect(errors[0].field).toBe('name')
    expect(errors[0].message).toBe('Product name is required')
  })

  it('should return error for invalid price', () => {
    const invalidData = {
      name: 'Test Product',
      description: 'Test Description',
      price: 'invalid',
      category: 'Test Category'
    }
    
    const errors = validateProductForm(invalidData)
    expect(errors).toHaveLength(1)
    expect(errors[0].field).toBe('price')
  })
})