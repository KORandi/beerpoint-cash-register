import mongoose, { Document, Model, Schema } from "mongoose";

// Define category enum values for type safety
export type MenuItemCategory =
  | "Hlavní jídla"
  | "Předkrmy"
  | "Polévky"
  | "Dezerty"
  | "Nápoje"
  | "Alkoholické nápoje";

// Interface for MenuItem document
export interface IMenuItem extends Document {
  name: string;
  price: number;
  category: MenuItemCategory;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: {
      type: String,
      required: [true, "Zadejte název položky"],
      trim: true,
      maxlength: [100, "Název položky nesmí být delší než 100 znaků"],
    },
    price: {
      type: Number,
      required: [true, "Zadejte cenu položky"],
      min: [0, "Cena nesmí být záporná"],
    },
    category: {
      type: String,
      required: [true, "Vyberte kategorii"],
      enum: {
        values: [
          "Hlavní jídla",
          "Předkrmy",
          "Polévky",
          "Dezerty",
          "Nápoje",
          "Alkoholické nápoje",
        ],
        message: "{VALUE} není platná kategorie",
      },
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Popis nesmí být delší než 500 znaků"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Handle model compilation with TypeScript
let MenuItem: Model<IMenuItem>;

// Check if the model already exists to prevent overwriting during hot reloads
try {
  MenuItem = mongoose.model<IMenuItem>("MenuItem");
} catch {
  MenuItem = mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);
}

export default MenuItem;
