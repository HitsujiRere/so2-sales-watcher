import { useEffect, useState } from "react";
import { z } from "zod";

const schema = z.array(z.number());

export const useItemIDs = () => {
  const [items, setItems] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    chrome.storage.sync
      .get(["defaultItemIDs"])
      .then((obj) => schema.parse(obj["defaultItemIDs"] ?? [1]))
      .then((items) => setItems(items))
      .then(() => setIsLoading(false));
  }, []);
  const setItemIDs = (itemIDs: number[]) => {
    setItems(itemIDs);
    chrome.storage.sync.set({ defaultItemIDs: itemIDs });
  };
  return { itemIDs: items, setItemIDs, isLoading };
};
