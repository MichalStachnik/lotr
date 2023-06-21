import { useEffect, useState } from 'react';
import { ACCESS_TOKEN, BASE_URL } from '../App';
import { Box, Link, Skeleton } from '@mui/material';
import { Character } from '../types/Character';
import { DataGrid, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';

const columns = [
  { field: 'birth', headerName: 'Birth Date', width: 130 },
  { field: 'death', headerName: 'Death Date', width: 130 },
  { field: 'gender', headerName: 'Gender', width: 130 },
  { field: 'hair', headerName: 'Hair Color', width: 130 },
  { field: 'height', headerName: 'Height', width: 130 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'race', headerName: 'Race', width: 130 },
  { field: 'realm', headerName: 'Realm', width: 130 },
  { field: 'spouse', headerName: 'Spouse', width: 130 },
  {
    field: 'wikiUrl',
    headerName: 'Wiki',
    sortable: false,
    width: 130,
    type: 'string',
    renderCell: (params: GridRenderCellParams) => {
      return <Link href={params.row.wikiUrl}>{params.row.wikiUrl}</Link>;
    },
  },
];

const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    try {
      fetch(`${BASE_URL}/character`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setCharacters([...data.docs]))
        .catch((err) => console.warn(err))
        .finally(() => setIsLoading(false));
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, []);

  return (
    <Box mt={2} data-testid="characters">
      {isLoading ? (
        <Skeleton width={1200} height={800} />
      ) : (
        <Box>
          <DataGrid
            rows={characters}
            getRowId={(row: Character) => row._id}
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

export default Characters;
