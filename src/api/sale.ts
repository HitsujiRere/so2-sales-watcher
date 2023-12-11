import dayjs from "dayjs";
import useSWR from "swr";
import { z } from "zod";
import { saleListSchema } from "@/schema/sale";
import { createStrageFetcher } from "./createFetcher";

const strageSchema = z
  .object({
    saleList: saleListSchema,
    updated: z.string(),
  })
  .optional();

export const useSaleList = () => {
  const { data, isLoading, mutate } = useSWR(
    "salelist",
    createStrageFetcher(strageSchema),
  );

  if (
    !isLoading &&
    (!data || dayjs().diff(dayjs(data?.updated), "minute") >= 20)
  ) {
    fetch("https://so2-api.mutoys.com/json/sale/all.json", {
      cache: "force-cache",
    })
      .then((res) => res.json())
      .then((data) => saleListSchema.parse(data))
      .then((saleList): void => {
        const data: z.infer<typeof strageSchema> = {
          saleList,
          updated: dayjs().format(""),
        };
        mutate(data);
        chrome.storage.local.set({ salelist: data });
      });
  }

  return { data: data?.saleList, isLoading, mutate };
};
