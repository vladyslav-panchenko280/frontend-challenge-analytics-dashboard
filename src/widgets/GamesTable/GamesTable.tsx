import { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Loader } from "shared/ui";
import { useAppData } from "app/providers";
import { filterByDateRange, toRows } from "entities/StoreAnalytics";
import { useColumns } from "./useColumns";
import styles from "./GamesTable.module.css";

const GamesTable = () => {
  const { data, loading, dateRange } = useAppData();
  const columns = useColumns();

  const rows = useMemo(() => {
    const filtered = filterByDateRange(data, dateRange);
    return toRows(filtered);
  }, [data, dateRange]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.tableWrapper}>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 700 },
        }}
      />
    </div>
  );
};

export default GamesTable;
