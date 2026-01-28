import { useMemo, useState } from "react";

interface SortConfig {
  field: any;
  order: any;
};

export const useSortableData = (data: any, defaultField: any, defaultOrder: any) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: defaultField,
    order: defaultOrder,
  });

  const sortedData = useMemo(() => {
    if (!data) return [];

    if (!sortConfig.order) return data;

    const sorted = [...data].sort((a, b) => {
      const field = sortConfig.field as keyof any;

      if (!field) return 0;

      const aVal = a?.[field];
      const bVal = b?.[field];

      const aNum =
        typeof aVal === "string" && !isNaN(Number(aVal)) ? Number(aVal) : aVal;
      const bNum =
        typeof bVal === "string" && !isNaN(Number(bVal)) ? Number(bVal) : bVal;

      if (typeof aNum === "number" && typeof bNum === "number") {
        return sortConfig.order === "asc" ? aNum - bNum : bNum - aNum;
      }

      if (typeof aNum === "string" && typeof bNum === "string") {
        return sortConfig.order === "asc"
          ? aNum.localeCompare(bNum)
          : bNum.localeCompare(aNum);
      }

      return 0;
    });

    return sorted;
  }, [data, sortConfig]);

  const requestSort = (field: any) => {
    setSortConfig((prev) => ({
      field,
      order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  return { sortedData, sortConfig, requestSort };
};
