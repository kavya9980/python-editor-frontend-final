"use client"

interface SimpleEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
}

export function SimpleEditor({ value, onChange, language }: SimpleEditorProps) {
  return (
    <div className="h-full w-full bg-[#0d1117] p-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full bg-[#0d1117] text-white font-mono text-sm p-2 resize-none focus:outline-none"
        spellCheck="false"
        placeholder={`# Write your ${language} code here`}
      />
    </div>
  )
}
