import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaHome,
  FaUtensils,
  FaShoppingCart,
  FaCalculator,
} from "react-icons/fa";

export default function Sidebar() {
  const router = useRouter();

  const menuItems = [
    { title: "Přehled", icon: <FaHome />, path: "/" },
    { title: "Menu", icon: <FaUtensils />, path: "/menu" },
    { title: "Objednávky", icon: <FaShoppingCart />, path: "/orders" },
    { title: "Účetnictví", icon: <FaCalculator />, path: "/accounting" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-4 text-xl font-bold">Hospodský systém</div>
      <nav className="mt-8">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link href={item.path}>
                <a
                  className={`flex items-center p-3 rounded ${
                    router.pathname === item.path
                      ? "bg-gray-900"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
