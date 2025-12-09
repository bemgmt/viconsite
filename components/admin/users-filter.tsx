"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

type FilterState = {
  search: string
  userType: string
  status: string
}

type UsersFilterProps = {
  onFilterChange: (filters: FilterState) => void
}

export function UsersFilter({ onFilterChange }: UsersFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    userType: "all",
    status: "all",
  })

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, search: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleUserTypeChange = (value: string) => {
    const newFilters = { ...filters, userType: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleStatusChange = (value: string) => {
    const newFilters = { ...filters, status: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const newFilters = {
      search: "",
      userType: "all",
      status: "all",
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const hasActiveFilters = filters.search || filters.userType !== "all" || filters.status !== "all"

  return (
    <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
          >
            <X className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name or email..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {/* User Type Filter */}
        <div className="space-y-2">
          <Label htmlFor="userType">User Type</Label>
          <Select value={filters.userType} onValueChange={handleUserTypeChange}>
            <SelectTrigger id="userType">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="SALES_PERSON">Sales Person</SelectItem>
              <SelectItem value="INFLUENCER">Influencer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger id="status">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

