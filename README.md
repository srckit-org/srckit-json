# srckit-json

<p align="center">
  <strong>Format, validate, query, and sort JSON with real-time feedback.</strong>
</p>

<p align="center">
  <a href="https://json.srckit.org">Live Demo</a> ·
  <a href="https://github.com/srckit-org/srckit">SrKit Suite</a> ·
  <a href="https://github.com/srckit-org/srckit-json/issues">Report Bug</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/react-19-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/MUI-9-007FFF?style=flat-square&logo=mui&logoColor=white" alt="MUI 9" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind 4" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 6" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/github/license/srckit-org/srckit-json?style=flat-square" alt="License" />
</p>

---

## Overview

srckit-json is a comprehensive JSON toolkit for developers. Format minified JSON, validate syntax, query data with dot-notation paths, and sort keys — all with instant feedback.

## Features

### Formatter
- **Pretty print** — format with 2, 4, or 8 spaces
- **Minify** — compress to single line
- **Stats** — show key count, array count, depth, and file size

### Validator
- **Real-time validation** — errors shown as you type
- **Line numbers** — find issues quickly
- **Error details** — clear messages for syntax problems

### Path Evaluator
- **Dot notation** — query nested data (e.g., `users.0.name`)
- **Array indexing** — access array elements (e.g., `items[2].id`)
- **Live preview** — see results instantly

### Key Sorter
- **Alphabetical sort** — reorder all object keys
- **Recursive** — sorts nested objects too
- **Copy output** — paste the sorted JSON anywhere

## Getting Started

```bash
git clone https://github.com/srckit-org/srckit-json.git
cd srckit-json
npm install
npm run dev
```

## Path Syntax

| Path | Description |
|------|-------------|
| `key` | Top-level property |
| `key.subkey` | Nested property |
| `arr[0]` | First array element |
| `arr[0].prop` | Property of array element |

## License

MIT © [srckit-org](https://github.com/srckit-org)
