# Component Labels - Wireframe Reference

## Header Section Components

### 1. Page Title Area
**Label**: `page-title-section`
**Current Spacing**: `pt-2 mb-0.5`
**Description**: Main page heading with record count
```tsx
<div className="flex items-baseline gap-4">
  <h1 className="text-2xl font-bold text-gray-800">Contacts - Client</h1>
  <p className="text-sm text-gray-600">55 Records in Clients List</p>
</div>
```

### 2. Primary Action Buttons
**Label**: `primary-action-row`
**Current Spacing**: `-mt-2 mb-3` (pulled up from title)
**Description**: Main action buttons (New, Email, SMS, etc.)
```tsx
<div className="flex gap-2 flex-wrap">
  {/* Green New button, Blue action buttons */}
</div>
```

### 3. Secondary Action Buttons  
**Label**: `secondary-action-row`
**Current Spacing**: Part of same container as primary
**Description**: Secondary actions (Combined, Separate, etc.)
```tsx
<div className="flex gap-2 flex-wrap">
  {/* All blue secondary buttons */}
</div>
```

### 4. Utility Action Buttons
**Label**: `utility-action-row`
**Current Spacing**: Right-aligned in two rows
**Description**: Utility functions (Update, Import, Export, Delete, etc.)
```tsx
<div className="flex flex-col gap-2 items-end">
  {/* Blue utilities top row, Warning/Destructive bottom row */}
</div>
```

### 5. Pagination Controls
**Label**: `pagination-section`
**Current Spacing**: `py-0` (no vertical padding)
**Description**: Page navigation, filters, and search
```tsx
<div className="flex items-center justify-between flex-wrap gap-4">
  {/* Left: pagination, Center: filters/search, Right: settings */}
</div>
```

### 6. Content Body Transition
**Label**: `content-body-start`
**Current Spacing**: `-mt-1` (pulled up to pagination)
**Description**: Table/content area with minimal gap from controls
```tsx
<div className="min-w-[1400px]">
  <Table className="border-t border-gray-200 relative -mt-1">
```

## Spacing Relationships

### Vertical Flow
```
Container Top (pt-2)
    ↓ 8px
Page Title
    ↓ ~4px (mb-0.5 + -mt-2)
Action Buttons
    ↓ 12px (mb-3)
Pagination Controls  
    ↓ ~4px (-mt-1)
Content Body
```

### Button Groupings
- **Left Side**: Primary actions (2 rows)
- **Right Side**: Utility actions (2 rows, right-aligned)
- **Center**: Pagination and search controls

## Reference Implementation
**File**: `src/screens/Contacts/Contacts.tsx`
**Component**: `ContactsHeader`
**Status**: ✅ Master wireframe standard

## To Be Updated
- [ ] Accounts header section
- [ ] Jobs header section  
- [ ] Other list page headers

---
*Use these labels when discussing spacing changes or creating new wireframe standards*