# molino_rojo (frontend) — notas específicas de este repo

Preferencias generales en `~/.claude/CLAUDE.md` (que cubre solo lo transversal a todos los proyectos). Esto es lo propio de este repo.

- `tsconfig.json` tiene `"strict": true` (decisión de Ordnay, 2026-08-08 — ya no es la excepción del portafolio). `target` es `es2020` (subido desde `es5`, que rompía la iteración de `Set` en `useConnect.tsx`).
- Arquitectura de estado en capas, no tocar sin entenderla primero:
  - `src/context/dataContext.tsx` → `DataProvider`/`useData`: datos ya cargados (`categories`, `dishes`, `events`).
  - `src/hooks/useStatus.tsx` → reducer local para estado de fetch (`loading`/`data`/`error`), acciones tipadas como unión discriminada en `src/types/state.ts`.
  - `src/hooks/useConnect.tsx` → compone `useStatus` + efecto de fetch, devuelve tupla etiquetada (`[loading, dishes, events, categories, error, handleRetry]`).
  - `src/App.tsx` (layout estático: `Head`/`Header`/`Hero`/`Footer`) vs `src/components/Main.tsx` (llama a `useConnect()` y decide loading/error/`DataProvider`+`Outlet`) están separados a propósito, para poder testear esos estados sin montar todo el layout. `Main.tsx` no puede ir en `src/Main.tsx` (al lado de `App.tsx`) por colisión de mayúsc/minúsc con `src/main.tsx`, el entry point (`TS1261`).
  - Todo hook custom que combine estado sigue el patrón de tupla (`[loading, data, error]`), no objeto.
- Tipos centralizados en `src/types/*.ts`, re-exportados por el barrel `src/types/index.ts` — importar siempre desde `'../types'`, nunca del archivo específico directo.
- Único repo con comentarios en el código: un banner de una línea en español al inicio de cada archivo de `src/types/`. Mantener ese patrón si se agregan archivos de tipos nuevos; no extenderlo al resto del código.
- Único repo que adoptó Conventional Commits (`feat(scope): …`, `chore(scope): …`), pero solo a partir de la migración a TS; commits previos son descriptivos sin prefijo, igual que el resto del portafolio. Confirmado por Ordnay (2026-08-09): se mantiene solo en este repo.
- CSS global por sección en `src/assets/styles/*.css`, BEM (`form-field__input`), sin CSS Modules.

## Testing (Vitest + Testing Library) — plan cerrado (2026-08-09)

Setup: Vitest + Testing Library + jsdom (pinneado `^27`, no `^30` — exige Node `^22.22.2`) + `@vitest/coverage-v8`, mismo patrón que `pokedex-app`. Tests en `src/tests/` espejando `src/`. Scripts: `test` (watch), `test:run`, `test:coverage`. Thresholds en `vite.config.ts` recalibrados a la cobertura real tras cerrar el plan (91/76/88/91): Ordnay no escribe tests solo para subir el número ("no sirve hacer test solo por coverage, esos tests no cubrirían nada"). Gap de cobertura conocido y aceptado: `Reservations.tsx`/`Form.tsx` (markup estático, sin test dedicado) y ramas defensivas puntuales en varios componentes.

Gotchas de testing a tener en cuenta en este repo:
- `window.HTMLElement.prototype.scrollIntoView` stubbeado en `src/tests/vitest.setup.ts` — jsdom no lo implementa y `Menu.tsx`/`Reservations.tsx` lo llaman al montar.
- El click de retry en `Main.test.tsx` usa `fireEvent.click`, no `userEvent`: con `vi.useFakeTimers()` activo (necesario porque el retry vuelve a disparar el `setTimeout` de 3s de `useConnect`), `userEvent.click()` cuelga esperando su simulación interna de delays contra un reloj congelado.
- Guard `ignore` del efecto en `useConnect` (`if (!ignore) dispatch(result)`) no está testeado a propósito: el efecto corre una sola vez por montaje real y siempre pega a la misma URL, así que forzar dos fetches superpuestos con datos "stale"/"fresh" divergentes sería artificial, no un bug real de hoy. Revisar si conviene testearlo si el efecto llega a re-dispararse con algún parámetro (ej. filtro/búsqueda, como en `pokedex-app`).
- `src/router/AppRouter.tsx` exporta `routes` (además del default `AppRouter`) porque el `router` real es un singleton creado con `createBrowserRouter` que lee `window.location` una sola vez al importar el módulo — no reseteable entre tests. `routes` + `createMemoryRouter` sí permite testear la config real de rutas.

Bugs reales encontrados y corregidos vía TDD durante el plan:
- `load.ts` no expiraba nunca la caché de `localStorage` — TTL de 5 minutos agregado (`{ data, cachedAt }`).
- `load.ts` no validaba que la respuesta de `axios.get` fuera un array — si la API devolvía otra forma (ej. un redirect seguido a una página HTML), `useConnect` explotaba con `dishes.map is not a function` en el próximo render. Ahora valida con `Array.isArray` y trata la forma inesperada como `ERROR`.
- `AppRouter.tsx`: `<Navigate to={''} replace />` en la ruta catchall `*` nunca redirigía (un `to` relativo vacío desde una ruta *splat* no navega) — cambiado a `to={'/'}` (absoluto).
- No existía ningún Error Boundary — un error de *render* (no de fetch) tiraba toda la app a pantalla blanca. Implementado con `errorElement` de React Router (data router) en una ruta intermedia sin `path` que agrupa `Home`/`Reservations`/`Menu`, dejando `Head`/`Header`/`Hero`/`Footer` intactos. El fallback (`RouteError.tsx`) NO tiene botón Reload — un error de render suele ser determinístico, reintentar el mismo render vuelve a explotar igual; en cambio lleva un mensaje + link a Home.
- `Home.tsx` mostraba "Sobre nosotros" en la sección de contacto (`Section type={'about'}` en vez de `'contact'`) — corregido.

No es un bug: `Math.random()` en `Dish.tsx` — confirmado por Ordnay (2026-08-09), es placeholder intencional de rating porque la API no devuelve ratings.

## CI/CD

`ci.yml`/`deploy.yml` copian el patrón de `pokedex-app` (push a `development` → lint+test+build, PR automático a `main`; push a `main` → build + publish a `gh-pages`). **Deben quedar estructuralmente idénticos entre ambos repos**: Ordnay planea extraer un workflow reutilizable compartido (ver memoria de proyecto `project_ci_reusable_workflow_with_pokedex`). Antes de tocar CI en cualquiera de los dos, revisar el otro y alinear (mismos nombres de job/step, mismo texto de PR).

Pendiente manual en GitHub (no lo hace Claude solo): branch protection en `main` con PR obligatorio y el status check de `ci.yml` requerido — recién configurable después de que el workflow corra sobre un push real a `development`.

## Roadmap de estado avanzado (futuro, decisión de Ordnay 2026-08-09)

`molino_rojo` va a ser el repo pionero del portafolio en adoptar **TanStack Query** (estado de servidor: reemplazaría el fetch manual + caché en `localStorage` de `useConnect`/`load.ts`) y **Redux** (estado de cliente más avanzado) — todavía no arrancado. Actualiza para este repo la convención general de `~/.claude/CLAUDE.md` ("Redux solo si el proyecto ya lo trae"): acá se va a introducir a propósito. Antes de empezar esa migración, releer la arquitectura de estado en capas documentada arriba (`dataContext`/`useStatus`/`useConnect`) para decidir qué reemplaza a qué en vez de superponer patrones.
