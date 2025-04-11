import Layout from "../components/Layout";
import OrderForm from "../components/OrderForm";

export default function AddOrder() {
  return (
    <Layout title="Nová objednávka | Hospodský systém">
      <h1 className="text-2xl font-bold mb-6">Nová objednávka</h1>
      <OrderForm />
    </Layout>
  );
}
