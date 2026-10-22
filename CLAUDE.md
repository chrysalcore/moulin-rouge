# molino_rojo (frontend) — notas específicas de este repo

Preferencias generales en `~/.claude/CLAUDE.md` (que cubre solo lo transversal a todos los proyectos). Esto es lo propio de este repo.

- `tsconfig.json` tiene `"strict": true` (decisión de Ordnay, 2026-08-08 — ya no es la excepción del portafolio). `target` es `es2020` (subido desde `es5`, que rompía la iteración de `Set`, hoy en `useDishes.tsx`).
- Tipos centralizados en `src/types/*.ts`, re-exportados por el barrel `src/types/index.ts` — importar siempre desde `'../types'`, nunca del archivo específico directo.
- Único repo con comentarios en el código: un banner de una línea en español al inicio de cada archivo de `src/types/`. Mantener ese patrón si se agregan archivos de tipos nuevos; no extenderlo al resto del código.
- Único repo que adoptó Conventional Commits (`feat(scope): …`, `chore(scope): …`), pero solo a partir de la migración a TS; commits previos son descriptivos sin prefijo, igual que el resto del portafolio. Confirmado por Ordnay (2026-08-09): se mantiene solo en este repo.
- Estilos: **Tailwind v4**, utilidades directas en el JSX (migrado desde CSS global BEM entre el 2026-10-14 y el 2026-10-21, decisión de Ordnay). No queda ningún `.css` por sección. Ver la sección "Estilos (Tailwind v4)".
- Punto y coma: el repo está mezclado (archivos de la migración a TanStack van sin, el resto con) y ESLint no lo enforcea. Ordnay es indiferente (2026-10-07) — no uniformar ni volver a preguntar.

## Estilos (Tailwind v4)

Objetivo de la migración: reutilización y coherencia visual. Tailwind 4 con `@tailwindcss/vite`; toda la config vive en `src/index.css` (`@import "tailwindcss"` + `@theme static` + `@layer base`), no hay `tailwind.config.js`.

Convenciones (decididas por Ordnay durante la migración, 2026-10-14 a 2026-10-21):
- **Escalas estándar de Tailwind** para tipografía, espaciado, radios y breakpoints: no se redefinen. Un valor nuevo va al paso más cercano de la escala; un arbitrario (`[...]`) es la excepción y se justifica (hoy: `min-h-[min(100dvh,50rem)]` del Hero y `grid-cols-[auto_1fr_auto]` de las tarjetas de Order).
- **Criterio:** si un valor no sigue estándares de la industria (márgenes, tipografía, breakpoints, áreas táctiles, interlineado, ancho de lectura), llevarlo al estándar si el cambio visual es chico y se gana coherencia. Si se nota mucho, mostrárselo a Ordnay antes.
- **Tokens propios solo para lo que es de marca o se repite:** paleta cerrada (`--color-*: initial` → `dom`/`com`/`ctr`/`lgh`/`surface` + `black`/`white`), fuentes cerradas (`font-sans` Work Sans, `font-display` Montserrat), `shadow-card` (tarjetas) y `animate-spin-slow` (molino de Loading). `static` emite sus variables en `:root` aunque ninguna utilidad las use.
- **Raíz en 16px** (default del navegador): las utilidades caen en la grilla de 8pt y se respeta el tamaño de letra del usuario (WCAG 1.4.4).
- **Áreas táctiles de 44px** (`size-11`) en botones de ícono, ícono en 24px (`size-6`).
- **Contenedor:** `max-w-5xl` centrado dentro de `Section` (reemplazó el `padding: 15vw`).
- **Reutilización por componente, no por `@apply`.** Variantes como objetos `{ nombre: 'clases' }` indexados por una prop (`Button`, `Section`, `Nav`, `Title`, `SocialInfo`, roles de `Showcase`). Sin `clsx`/`cva`/`tailwind-merge`: condicionales con template literals.
- **Nunca un `className` libre que pueda chocar con las clases base del componente:** sin `tailwind-merge`, dos utilidades en conflicto (`from-dom` y `from-transparent`) no se resuelven por orden de escritura sino por el orden en que Tailwind las genera. Por eso `Section` recibe `background` como variante con nombre. Excepción deliberada: `Dish`/`Event` reciben `className` de `Showcase`/`DishesList`, pero solo con posición y tamaño, que la tarjeta no define.

