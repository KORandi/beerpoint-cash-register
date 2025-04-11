import mongoose, { Document, Model } from "mongoose";

// Define interfaces for each subdocument
interface ICategorySales {
  name: string;
  amount: number;
}

interface IPaymentMethod {
  method: string;
  amount: number;
}

interface IExpenseItem {
  name: string;
  amount: number;
}

// Define the main document interface
interface IDailyReport extends Document {
  date: Date;
  closed: boolean;
  sales: {
    totalSales: number;
    itemsSold: number;
    orderCount: number;
    averageOrderValue: number;
    categories: ICategorySales[];
    paymentMethods: IPaymentMethod[];
  };
  expenses: {
    total: number;
    items: IExpenseItem[];
  };
  cash: {
    openingBalance: number;
    closingBalance?: number;
    difference?: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Define schemas for subdocuments
const CategorySalesSchema = new mongoose.Schema<ICategorySales>({
  name: String,
  amount: Number,
});

const PaymentMethodSchema = new mongoose.Schema<IPaymentMethod>({
  method: String,
  amount: Number,
});

const ExpenseItemSchema = new mongoose.Schema<IExpenseItem>({
  name: String,
  amount: Number,
});

// Define the main schema
const DailyReportSchema = new mongoose.Schema<IDailyReport>(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    closed: {
      type: Boolean,
      default: false,
    },
    sales: {
      totalSales: {
        type: Number,
        default: 0,
      },
      itemsSold: {
        type: Number,
        default: 0,
      },
      orderCount: {
        type: Number,
        default: 0,
      },
      averageOrderValue: {
        type: Number,
        default: 0,
      },
      categories: [CategorySalesSchema],
      paymentMethods: [PaymentMethodSchema],
    },
    expenses: {
      total: {
        type: Number,
        default: 0,
      },
      items: [ExpenseItemSchema],
    },
    cash: {
      openingBalance: {
        type: Number,
        required: true,
      },
      closingBalance: Number,
      difference: Number,
    },
  },
  {
    timestamps: true,
  }
);

// Handle model compilation with TypeScript
let DailyReport: Model<IDailyReport>;

// Check if the model already exists to prevent overwriting during hot reloads
try {
  DailyReport = mongoose.model<IDailyReport>("DailyReport");
} catch {
  DailyReport = mongoose.model<IDailyReport>("DailyReport", DailyReportSchema);
}

export default DailyReport;
