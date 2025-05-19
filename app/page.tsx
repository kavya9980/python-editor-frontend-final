"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SimpleEditor } from "./components/simple-editor"
import { Console } from "./components/console"
import { Navbar } from "./components/navbar"
import { FileExplorer } from "./components/file-explorer"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

export default function PythonEditor() {
  const [code, setCode] = useState('print("Hello, World!")')
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [activeFile, setActiveFile] = useState("main.py")
  const [files, setFiles] = useState({
    "main.py": 'print("Hello, World!")',
    "example.py": 'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Python"))',
  })
  const [isFileExplorerOpen, setIsFileExplorerOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("editor")
  const editorContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Force layout recalculation when tab changes
    const timeout = setTimeout(() => {
      window.dispatchEvent(new Event("resize"))
    }, 100)

    return () => clearTimeout(timeout)
  }, [activeTab, isFileExplorerOpen])

  const handleCodeChange = (value: string) => {
    setCode(value)
    setFiles((prev) => ({
      ...prev,
      [activeFile]: value,
    }))
  }

  const handleFileSelect = (filename: string) => {
    setActiveFile(filename)
    setCode(files[filename])
  }

  const handleNewFile = () => {
    const newFileName = `file${Object.keys(files).length + 1}.py`
    setFiles((prev) => ({
      ...prev,
      [newFileName]: "# New file",
    }))
    setActiveFile(newFileName)
    setCode("# New file")
  }

  const toggleFileExplorer = () => {
    setIsFileExplorerOpen(!isFileExplorerOpen)
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const runCode = async () => {
    setIsRunning(true)
    setOutput("Running...")

    // Wait a moment to simulate execution
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Very simple simulation based on code content
    try {
      if (code.includes('print("Hello, World!")')) {
        setOutput("Hello, World!\n\nProgram executed successfully.")
      } else if (code.includes('print("')) {
        // Extract the string inside the print statement
        const match = code.match(/print$$"([^"]*)"$$/)
        if (match && match[1]) {
          setOutput(`${match[1]}\n\nProgram executed successfully.`)
        } else {
          setOutput("Output of print statement\n\nProgram executed successfully.")
        }
      } else if (code.includes("print(")) {
        if (code.includes('greet("Python")')) {
          setOutput("Hello, Python!\n\nProgram executed successfully.")
        } else {
          setOutput("Output of print statement\n\nProgram executed successfully.")
        }
      } else if (code.includes("error") || code.includes("Error")) {
        setOutput("Error: Simulated Python error")
      } else {
        setOutput("Program executed successfully with no output.")
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-white">
      <Navbar onNewFile={handleNewFile} />

      <div className="flex flex-1 overflow-hidden">
        {/* File Explorer with Toggle */}
        <div
          className={`bg-[#0d1117] border-r border-[#30363d] flex flex-col ${
            isFileExplorerOpen ? "w-48" : "w-10"
          } transition-all duration-300`}
        >
          {isFileExplorerOpen ? (
            <>
              <div className="flex justify-between items-center p-2 border-b border-[#30363d]">
                <span className="font-medium text-sm text-white">Files</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFileExplorer}
                  className="h-6 w-6 text-gray-400 hover:text-white hover:bg-[#1f2937]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
              <div className="overflow-auto flex-1">
                <FileExplorer files={files} activeFile={activeFile} onFileSelect={handleFileSelect} />
              </div>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFileExplorer}
              className="h-10 w-10 self-center mt-2 text-gray-400 hover:text-white hover:bg-[#1f2937]"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden" ref={editorContainerRef}>
          <Tabs
            defaultValue="editor"
            value={activeTab}
            onValueChange={handleTabChange}
            className="flex-1 flex flex-col"
          >
            <div className="bg-[#161b22] p-2 border-b border-[#30363d] flex justify-between items-center">
              <div className="flex items-center">
                <TabsList className="bg-[#0d1117]">
                  <TabsTrigger value="editor" className="data-[state=active]:bg-[#1f2937] text-white">
                    Editor
                  </TabsTrigger>
                  <TabsTrigger value="split" className="data-[state=active]:bg-[#1f2937] text-white">
                    Split View
                  </TabsTrigger>
                </TabsList>
                <div className="ml-4 text-sm font-medium text-gray-400">{activeFile}</div>
              </div>

              <Button
                onClick={runCode}
                disabled={isRunning}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
              >
                <Play className="h-4 w-4" />
                {isRunning ? "Running..." : "Run Code"}
              </Button>
            </div>

            <TabsContent value="editor" className="flex-1 flex flex-col overflow-hidden p-0 m-0 border-0">
              <div className="flex-1 overflow-hidden">
                <SimpleEditor value={code} onChange={handleCodeChange} language="python" />
              </div>
              <div className="h-1/3 border-t border-[#30363d]">
                <Console output={output} />
              </div>
            </TabsContent>

            <TabsContent value="split" className="flex-1 flex overflow-hidden p-0 m-0 border-0">
              <div className="w-1/2 overflow-hidden border-r border-[#30363d]">
                <SimpleEditor value={code} onChange={handleCodeChange} language="python" />
              </div>
              <div className="w-1/2 overflow-hidden">
                <Console output={output} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="bg-[#161b22] text-white p-2 text-xs flex justify-between border-t border-[#30363d]">
        <span>Python Editor v1.0.0</span>
        <span>{isRunning ? "Running..." : "Ready"}</span>
      </div>
    </div>
  )
}
