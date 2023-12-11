import useSWR from "swr";
import { itemListSchema } from "@/schema/item";
import { createApiFetcher } from "./createFetcher";

export const useItemList = () =>
  useSWR("item.json", createApiFetcher(itemListSchema));
