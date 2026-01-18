"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel, // Removed pagination import
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

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

export type CafeProduct = {
  id: string;
  product: string;
  category: string;
  price: number;
  originalPrice?: number;
};

export function ProductsTable() {
  const [data, setData] = React.useState<CafeProduct[]>([
    /* ... your data stays the same ... */
    { id: "1", product: "Latte", category: "Hot Beverage", price: 4.5 },
    { id: "2", product: "Cappuccino", category: "Hot Beverage", price: 4.0 },
    { id: "3", product: "Espresso", category: "Hot Beverage", price: 3.0 },
    { id: "4", product: "Americano", category: "Hot Beverage", price: 3.5 },
    { id: "5", product: "Mocha", category: "Hot Beverage", price: 5.0 },
    { id: "6", product: "Hot Chocolate", category: "Hot Beverage", price: 4.0 },
    { id: "7", product: "Chai Latte", category: "Hot Beverage", price: 4.5 },
    { id: "8", product: "Matcha Latte", category: "Hot Beverage", price: 5.0 },
    { id: "9", product: "Iced Coffee", category: "Cold Beverage", price: 4.0 },
    { id: "10", product: "Iced Latte", category: "Cold Beverage", price: 4.5 },
    { id: "11", product: "Cold Brew", category: "Cold Beverage", price: 4.5 },
    { id: "12", product: "Frappuccino", category: "Cold Beverage", price: 5.5 },
    { id: "13", product: "Iced Tea", category: "Cold Beverage", price: 3.5 },
    { id: "14", product: "Lemonade", category: "Cold Beverage", price: 3.5 },
    { id: "15", product: "Smoothie", category: "Cold Beverage", price: 6.0 },
    { id: "16", product: "Blueberry Muffin", category: "Pastry", price: 3.0 },
    {
      id: "17",
      product: "Chocolate Croissant",
      category: "Pastry",
      price: 3.5,
    },
    { id: "18", product: "Plain Croissant", category: "Pastry", price: 2.5 },
    { id: "19", product: "Cinnamon Roll", category: "Pastry", price: 4.0 },
    { id: "20", product: "Scone", category: "Pastry", price: 3.0 },
    { id: "21", product: "Danish", category: "Pastry", price: 3.5 },
    { id: "22", product: "Donut", category: "Pastry", price: 2.5 },
    { id: "23", product: "Banana Bread", category: "Pastry", price: 3.5 },
    { id: "24", product: "Bagel", category: "Food", price: 2.5 },
    {
      id: "25",
      product: "Bagel with Cream Cheese",
      category: "Food",
      price: 4.0,
    },
    { id: "26", product: "Turkey Sandwich", category: "Food", price: 7.5 },
    { id: "27", product: "Caprese Sandwich", category: "Food", price: 7.0 },
    { id: "28", product: "Avocado Toast", category: "Food", price: 6.5 },
    { id: "29", product: "Grilled Cheese", category: "Food", price: 6.0 },
    { id: "30", product: "Chicken Panini", category: "Food", price: 8.0 },
    { id: "31", product: "Quiche", category: "Food", price: 5.5 },
    { id: "32", product: "Soup of the Day", category: "Food", price: 6.0 },
    { id: "33", product: "Cheesecake Slice", category: "Dessert", price: 5.0 },
    { id: "34", product: "Chocolate Cake", category: "Dessert", price: 4.5 },
    { id: "35", product: "Carrot Cake", category: "Dessert", price: 4.5 },
    { id: "36", product: "Brownie", category: "Dessert", price: 3.5 },
    { id: "37", product: "Cookie", category: "Dessert", price: 2.0 },
    { id: "38", product: "Tiramisu", category: "Dessert", price: 5.5 },
    { id: "39", product: "Macarons (3pc)", category: "Dessert", price: 4.5 },
    { id: "40", product: "Fruit Tart", category: "Dessert", price: 5.0 },
    {
      id: "41",
      product: "Extra Shot Espresso",
      category: "Extra",
      price: 0.75,
    },
    { id: "42", product: "Oat Milk Upgrade", category: "Extra", price: 0.75 },
    { id: "43", product: "Whipped Cream", category: "Extra", price: 0.5 },
    { id: "44", product: "Flavor Syrup", category: "Extra", price: 0.5 },
    { id: "45", product: "Side Salad", category: "Extra", price: 3.5 },
  ]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [editingRowId, setEditingRowId] = React.useState<string | null>(null);
  const [editPrice, setEditPrice] = React.useState<number>(0);

  const handleStartEdit = (id: string, currentPrice: number) => {
    setEditingRowId(id);
    setEditPrice(currentPrice);
  };

  const handleSaveEdit = (id: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              price: editPrice,
              originalPrice: item.originalPrice || item.price,
            }
          : item,
      ),
    );
    setEditingRowId(null);
  };

  const columns: ColumnDef<CafeProduct>[] = [
    {
      accessorKey: "product",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("product")}</div>,
    },
    {
      accessorKey: "category",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("category")}</div>,
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        const originalPrice = row.original.originalPrice;
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price);

        if (originalPrice && originalPrice !== price) {
          const formattedOriginal = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(originalPrice);

          return (
            <div className="text-right font-medium">
              <span className="line-through text-gray-400 mr-2">
                {formattedOriginal}
              </span>
              {formatted}
            </div>
          );
        }

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const isEditing = editingRowId === row.original.id;

        if (isEditing) {
          return (
            <div className="flex items-center gap-2 justify-end">
              <Input
                type="number"
                step="0.01"
                value={editPrice}
                onChange={(e) => setEditPrice(parseFloat(e.target.value) || 0)}
                className="w-24 h-8"
              />
              <Button size="sm" onClick={() => handleSaveEdit(row.original.id)}>
                Save
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingRowId(null)}
              >
                Cancel
              </Button>
            </div>
          );
        }

        return (
          <div className="text-right">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                handleStartEdit(row.original.id, row.original.price)
              }
            >
              Edit Price
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
    // getPaginationRowModel: getPaginationRowModel(), // Removed to show all rows
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Search for a product..."
          value={(table.getColumn("product")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("product")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button size={"sm"}>Filter</Button>
      </div>

      {/* SCROLLABLE CONTAINER CHANGES:
          1. Set a height (e.g., h-[400px] or max-h-[600px])
          2. Add overflow-auto
          3. Add "relative" to keep the sticky header positioned correctly
      */}
      <div className="relative h-136 overflow-scroll no-scrollbar rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      /* 2. THE HEADER CELLS: Sticky classes go here */
                      className="sticky top-0 z-10 bg-background border-b shadow-sm"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-4">

      <Button>Run Simulation</Button>
      </div>
    </div>
  );
}
