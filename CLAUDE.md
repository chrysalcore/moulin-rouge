# molino_rojo (frontend) — notas específicas de este repo

Preferencias generales en `~/.claude/CLAUDE.md` (que cubre solo lo transversal a todos los proyectos). Esto es lo propio de este repo.

- `tsconfig.json` tiene `"strict": true` (decisión de Ordnay, 2026-08-08 — ya no es la excepción del portafolio). `target` es `es2020` (subido desde `es5`, que rompía la iteración de `Set`, hoy en `useDishes.tsx`).
- Tipos centralizados en `src/types/*.ts`, re-exportados por el barrel `src/types/index.ts` — importar siempre desde `'../types'`, nunca del archivo específico directo.
- Único repo con comentarios en el código: un banner de una línea en español al inicio de cada archivo de `src/types/`. Mantener ese patrón si se agregan archivos de tipos nuevos; no extenderlo al resto del código.
- Único repo que adoptó Conventional Commits (`feat(scope): …`, `chore(scope): …`), pero solo a partir de la migración a TS; commits previos son descriptivos sin prefijo, igual que el resto del portafolio. Confirmado por Ordnay (2026-08-09): se mantiene solo en este repo.
- CSS global por sección en `src/assets/styles/*.css`, BEM (`form-field__input`), sin CSS Modules.
- Punto y coma: el repo está mezclado (archivos de la migración a TanStack van sin, el resto con) y ESLint no lo enforcea. Ordnay es indiferente (2026-10-07) — no uniformar ni volver a preguntar.

## Arquitectura de estado (TanStack Query, desde 2026-10-07)

Estado de servidor con **TanStack Query**; no hay Context ni reducer de fetch. Capas, de abajo hacia arriba:

- `src/helpers/fetch*.ts` → un fetcher por recurso, tipado con su retorno explícito (`Promise<Dish[]>`) y que **lanza** ante error o forma inesperada. El tipo del fetcher es la única fuente de verdad para la inferencia aguas arriba.
- `src/hooks/useResource.tsx` → hook genérico sobre `useQuery`. `<T>` es el tipo del *elemento* (`queryFn: () => Promise<T[]>`), lo que permite el default `data ?? []` y asume que todo recurso es una colección. Devuelve `ResourceStatus & { data: T[] }`.
- `src/hooks/useDishes.tsx` / `useEvents.tsx` → un hook por recurso sobre `useResource`; las derivaciones de dominio (ej. `categories`) viven acá, no en el hook genérico.
- `src/components/others/AsyncContent.tsx` → loading/error **por sección**, no global. Recibe `ResourceStatus` (la parte no genérica del tipo), por eso no necesita ser genérico él mismo y acepta cualquier recurso.
- `QueryClient` en `src/main.tsx` con `staleTime` de 5 min — reemplaza la caché manual en `localStorage` que hacía `load.ts`.

Consecuencias a tener en cuenta antes de tocar esto:
- La caché de TanStack **es** el store compartido. No volver a introducir un Context para datos de servidor ni replicar el fetch con `useEffect`.
- Loading/error son por recurso: `Home.tsx` monta dishes y events en paralelo y una sección puede fallar sin tumbar la otra. No reintroducir un gate global tipo el viejo `Main.tsx`.
- `App.tsx` quedó como layout estático (`Head`/`Header`/`Hero`/`Footer`). El viejo `src/components/Main.tsx` ya no existe — si alguna vez vuelve a hacer falta un componente `Main`, no puede ir en `src/Main.tsx` por colisión de mayúsc/minúsc con `src/main.tsx`, el entry point (`TS1261`).

### Retorno de hooks custom (convención confirmada por Ordnay, 2026-10-07)

- **Tupla** cuando son **hasta 3 valores de uso común**: todos los consumidores usan los mismos y los nombran a gusto, estilo `useState`. Ej. `useCurrent` → `[current, handleNext, handlePrev]`.
- **Objeto** cuando son **4+ valores**, o cuando distintos archivos desestructuran **subconjuntos diferentes**. Ej. `useResource` → `{ loading, data, error, handleRetry }`. Evita huecos (`[, , categories]`), roturas silenciosas al reordenar, y permite pasar el estado entero de una vez (`<AsyncContent status={events}>`).

## Testing (Vitest + Testing Library)

Setup: Vitest + Testing Library + jsdom (pinneado `^27`, no `^30` — exige Node `^22.22.2`) + `@vitest/coverage-v8`, mismo patrón que `pokedex-app`. Tests en `src/tests/` espejando `src/`. Scripts: `test` (watch), `test:run`, `test:coverage`.

Thresholds en `vite.config.ts` calibrados a la cobertura real (90/76/88/89): Ordnay no escribe tests solo para subir el número ("no sirve hacer test solo por coverage, esos tests no cubrirían nada"). **El margen quedó al filo** tras la migración (90.32 / 76.19 / 88.05 / 89.83) — décimas de sobra en las cuatro métricas, así que el próximo archivo sin test rompe CI por threshold, no por un test roto. Gap de cobertura conocido y aceptado: `Reservations.tsx`/`Form.tsx` (markup estático, sin test dedicado), `src/router` y ramas defensivas puntuales.

