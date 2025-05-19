"use client"

interface ConsoleProps {
  output: string
}

export function Console({ output }: ConsoleProps) {
  return (
    <div className="h-full flex flex-col bg-[#0d1117]">
      <div className="bg-[#161b22] py-2 px-3 text-sm font-medium border-b border-[#30363d] flex justify-between items-center">
        <span className="text-white">Console Output</span>
        <span className="text-gray-400 text-xs">Python</span>
      </div>
      <div className="flex-1 p-3 font-mono text-sm overflow-auto">
        {output ? (
          <pre className="whitespace-pre-wrap text-white">{output}</pre>
        ) : (
          <div className="text-gray-400">Run your code to see output here...</div>
        )}
      </div>
    </div>
  )
}
