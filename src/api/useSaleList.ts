import useSWR from "swr";
import { saleListSchema } from "@/schema/sale";
import { createSo2ApiFetcher } from "./createSo2ApiFetcher";

export const useSaleList = () =>
  useSWR(
    "https://so2-api.mutoys.com/json/sale/all.json",
    createSo2ApiFetcher(saleListSchema, { maxAge: 600 }),
  );
