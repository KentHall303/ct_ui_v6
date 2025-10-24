# Spacing Standards - Wireframe Master

## Header Section Spacing Standards

Based on the Contacts page refinements, these are the established spacing standards for consistent application across all pages.

### Title Section
- **Above Title**: `pt-2` (8px) - Provides breathing room from top container edge
- **Below Title**: `mb-0.5` with `-mt-2` on button section = ~4px effective gap
- **Title Typography**: `text-2xl font-bold` with baseline spacing

### Action Button Sections
- **Between Button Rows**: `gap-2` (8px) - Standard gap between button groups
- **Button Internal Spacing**: `h-6 px-1.5 py-0.5` - Compact button sizing
- **Button Groups**: Two-row layout with left-aligned primary actions, right-aligned secondary actions

### Pagination Controls
- **Above Pagination**: Standard container padding
- **Below Pagination**: `py-0` with `-mt-1` on following content - Creates tight connection to body content
- **Pagination Layout**: Left (nav), Center (filters/search), Right (actions)

### Content Transition
- **Header to Body**: Minimal gap using negative margins to create seamless flow
- **Table Header**: Sticky positioning with `z-30` for proper layering

## Implementation Classes

### Container Spacing
```css
.header-container {
  padding: pt-2 pb-4 px-4; /* Top tight, bottom generous, sides standard */
}

.title-section {
  margin-bottom: mb-0.5; /* Tight below title */
}

.button-section {
  margin-top: -mt-2; /* Pull up to title */
  margin-bottom: mb-3; /* Standard below buttons */
}

.pagination-section {
  padding: py-0; /* No vertical padding */
}

.content-body {
  margin-top: -mt-1; /* Pull up to pagination */
}
```

### Visual Hierarchy
1. **Title** - Most prominent with minimal surrounding space
2. **Action Buttons** - Grouped logically with clear visual separation
3. **Pagination/Filters** - Functional controls with tight spacing
4. **Content Body** - Seamless connection to controls above

## Usage Guidelines

### When to Apply These Standards
- All list/table pages (Contacts, Accounts, Jobs, etc.)
- Any page with title + action buttons + content body structure
- Maintain consistency across the application

### Customization Notes
- Adjust `pt-2` above title only if container context requires it
- Keep button-to-content flow tight with negative margins
- Preserve the two-row button layout for complex action sets

## Files Using These Standards
- `src/screens/Contacts/Contacts.tsx` - Reference implementation
- `src/screens/Accounts/sections/HeaderSection/HeaderSection.tsx` - Should be updated
- `src/screens/Jobs/Jobs.tsx` - Should be updated

---
*Last Updated: Based on Contacts page spacing refinements*