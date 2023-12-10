import { useEffect, useState } from "react";
import { z } from "zod";

export const useItemIDs = () => {
  const schema = z.array(z.number());
  const [items, setItems] = useState<number[]>([]);
  useEffect(() => {
    chrome.storage?.sync
      .get(["defaultItemIDs"])
      .then((obj) => schema.parse(obj["defaultItemIDs"] ?? [1]))
      .then((items) => setItems(items));
  }, []);
  const setItemIDs = (itemIDs: number[]) => {
    setItems(itemIDs);
    chrome.storage?.sync.set({ defaultItemIDs: itemIDs });
  };
  return { itemIDs: items, setItemIDs };
};
