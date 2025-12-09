"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, CheckCircle, XCircle } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { UsersFilter } from "./users-filter"

type User = {
  id: string
  name: string
  email: string
  userType: string | null
  phone: string | null
  isActive: boolean
  createdAt: Date
}

type UsersTableProps = {
  users: User[]
}

type FilterState = {
  search: string
  userType: string
  status: string
}

export function UsersTableWithBulk({ users }: UsersTableProps) {
  const router = useRouter()
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
  const [isProcessing, setIsProcessing] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    userType: "all",
    status: "all",
  })

  // Filter users based on current filters
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // User type filter
      if (filters.userType !== "all" && user.userType !== filters.userType) {
        return false
      }

      // Status filter
      if (filters.status !== "all") {
        const isActive = filters.status === "active"
        if (user.isActive !== isActive) return false
      }

      return true
    })
  }, [users, filters])

  const toggleUser = (userId: string) => {
    const newSelected = new Set(selectedUsers)
    if (newSelected.has(userId)) {
      newSelected.delete(userId)
    } else {
      newSelected.add(userId)
    }
    setSelectedUsers(newSelected)
  }

  const toggleAll = () => {
    if (selectedUsers.size === filteredUsers.length && filteredUsers.length > 0) {
      setSelectedUsers(new Set())
    } else {
      setSelectedUsers(new Set(filteredUsers.map(u => u.id)))
    }
  }

  const bulkActivate = async () => {
    if (selectedUsers.size === 0) {
      toast.error("No users selected")
      return
    }

    setIsProcessing(true)
    try {
      const response = await fetch("/api/admin/users/bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userIds: Array.from(selectedUsers),
          isActive: true,
        }),
      })

      if (!response.ok) throw new Error("Failed to activate users")

      toast.success(`Activated ${selectedUsers.size} user(s)`)
      setSelectedUsers(new Set())
      router.refresh()
    } catch (error) {
      toast.error("Failed to activate users")
    } finally {
      setIsProcessing(false)
    }
  }

  const bulkDeactivate = async () => {
    if (selectedUsers.size === 0) {
      toast.error("No users selected")
      return
    }

    setIsProcessing(true)
    try {
      const response = await fetch("/api/admin/users/bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userIds: Array.from(selectedUsers),
          isActive: false,
        }),
      })

      if (!response.ok) throw new Error("Failed to deactivate users")

      toast.success(`Deactivated ${selectedUsers.size} user(s)`)
      setSelectedUsers(new Set())
      router.refresh()
    } catch (error) {
      toast.error("Failed to deactivate users")
    } finally {
      setIsProcessing(false)
    }
  }

  const exportToCSV = () => {
    const usersToExport = selectedUsers.size > 0 
      ? users.filter(u => selectedUsers.has(u.id))
      : users

    const headers = ["Name", "Email", "Type", "Phone", "Status", "Created"]
    const rows = usersToExport.map(u => [
      u.name,
      u.email,
      u.userType === "SALES_PERSON" ? "Sales Person" : "Influencer",
      u.phone || "",
      u.isActive ? "Active" : "Inactive",
      new Date(u.createdAt).toLocaleDateString(),
    ])

    const csv = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `vicon-users-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)

    toast.success(`Exported ${usersToExport.length} user(s) to CSV`)
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <UsersFilter onFilterChange={setFilters} />

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredUsers.length} of {users.length} user(s)
      </div>

      {/* Bulk Actions Bar */}
      {selectedUsers.size > 0 && (
        <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
          <span className="text-sm font-medium">
            {selectedUsers.size} user(s) selected
          </span>
          <div className="flex gap-2 ml-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={bulkActivate}
              disabled={isProcessing}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Activate
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={bulkDeactivate}
              disabled={isProcessing}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Deactivate
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={exportToCSV}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Selected
            </Button>
          </div>
        </div>
      )}

      {/* Export All Button */}
      <div className="flex justify-end">
        <Button
          size="sm"
          variant="outline"
          onClick={exportToCSV}
        >
          <Download className="mr-2 h-4 w-4" />
          Export All to CSV
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                onCheckedChange={toggleAll}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                {users.length === 0
                  ? "No users found. Add your first user to get started."
                  : "No users match the current filters."}
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.has(user.id)}
                    onCheckedChange={() => toggleUser(user.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.userType === "SALES_PERSON" ? "default" : "secondary"}>
                    {user.userType === "SALES_PERSON" ? "Sales Person" : "Influencer"}
                  </Badge>
                </TableCell>
                <TableCell>{user.phone || "-"}</TableCell>
                <TableCell>
                  <Badge variant={user.isActive ? "default" : "outline"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/users/${user.id}/details`}>View</Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/users/${user.id}`}>Edit</Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

