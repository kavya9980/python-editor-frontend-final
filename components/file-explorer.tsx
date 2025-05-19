"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FolderIcon, FileIcon, FolderPlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type FileType = {
  id: string
  name: string
  type: "file" | "folder"
  children?: FileType[]
}

export function FileExplorer() {
  const [files, setFiles] = useState<FileType[]>([
    {
      id: "1",
      name: "examples",
      type: "folder",
      children: [
        { id: "2", name: "hello_world.py", type: "file" },
        { id: "3", name: "fibonacci.py", type: "file" },
      ],
    },
    { id: "4", name: "main.py", type: "file" },
  ])

  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    "1": true,
  })

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const renderFileTree = (items: FileType[], level = 0) => {
    return items.map((item) => (
      <div key={item.id} className="select-none">
        <div
          className={cn("flex items-center gap-2 py-1 px-2 rounded hover:bg-muted cursor-pointer", "text-sm")}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => (item.type === "folder" ? toggleFolder(item.id) : null)}
        >
          {item.type === "folder" ? (
            <FolderIcon className="h-4 w-4 text-yellow-500" />
          ) : (
            <FileIcon className="h-4 w-4 text-blue-500" />
          )}
          <span>{item.name}</span>
        </div>

        {item.type === "folder" && expandedFolders[item.id] && item.children && (
          <div>{renderFileTree(item.children, level + 1)}</div>
        )}
      </div>
    ))
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Files</h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <FileIcon className="h-4 w-4" />
            <span className="sr-only">New File</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <FolderPlusIcon className="h-4 w-4" />
            <span className="sr-only">New Folder</span>
          </Button>
        </div>
      </div>
      <div className="overflow-auto flex-1">{renderFileTree(files)}</div>
    </div>
  )
}
