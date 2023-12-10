import { useItemList } from "@/api/item";
import { SaleList } from "@/schema/sale";

export const SalesTable = (props: { sales: SaleList }) => {
  const { data: items } = useItemList();

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="[&>:not(:last-child)]:pr-4">
          <th>商品名</th>
          <th>販売単価</th>
          <th>販売在庫数</th>
          <th>ショップ名</th>
        </tr>
      </thead>
      <tbody>
        {props.sales.map((sale) => (
          <tr
            key={sale.sale_serial}
            className="[&>*]:text-center  [&>:not(:last-child)]:pr-4"
          >
            <td>{items?.[sale.item_id].name ?? sale.item_id}</td>
            <td>{sale.price}</td>
            <td>{sale.unit}</td>
            <td>{sale.shop_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
