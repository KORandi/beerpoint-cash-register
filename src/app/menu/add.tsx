import Layout from "../components/Layout";
import MenuForm from "../components/MenuForm";

export default function AddMenuItem() {
  return (
    <Layout title="Přidat položku | Hospodský systém">
      <h1 className="text-2xl font-bold mb-6">Přidat novou položku do menu</h1>
      <MenuForm />
    </Layout>
  );
}
