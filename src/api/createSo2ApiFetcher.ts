import dayjs from "dayjs";
import { Fetcher } from "swr";
import { z } from "zod";

const getFromStorage = <T>(key: string, schema: z.ZodType<T>): Promise<T> =>
  chrome.storage.local.get([key]).then((data) => schema.parse(data[key]));

const setToStorage = <T>(key: string, value: T): Promise<void> =>
  chrome.storage.local.set({ [key]: value });

const fetchFromSo2Api = <T>(
  input: RequestInfo,
  schema: z.ZodType<T>,
  options: { maxAge: number },
): Promise<T> =>
  fetch(input, {
    headers: {
      "Cache-Control": `max-age=${options.maxAge}`,
    },
  })
    .then((res) => res.json())
    .then((data) => schema.parse(data));

export const createSo2ApiFetcher =
  <T>(schema: z.ZodType<T>, options: { maxAge: number }): Fetcher<T, string> =>
  async (url: string) =>
    getFromStorage(`${url}_updated`, z.string().optional()).then((updated) =>
      updated && dayjs().diff(dayjs(updated), "second") <= options.maxAge
        ? getFromStorage(url, schema)
        : fetchFromSo2Api(url, schema, options).then((data) => {
            setToStorage(url, data);
            setToStorage(`${url}_updated`, dayjs().format());
            return data;
          }),
    );
