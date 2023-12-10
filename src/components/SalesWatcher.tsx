import { useMemo } from "react";
import { useItemIDs } from "@/hooks/useItemIDs";
import { useSaleList } from "@/api/sale";
import { ItemSelecter } from "./ItemSelecter";
import { SalesTable } from "./SalesTable";

export const SalesWatcher = () => {
  const { data: sales } = useSaleList();

  const { itemIDs, setItemIDs } = useItemIDs();

  const selectedSales = useMemo(
    () =>
      sales
        ?.filter((sale) => itemIDs.includes(sale.item_id))
        .sort((sale1, sale2) => sale1.price - sale2.price) ?? [],
    [sales, itemIDs],
  );

  return (
    <div className="space-y-4">
      <ItemSelecter
        defaultItemIDs={itemIDs}
        onChange={(itemIDs: number[]) => setItemIDs(itemIDs)}
      />

      <SalesTable sales={selectedSales} />
    </div>
  );
};
