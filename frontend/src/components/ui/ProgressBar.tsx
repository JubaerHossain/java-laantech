interface ProgressBarProps {
  progress: number
  label?: string
  showPercentage?: boolean
}

export const ProgressBar = ({ progress, label, showPercentage = true }: ProgressBarProps) => {
  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between text-sm mb-2 font-medium">
          {label && <span className="text-blue-600">{label}</span>}
          {showPercentage && <span className="text-blue-600">{progress}%</span>}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 shadow-sm" 
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  )
}