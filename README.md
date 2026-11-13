# ArchVanta architecture template

A responsive Next.js page recreated from the supplied reference, using a navy and gold palette and replacement architecture photography.

## Development

```sh
npm install
npm run dev
```

Open http://localhost:3000. On Windows PowerShell with script restrictions, use `npm.cmd run dev`.

## Content and components

- `data/template.json`: brand, navigation, hero slides, section headings, descriptions, images, services, achievements, projects, testimonials, FAQs, and footer content. Edit this file to update page content; Next.js incorporates changes on rebuild (or immediately in development).
- `components/primitives.tsx`: reusable `MainContainer`, `SectionTitle`, and `SectionDescription` components.
- `components/sections.tsx`: individual page sections composed from the shared primitives and JSON data.
- `components/interactive.tsx`: mobile navigation, hero slider, photo/service preview dialogs, and FAQ accordion.
- `components/icon.tsx`: shared SVG icons.
- `app/globals.css`: responsive layout, typography, colors, and component styles.
- `app/page.tsx`: page composition.

Images are hosted externally on Unsplash and require internet access. Replace the image URLs in the JSON with your own production assets when available. The screenshot's exact source images were not provided. Figures, testimonials, and event entries are example content, as disclosed in the footer. Contact buttons use the email and phone values from the JSON; no form backend is required.

## Validation

```sh
npx tsc --noEmit
npm run build
```
# archvanta-architecture
