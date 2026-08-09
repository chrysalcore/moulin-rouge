# molino_rojo (frontend) — notas específicas de este repo

Preferencias generales en `~/.claude/CLAUDE.md` (que cubre solo lo transversal a todos los proyectos). Esto es lo propio de este repo.

- `tsconfig.json` tiene `"strict": true` (decisión de Ordnay, 2026-08-08 — ya no es la excepción del portafolio). `target` se subió de `es5` a `es2020` en el mismo trabajo, porque `es5` rompía el typecheck real (iteración de `Set` en `useConnect.tsx`) apenas `tsc` empezó a correr de verdad. Activar `strict` solo destapó dos errores, ambos en `useConnect.tsx`: el tipo de retorno declaraba `Dish[] | undefined`/`Event[] | undefined` cuando `data` nunca es `undefined` en runtime (`useStatus` lo inicializa como `{dishes: [], events: []}` y el reducer nunca lo deja indefinido) — se corrigió la anotación, no la lógica.
- Arquitectura de estado en capas, no tocar sin entenderla primero:
  - `src/context/dataContext.tsx` → `DataProvider`/`useData`: datos ya cargados (`categories`, `dishes`, `events`).
  - `src/hooks/useStatus.tsx` → reducer local para estado de fetch (`loading`/`data`/`error`), acciones tipadas como unión discriminada en `src/types/state.ts`.
  - `src/hooks/useConnect.tsx` → compone `useStatus` + efecto de fetch, devuelve tupla etiquetada.
  - Todo hook custom que combine estado sigue el patrón de tupla (`[loading, data, error]`), no objeto.
- Tipos centralizados en `src/types/*.ts`, re-exportados por el barrel `src/types/index.ts` — importar siempre desde `'../types'`, nunca del archivo específico directo.
- Único repo con comentarios en el código: un banner de una línea en español al inicio de cada archivo de `src/types/` (ej. `// Tipos para el estado y reducer`). Mantener ese patrón si se agregan archivos de tipos nuevos; no extenderlo al resto del código.
- Único repo que adoptó Conventional Commits (`feat(scope): …`, `chore(scope): …`), pero solo a partir de la migración a TS; commits previos son descriptivos sin prefijo, igual que el resto del portafolio. No está confirmado si fue una decisión deliberada de mantener solo aquí o si en realidad debería volverse el estándar en todos los repos (o revertirse a la convención general). Antes del próximo commit en este repo, preguntar cuál de las dos.
- CSS global por sección en `src/assets/styles/*.css`, BEM (`form-field__input`), sin CSS Modules.

## Plan de testing (Vitest + Testing Library) — en progreso

Sin infraestructura de testing al iniciar este plan (sin Vitest, sin CI). Orden acordado con Ordnay (2026-08-06): ejecutar las fases en orden, CI recién después de cerrar la Fase 3.

