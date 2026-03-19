import BookDetail from './BookDetail';

export async function generateStaticParams() {
  // Static export needs explicit paths. We reserve a range for uploaded books.
  const params: Array<{ id: string }> = [];
  for (let i = 1; i <= 30; i += 1) params.push({ id: String(i) });
  return params;
}

export default function BookPage({ params }: { params: { id: string } }) {
  return <BookDetail bookId={params.id} />;
}