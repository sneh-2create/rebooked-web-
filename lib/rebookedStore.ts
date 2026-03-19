import type { CoverQueryInput } from './coverFallback';
import { makeBookCoverUrl } from './coverFallback';

export type RebookedBook = {
  id: number;
  title: string;
  author: string;
  owner: string;
  location: string;
  condition: string;
  type: string; // "Physical & Digital" | "Physical Only" | "Digital Only"
  genre: string;
  description: string;
  uploadDate: string;
  rating: number;
  swapCount: number;

  // Book detail fields (best-effort defaults for uploaded content)
  pages: number;
  language: string;
  isbn: string;
  publisher: string;
  yearPublished: number;
  ownerRating: number;
  ownerSwaps: number;
  joinedDate: string;

  coverSeq?: string;
};

const STORAGE_KEY = 'rebooked_books_v1';
const UPLOAD_ID_MIN = 13;
const UPLOAD_ID_MAX = 30;

function safeParse(raw: string | null): RebookedBook[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as RebookedBook[];
  } catch {
    return [];
  }
}

export function readUploadedBooks(): RebookedBook[] {
  if (typeof window === 'undefined') return [];
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
}

export function writeUploadedBooks(books: RebookedBook[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

export function pickNextUploadedBookId(usedIds: number[]) {
  for (let id = UPLOAD_ID_MIN; id <= UPLOAD_ID_MAX; id += 1) {
    if (!usedIds.includes(id)) return id;
  }
  return null;
}

export function getBookCoverUrlForBook(book: RebookedBook, coverInput?: CoverQueryInput) {
  return makeBookCoverUrl(
    {
      title: coverInput?.title ?? book.title,
      author: coverInput?.author ?? book.author,
      genre: coverInput?.genre ?? book.genre,
    },
    {
      width: 300,
      height: 400,
      seq: book.coverSeq ?? `book-${book.id}`,
      orientation: 'portrait',
    }
  );
}

