import * as React from "react"
import { cn } from "@/lib/utils"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, onValueChange, onChange, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onChange={(e) => {
          onValueChange?.(e.target.value);
          onChange?.(e);
        }}
        {...props}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = "Select"

const SelectGroup = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <optgroup className={className}>{children}</optgroup>
)

const SelectValue = ({ placeholder, className }: { placeholder?: string, className?: string }) => {
  return <option value="" disabled hidden className={className}>{placeholder}</option>;
}

const SelectTrigger = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return <>{children}</>;
}

const SelectContent = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return <>{children}</>;
}

const SelectLabel = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <option disabled className={cn("font-semibold", className)}>{children}</option>
)

const SelectItem = React.forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <option
        className={cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </option>
    )
  }
)
SelectItem.displayName = "SelectItem"

const SelectSeparator = () => <hr className="my-1 border-input" />

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}
