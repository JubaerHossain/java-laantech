import { useRef, useState } from 'react'

interface FileUploadProps {
  onFilesChange: (files: File[]) => void
  accept?: string
  multiple?: boolean
}

export const FileUpload = ({ onFilesChange, accept = "image/*", multiple = true }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    onFilesChange(files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    onFilesChange(files)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-300 ${
        isDragging 
          ? 'border-2 border-dashed border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 scale-102' 
          : 'border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-purple-50/50'
      } rounded-2xl p-12 overflow-hidden`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Floating elements */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-sm animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-sm animate-pulse delay-1000"></div>
      
      <div className="relative z-10 text-center">
        <div className="mb-6">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl transition-all duration-300 ${
            isDragging 
              ? 'bg-gradient-to-br from-blue-600 to-purple-600 scale-110 shadow-2xl' 
              : 'bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-500 group-hover:to-purple-600 group-hover:scale-110 shadow-lg group-hover:shadow-xl'
          }`}>
            <svg className={`w-10 h-10 transition-colors duration-300 ${
              isDragging ? 'text-white' : 'text-gray-600 group-hover:text-white'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className={`text-xl font-bold transition-colors duration-300 ${
            isDragging ? 'text-blue-700' : 'text-gray-900 group-hover:text-blue-700'
          }`}>
            {isDragging ? 'Drop files here' : 'Upload Product Images'}
          </h3>
          
          <p className={`text-sm transition-colors duration-300 ${
            isDragging ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'
          }`}>
            {isDragging 
              ? 'Release to upload your files' 
              : 'Drag & drop your images here, or click to browse'
            }
          </p>
          
          <div className="flex items-center justify-center space-x-4 mt-6">
            <div className="flex items-center space-x-2 px-3 py-2 bg-white/80 rounded-lg border border-gray-200">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-medium text-gray-700">JPG, PNG, WebP</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-white/80 rounded-lg border border-gray-200">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs font-medium text-gray-700">Max 5MB</span>
            </div>
          </div>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}