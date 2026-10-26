import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest'; // <--- ¡Esta línea es la clave!
import CharacterCard from '@/components/CharacterCard';
import { Character } from '@/types/rickandmorty';

// Creamos un personaje de prueba simulado
const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [],
  url: '',
  created: '',
};

describe('CharacterCard Component', () => {
  it('debería renderizar la información del personaje correctamente', () => {
    render(<CharacterCard character={mockCharacter} />);

    // Verificamos que el nombre aparezca en el DOM
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();

    // Verificamos que el estado y la especie aparezcan
    expect(screen.getByText(/Alive - Human/i)).toBeInTheDocument();

    // Verificamos que la ubicación aparezca
    expect(screen.getByText(/Citadel of Ricks/i)).toBeInTheDocument();

    // Verificamos que la imagen tenga el atributo src y alt correctos
    const image = screen.getByRole('img', { name: /Rick Sanchez/i });
    expect(image).toHaveAttribute('src', expect.stringContaining('rickandmortyapi.com'));
  });
});