Gotchas de testing a tener en cuenta en este repo:
- `window.HTMLElement.prototype.scrollIntoView` stubbeado en `src/tests/vitest.setup.ts` — jsdom no lo implementa y `Menu.tsx`/`Reservations.tsx` lo llaman al montar.
- `asyncUtilTimeout: 5000` configurado en `vitest.setup.ts` (2026-10-07). El default de 1000ms de Testing Library alcanzaba aislado pero fallaba ~1 de 3 corridas de `test:coverage`, que es justo lo que corre CI: 9 archivos en paralelo + instrumentación v8 dejan al worker sin CPU y `findByRole` agota su presupuesto antes de que resuelva la query. Síntoma diagnóstico: el DOM del fallo muestra el estado **sin resolver** (listas vacías), no un render incorrecto. Subir el techo no hace más lentos los tests que pasan — `waitFor` resuelve apenas se cumple la condición.
- Tests que montan hooks de TanStack necesitan `createQueryWrapper()` de `src/tests/utils/queryWrapper.tsx` — crea un `QueryClient` nuevo por render con `retry: false` (sin eso, un test de error espera los reintentos por default y timeoutea).
- `mockReset: true` además de `restoreMocks: true` en `vite.config.ts`: desde Vitest 4, `restoreMocks` ya no toca los `vi.fn()` de factories de `vi.mock`, y su conteo de llamadas se acumula en silencio entre tests del mismo archivo.
- `src/router/AppRouter.tsx` exporta `routes` (además del default `AppRouter`) porque el `router` real es un singleton creado con `createBrowserRouter` que lee `window.location` una sola vez al importar el módulo — no reseteable entre tests. `routes` + `createMemoryRouter` sí permite testear la config real de rutas.

Bugs reales encontrados y corregidos vía TDD (plan de testing, 2026-08-09):
- La caché de `localStorage` no expiraba nunca — se le agregó un TTL de 5 minutos. Hoy esa responsabilidad es del `staleTime` del `QueryClient`.
- No se validaba que la respuesta de `axios.get` fuera un array — si la API devolvía otra forma (ej. un redirect seguido a una página HTML), explotaba con `dishes.map is not a function` en el próximo render. La validación con `Array.isArray` sobrevivió a la migración y hoy vive en `src/helpers/fetchDishes.ts`, lanzando para que TanStack lo trate como error. Siguiente paso natural: Zod con `z.infer`, para que el tipo se derive del schema que sí valida en runtime en vez de declararse en paralelo.
- `AppRouter.tsx`: `<Navigate to={''} replace />` en la ruta catchall `*` nunca redirigía (un `to` relativo vacío desde una ruta *splat* no navega) — cambiado a `to={'/'}` (absoluto).
- No existía ningún Error Boundary — un error de *render* (no de fetch) tiraba toda la app a pantalla blanca. Implementado con `errorElement` de React Router (data router) en una ruta intermedia sin `path` que agrupa `Home`/`Reservations`/`Menu`, dejando `Head`/`Header`/`Hero`/`Footer` intactos. El fallback (`RouteError.tsx`) NO tiene botón Reload — un error de render suele ser determinístico, reintentar el mismo render vuelve a explotar igual; en cambio lleva un mensaje + link a Home.
- `Home.tsx` mostraba "Sobre nosotros" en la sección de contacto (`Section type={'about'}` en vez de `'contact'`) — corregido.

No es un bug: `Math.random()` en `Dish.tsx` — confirmado por Ordnay (2026-08-09), es placeholder intencional de rating porque la API no devuelve ratings.

Pendiente de verificar: `isLoading` en TanStack v5 es `isPending && isFetching`, o sea solo el primer fetch sin datos. Falta un test que confirme qué muestra `AsyncContent` **durante** el `handleRetry` tras un error — si `isLoading` queda en `false` ahí, el usuario sigue viendo el error mientras refetchea en vez de un loading.

## CI/CD

`ci.yml`/`deploy.yml` copian el patrón de `pokedex-app` (push a `development` → typecheck+lint+`test:coverage`+build, PR automático a `main`; push a `main` → build + publish a `gh-pages`). **Deben quedar estructuralmente idénticos entre ambos repos**: Ordnay planea extraer un workflow reutilizable compartido (ver memoria de proyecto `project_ci_reusable_workflow_with_pokedex`). Antes de tocar CI en cualquiera de los dos, revisar el otro y alinear (mismos nombres de job/step, mismo texto de PR).

El PR a `main` se mergea **a mano**: producción (gh-pages) se actualiza solo con ese merge, nunca con un push a `development`.

Branch protection en `main` configurada (2026-08-09): ruleset "Main Protection" (deletion + non-fast-forward bloqueados, PR obligatorio, status check `Typecheck, lint & test` requerido) — mismo ruleset que `pokedex-app`.

## Roadmap de estado avanzado

- **TanStack Query** — hecho (2026-10-07, commit `904ccca`). Ver la sección de arquitectura de estado arriba.
- **Redux** (estado de cliente más avanzado) — todavía no arrancado. Actualiza para este repo la convención general de `~/.claude/CLAUDE.md` ("Redux solo si el proyecto ya lo trae"): acá se va a introducir a propósito. Antes de arrancar, definir qué estado de *cliente* justifica Redux hoy — la app no tiene ninguno fuera de `useCurrent` (índice del carrusel) y el filtro de categorías de `Menu.tsx`; sin un caso real, Redux acá sería andamiaje sin problema que resolver.
