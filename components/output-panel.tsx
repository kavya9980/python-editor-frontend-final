"use client"

interface OutputPanelProps {
  output: string
}

export function OutputPanel({ output }: OutputPanelProps) {
  return (
    <div className="h-full w-full overflow-auto bg-black text-white font-mono p-4">
      <pre className="whitespace-pre-wrap">{output || "Run your code to see output here"}</pre>
    </div>
  )
}