Componentes compartidos (`components/global/` y `components/others/`):
- `Section`: fondo de ancho completo + contenedor `max-w-5xl`. Props `header`, `as` (`section`/`article`/`main`/`footer`), `background` (`band` por defecto; `fade` **solo** en Order, Reservations y Categories, las que siguen al Hero; `solid` en el Footer) y `ref` (prop común en React 19).
- `SectionHeader`: el único estilo de h2 de sección (`text-3xl md:text-4xl`). `BriefHeader` repite esas clases en su h2.
- `Button`: variantes `primary`/`secondary`/`outline`; con `to` renderiza `Link`. `type` por defecto `'button'`.
- `IconButton`, `Main`, `ErrorNotice` (base de `ErrorMessage` y `RouteError`).
- `Showcase<T>`: carrusel genérico de Events y Dishes con render prop `renderItem(item, main, className)`. Renderiza todos los ítems con `key` estable y asigna un rol por offset circular (`getRole`), así las tarjetas se animan a su nueva posición con `transition-all duration-500` (`motion-reduce:transition-none`).
- `formatPrice` (`src/helpers/`): `Intl.NumberFormat` en USD. Usarlo para todo precio.

Gotchas:
- El preflight resetea `h1`–`h6` a tamaño y peso heredados: todo heading necesita sus clases de tamaño y peso explícitas.
- El preflight deja los `<button>` con `cursor: default` (desde Tailwind v4): `cursor-pointer` explícito.
- `* { scroll-behavior: smooth }` en `@layer base`: para medir o capturar en tests de navegador, usar `window.scrollTo({ behavior: 'instant' })`.

Pendientes detectados durante la migración (sin resolver):
- `useCurrent` tiene `MAX_INDEX = 4` fijo: asume que todo `Showcase` recibe exactamente 5 ítems. Con menos, `current` puede apuntar a un índice inexistente. Arreglo natural: `useCurrent(items.length)`.
- El enlace "Check all our events!" (`data/briefs.ts`, `ref: 'events'`) apunta a una ruta que no existe: la ruta catchall `*` lo manda al inicio. Decidir si se quita o adónde apunta.
- Opcional en `Showcase`: offset con signo en `getRole` (`-2…2` en vez de `0…4`) para que las tarjetas ocultas esperen de su lado y entren desde abajo/arriba en lugar de desde el centro.
- Los links sociales tienen `href=""` (sin URLs reales).
- "Show More" de About es un botón sin acción.

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

## Estado de cliente (Redux Toolkit, desde 2026-10-09)

Un solo slice, `order` (el carrito): es el caso que justifica Redux en esta app — lo escriben `Dish.tsx` ("Order Now") y `Order.tsx` (+/−/quitar/vaciar), y lo leen `Header.tsx` (badge) y `Order.tsx`, componentes lejanos entre sí, y tiene que sobrevivir a la navegación.

- `src/store/orderSlice.ts` → `createSlice` con `items: OrderItems` (mapa `id de plato → cantidad`), acciones nombradas en pasado como eventos (`dishAdded`, `dishDecremented`, `dishRemoved`, `orderCleared`) y selectores colocados en el slice (`selectors: { selectItems, selectItemCount }`). Guarda **solo ids y cantidades**, nunca el `Dish` completo: nombre y precio salen de la caché de TanStack en `Order.tsx`. Duplicar datos de servidor en Redux crearía dos fuentes de verdad.
- `src/store/store.ts` → `makeStore(preloadedState?)`, una **fábrica**, no un singleton: `main.tsx` crea el store real y cada test crea uno nuevo. Tipos `RootState`/`AppStore`/`AppDispatch` derivados con `ReturnType`, no declarados a mano.
- `src/store/hooks.ts` → `useAppDispatch`/`useAppSelector` con `.withTypes<>()`. Usar siempre estos, no `useDispatch`/`useSelector` crudos.
- `src/store/orderStorage.ts` → persistencia en `localStorage` (clave `moulin-rouge:order`) **fuera del reducer**: `loadOrder()` arma el `preloadedState` y `persistOrder(store)` se suscribe con `store.subscribe` y escribe solo si cambió la referencia de `items`. `loadOrder` valida con `orderItemsSchema` (`src/schemas/orderSchema.ts`, Zod; el tipo `OrderItems` sale de `z.infer`) y ante JSON roto, forma inválida o `localStorage` inaccesible devuelve un carrito vacío. No meter `localStorage` dentro del reducer: tiene que seguir siendo una función pura.
- `Order` es una ruta más dentro del grupo con `errorElement` de `AppRouter.tsx`.

Consecuencias:
- Un plato que está en el carrito pero ya no viene en la API se filtra al renderizar `Order.tsx` (no se muestra ni suma al subtotal), pero su id queda en el store y sí cuenta en el badge del header. Inconsistencia conocida, sin resolver.
- El filtro de categorías de `Menu.tsx` vive en la URL (`:category`) y el índice del carrusel en `useCurrent`. Son locales y no van a Redux.

