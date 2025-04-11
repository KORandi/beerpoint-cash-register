import React from "react";

// Define interfaces for the component's props
interface OrderItemData {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderItemProps {
  item: OrderItemData;
  onRemove?: (id: string) => void;
}

export default function OrderItem({ item, onRemove }: OrderItemProps) {
  return (
    <tr className="border-b">
      <td className="py-2 px-3">{item.name}</td>
      <td className="py-2 px-3 text-right">{item.price} Kč</td>
      <td className="py-2 px-3 text-right">{item.quantity}</td>
      <td className="py-2 px-3 text-right font-medium">
        {item.price * item.quantity} Kč
      </td>
      {onRemove && (
        <td className="py-2 px-3 text-right">
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </td>
      )}
    </tr>
  );
}
