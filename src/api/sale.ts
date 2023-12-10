import useSWR, { Fetcher } from "swr";
import { SaleList, saleListSchema } from "@/schema/sale";

const fetcher: Fetcher<SaleList, string> = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => saleListSchema.parse(res));

export const useSaleList = () => useSWR("sale.json", fetcher);
