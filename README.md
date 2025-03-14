# Project Tree Builder

A visual file tree generator that creates customizable, hierarchical representations of project structures. Perfect for documentation, presentations, or visualizing code organization.

## Overview

Project Tree Builder allows you to create interactive file tree visualizations with customizable styling options. It supports nested directories, visual highlighting, tooltips, and more to help effectively communicate project structure.

## Features

- Hierarchical file tree visualization
- Support for nested directories and files
- Visual customization (bold text, disabled items, selected items)
- Tooltips for additional context
- Indent levels for clear hierarchy representation

## Usage

To use Project Tree Builder, simply input your file structure in JSON format. Here's an example:

```json
[
  {
    "name": "src",
    "icon": "folder",
    "children": [
      {
        "name": "components",
        "icon": "folder",
        "children": [
          {
            "name": "Button.tsx",
            "icon": "file"
          },
          {
            "name": "Card.tsx",
            "icon": "file"
          }
        ]
      },
      {
        "name": "app",
        "isBold": true,
        "children": [
          {
            "name": "api",
            "children": [
              {
                "name": "index.ts",
                "icon": "function",
                "tooltip": "API endpoint"
              },
              {
                "name": "fooo.ts",
                "icon": "function",
                "isDisabled": true,
                "tooltip": "Not reachable route"
              }
            ]
          },
          {
            "name": "layout.tsx",
            "icon": "layout",
            "isSelected": true
          },
          {
            "name": "page.tsx"
          }
        ]
      }
    ]
  },
  {
    "name": "package.json",
    "icon": "file"
  }
]
```

The UI will automatically render your file tree with the appropriate styling and hierarchy.

## Options

Each file tree item supports the following properties:

| Property     | Type                                         | Description                                    |
| ------------ | -------------------------------------------- | ---------------------------------------------- |
| `name`       | string                                       | The name of the file or folder                 |
| `icon`       | "file" \| "function" \| "folder" \| "layout" | The icon to display for the item               |
| `children`   | FileTreeItem[]                               | Child items for folders                        |
| `isSelected` | boolean                                      | Displays a blue dot indicator next to the item |
| `isBold`     | boolean                                      | Renders the item text in bold                  |
| `isDisabled` | boolean                                      | Grays out the item (20% opacity)               |
| `tooltip`    | string \| React.ReactNode                    | Additional content displayed on hover          |
| `onAdd`      | function                                     | Callback function when adding to this item     |
| `onDelete`   | function                                     | Callback function when deleting this item      |
| `onEdit`     | function                                     | Callback function when editing this item       |

## Styling

The component supports automatic indentation up to 7 levels deep:

- Level 1: 1rem padding (pl-4)
- Level 2: 2rem padding (pl-8)
- Level 3: 3rem padding (pl-12)
- Level 4: 4rem padding (pl-16)
- Level 5: 5rem padding (pl-20)
- Level 6: 6rem padding (pl-24)
- Level 7: 7rem padding (pl-28)

## Icons

- Folder icon is applied automatically if the item has children but no icon specified
- Items with no children default to the file icon
- If the `icon` property is set, it takes precedence over the automatic icon selection
- Available icons:
  - `file`: Standard file icon (default)
  - `function`: Function/method icon
  - `folder`: Directory/folder icon
  - `layout`: Layout/interface icon
- Icons are rendered with increased stroke (1.5) when the item is bold

## Local Development

```bash
npm install
npm run dev
```
