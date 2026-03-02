import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  BarChart3Icon,
  BarChart4Icon,
  PackageIcon,
  PlusIcon,
  SettingsIcon,
} from "lucide-react";
import { UserInfo } from "../userInfo";

type CurrentPathType = {
  currentPath: string;
};

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: BarChart3Icon,
    id: 0,
  },
  {
    label: "Inventario",
    href: "/inventory",
    icon: PackageIcon,
    id: 1,
  },
  {
    label: "Adicionar Produto",
    href: "/add-product",
    icon: PlusIcon,
    id: 2,
  },
  {
    label: "Configuracoes",
    href: "/settings",
    icon: SettingsIcon,
    id: 3,
  },
];

export function Sidebar({ currentPath = "dashboard" }: CurrentPathType) {
  return (
    <div className="fixed left-0 top-0 bg-neutral-800 text-white w-64 min-h-screen p-6 z-10">
      <div className="mb-8">
        <div className="flex items-center gap-x-2 mb-4">
          <BarChart4Icon className="w-7 h-7" />
          <span className="font-semibold">Controle de estoque</span>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <div className="text-sm font-semibold text-gray-400 uppercase">
          Inventario
        </div>

        <div className="flex flex-col gap-3">
          {navigation.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <Link
                href={item.href}
                key={item.id}
                className={cn(
                  "flex items-center gap-x-3 rounded-lg px-2 py-1 ",
                  isActive
                    ? "bg-primary text-secondary"
                    : "hover:bg-primary/80",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 py-6 border-t border-gray-700 ">
        <div className="flex items-center justify-between ">
          <UserInfo />
        </div>
      </div>
    </div>
  );
}
