# Moulin Rouge Front-end

Template website for Moulin Rouge restaurant with all their dishes, events and business info.

[![React](https://img.shields.io/badge/React_19.0.0-blue)](https://reactjs.org/)
[![React Router DOM](https://img.shields.io/badge/React_Router_DOM_7.9.4-blue)](https://reactjs.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query_5.104.1-red)](https://tanstack.com/query/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit_2.13.0-purple)](https://redux-toolkit.js.org/)
[![Zod](https://img.shields.io/badge/Zod_4.6.5-blue)](https://zod.dev/)
[![Axios](https://img.shields.io/badge/Axios_1.7.9-red)](https://axios-http.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.9-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_7.1.3-yellow)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest_4.1.10-darkgreen)](https://vitest.dev/)
[![Jest DOM](https://img.shields.io/badge/Jest_DOM_7.0.0-darkred)](https://testing-library.com/docs/ecosystem-jest-dom/)
[![License](https://img.shields.io/badge/Polyform_Perimeter_License_1.0.0-red)](LICENSE)

## Preview

Live Link: [https://chrysalcore.github.io/moulin-rouge/](https://chrysalcore.github.io/moulin-rouge/)

## Description

**Moulin Rouge Front-end** was created to provide a template website for the legendary Moulin Rouge restaurant.

The site has four pages with several sections, displaying a menu full of categories, events, business information and contact details, plus an order page where visitors build their order from the menu. It showcases an incredible contrast in its carefully chosen color palette, elegant and warm typography, and images that create a unique atmosphere—all with the aim of transporting the user to that wonderful dinner they should already book!

The codebase is written in **React + TypeScript**. Server state (dishes and events from a third-party API) is handled by **TanStack Query**, and client state (the order) by **Redux Toolkit**, persisted in `localStorage` and validated with **Zod**. It also adheres to best practices, responsiveness, accessibility, and other modern web standards.

## Main Features

- Server state with **TanStack Query**: one typed fetcher and one hook per resource, a shared cache, and loading/error/retry handled per section, so one failing resource doesn't take down the page.
- Client state with **Redux Toolkit**: an order slice written from the menu and the order page and read by the header badge. It stores only dish ids and quantities, since names and prices come from the query cache.
- Order persisted in `localStorage` and validated with **Zod** on load, so corrupted or tampered data falls back to an empty order instead of crashing the app.
- Strong typing across **components**, **hooks**, **store**, **router** and **helpers** using strict TypeScript.
- Route-level error boundary for render errors, with a fallback that keeps the layout in place.
- Componentization with React + TypeScript.
- Responsive UI/UX: Interface designed with CSS that adapts to all devices.
- Cyclic animations, Smooth scrolling and a fluid user experience.
- Unit and integration tests (Vitest + Testing Library) covering hooks, the store and its persistence, the order flow, routing and error/retry states.

## Technologies Used

| Category | Technologies |
| :--- | :--- |
| Frontend & Language | React 19, TypeScript 5 (strict), Vite 7 |
| Server State | TanStack Query |
| Client State | Redux Toolkit, React Redux |
| Validation | Zod |
| HTTP Client | Axios |
| Routing | React Router DOM 7 |
| Testing | Vitest, Testing Library |
| Style | CSS |
| Tools | ESLint, Vitest |
| Version Control | Git, GitHub |
| CI/CD | GitHub Actions |
| Deployment | GitHub Pages |

## Local Installation and Use

Follow these steps to run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/es/)
- [NPM](https://www.npmjs.com)

### Steps

1. Clone the repository

    ```bash
    git clone https://github.com/chrysalcore/moulin-rouge.git
    cd moulin-rouge
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Run development mode

    ```bash
    npm run dev
    ```

### Run tests

```bash
npm test              # watch mode
npm run test:run      # single run
npm run test:coverage # single run with coverage report, used by CI
npm run typecheck     # tsc --noEmit, used by CI
```

45 tests across 13 files, no network access.

## CI/CD

Two GitHub Actions workflows:

- **CI** runs on every push to `development`: type-check, lint, the full test suite with coverage thresholds, and a production build. If it passes, it opens a pull request to `main`.
- **Deploy** runs on every push to `main`: builds the project and publishes `dist/` to the `gh-pages` branch.

`main` is protected: changes land through a pull request with the `Typecheck, lint & test` check passing. Merging the PR is manual.

## License

This project is licensed under the [PolyForm Perimeter License 1.0.0](LICENSE)

### Key Restrictions

- Free use for **non-commercial projects**.
- Use **prohibited** in businesses that compete with the owner.
- **Contact the owner** for a commercial license.
