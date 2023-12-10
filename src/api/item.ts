import useSWR, { Fetcher } from "swr";
import { ItemList, itemListSchema } from "@/schema/item";

const fetcher: Fetcher<ItemList, string> = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => itemListSchema.parse(res));

export const useItemList = () => useSWR("item.json", fetcher);
