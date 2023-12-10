import { z } from "zod";

// 商品
export const itemSchema = z.object({
  // カテゴリー名
  category: z.string(),
  // 業種/職種名
  // 複数の場合は '/' で連結された文字列
  class: z.string(),
  // 商品ID
  item_id: z.number(),
  // セット上限数
  limit: z.number(),
  // 商品名
  name: z.string(),
  // 数量単位
  scale: z.string(),
  // 並び順
  sort: z.number(),
});

// アイテムリスト
// Record<商品ID, 商品>
export const itemListSchema = z.record(z.string(), itemSchema);

export type Item = z.infer<typeof itemSchema>;

export type ItemList = z.infer<typeof itemListSchema>;
