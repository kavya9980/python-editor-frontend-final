"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FilePlus, Save, Download, Settings } from "lucide-react"

interface NavbarProps {
  onNewFile: () => void
}

export function Navbar({ onNewFile }: NavbarProps) {
  return (
    <div className="bg-[#161b22] text-white py-2 px-3 flex items-center border-b border-[#30363d]">
      <div className="font-bold text-lg mr-4">Python Editor</div>

      <div className="flex space-x-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#1f2937] h-7">
              File
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#161b22] text-white border-[#30363d]">
            <DropdownMenuItem onClick={onNewFile} className="hover:bg-[#1f2937]">
              <FilePlus className="mr-2 h-4 w-4" />
              New File
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#1f2937]">
              <Save className="mr-2 h-4 w-4" />
              Save
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#1f2937]">
              <Download className="mr-2 h-4 w-4" />
              Download
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#1f2937] h-7">
              Edit
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#161b22] text-white border-[#30363d]">
            <DropdownMenuItem className="hover:bg-[#1f2937]">Undo</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#1f2937]">Redo</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#1f2937]">Find</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white hover:bg-[#1f2937] h-7">
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#161b22] text-white border-[#30363d]">
            <DropdownMenuItem className="hover:bg-[#1f2937]">Toggle Terminal</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#1f2937]">Zoom In</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-[#1f2937]">Zoom Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="ml-auto">
        <Button variant="ghost" size="icon" className="text-white hover:bg-[#1f2937] h-7 w-7">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