### Retorno de hooks custom (convención confirmada por Ordnay, 2026-10-07)

- **Tupla** cuando son **hasta 3 valores de uso común**: todos los consumidores usan los mismos y los nombran a gusto, estilo `useState`. Ej. `useCurrent` → `[current, handleNext, handlePrev]`.
- **Objeto** cuando son **4+ valores**, o cuando distintos archivos desestructuran **subconjuntos diferentes**. Ej. `useResource` → `{ loading, data, error, handleRetry }`. Evita huecos (`[, , categories]`), roturas silenciosas al reordenar, y permite pasar el estado entero de una vez (`<AsyncContent status={events}>`).

## Testing (Vitest + Testing Library)

Setup: Vitest + Testing Library + jsdom (pinneado `^27`, no `^30` — exige Node `^22.22.2`) + `@vitest/coverage-v8`, mismo patrón que `pokedex-app`. Tests en `src/tests/` espejando `src/`. Scripts: `test` (watch), `test:run`, `test:coverage`.

Thresholds en `vite.config.ts` calibrados a la cobertura real (90/76/88/89): Ordnay no escribe tests solo para subir el número ("no sirve hacer test solo por coverage, esos tests no cubrirían nada"). Cobertura actual (2026-10-21, tras la migración a Tailwind): 91.74 / 84.93 / 91.75 / 92.15. Los commits de Redux la habían bajado por debajo de los cuatro thresholds (CI en rojo) porque `Stars.tsx` quedó sin ejecutar: la API no manda `rating`. La recuperó el test de `Stars`, que cubre comportamiento real, sin tocar los thresholds. Gap de cobertura conocido y aceptado: `Reservations.tsx`/`Form.tsx` (markup estático, sin test dedicado), los handlers de `Header.tsx`, `src/router` y ramas defensivas puntuales (ej. el `catch` de `setItem` en `orderStorage.ts`).

Gotchas de testing a tener en cuenta en este repo:
- `window.HTMLElement.prototype.scrollIntoView` stubbeado en `src/tests/vitest.setup.ts` — jsdom no lo implementa y `Menu.tsx`/`Reservations.tsx` lo llaman al montar.
- `asyncUtilTimeout: 5000` configurado en `vitest.setup.ts` (2026-10-07). El default de 1000ms de Testing Library alcanzaba aislado pero fallaba ~1 de 3 corridas de `test:coverage`, que es justo lo que corre CI: 9 archivos en paralelo + instrumentación v8 dejan al worker sin CPU y `findByRole` agota su presupuesto antes de que resuelva la query. Síntoma diagnóstico: el DOM del fallo muestra el estado **sin resolver** (listas vacías), no un render incorrecto. Subir el techo no hace más lentos los tests que pasan — `waitFor` resuelve apenas se cumple la condición.
- Tests que montan componentes o hooks con TanStack o Redux usan `createProvidersWrapper(store?)` de `src/tests/utils/providersWrapper.tsx` (reemplazó a `createQueryWrapper` el 2026-10-09). Crea un `QueryClient` nuevo con `retry: false`; sin eso, un test de error espera los reintentos por default y timeoutea. También crea un store con `makeStore()`, o usa el que se le pase, para precargar un carrito o inspeccionar el estado después de interactuar.
- `mockReset: true` además de `restoreMocks: true` en `vite.config.ts`: desde Vitest 4, `restoreMocks` ya no toca los `vi.fn()` de factories de `vi.mock`, y su conteo de llamadas se acumula en silencio entre tests del mismo archivo.
- `src/router/AppRouter.tsx` exporta `routes` (además del default `AppRouter`) porque el `router` real es un singleton creado con `createBrowserRouter` que lee `window.location` una sola vez al importar el módulo — no reseteable entre tests. `routes` + `createMemoryRouter` sí permite testear la config real de rutas.

