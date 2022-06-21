// import { Card, CardBody, CardTitle, CardSubtitle, Table, Button } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import callApi from '../../api/ApiSevice'
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// ................................................


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Tên sản phẩm',
  },
  // {
  //   id: 'calories',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Họ và tên',
  // },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Số tiền(VNĐ)',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Giảm giá',
  },
  {
    id: 'sl',
    numeric: true,
    disablePadding: false,
    label: 'Số lượng còn',
  },
  {
    id: 'edit',
    numeric: true,
    disablePadding: false,
    label: 'Chỉnh sửa',
  },
  {
    id: 'delete',
    numeric: true,
    disablePadding: false,
    label: 'Xóa',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;



  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}

            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel> */}
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const EnhancedTableToolbar = (props) => {
  const { numSelected, loaiSanPham } = props;

  //Add customer-------------------------------
  const [openAddProduct, setOpenAddProduct] = React.useState(false);

  const [tenSP, setTenSP] = useState('');
  const [hinhAnh, setHinhAnh] = useState('');
  const [giaTien, setGiaTien] = useState(0);
  const [giamGia, setGiamGia] = useState(0);
  const [moTa, setMoTa] = useState('');
  const [soLuongConLai, setSoLuongConLai] = useState(0);

  // const [loaiSanPham, setLoaiSanPham] = useState([props.loaiSanPham]);
  const [idLoaiSP, setIdLoaiSP] = React.useState('');

  const handleChange = (event) => {
    setIdLoaiSP(event.target.value);
  };

  const handleCloseAddProduct = () => {
    setOpenAddProduct(false);
  };
  const handleOpenAddProduct = () => {
    setOpenAddProduct(true);
  };

  const addProduct = () => {
    const data = {
      tenSP: tenSP,
      hinhAnh: hinhAnh,
      giaTien: giaTien,
      giamGia: giamGia,
      moTa: moTa,
      soLuongConLai: soLuongConLai,
      loaiSanPhamId: idLoaiSP, 
    }

    callApi(`api/SanPham/themSP`, "POST", data)
      .then((res) => {
        window.alert("Thêm thành công!")
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  }
  let base64String = "";
  function imageUploaded() {
    var file = document.querySelector(
      'input[type=file]')['files'][0];

    var reader = new FileReader();

    reader.onload = function () {
      base64String = reader.result.replace("data:", "")
        .replace(/^.+,/, "");

      setHinhAnh('data:image/jpeg;base64,' + base64String)
    }
    reader.readAsDataURL(file);
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <Dialog
        open={openAddProduct}
        keepMounted
        onClose={handleCloseAddProduct}
        aria-describedby="alert-dialog-slide-description"
      >
        <TextField onChange={(event) => setTenSP(event.target.value)} value={tenSP} style={{ margin: "5px", width: "500px" }} id="outlined-basic" label="Tên sản phẩm" variant="outlined" />
        <div style={{ margin: "5px", marginTop: "10px", width: "500px" }}>
        <img         
          src={hinhAnh}
          // className="rounded-circle"
          // alt="avatar"
          width="45"
          height="45"
        />
        <input style={{ marginLeft: "5px" }} onChange={imageUploaded}  type="file"  />
        </div>
        
        <TextField onChange={(event) => setGiaTien(event.target.value)} value={giaTien} style={{ margin: "5px",  marginTop: "10px", width: "500px" }} type='number' id="outlined-basic" label="Giá tiền(VNĐ)" variant="outlined" />
        <TextField onChange={(event) => setGiamGia(event.target.value)} value={giamGia} style={{ margin: "5px",  marginTop: "10px", width: "500px" }} type='number' id="outlined-basic" label="Giảm giá(%)" variant="outlined" />
        <TextField onChange={(event) => setMoTa(event.target.value)} value={moTa} style={{ margin: "5px",  marginTop: "10px", width: "500px" }} id="outlined-basic" label="Mô tả" variant="outlined" />
        <TextField onChange={(event) => setSoLuongConLai(event.target.value)} value={soLuongConLai} style={{ margin: "5px",  marginTop: "10px", width: "500px" }} id="outlined-basic" label="Số lượng còn lại" variant="outlined" />
        <Box sx={{ margin: "5px",  marginTop: "10px", width: "500px" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Loại sản phẩm</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={idLoaiSP}
                  label="Loại sản phẩm"
                  onChange={handleChange}
                >
                  {loaiSanPham.map((data) => {
                    return <MenuItem value={data.loaiSanPhamId}>{data.tenLoaiSP}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Box>
        <Button onClick={addProduct} style={{ margin: "auto", marginBottom: "5px" }} variant="contained">Thêm sản phẩm mới</Button>
      </Dialog>

      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} đã chọn
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Danh sách sản phẩm
        </Typography>
      )}

      <Box style={{ float: "right" }} x={{ '& > :not(style)': { m: 1 } }} >
        <Fab onClick={handleOpenAddProduct} color="success" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const ProductTables = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //Edit product-------------------------------------------------
  const [openEditProfile, setOpenEditProfile] = React.useState(false);

  const [tenSP, setTenSP] = useState('');
  const [hinhAnh, setHinhAnh] = useState('');
  const [giaTien, setGiaTien] = useState(0);
  const [giamGia, setGiamGia] = useState(0);
  const [moTa, setMoTa] = useState('');
  const [soLuongConLai, setSoLuongConLai] = useState(0);
  const [idSP, setIdSP] = useState('');

  let base64String = "";
  function imageUploaded() {
    var file = document.querySelector(
      'input[type=file]')['files'][0];

    var reader = new FileReader();

    reader.onload = function () {
      base64String = reader.result.replace("data:", "")
        .replace(/^.+,/, "");

      setHinhAnh('data:image/jpeg;base64,' + base64String)
    }
    reader.readAsDataURL(file);
  }

  const handleClickOpenEditProFile = (idsp, tensp, hinhanh, giatien, giamgia, mota, soluongconlai) => {
    setIdSP(idsp)
    setTenSP(tensp)
    setHinhAnh(hinhanh)
    setGiaTien(giatien)
    setGiamGia(giamgia)
    setMoTa(mota)
    setSoLuongConLai(soluongconlai)
    setOpenEditProfile(true);
  };

  const handleCloseEditProFile = () => {
    setOpenEditProfile(false);
  };
  //Delete product----------------------------------
  const deleteProduct = (id) => {
    callApi(`api/SanPham/deleteSP/` + id, "DELETE")
      .then((res) => {
        window.alert("Xóa thành công!")
        layDanhSach()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //-------------------------------------------
  const [loaiSanPham, setLoaiSanPham] = useState([]);
  const [idLoaiSP, setIdLoaiSP] = React.useState('');
  const [nameSP, setNameSP] = React.useState('');
  const handleChange = (event) => {
    setIdLoaiSP(event.target.value);
  };

  const [listSanPham, setListSanPham] = useState([])
  useEffect(() => {


    callApi(`api/LoaiSanPham/laydanhsachLoaiSP`, "GET")
      .then((res) => {
        setLoaiSanPham(res.data.data)
        //setIdLoaiSP(res.data.data[0].loaiSanPhamId)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const layDanhSach = ()=>
  {
    if(idLoaiSP != "")
    callApi(`api/SanPham/laysptheoLoaisanpham/` + idLoaiSP+'/1/30', "GET")
      .then((res) => {
        setListSanPham(res.data.data.danhSachSanPham)
        setPage(0);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const TimKiemSP = ()=>
  {
    callApi(`api/SanPham/timkiemsanphamtheoten/` + nameSP+'/1/30', "GET")
      .then((res) => {
        setListSanPham(res.data.data.danhSachSanPham)
        setPage(0);
        setIdLoaiSP("")
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    layDanhSach()
  }, [idLoaiSP]);

  const editProduct = () => {
    const data = {
      sanPhamId: idSP,
      tenSP: tenSP,
      hinhAnh: hinhAnh,
      giaTien: giaTien,
      giamGia: giamGia,
      moTa: moTa,
      soLuongConLai: soLuongConLai,
      loaiSanPhamId: idLoaiSP,
    }
    console.log(data)
    callApi(`api/SanPham/suaSP`, "PUT", data)
      .then((res) => {
        window.alert("Cập nhật thành công!")
        layDanhSach()
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //-----------------------------------------
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = listSanPham.map((n) => n.sanPhamId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, email) => {
    const selectedIndex = selected.indexOf(email);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, email);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (email) => selected.indexOf(email) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listSanPham.length) : 0;

  function format1(n) {
    return n.toFixed(0).replace(/./g, function (c, i, a) {
      return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  }
  return (
    <div>

      <Dialog
        open={openEditProfile}
        keepMounted
        onClose={handleCloseEditProFile}
        aria-describedby="alert-dialog-slide-description"
      >
        <TextField onChange={(event) => setTenSP(event.target.value)} value={tenSP} style={{ margin: "5px", width: "500px" }} id="outlined-basic" label="Tên sản phẩm" variant="outlined" />
        <div style={{ margin: "5px", marginTop: "10px", width: "500px" }}>
        <img         
          src={hinhAnh}
          // className="rounded-circle"
          // alt="avatar"
          width="45"
          height="45"
        />
        <input style={{ marginLeft: "5px" }} onChange={imageUploaded}  type="file"  />
        </div>
        
        <TextField onChange={(event) => setGiaTien(event.target.value)} value={giaTien} style={{ margin: "5px",  marginTop: "10px", width: "500px" }} type='number' id="outlined-basic" label="Giá tiền(VNĐ)" variant="outlined" />
        <TextField onChange={(event) => setGiamGia(event.target.value)} value={giamGia} style={{ margin: "5px",  marginTop: "10px", width: "500px" }} type='number' id="outlined-basic" label="Giảm giá(%)" variant="outlined" />
        <TextField onChange={(event) => setMoTa(event.target.value)} value={moTa} style={{ margin: "5px",  marginTop: "10px", width: "500px" }} id="outlined-basic" label="Mô tả" variant="outlined" />
        <TextField onChange={(event) => setSoLuongConLai(event.target.value)} value={soLuongConLai} style={{ margin: "5px",  marginTop: "10px", width: "500px" }} id="outlined-basic" label="Số lượng còn lại" variant="outlined" />
        <Button onClick={editProduct} style={{ margin: "auto", marginBottom: "5px" }} variant="contained">Sửa thông tin</Button>
      </Dialog>



      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} loaiSanPham={loaiSanPham} />
          <FormControl sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}>

          </FormControl>
          <TableContainer>
            <Box sx={{ marginTop: '10px' }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Loại sản phẩm</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={idLoaiSP}
                  label="Loại sản phẩm"
                  onChange={handleChange}
                >
                  {/* <MenuItem value={0}>Xem tất cả</MenuItem> */}
                  {loaiSanPham.map((data) => {
                    return <MenuItem value={data.loaiSanPhamId}>{data.tenLoaiSP}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Box>
            <TextField onChange={(event) => setNameSP(event.target.value)} value={nameSP} id="outlined-basic" label="Tên sản phẩm muốn tìm" variant="outlined" />
            <Button onClick={TimKiemSP} style={{ margin: "auto", marginBottom: "5px" }} variant="contained">Tìm kiếm</Button>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={listSanPham.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(listSanPham, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.sanPhamId);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover

                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.sanPhamId}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => handleClick(event, row.sanPhamId)}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >

                          <div className="d-flex align-items-center p-2">
                            <img
                              src={row.hinhAnh}
                              className="rounded-circle"
                              alt="avatar"
                              width="45"
                              height="45"
                            />
                            <div style={{ width: "500px" }} className="ms-3">
                              <h6 className="mb-0">{row.tenSP}</h6>
                              <span className="text-muted">{row.email}</span>
                            </div>
                          </div>

                        </TableCell>
                        <TableCell align="right">{format1(row.giaTien)}</TableCell>
                        <TableCell align="right">{row.giamGia} %</TableCell>
                        <TableCell align="right">{row.soLuongConLai}</TableCell>
                        <TableCell align="right">
                          <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Fab onClick={() => handleClickOpenEditProFile(row.sanPhamId, row.tenSP, row.hinhAnh, row.giaTien, row.giamGia, row.moTa, row.soLuongConLai, idLoaiSP)} color="primary" aria-label="edit">
                              <EditIcon />
                            </Fab>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Fab onClick={() => deleteProduct(row.sanPhamId)} color="danger" aria-label="delete">
                              <DeleteIcon />
                            </Fab>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={listSanPham.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        {/* <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        /> */}
      </Box>

    </div>
  );
};

export default ProductTables;
