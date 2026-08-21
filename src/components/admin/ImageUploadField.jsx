import { useEffect, useRef, useState } from 'react'
import { ImagePlus, X } from 'lucide-react'

// Shared image picker for admin create/edit forms — click or drag-and-drop,
// with a live preview of the newly picked file, falling back to the
// record's existing image when editing so the admin can see what's already
// there before deciding whether to replace it.
const ImageUploadField = ({ label = 'Image', file, onChange, existingUrl = null, error, helperText = 'JPG, PNG or WEBP' }) => {
  const inputRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return
    }
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const displayUrl = previewUrl ?? existingUrl

  const pickFile = (fileList) => {
    const picked = fileList?.[0]
    if (picked) onChange(picked)
  }

  const clear = () => {
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1">{label}</label>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(e) => pickFile(e.target.files)}
        className="hidden"
      />

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragActive(false)
          pickFile(e.dataTransfer.files)
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
        className={`flex items-center gap-4 rounded-xl border-2 border-dashed p-4 cursor-pointer transition-colors ${
          dragActive ? 'border-green-600 bg-green-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'
        }`}
      >
        {displayUrl ? (
          <img src={displayUrl} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover border border-gray-200" />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-400">
            <ImagePlus size={22} />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-700 break-words">
            {file ? file.name : displayUrl ? 'Current image — click or drag to replace' : 'Click or drag an image here'}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{helperText}</p>
        </div>

        {file && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              clear()
            }}
            aria-label="Remove selected image"
            className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:bg-white hover:text-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}

export default ImageUploadField
