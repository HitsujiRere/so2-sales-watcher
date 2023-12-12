import useSWR from "swr";
import { itemListSchema } from "@/schema/item";
import { createSo2ApiFetcher } from "./createSo2ApiFetcher";

export const useItemList = () =>
  useSWR(
    "https://so2-api.mutoys.com/master/item.json",
    createSo2ApiFetcher(itemListSchema, { maxAge: 3600 }),
  );
