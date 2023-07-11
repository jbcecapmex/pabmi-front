import * as React from "react";
import { DataGrid, esES as gridEsES, GridToolbarQuickFilter,useGridApiContext, GridToolbarContainer,} from "@mui/x-data-grid";
import { createTheme, Fade, ListItemIcon, Menu, MenuItem, ThemeProvider } from "@mui/material";
import Button from '@mui/material/Button';
import { esES as coreEsES } from "@mui/material/locale";
import {Download, Print} from '@mui/icons-material';

const theme = createTheme(coreEsES, gridEsES);
export default function MUIXDataGrid(props: any) {
  // barra personalizada
  function CustomToolbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };  
    const apiRef = useGridApiContext();
    const handleExport = () => {apiRef.current.exportDataAsCsv({fields: props.camposCsv, utf8WithBom:true}) ; handleClose()} 
    const handlePrint = () => { apiRef.current.exportDataAsPrint({fields: props.camposCsv}) ; handleClose()} 
    return (
      <GridToolbarContainer sx={{display:"flex", justifyContent:"space-between"}}>
        <Button
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Exportar
        </Button>
          <Menu
            MenuListProps={{'aria-labelledby': 'fade-button',}}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleExport}>
              <ListItemIcon>
                <Download fontSize="small" />
              </ListItemIcon>
              Descarga CSV
            </MenuItem>
            <MenuItem onClick={handlePrint}>
              <ListItemIcon>
                <Print fontSize="small" />
              </ListItemIcon>
              Imprimir
            </MenuItem>
          </Menu>        
        {/* campo de buscar */}
        <GridToolbarQuickFilter 
          quickFilterParser={(searchInput: string) =>
            searchInput
              .split(',')
              .map((value) => value.trim())
              .filter((value) => value !== '')
          }
        />
      </GridToolbarContainer>
    );
  }
  return (
    <div style={{ height: "55vh", width: "100%" }}>
      <ThemeProvider theme={theme}>
        <DataGrid
          disableSelectionOnClick
          components={{Toolbar:  CustomToolbar,}}
          columns={props.columns}
          rows={props.rows}
          rowsPerPageOptions={[10, 25, 50, 100]}
          pageSize={10}
          getRowId={props.id}
        />
      </ThemeProvider>
    </div>
  );
}
