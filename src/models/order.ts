import mongoose, { Document, Model, Schema } from "mongoose";
import { IMenuItem } from "./menuItemModel"; // Assuming you have this interface defined elsewhere

// Define the status and payment method enum values to ensure type safety
export type OrderStatus = "active" | "completed" | "cancelled";
export type PaymentMethod = "cash" | "card";

// Interface for order items
export interface IOrderItem {
  menuItem: mongoose.Types.ObjectId | IMenuItem;
  name?: string;
  price?: number;
  quantity: number;
}

// Interface for order document
export interface IOrder extends Document {
  table: string;
  items: IOrderItem[];
  status: OrderStatus;
  totalPrice: number;
  notes?: string;
  paymentMethod?: PaymentMethod;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Schema for order items
const OrderItemSchema = new Schema<IOrderItem>({
  menuItem: {
    type: Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true,
  },
  name: String,
  price: Number,
  quantity: {
    type: Number,
    required: true,
    min: [1, "Množství musí být alespoň 1"],
  },
});

// Schema for orders
const OrderSchema = new Schema<IOrder>(
  {
    table: {
      type: String,
      required: [true, "Zadejte číslo stolu"],
    },
    items: {
      type: [OrderItemSchema],
      required: [true, "Objednávka musí obsahovat alespoň jednu položku"],
    },
    status: {
      type: String,
      enum: {
        values: ["active", "completed", "cancelled"],
        message: "{VALUE} není platný status",
      },
      default: "active",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    notes: String,
    paymentMethod: {
      type: String,
      enum: {
        values: ["cash", "card"],
        message: "{VALUE} není platná platební metoda",
      },
    },
    paidAt: Date,
  },
  {
    timestamps: true,
  }
);

// Handle model compilation with TypeScript
let Order: Model<IOrder>;

// Check if the model already exists to prevent overwriting during hot reloads
try {
  Order = mongoose.model<IOrder>("Order");
} catch {
  Order = mongoose.model<IOrder>("Order", OrderSchema);
}

export default Order;
