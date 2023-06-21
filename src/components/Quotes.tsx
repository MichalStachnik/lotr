import { useEffect, useState } from 'react';
import { ACCESS_TOKEN, BASE_URL } from '../App';
import { Box, Skeleton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Quote } from '../types/Quote';

const columns = [
  { field: 'character', headerName: 'Character ID', width: 300 },
  { field: 'dialog', headerName: 'Dialog', width: 500 },
  { field: 'movie', headerName: 'Movie ID', width: 300 },
];

const Quotes = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    try {
      fetch(`${BASE_URL}/quote`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setQuotes([...data.docs]))
        .catch((err) => console.warn(err))
        .finally(() => setIsLoading(false));
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, []);

  return (
    <Box mt={2} data-testid="quotes">
      {isLoading ? (
        <Skeleton width={1200} height={800} />
      ) : (
        <Box>
          <DataGrid
            rows={quotes}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20]}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            sx={{
              boxShadow: 2,
              border: 2,
              borderColor: 'primary.light',
              color: 'white',
              '& .MuiDataGrid-cell:hover': {
                color: 'primary.main',
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Quotes;