**Fase 0 — Setup (hecho 2026-08-08):** `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, `@vitest/coverage-v8`, mismo patrón de `pokedex-app` (`vite.config.ts` con `defineConfig` de `vitest/config`, `environment: 'jsdom'`, `globals: false`, `src/tests/vitest.setup.ts` con `cleanup()` + `localStorage.clear()` en cada test). Scripts reales: `test` (watch), `test:run`, `test:coverage` — se corrigió acá el nombre original de este plan (`test:watch`/`coverage`), que no coincidía con lo que `pokedex-app` usa en producción. Thresholds de cobertura ya configurados (statements 95, branches/functions 90, lines 95) aunque todavía no hay tests — van a fallar hasta que la Fase 1 los cierre. `jsdom` pinneado en `^27` (no la última `^30`): esa exige Node `^22.22.2` y el entorno tenía `22.22.1`. Tests en `src/tests/` espejando `src/`, por la convención general del portafolio.

**Fase 1 — Unit, lógica pura:**
- `useStatus` (`src/hooks/useStatus.tsx`): reducer, acciones `LOADING`/`SUCCESS`/`ERROR`; `default: return state` se excluye de cobertura como rama defensiva.
- `helpers/load.ts`: cache-hit en `localStorage` (no llama a axios), cache-miss (llama a axios y cachea), error de axios → acción `ERROR`. Mock de `axios` con factory explícita, no automock.
- `useCurrent` (`src/hooks/useCurrent.tsx`): wraparound en los límites (`MAX_INDEX = 4`).

**Fase 2 — Unit hooks con DOM (`renderHook`):**
- `useConnect`: mock de `load`, `vi.useFakeTimers()` para el `setTimeout` de 3s, verificar transición de `loading` y llamada a `dispatch`.
- `DataProvider`/`useData`: el valor pasado se refleja en el context.

**Fase 3 — Integration (router + context):**
- `DishesList` con `MemoryRouter` + `:category` + `DataProvider` mock: solo lista los platos de la categoría de la URL.
- `Menu` + `Categories`: click en categoría navega y se ve el listado correcto (router real, no mock de `useParams`).
- `AppRouter`/`App`: loading state, error state (mock de `load` rechazando), redirects (`*` → `/`, `/menu` índice → `/menu/pizza`).

**Gap real encontrado (tratamiento TDD — test primero, fix después):** no existe ningún Error Boundary en el repo (`grep` de `ErrorBoundary`/`componentDidCatch` no devuelve nada). Hoy solo se maneja el error de *fetch* (`App.tsx`, vía `useStatus`); un error de *render* (ej. la API devuelve `dishes` con forma inesperada y algo revienta en `DishesList`) tira toda la app a pantalla blanca. Alineado con la nota general de `~/.claude/CLAUDE.md` sobre proponer al menos un error boundary genérico cuando el proyecto crece más allá de una landing simple.
- Fix correcto para este repo: **no** una clase `ErrorBoundary` envolviendo `<Outlet/>` en `App.tsx` — el proyecto ya usa `createBrowserRouter` (React Router v7, data router), que trae `errorElement` para esto. Poner `errorElement` en la ruta raíz reemplazaría todo `App` (incluyendo `Header`/`Hero`/`Footer`) ante cualquier error de un hijo; en cambio, meter una ruta intermedia sin `path` que agrupe `Home`/`Reservations`/`Menu` con su propio `errorElement` mantiene el layout (`Head`, `Header`, `Hero`, `Footer`) intacto y solo reemplaza el contenido de `Outlet`, igual que el comportamiento actual del error de fetch.
- Test primero (debe fallar contra el código actual): montar el árbol de rutas, forzar un throw de render en un hijo, verificar que el layout persiste y se ve un fallback solo en el área de `Outlet`. Implementación después: la ruta intermedia + `errorElement` en `AppRouter.tsx`, hasta que el test pase.
- Si aparecen gaps similares en Fases 1-2, mismo criterio: test rojo primero, fix después, aviso en el momento.

**CI adelantado (2026-08-08):** el orden original de este plan dejaba CI para después de la Fase 3, pero el repo no arrancaba desde un clone limpio (entry point roto en `index.html` tras la migración a TS, tipo `BriefInfo` inexistente, `target: es5` incompatible con el código ya escrito) y nada lo detectaba — ni build corría `tsc`, ni ESLint miraba archivos `.ts/.tsx`. Se resolvió eso primero (fixes + `typecheck` en `build` + ESLint apuntando a `**/*.{ts,tsx}`) y se adelantó `.github/workflows/ci.yml` y `deploy.yml`, copiando el patrón de `pokedex-app` (push a la rama de trabajo → PR automático a `main` si el build pasa; push a `main` → build + publish a `gh-pages`). La rama de trabajo se renombró de `develop` a `development` (local y remota) después de crear estos workflows — `ci.yml` todavía dice `branches: [develop]` y hay que corregirlo. Pendiente: arreglar esa referencia y agregar el step de tests a `ci.yml`, ambos juntos, cuando la Fase 1 deje `npm run test:coverage` en verde.

**Pendiente manual en GitHub (no lo hace Claude solo):** branch protection en `main` con PR obligatorio y el status check de `ci.yml` como requerido — recién se puede configurar después de que el workflow corra al menos una vez sobre un push real a `develop`.
