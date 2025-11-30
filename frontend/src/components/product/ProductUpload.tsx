import { useState } from 'react'
import toast from 'react-hot-toast'
import { ProductFormData, ProductCreateRequest } from '@/types'
import { validateProductForm, validateFile } from '@/utils'
import { useUpload } from '@/hooks'
import { Button, ProgressBar } from '@/components/ui'
import { FileUpload, ProductForm } from '@/components/forms'

interface ProductUploadProps {
  onUploadSuccess?: () => void
}

export const ProductUpload = ({ onUploadSuccess }: ProductUploadProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [productData, setProductData] = useState<ProductFormData[]>([])
  const [errors, setErrors] = useState<Record<number, Record<string, string>>>({})
  
  const { uploading, progress, error, uploadProducts, reset } = useUpload()

  const handleFilesChange = (selectedFiles: File[]) => {
    // Validate files
    const fileErrors: Record<number, Record<string, string>> = {}
    selectedFiles.forEach((file, index) => {
      const validationErrors = validateFile(file)
      if (validationErrors.length > 0) {
        fileErrors[index] = { file: validationErrors[0].message }
        toast.error(`${file.name}: ${validationErrors[0].message}`)
      }
    })

    setFiles(selectedFiles)
    setProductData(selectedFiles.map(() => ({ name: '', description: '', price: '', category: '' })))
    setErrors(fileErrors)
  }

  const updateProductData = (index: number, field: keyof ProductFormData, value: string) => {
    const updated = [...productData]
    updated[index] = { ...updated[index], [field]: value }
    setProductData(updated)

    // Clear field error when user starts typing
    if (errors[index]?.[field]) {
      const newErrors = { ...errors }
      delete newErrors[index][field]
      if (Object.keys(newErrors[index] || {}).length === 0) {
        delete newErrors[index]
      }
      setErrors(newErrors)
    }
  }

  const handleUpload = async () => {
    // TODO: This validation logic is getting messy, should refactor
    const newErrors: Record<number, Record<string, string>> = {}
    const validProductData: ProductCreateRequest[] = []

    productData.forEach((data, index) => {
      const validationErrors = validateProductForm(data)
      if (validationErrors.length > 0) {
        newErrors[index] = validationErrors.reduce((acc, err) => {
          acc[err.field] = err.message
          return acc
        }, {} as Record<string, string>)
      } else {
        validProductData.push({
          name: data.name,
          description: data.description,
          price: parseFloat(data.price),
          category: data.category
        })
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.error('Please fix the form errors before uploading')
      return
    }

    const success = await uploadProducts(files, validProductData)
    if (success) {
      // Clear everything on successful upload
      setFiles([])
      setProductData([])
      setErrors({})
      reset()
      onUploadSuccess?.()
    }
    // Error handling is done in the hook
  }

  return (
    <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/50 to-purple-50/50 rounded-3xl"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-cyan-400/10 to-blue-600/10 rounded-full blur-xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white animate-bounce"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">Upload Products</h2>
              <p className="text-gray-600">Drag & drop or browse to upload multiple products</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-emerald-700">Secure Upload</span>
          </div>
        </div>

        <FileUpload onFilesChange={handleFilesChange} />

        {files.length > 0 && (
          <div className="space-y-6 mt-8">
            {files.map((file, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Card decoration */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl"></div>
                
                <div className="flex items-start space-x-6 mb-6">
                  <div className="relative group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt="" 
                      className="w-24 h-24 object-cover rounded-2xl shadow-lg border-2 border-white" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900 truncate">{file.name}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Image {index + 1}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Ready to upload</span>
                      </div>
                    </div>
                    {errors[index]?.file && (
                      <div className="mt-2 flex items-center space-x-2 text-red-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-medium">{errors[index].file}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <ProductForm
                  data={productData[index] || { name: '', description: '', price: '', category: '' }}
                  onChange={(field, value) => updateProductData(index, field, value)}
                  errors={errors[index] || {}}
                />
              </div>
            ))}
          </div>
        )}

        {uploading && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Uploading Products</h4>
                <p className="text-sm text-gray-600">Please wait while we process your files...</p>
              </div>
            </div>
            <ProgressBar 
              progress={progress} 
              label="" 
            />
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-red-800">Upload Error</h4>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {files.length > 0 && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium text-blue-700">
                  {files.length} file{files.length !== 1 ? 's' : ''} selected
                </span>
              </div>
            )}
          </div>
          
          <Button
            onClick={handleUpload}
            disabled={files.length === 0 || uploading}
            loading={uploading}
            className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            {uploading ? (
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span>Upload {files.length} Product{files.length !== 1 ? 's' : ''}</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}