Bugs reales encontrados y corregidos vía TDD (plan de testing, 2026-08-09):
- La caché de `localStorage` no expiraba nunca — se le agregó un TTL de 5 minutos. Hoy esa responsabilidad es del `staleTime` del `QueryClient`.
- No se validaba que la respuesta de `axios.get` fuera un array — si la API devolvía otra forma (ej. un redirect seguido a una página HTML), explotaba con `dishes.map is not a function` en el próximo render. La validación con `Array.isArray` sobrevivió a la migración y hoy vive en `src/helpers/fetchDishes.ts`, lanzando para que TanStack lo trate como error. Siguiente paso natural: validar ahí también con Zod, como ya hace `orderSchema.ts` con el carrito, para que `Dish` se derive del schema con `z.infer` en vez de declararse en paralelo.
- `AppRouter.tsx`: `<Navigate to={''} replace />` en la ruta catchall `*` nunca redirigía (un `to` relativo vacío desde una ruta *splat* no navega) — cambiado a `to={'/'}` (absoluto).
- No existía ningún Error Boundary — un error de *render* (no de fetch) tiraba toda la app a pantalla blanca. Implementado con `errorElement` de React Router (data router) en una ruta intermedia sin `path` que agrupa `Home`/`Reservations`/`Menu`, dejando `Head`/`Header`/`Hero`/`Footer` intactos. El fallback (`RouteError.tsx`) NO tiene botón Reload — un error de render suele ser determinístico, reintentar el mismo render vuelve a explotar igual; en cambio lleva un mensaje + link a Home.
- `Home.tsx` mostraba "Sobre nosotros" en la sección de contacto (`Section type={'about'}` en vez de `'contact'`) — corregido.

Rating de los platos: el `Math.random()` que hacía de placeholder (confirmado como intencional por Ordnay el 2026-08-09) se quitó en `a5f7624`, porque cambiaba el rating en cada render. Hoy `Dish.rating` es opcional y `Dish.tsx` monta `Stars` solo si viene definido. La API (`devsapihub.com/api-fast-food`) no lo manda, así que **en producción las estrellas no se ven**. `Stars` se mantuvo con su test (decisión de Ordnay, 2026-10-11) para cuando haya un rating real. Expone la puntuación a tecnología asistiva con `role="img"` + `aria-label` y usa un `useId` por instancia para el gradiente de la media estrella.

Loading durante el reintento: `isLoading` en TanStack v5 es `isPending && isFetching`. Un refetch tras un error **sin datos previos** vuelve la query a `pending` y limpia `error`, así que `AsyncContent` muestra `Loading` y no el error mientras reintenta. Lo cubre `'goes back to loading on retry…'` en `useResource.test.ts`. Se confirmó el 2026-10-11 con una mutación (`loading: isLoading && errorUpdatedAt === 0`) que lo pone en rojo. Caso abierto, sin test: si un refetch en segundo plano falla con datos ya en caché (ej. al volver el foco a la pestaña pasado el `staleTime`), la query queda con `data` y `error` a la vez. Como `AsyncContent` evalúa `error` antes que los datos, reemplaza contenido válido por el mensaje de error, y durante ese reintento `isLoading` queda en `false`.

## CI/CD

`ci.yml`/`deploy.yml` copian el patrón de `pokedex-app` (push a `development` → typecheck+lint+`test:coverage`+build, PR automático a `main`; push a `main` → build + publish a `gh-pages`). **Deben quedar estructuralmente idénticos entre ambos repos**: Ordnay planea extraer un workflow reutilizable compartido (ver memoria de proyecto `project_ci_reusable_workflow_with_pokedex`). Antes de tocar CI en cualquiera de los dos, revisar el otro y alinear (mismos nombres de job/step, mismo texto de PR).

El PR a `main` se mergea **a mano**: producción (gh-pages) se actualiza solo con ese merge, nunca con un push a `development`.

Branch protection en `main` configurada (2026-08-09): ruleset "Main Protection" (deletion + non-fast-forward bloqueados, PR obligatorio, status check `Typecheck, lint & test` requerido) — mismo ruleset que `pokedex-app`.

## Roadmap de estado avanzado

- **TanStack Query** — hecho (2026-10-07, commit `904ccca`). Ver la sección de arquitectura de estado arriba.
- **Redux Toolkit** — hecho (2026-10-09, commits `a39c5fe`, `a747765`, `ed68766`). Ver la sección de estado de cliente arriba.
  - Historia de la decisión: el 2026-10-07 se postergó porque la app no tenía estado de cliente que lo justificara. El criterio que se fijó entonces fue **varios escritores, lectores lejanos y vida más larga que cualquier componente** (un carrito, un equipo armado por el usuario, undo/redo). Por eso se introdujo junto con la feature de pedido, que cumple ese criterio, y no antes.
  - Disparadores que **no** alcanzan por sí solos (router, idioma, tema): la URL ya es un store compartido vía `useSearchParams`, las librerías de i18n traen su propio provider, y el tema se resuelve con `data-theme` + CSS custom properties + un Context chico. Meter cualquiera de los tres en Redux crea dos fuentes de verdad.
  - En `pokedex-app` sigue postergado: ahí no hay un caso equivalente.
