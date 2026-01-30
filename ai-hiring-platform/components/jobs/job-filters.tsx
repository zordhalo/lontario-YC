"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface JobFiltersProps {
  filters: {
    status: string[]
    department: string[]
  }
  onFiltersChange: (filters: {
    status: string[]
    department: string[]
  }) => void
}

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "closed", label: "Closed" },
]

const departmentOptions = [
  { value: "Engineering", label: "Engineering" },
  { value: "Product", label: "Product" },
  { value: "Design", label: "Design" },
  { value: "Marketing", label: "Marketing" },
  { value: "Sales", label: "Sales" },
]

export function JobFilters({ filters, onFiltersChange }: JobFiltersProps) {
  const handleStatusChange = (value: string, checked: boolean) => {
    const newStatus = checked
      ? [...filters.status, value]
      : filters.status.filter((s) => s !== value)
    onFiltersChange({ ...filters, status: newStatus })
  }

  const handleDepartmentChange = (value: string, checked: boolean) => {
    const newDepartment = checked
      ? [...filters.department, value]
      : filters.department.filter((d) => d !== value)
    onFiltersChange({ ...filters, department: newDepartment })
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Status</h4>
          <div className="space-y-2">
            {statusOptions.map((option) => (
              <div key={option.value} className="flex items-center gap-2">
                <Checkbox
                  id={`status-${option.value}`}
                  checked={filters.status.includes(option.value)}
                  onCheckedChange={(checked) =>
                    handleStatusChange(option.value, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`status-${option.value}`}
                  className="text-sm font-normal text-muted-foreground cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Department Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Department</h4>
          <div className="space-y-2">
            {departmentOptions.map((option) => (
              <div key={option.value} className="flex items-center gap-2">
                <Checkbox
                  id={`dept-${option.value}`}
                  checked={filters.department.includes(option.value)}
                  onCheckedChange={(checked) =>
                    handleDepartmentChange(option.value, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`dept-${option.value}`}
                  className="text-sm font-normal text-muted-foreground cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
