# Moulin Rouge Front-end

Template website for Moulin Rouge restaurant with all their dishes, events and business info.

[![React](https://img.shields.io/badge/React_19.1.1-blue)](https://reactjs.org/)
[![React Router DOM](https://img.shields.io/badge/React_Router_DOM_7.9.4-blue)](https://reactjs.org/)
[![Axios](https://img.shields.io/badge/Axios_1.7.9-red)](https://developer.mozilla.org/es/docs/Web/JavaScript/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.9-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite_7.1.2-yellow)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest_4.1.10-darkgreen)](https://vitest.dev/)
[![Jest DOM](https://img.shields.io/badge/Jest_DOM_7.0.0-darkred)](https://testing-library.com/docs/ecosystem-jest-dom/)
[![License](https://img.shields.io/badge/Polyform_Perimeter_License_1.0.0-red)](LICENSE)

## Preview

Live Link: [https://chrysalcore.github.io/moulin-rouge/](https://chrysalcore.github.io/moulin-rouge/)

## Description

**Moulin Rouge Front-end** was created to provide a template website for the legendary Moulin Rouge restaurant.

The site has three pages with several sections, displaying a menu full of categories, events, business information and contact details. It showcases an incredible contrast in its carefully chosen color palette, elegant and warm typography, and images that create a unique atmosphere—all with the aim of transporting the user to that wonderful dinner they should already book!

The codebase is written in **React + TypeScript**, with state management using **strongly-typed contexts, reducers and custom hooks**. Data is retrieved from a third-party API through a typed helper layer. It also adheres to best practices, responsiveness, accessibility, and other modern web standards.

## Main Features

- Advanced state management with **context**, **reducers**.
- Strong typing across **components**, **hooks**, **context**, **router** and **helpers** using strict TypeScript.
- API consumption: efficient connection with RESTful APIs for read operations, with typed responses, response caching and TTL.
- Componentization with React + TypeScript.
- Responsive UI/UX: Interface designed with CSS that adapts to all devices.
- Cyclic animations, Smooth scrolling and a fluid user experience.
- Unit and integration tests (Vitest + Testing Library) covering hooks, context, routing and error/retry states.

## Technologies Used

| Category | Technologies |
| :--- | :--- |
| Frontend & Language | React 19, TypeScript 5 (strict), Vite 7 |
| State Management | useState, useContext, useReducer (typed) |
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

31 tests across 10 files, no network access.

## CI/CD

Two GitHub Actions workflows:

- **CI** runs on every push to `development`: type-check, lint, the full test suite with coverage thresholds, and a production build. If it passes, it opens a pull request to `main`.
- **Deploy** runs on every push to `main`: builds the project and publishes `dist/` to the `gh-pages` branch.

`main` is protected: changes land through a pull request with the `Typecheck, lint & test` check passing. Merging the PR is manual.

## Roadmap (pending)

- Migrate data fetching from the current context/reducer + Axios setup to **TanStack Query**.
- Introduce **Redux** for more advanced client-side state as the app grows.

## License

This project is licensed under the [PolyForm Perimeter License 1.0.0](LICENSE)

### Key Restrictions

- Free use for **non-commercial projects**.
- Use **prohibited** in businesses that compete with the owner.
- **Contact the owner** for a commercial license.
