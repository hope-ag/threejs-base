# threejs-base

<!--toc:start-->
- [threejs-base](#threejs-base)
  - [Demo](#demo)
  - [Features](#features)
  - [Getting Started](#getting-started)
  - [Scripts](#scripts)
  - [License](#license)
<!--toc:end-->

A minimal Three.js starter template using **WebGPU**, **TSL (Three Shading Language)**, and **Vite**.

## Demo

<video src="docs/demo.mp4" autoplay loop muted playsinline></video>

## Features

- WebGPU renderer with fallback
- Three Shading Language (TSL) for shader authoring
- OrbitControls, GLTF/DRACO loaders, and lil-gui pre-configured
- Tailwind CSS 4
- TypeScript, ESLint, Prettier, and Husky

## Getting Started

```bash
pnpm install
pnpm dev
```

## Scripts

| Command          | Description            |
| ---------------- | ---------------------- |
| `pnpm dev`       | Start dev server       |
| `pnpm build`     | Production build       |
| `pnpm preview`   | Preview production build |
| `pnpm typecheck` | Run type checking      |
| `pnpm lint`      | Lint with ESLint       |
| `pnpm format`    | Format with Prettier   |

## License

MIT
