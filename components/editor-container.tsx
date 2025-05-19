"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeEditor } from "@/components/code-editor"
import { OutputPanel } from "@/components/output-panel"
import { PlayIcon, SaveIcon, FileIcon } from "lucide-react"
import { FileExplorer } from "@/components/file-explorer"

export function EditorContainer() {
  const [code, setCode] = useState('# Write your Python code here\nprint("Hello, World!")')
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")

  const runCode = async () => {
    setIsRunning(true)
    setOutput("Running code...")

    try {
      // In a real implementation, this would send the code to a backend service
      // For demo purposes, we'll simulate a response
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate output
      const simulatedOutput = `Hello, World!\n\nProcess finished with exit code 0`
      setOutput(simulatedOutput)
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  const saveCode = () => {
    // In a real implementation, this would save to a backend or local storage
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "python_code.py"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="hidden md:block w-64 border-r p-4 overflow-auto">
        <FileExplorer />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b p-2 flex items-center gap-2">
          <Button onClick={runCode} disabled={isRunning} className="gap-1">
            <PlayIcon className="h-4 w-4" />
            Run
          </Button>
          <Button variant="outline" onClick={saveCode} className="gap-1">
            <SaveIcon className="h-4 w-4" />
            Save
          </Button>
        </div>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="editor" className="flex flex-col h-full" value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b px-4">
              <TabsList>
                <TabsTrigger value="editor" className="gap-1">
                  <FileIcon className="h-4 w-4" />
                  Editor
                </TabsTrigger>
                <TabsTrigger value="output" className="gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <polyline points="9 10 4 15 9 20" />
                    <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                  </svg>
                  Output
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="editor" className="flex-1 p-0 overflow-auto">
              <CodeEditor code={code} setCode={setCode} />
            </TabsContent>
            <TabsContent value="output" className="flex-1 p-0 overflow-auto">
              <OutputPanel output={output} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
