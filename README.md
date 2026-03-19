## ReBooked (BookSwap)

ReBooked is a book-exchange web app where readers can discover books, request exchanges, upload their own listings, and manage everything from a single profile experience.

### What’s included
- Browse books on the **Explore** screen with filters (genre / exchange type / location) and search
- View a book’s full details on **Book Details**
- Submit an exchange request from **Book Details**
- Find nearby swap listings on **Nearby**
- Upload your book listing on **Upload**
- Sign in and manage your saved data on **Profile**
- Consistent hover + focus behavior for buttons, links, and cards

## Browser-only behavior
This project stores sign-in state and uploaded listings in your browser so the experience works immediately without setting up a separate backend.

### Sign-in
- `/login` collects `name` and `email`
- after sign-in, the user is shown on `/profile`
- sign-out is available from the header

### Uploaded listings
- `/upload` creates a new listing from your input (title, author, condition, exchange options)
- the listing is persisted in your browser and appears in:
  - `/explore`
  - `/book/[id]` (detail page)
  - `/profile` (your listings)

## Book cover images
- Cover images are fetched by **title + author** in the browser
- If a cover cannot be found, the UI automatically falls back to a clean local placeholder that still looks like a proper book card cover
- Upload flow includes a **live cover preview** that updates as you type

## UI/UX improvements in this version
- Clickability fixes:
  - Home featured “Request Swap” navigates to the correct book details page
  - Nearby “Request Exchange” and “Order with Delivery” navigate to the correct book details page
  - Book details “View Profile” navigates to `/profile`
  - Profile quick actions are real navigation (and tabs switch where relevant)
- Hover + accessibility:
  - `hover:` styles are paired with `focus-visible:ring-*` rings for keyboard users
  - cards and primary actions have consistent spacing and highlight behavior
- Cover preview and listing persistence so the UI feels “real” end-to-end

## Routes (main pages)
- `/` : landing page + featured books
- `/explore` : searchable catalog + filters
- `/book/[id]` : book details + request exchange modal
- `/nearby` : nearby swap listings + pickup/delivery options
- `/upload` : upload your listing (multi-step flow + publish)
- `/profile` : manage your profile data and uploaded listings
- `/login` : sign-in screen
- `/how-it-works`, `/help`, `/faq`, `/contact`, `/safety`, `/privacy`, `/terms`, `/cookies` : supporting pages

## Setup
From the project folder:

```bash
npm install
```

## Run locally (development)

```bash
npm run dev
```

Then open:
- `http://localhost:3000`

## Build

```bash
npm run build
```

## Deploy
Because the app is configured for static export, you can deploy it on any static-capable host that runs the build output.

Recommended:
- Use `npm run build`
- Serve the produced static output

## Suggested next enhancements
1. Real authentication (server-side sessions) instead of browser-only sign-in
2. Persistent database-backed listings and exchange requests
3. Proper image + PDF storage for uploads
4. Chat/messaging + notifications when requests change status
5. Reviews/ratings per completed exchange
6. Search improvements (autocomplete, sorting, saved filters)
7. Accessibility polish (aria labels for icon-only controls, reduced-motion support)

## Data stored in the browser
This app intentionally uses client-side storage so you can test the complete flow quickly.

Auth (sign-in)
- User identity is saved in `localStorage` under `rebooked_user_v1`.

Uploaded book listings
- Uploaded listings are saved in `localStorage` under `rebooked_books_v1`.
- The Explore page reads from this storage and merges listings with the built-in catalog.

Book cover caching
- Cover image URLs are cached in `localStorage` under `rebooked_cover_cache_v1` to reduce repeated network calls.

## Book cover behavior (title-based)
- When a book cover is needed, the UI first tries to fetch a real cover using title (+ author when available) from public book catalog providers.
- If a real cover cannot be found, the UI falls back to a clean local placeholder image.
- The Upload page shows a live cover preview that updates while you type.

## Static hosting / deployment notes
- Static export is enabled in the project configuration (`output` set to `export`).
- Deploy to any static-capable host:
  - Run `npm run build`
  - Serve the produced static output

If you later connect a backend:
- Replace browser-only sign-in with real auth.
- Move listings/uploads to persistent storage.
- Store exchange requests and reviews on the server.
