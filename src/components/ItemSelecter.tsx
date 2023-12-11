import { useMemo } from "react";
import Select from "react-select";
import { useItemList } from "@/api/item";

export const ItemSelecter = (props: {
  defaultItemIDs: number[];
  onChange: (itemIDs: number[]) => void;
}) => {
  const { data: items, error, isLoading } = useItemList();

  const selectOption = useMemo(
    () =>
      Object.entries(items ?? {})
        .map(([, item]) => item)
        .sort((item1, item2) => item1.sort - item2.sort)
        .map((item) => ({
          value: item.item_id,
          label: item.name,
        })),
    [items],
  );

  return error ? (
    <p>Error! {JSON.stringify(error)}</p>
  ) : isLoading ? (
    <p>Loading...</p>
  ) : (
    <Select
      options={selectOption}
      defaultValue={props.defaultItemIDs.map((itemID) => ({
        value: itemID,
        label: items?.[itemID].name ?? "loading",
      }))}
      placeholder="商品名"
      isMulti
      isSearchable
      isClearable
      onChange={(value) => props.onChange(value.map((x) => Number(x.value)))}
    />
  );
};
