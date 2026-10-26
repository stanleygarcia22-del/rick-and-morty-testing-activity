import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Pagination from '@/components/Pagination';

describe('Pagination Component', () => {
  it('debería renderizar la página actual y el total de páginas', () => {
    render(<Pagination currentPage={2} totalPages={5} />);

    // Verificamos el texto que contiene Page 2 of 5
    expect(screen.getByText(/Page/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/of/i)).toBeInTheDocument();
    expect(screen.getByText(/5/i)).toBeInTheDocument();
  });

  it('debería renderizar los enlaces Previous y Next con las URLs correctas', () => {
    render(<Pagination currentPage={2} totalPages={5} />);

    // Buscamos los enlaces por su rol 'link' y su texto en inglés
    const prevLink = screen.getByRole('link', { name: /Previous/i });
    const nextLink = screen.getByRole('link', { name: /Next/i });

    expect(prevLink).toBeInTheDocument();
    expect(nextLink).toBeInTheDocument();

    // Verificamos que apunten a las páginas query correctas (?page=1 y ?page=3)
    expect(prevLink).toHaveAttribute('href', '/?page=1');
    expect(nextLink).toHaveAttribute('href', '/?page=3');
  });
});