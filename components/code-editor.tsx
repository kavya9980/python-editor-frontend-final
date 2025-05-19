"use client"

import { useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"

interface CodeEditorProps {
  code: string
  setCode: (code: string) => void
}

export function CodeEditor({ code, setCode }: CodeEditorProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // In a real implementation, we would initialize a code editor like Monaco or CodeMirror here
    // For simplicity, we're using a textarea with some basic styling
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative h-full w-full">
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="font-mono text-sm h-full min-h-[500px] resize-none rounded-none border-0 p-4 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Write your Python code here..."
        spellCheck={false}
      />
    </div>
  )
}
