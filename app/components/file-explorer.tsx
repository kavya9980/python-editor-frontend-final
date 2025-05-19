"use client"

interface FileExplorerProps {
  files: Record<string, string>
  activeFile: string
  onFileSelect: (filename: string) => void
}

export function FileExplorer({ files, activeFile, onFileSelect }: FileExplorerProps) {
  return (
    <div className="py-2">
      {Object.keys(files).map((filename) => (
        <div
          key={filename}
          className={`px-3 py-1 cursor-pointer text-sm rounded hover:bg-[#1f2937] ${
            activeFile === filename ? "bg-[#1f2937] text-white" : "text-gray-400"
          }`}
          onClick={() => onFileSelect(filename)}
        >
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-blue-500"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            {filename}
          </div>
        </div>
      ))}
    </div>
  )
}
