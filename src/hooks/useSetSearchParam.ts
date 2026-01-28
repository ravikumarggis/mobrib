import { useSearchParams } from "react-router";

export function useSetSearchParam() {
  const [searchParams, setSearchParams] = useSearchParams();
  const setParam = (key: string, value: any) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const removeParam = (key: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams);
  };

  return { setParam, removeParam, searchParams };
}
