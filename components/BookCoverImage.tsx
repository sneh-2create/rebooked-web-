'use client';

import { useMemo } from 'react';
import { useBookCover } from '../hooks/useBookCover';

type Props = {
  title: string;
  author?: string;
  genre?: string;
  isbn?: string;
  width: number;
  height: number;
  seq?: string;
  alt: string;
  className?: string;
};

export default function BookCoverImage({
  title,
  author,
  genre,
  isbn,
  width,
  height,
  seq,
  alt,
  className,
}: Props) {
  const { url, loading } = useBookCover({
    title,
    author,
    genre,
    isbn,
    width,
    height,
    seq,
  });

  // Tiny UX improvement: while Open Library fetches, show fallback (already in url),
  // but we can still add a subtle opacity transition.
  const opacity = useMemo(() => (loading ? 'opacity-90' : 'opacity-100'), [loading]);

  return (
    <img
      src={url}
      alt={alt}
      className={`${className ?? ''} ${opacity} transition-opacity duration-300`.trim()}
      loading="lazy"
    />
  );
}

