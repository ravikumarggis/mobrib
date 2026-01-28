import { useDebounce } from "@uidotdev/usehooks";

export function useDebouncing<T>(filter: T, delay: number = 2000): T {
  const debouncedFilter = useDebounce(filter, delay);

  return debouncedFilter;
}
