"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, Check, Filter, Send, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardDescription, CardTitle } from "../card";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

// Added prev_price to the type definition
export type CafeProduct = {
  id: number;
  product: string;
  category: string;
  retail_price: number;
  original_price: number;
  prev_price?: number; // Added this
};

interface ProductsTableProps {
  onPriceChange: (name: string, price: number) => void;
}

export function ProductsTable({ onPriceChange }: ProductsTableProps) {
  // Fixed state initialization syntax (using an array)
  const [data, setData] = React.useState<CafeProduct[]>([
    {
      id: 1,
      product: "Lavender Honey Oat Latte",
      original_price: 4.95,
      category: "Coffee",
      retail_price: 5.75,
    },
    {
      id: 2,
      product: "Spiced Cardamom Cold Brew",
      original_price: 4.5,
      category: "Coffee",
      retail_price: 5.25,
    },
    {
      id: 3,
      product: "Rosewater Pistachio Cappuccino",
      original_price: 5.2,
      category: "Coffee",
      retail_price: 6.0,
    },
    {
      id: 4,
      product: "Maple Pecan Espresso Macchiato",
      original_price: 4.75,
      category: "Coffee",
      retail_price: 5.5,
    },
    {
      id: 5,
      product: "Ube Swirl Croissant",
      original_price: 3.99,
      category: "Bakery",
      retail_price: 4.75,
    },
    {
      id: 6,
      product: "Salted Caramel Brownie Bomb",
      original_price: 3.75,
      category: "Bakery",
      retail_price: 4.5,
    },
    {
      id: 7,
      product: "Matcha White Chocolate Scone",
      original_price: 3.5,
      category: "Bakery",
      retail_price: 4.25,
    },
    {
      id: 8,
      product: "Butterfly Pea Flower Iced Tea",
      original_price: 4.0,
      category: "Tea",
      retail_price: 4.75,
    },
    {
      id: 9,
      product: "Ginger Peach Kombucha (House Brewed)",
      original_price: 4.45,
      category: "Tea",
      retail_price: 5.25,
    },
    {
      id: 10,
      product: "Charcoal Vanilla Bean Latte",
      original_price: 5.4,
      category: "Coffee",
      retail_price: 6.25,
    },
    {
      id: 11,
      product: "Lemon Blueberry Chia Seed Muffin",
      original_price: 3.0,
      category: "Bakery",
      retail_price: 3.75,
    },
    {
      id: 12,
      product: "Signature Matte Black Ceramic Mug",
      original_price: 18.0,
      category: "Merchandise",
      retail_price: 22.0,
    },
    {
      id: 13,
      product: "Coconut Dream Drip Coffee",
      original_price: 3.25,
      category: "Coffee",
      retail_price: 3.75,
    },
    {
      id: 14,
      product: "Smoked Salmon & Dill Cream Cheese Bagel",
      original_price: 7.25,
      category: "Food",
      retail_price: 8.5,
    },
    {
      id: 15,
      product: "Refreshing Mint & Cucumber Green Tea",
      original_price: 3.3,
      category: "Tea",
      retail_price: 4.0,
    },
    {
      id: 16,
      product: "Latte",
      original_price: 3.5,
      category: "Hot Beverage",
      retail_price: 4.5,
    },
    {
      id: 17,
      product: "Cappuccino",
      original_price: 3.2,
      category: "Hot Beverage",
      retail_price: 4.0,
    },
    {
      id: 18,
      product: "Espresso",
      original_price: 2.2,
      category: "Hot Beverage",
      retail_price: 3.0,
    },
    {
      id: 19,
      product: "Americano",
      original_price: 2.7,
      category: "Hot Beverage",
      retail_price: 3.5,
    },
    {
      id: 20,
      product: "Mocha",
      original_price: 4.1,
      category: "Hot Beverage",
      retail_price: 5.0,
    },
    {
      id: 21,
      product: "Hot Chocolate",
      original_price: 3.1,
      category: "Hot Beverage",
      retail_price: 4.0,
    },
    {
      id: 22,
      product: "Chai Latte",
      original_price: 3.5,
      category: "Hot Beverage",
      retail_price: 4.5,
    },
    {
      id: 23,
      product: "Matcha Latte",
      original_price: 4.0,
      category: "Hot Beverage",
      retail_price: 5.0,
    },
    {
      id: 24,
      product: "Iced Coffee",
      original_price: 3.1,
      category: "Cold Beverage",
      retail_price: 4.0,
    },
    {
      id: 25,
      product: "Iced Latte",
      original_price: 3.6,
      category: "Cold Beverage",
      retail_price: 4.5,
    },
    {
      id: 26,
      product: "Cold Brew",
      original_price: 3.7,
      category: "Cold Beverage",
      retail_price: 4.5,
    },
    {
      id: 27,
      product: "Frappuccino",
      original_price: 4.4,
      category: "Cold Beverage",
      retail_price: 5.5,
    },
    {
      id: 28,
      product: "Iced Tea",
      original_price: 2.6,
      category: "Cold Beverage",
      retail_price: 3.5,
    },
    {
      id: 29,
      product: "Lemonade",
      original_price: 2.4,
      category: "Cold Beverage",
      retail_price: 3.5,
    },
    {
      id: 30,
      product: "Smoothie",
      original_price: 4.8,
      category: "Cold Beverage",
      retail_price: 6.0,
    },
    {
      id: 31,
      product: "Blueberry Muffin",
      original_price: 2.2,
      category: "Pastry",
      retail_price: 3.0,
    },
    {
      id: 32,
      product: "Chocolate Croissant",
      original_price: 2.6,
      category: "Pastry",
      retail_price: 3.5,
    },
    {
      id: 33,
      product: "Plain Croissant",
      original_price: 1.8,
      category: "Pastry",
      retail_price: 2.5,
    },
    {
      id: 34,
      product: "Cinnamon Roll",
      original_price: 3.1,
      category: "Pastry",
      retail_price: 4.0,
    },
    {
      id: 35,
      product: "Scone",
      original_price: 2.2,
      category: "Pastry",
      retail_price: 3.0,
    },
    {
      id: 36,
      product: "Danish",
      original_price: 2.6,
      category: "Pastry",
      retail_price: 3.5,
    },
    {
      id: 37,
      product: "Donut",
      original_price: 1.7,
      category: "Pastry",
      retail_price: 2.5,
    },
    {
      id: 38,
      product: "Banana Bread",
      original_price: 2.5,
      category: "Pastry",
      retail_price: 3.5,
    },
    {
      id: 39,
      product: "Bagel",
      original_price: 1.6,
      category: "Food",
      retail_price: 2.5,
    },
    {
      id: 40,
      product: "Bagel with Cream Cheese",
      original_price: 2.9,
      category: "Food",
      retail_price: 4.0,
    },
    {
      id: 41,
      product: "Turkey Sandwich",
      original_price: 5.4,
      category: "Food",
      retail_price: 7.5,
    },
    {
      id: 42,
      product: "Caprese Sandwich",
      original_price: 5.1,
      category: "Food",
      retail_price: 7.0,
    },
    {
      id: 43,
      product: "Avocado Toast",
      original_price: 4.6,
      category: "Food",
      retail_price: 6.5,
    },
    {
      id: 44,
      product: "Grilled Cheese",
      original_price: 4.2,
      category: "Food",
      retail_price: 6.0,
    },
    {
      id: 45,
      product: "Chicken Panini",
      original_price: 5.8,
      category: "Food",
      retail_price: 8.0,
    },
    {
      id: 46,
      product: "Quiche",
      original_price: 4.1,
      category: "Food",
      retail_price: 5.5,
    },
    {
      id: 47,
      product: "Soup of the Day",
      original_price: 4.3,
      category: "Food",
      retail_price: 6.0,
    },
    {
      id: 48,
      product: "Cheesecake Slice",
      original_price: 3.6,
      category: "Dessert",
      retail_price: 5.0,
    },
    {
      id: 49,
      product: "Chocolate Cake",
      original_price: 3.2,
      category: "Dessert",
      retail_price: 4.5,
    },
    {
      id: 50,
      product: "Carrot Cake",
      original_price: 3.2,
      category: "Dessert",
      retail_price: 4.5,
    },
    {
      id: 51,
      product: "Brownie",
      original_price: 2.4,
      category: "Dessert",
      retail_price: 3.5,
    },
    {
      id: 52,
      product: "Cookie",
      original_price: 1.2,
      category: "Dessert",
      retail_price: 2.0,
    },
    {
      id: 53,
      product: "Tiramisu",
      original_price: 4.1,
      category: "Dessert",
      retail_price: 5.5,
    },
    {
      id: 54,
      product: "Macarons (3pc)",
      original_price: 3.1,
      category: "Dessert",
      retail_price: 4.5,
    },
    {
      id: 55,
      product: "Fruit Tart",
      original_price: 3.6,
      category: "Dessert",
      retail_price: 5.0,
    },
    {
      id: 56,
      product: "Extra Shot Espresso",
      original_price: 0.3,
      category: "Extra",
      retail_price: 0.75,
    },
    {
      id: 57,
      product: "Oat Milk Upgrade",
      original_price: 0.4,
      category: "Extra",
      retail_price: 0.75,
    },
    {
      id: 58,
      product: "Whipped Cream",
      original_price: 0.2,
      category: "Extra",
      retail_price: 0.5,
    },
    {
      id: 59,
      product: "Flavor Syrup",
      original_price: 0.2,
      category: "Extra",
      retail_price: 0.5,
    },
    {
      id: 60,
      product: "Side Salad",
      original_price: 2.4,
      category: "Extra",
      retail_price: 3.5,
    },
  ]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [editingRowId, setEditingRowId] = React.useState<number | null>(null);
  const [editPrice, setEditPrice] = React.useState<number>(0);
  const [aiPrompt, setAiPrompt] = React.useState<string>("");

  const handleStartEdit = (id: number, currentPrice: number) => {
    setEditingRowId(id);
    setEditPrice(currentPrice);
  };

  const handleSaveEdit = (id: number) => {
    const productToUpdate = data.find((item) => item.id === id);
    if (productToUpdate) {
      if (editPrice < productToUpdate.original_price) {
        alert("Price cannot be lower than cost!");
        return;
      }
      onPriceChange(productToUpdate.product, editPrice);
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? {
                ...item,
                prev_price: item.retail_price,
                retail_price: editPrice,
              }
            : item,
        ),
      );
    }
    setEditingRowId(null);
  };

  const columns: ColumnDef<CafeProduct>[] = [
    {
      accessorKey: "product",
      header: "Product",
      cell: ({ row }) => (
        <div className="font-medium text-xs truncate max-w-160">
          {row.getValue("product")}
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: () => <div className="text-right text-xs">Category</div>,
      cell: ({ row }) => (
        <div className="text-right text-muted-foreground text-xs">
          {row.getValue("category")}
        </div>
      ),
    },
    {
      accessorKey: "original_price",
      header: () => <div className="text-right text-xs">Cost</div>,
      cell: ({ row }) => (
        <div className="text-right text-muted-foreground italic text-xs">
          ${parseFloat(row.getValue("original_price")).toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: "retail_price",
      header: () => <div className="text-right text-xs">Price</div>,
      cell: ({ row }) => {
        const current = row.original.retail_price;
        const previous = row.original.prev_price;
        const cost = row.original.original_price;

        return (
          <div className="text-right leading-tight">
            <div className="flex justify-end items-baseline gap-1">
              {previous && previous !== current && (
                <span className="text-[10px] text-muted-foreground line-through opacity-50">
                  ${previous.toFixed(2)}
                </span>
              )}
              <span className="font-bold text-xs">${current.toFixed(2)}</span>
            </div>
            <div className="text-[9px] text-green-600 font-medium">
              +${(current - cost).toFixed(2)}
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const isEditing = editingRowId === row.original.id;
        if (isEditing) {
          return (
            <div className="flex items-center gap-1 justify-end">
              <Input
                type="number"
                autoFocus
                value={editPrice}
                onChange={(e) => setEditPrice(parseFloat(e.target.value) || 0)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSaveEdit(row.original.id)
                }
                className="w-14 h-7 text-[10px] px-1"
              />
              <Button
                size="icon"
                className="h-7 w-7"
                onClick={() => handleSaveEdit(row.original.id)}
              >
                <Check className="h-3 w-3" />
              </Button>
            </div>
          );
        }
        return (
          <div className="text-right">
            <Button
              size="sm"
              variant="secondary"
              className="h-7"
              onClick={() =>
                handleStartEdit(row.original.id, row.original.retail_price)
              }
            >
              Adjust
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnVisibility },
  });

  return (
    <div className="w-full">
      <CardTitle className="text-lg mt-2">Product Pricing</CardTitle>
      <div className="flex justify-between items-center py-2">
        <Input
          placeholder="Search..."
          value={(table.getColumn("product")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("product")?.setFilterValue(e.target.value)
          }
          className="max-w-96 h-8 text-xs"
        />
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                className="h-8 gap-2 text-xs bg-orange-600 hover:bg-orange-700"
              >
                <Sparkles className="h-3 w-3" /> AI Helper
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 border-stone-200" align="end">
              <div className="space-y-3">
                <h4 className="text-xs font-bold flex items-center gap-2 text-black uppercase tracking-tighter">
                  <Sparkles className="h-3 w-3" /> Smart Pricing Assistant
                </h4>
                <div className="flex gap-2">
                  <Input
                    placeholder="Suggest margins for bakery..."
                    className="h-8 text-xs"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                  <Button size="sm" onClick={() => setAiPrompt("")}>
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="relative h-[480px] overflow-auto no-scrollbar rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 z-20 bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-10">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-2 px-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
