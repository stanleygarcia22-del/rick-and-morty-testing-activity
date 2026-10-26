import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCharacters, getCharacter, getEpisodes } from '@/lib/api';

// Limpiamos los mocks antes de cada prueba
beforeEach(() => {
  vi.restoreAllMocks();
});

describe('API Utility Functions', () => {
  it('debería obtener la lista de personajes correctamente', async () => {
    const mockResponse = { results: [{ id: 1, name: 'Rick Sanchez' }] };
    
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    const data = await getCharacters(1);
    expect(data).toEqual(mockResponse);
  });

  it('debería lanzar un error si falla la petición de personajes', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
    } as Response);

    await expect(getCharacters(1)).rejects.toThrow('Failed to fetch characters');
  });

  it('debería retornar un arreglo vacío si se piden 0 episodios', async () => {
    const episodes = await getEpisodes([]);
    expect(episodes).toEqual([]);
  });

  // --- NUEVAS PRUEBAS PARA CUBRIR EL 80% ---

  it('debería obtener un personaje individual correctamente', async () => {
    const mockCharacter = { id: 1, name: 'Rick Sanchez' };

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacter,
    } as Response);

    const data = await getCharacter('1');
    expect(data).toEqual(mockCharacter);
  });

  it('debería lanzar un error si falla la petición de un personaje individual', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
    } as Response);

    await expect(getCharacter('999')).rejects.toThrow('Failed to fetch character details');
  });

  it('debería obtener múltiples episodios correctamente', async () => {
    const mockEpisodes = [{ id: 1, name: 'Pilot' }, { id: 2, name: 'Lawnmower Dog' }];

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockEpisodes,
    } as Response);

    const data = await getEpisodes(['1', '2']);
    expect(data).toEqual(mockEpisodes);
  });

  it('debería transformar un objeto de episodio único en un arreglo si la API devuelve un solo objeto', async () => {
    const singleEpisode = { id: 1, name: 'Pilot' };

    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => singleEpisode,
    } as Response);

    const data = await getEpisodes(['1']);
    expect(data).toEqual([singleEpisode]);
  });

  it('debería lanzar un error si falla la petición de episodios', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
    } as Response);

    await expect(getEpisodes(['1'])).rejects.toThrow('Failed to fetch episodes');
  });
});