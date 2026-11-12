import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createGame, getAllGames, getGame, getGames, getGamesByIds } from '../services/service';

export const gameKeys = {
  all: ['games'],
  list: (params) => ['games', 'list', params],
  detail: (id) => ['games', 'detail', id],
  everything: ['games', 'everything'],
  byIds: (ids) => ['games', 'by-ids', ids],
};

export function useGames(params) {
  return useQuery({
    queryKey: gameKeys.list(params),
    queryFn: ({ signal }) => getGames(params, signal),
  });
}

export function useGame(id) {
  return useQuery({
    queryKey: gameKeys.detail(id),
    queryFn: ({ signal }) => getGame(id, signal),
    retry: (count, error) => !error.notFound && count < 1,
  });
}

export function useAllGames() {
  return useQuery({
    queryKey: gameKeys.everything,
    queryFn: ({ signal }) => getAllGames(signal),
  });
}

export function useWishlistGames(ids) {
  return useQuery({
    queryKey: gameKeys.byIds(ids),
    queryFn: ({ signal }) => getGamesByIds(ids, signal),
  });
}

export function useCreateGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGame,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: gameKeys.all }),
  });
}
