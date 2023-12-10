import { z } from "zod";

// 商品
export const saleSchema = z.object({
  // 販売通し番号
  sale_serial: z.number(),
  // 街ID
  area_id: z.number(),
  // X座標
  pos_x: z.number(),
  // Y座標
  pos_y: z.number(),
  // オーナー番号
  user_id: z.number(),
  // ショップ番号
  shop_id: z.number(),
  // ショップ名
  shop_name: z.string(),
  // 商品ID
  item_id: z.number(),
  // 販売単価
  price: z.number(),
  // 販売在庫数
  unit: z.number(),
  // まとめ売り
  bundle_sale: z.union([z.literal(0), z.literal(1)]),
});

// アイテムリスト
// Record<商品ID, 商品>
export const saleListSchema = z.array(saleSchema);

export type Sale = z.infer<typeof saleSchema>;

export type SaleList = z.infer<typeof saleListSchema>;
