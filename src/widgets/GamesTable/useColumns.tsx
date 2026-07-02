import type { GridColDef } from "@mui/x-data-grid";
import { AppNameCell } from "entities/StoreAnalytics";
import { formatNumber, formatCurrency } from "shared/lib/format";
import type { TableRow } from "entities/StoreAnalytics";

export const useColumns = (): GridColDef<TableRow>[] => [
  {
    field: "name",
    headerName: "App Name",
    width: 180,
    renderCell: ({ row }) => <AppNameCell name={row.name} icon={row.icon} />,
  },
  {
    field: "downloads",
    headerName: "Downloads",
    width: 130,
    valueFormatter: (value: number) => formatNumber(value),
  },
  {
    field: "revenue",
    headerName: "Revenue",
    width: 150,
    valueFormatter: (value: number) => formatCurrency(value),
  },
  {
    field: "rpd",
    headerName: "RPD",
    width: 120,
    valueFormatter: (value: number | null) => value == null ? "-" : formatCurrency(value),
  },
];
