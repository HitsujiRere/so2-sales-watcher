import { z } from "zod";

export const createStrageFetcher =
  <T>(schema: z.ZodType<T, any, any>) =>
  (key: string): Promise<T> =>
    chrome.storage.local.get([key]).then((data) => schema.parse(data[key]));

export const createApiFetcher =
  <T>(schema: z.ZodType<T, any, any>) =>
  (input: RequestInfo): Promise<T> =>
    fetch(input, { cache: "force-cache" })
      .then((res) => res.json())
      .then((data) => schema.parse(data));
