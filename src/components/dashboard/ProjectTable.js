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
import { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const tableData = [
  {
    avatar: user1,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user2,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Lading pro React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user3,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Elite React",
    status: "holt",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user4,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Flexy React",
    status: "pending",
    weeks: "35",
    budget: "95K",
  },
  {
    avatar: user5,
    name: "Hanna Gover",
    email: "hgover@gmail.com",
    project: "Ample React",
    status: "done",
    weeks: "35",
    budget: "95K",
  },
];
// ................................................

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}
const AddThanhCong = false
const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

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
    label: 'Ta??i khoa??n/gmail',
  },
  // {
  //   id: 'calories',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Ho?? va?? t??n',
  // },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'S???? ??i????n thoa??i',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: '??i??a chi??',
  },
  {
    id: 'edit',
    numeric: true,
    disablePadding: false,
    label: 'Chi??nh s????a',
  },
  {
    id: 'delete',
    numeric: true,
    disablePadding: false,
    label: 'Xo??a',
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
  const { numSelected } = props;

  //Add customer-------------------------------
  const [openAddCustomer, setOpenAddCustomer] = React.useState(false);

  const [nameLoginCustomer, setNameLoginCustomer] = useState('');
  const [nameCustomer, setNameCustomer] = useState('');
  const [emailCustomer, setEmailCustomer] = useState('');
  const [addressCustomer, setAddressCustomer] = useState('');
  const [numberPhoneCustomer, setNumberPhoneCustomer] = useState('');
  const [passwordCustomer, setPasswordCustomer] = useState('');
  const [acceptPasswordCustomer, setAcceptPasswordCustomer] = useState('');

  const handleCloseAddCustomer = () => {
    setOpenAddCustomer(false);
  };
  const handleOpenAddCustomer = () => {
    setOpenAddCustomer(true);
  };

  const addCustomer = ()=>{
    const data = {
      email: emailCustomer,
      tenDangNhap: nameLoginCustomer,
      tenNguoiDung: nameCustomer,
      diaChi: addressCustomer,
      sDT: numberPhoneCustomer,
      matKhau: passwordCustomer,
      xacNhanMatKhau: acceptPasswordCustomer
    }

    callApi(`api/Users/dangkyNhanVien`, "POST", data)
      .then((res) => {
        window.alert("Th??m tha??nh c??ng!")
        window.location.reload()
        AddThanhCong=!AddThanhCong
      })
      .catch((err) => {
        window.alert("Th??m Th????t ba??i!")
        console.log(err);
      });
      
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
        open={openAddCustomer}
        keepMounted
        onClose={handleCloseAddCustomer}
        aria-describedby="alert-dialog-slide-description"
      >
        <TextField onChange={(event) => setEmailCustomer(event.target.value)} value={emailCustomer} style={{ margin: "5px", width: "500px" }} type="email" id="outlined-basic" label="Email" variant="outlined" />
        <TextField onChange={(event) => setNameLoginCustomer(event.target.value)} value={nameLoginCustomer} style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="T??n ????ng nh????p" variant="outlined" />
        <TextField onChange={(event) => setNameCustomer(event.target.value)} value={nameCustomer} style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="T??n ng??????i du??ng" variant="outlined" />
        <TextField onChange={(event) => setNumberPhoneCustomer(event.target.value)} value={numberPhoneCustomer} style={{ margin: "5px", width: "500px" }} type="number" id="outlined-basic" label="S??? ??i???n tho???i" variant="outlined" />
        <TextField onChange={(event) => setAddressCustomer(event.target.value)} value={addressCustomer} style={{ margin: "5px", width: "500px" }} id="outlined-basic" label="??i??a chi??" variant="outlined" />
        <TextField onChange={(event) => setPasswordCustomer(event.target.value)} value={passwordCustomer} style={{ margin: "5px", width: "500px" }} type="password" id="outlined-basic" label="M????t kh????u" variant="outlined" />
        <TextField onChange={(event) => setAcceptPasswordCustomer(event.target.value)} value={acceptPasswordCustomer} style={{ margin: "5px", width: "500px" }} type="password" id="outlined-basic" label="Nh????p la??i m????t kh????u" variant="outlined" />
        <Button onClick={addCustomer} style={{ margin: "auto", marginBottom: "5px" }} variant="contained">Th??m nh??n vi??n m????i</Button>
      </Dialog>

      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} ??a?? cho??n
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Danh sa??ch ng??????i du??ng
        </Typography>
      )}

      <Box style={{ float: "right" }} x={{ '& > :not(style)': { m: 1 } }} >
        <Fab onClick={handleOpenAddCustomer} color="success" aria-label="add">
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

const ProjectTables = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  //-------------------------------------------------------------
  const [selectedValue, setSelectedValue] = React.useState('2');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeTypeSearch = (event) => {
    setTypeSearch(event.target.value);
  };

  //Edit profile-------------------------------------------------
  const [openEditProfile, setOpenEditProfile] = React.useState(false);

  const [idUser, setIdUser] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  
  const handleClickOpenEditProFile = (id, name, email, address, numberPhone) => {
    setIdUser(id)
    setName(name)
    setEmail(email)
    setAddress(address)
    setNumberPhone(numberPhone)
    setOpenEditProfile(true);
  };

  const handleCloseEditProFile = () => {
    setOpenEditProfile(false);
  };
  //Delete user----------------------------------
  const deleteUser = (id)=>{
    callApi(`api/Users/xoaNguoiDung/`+id, "DELETE" )
    .then((res) => {
      getListUser()
      window.alert("Xo??a tha??nh c??ng!")
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //search----------------------------------
  const [kiTu, setKiTu] = useState('');
  const [typeSearch, setTypeSearch] = useState('');
  const searchUser = (id)=>{
    callApi(`api/Users/timkiemnguoidung/${kiTu}/${selectedValue}/${typeSearch}`, "GET" )
    .then((res) => {
      setListUser(res.data.data)
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  //-------------------------------------------

  const [listUser, setListUser] = useState([])
  const getListUser = ()=> {
    if (selectedValue == '2')
      callApi(`api/Users/laydanhsachNhanVien`, "GET")
        .then((res) => {
          setListUser(res.data.data)
        })
        .catch((err) => {
          console.log(err);
        });
    else 
        if (selectedValue == '3')
        callApi(`api/Users/laydanhsachKhachHang`, "GET")
          .then((res) => {
            setListUser(res.data.data)
          })
          .catch((err) => {
            console.log(err);
          });
  }
  useEffect(() => {
    getListUser()
  }, [selectedValue, AddThanhCong]);

  const editProfile = () => {
    const data = {
      nguoiDungId : idUser,
      tenNguoiDung: name,
      email: email,
      sDT: numberPhone,
      diaChi: address
    }
    
    callApi(`api/Users/AdminsuathongtinNhanVienKhachHang`, "PUT", data)
      .then((res) => {
        getListUser()
        window.alert("C????p nh????t tha??nh c??ng!")  
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
      const newSelecteds = listUser.map((n) => n.email);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listUser.length) : 0;


  return (
    <div>

      <Dialog
        open={openEditProfile}
        keepMounted
        onClose={handleCloseEditProFile}
        aria-describedby="alert-dialog-slide-description"
      >
        <TextField onChange={(event) => setName(event.target.value)} value={name} style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="T??n ng??????i du??ng" variant="outlined" />
        <TextField onChange={(event) => setNumberPhone(event.target.value)} value={numberPhone} style={{ margin: "5px", width: "500px" }} type="number" id="outlined-basic" label="S??? ??i???n tho???i" variant="outlined" />
        <TextField onChange={(event) => setEmail(event.target.value)} value={email} style={{ margin: "5px", width: "500px" }} type="email" id="outlined-basic" label="Email" variant="outlined" />
        <TextField onChange={(event) => setAddress(event.target.value)} value={address} style={{ margin: "5px", width: "500px" }} id="outlined-basic" label="??i??a chi??" variant="outlined" />
        <Button onClick={editProfile} style={{ margin: "auto", marginBottom: "5px" }} variant="contained">S????a th??ng tin</Button>
      </Dialog>

      

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <FormControl sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="female" control={
                <Radio checked={selectedValue === '2'}
                  onChange={handleChange}
                  value="2"
                />}
                label="Nh??n vi??n" />
              <FormControlLabel value="male" control={
                <Radio
                  checked={selectedValue === '3'}
                  onChange={handleChange}
                  value="3"
                />}
                label="Kha??ch ha??ng" />
            </RadioGroup>
          </FormControl>

          
          <div style={{ marginTop: "10px" }}>
              <TextField onChange={(event) => setKiTu(event.target.value)} style={{ width: "50%" }} value={kiTu} id="outlined-basic" label="Nh????p t???? ti??m ki????m" variant="outlined" />
              <FormControl sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel value="female" control={
                <Radio checked={typeSearch === '1'}
                  onChange={handleChangeTypeSearch}
                  value="1"
                />}
                label="S???? ??i????n thoa??i" />
              <FormControlLabel value="male" control={
                <Radio
                  checked={typeSearch === '2'}
                  onChange={handleChangeTypeSearch}
                  value="2"
                />}
                label="T??n ng??????i du??ng" />
                <FormControlLabel value="male" control={
                <Radio
                  checked={typeSearch === '3'}
                  onChange={handleChangeTypeSearch}
                  value="3"
                />}
                label="Email" />
            </RadioGroup>  
          </FormControl>
              <Button onClick={searchUser} style={{ margin: "auto" }} variant="contained">Ti??m ki????m</Button>
            </div>
          <TableContainer>
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
                rowCount={listUser.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(listUser, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.email);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover

                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.email}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) => handleClick(event, row.email)}
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
                              src={user1}
                              className="rounded-circle"
                              alt="avatar"
                              width="45"
                              height="45"
                            />
                            <div className="ms-3">
                              <h6 className="mb-0">{row.tenNguoiDung}</h6>
                              <span className="text-muted">{row.email}</span>
                            </div>
                          </div>

                        </TableCell>
                        <TableCell align="right">{row.sDT}</TableCell>
                        <TableCell align="right">{row.diaChi}</TableCell>                  
                        <TableCell align="right">
                          <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Fab onClick={() => handleClickOpenEditProFile(row.nguoiDungId, row.tenNguoiDung, row.email, row.diaChi, row.sDT)} color="primary" aria-label="edit">
                              <EditIcon />
                            </Fab>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Fab onClick={()=>deleteUser(row.nguoiDungId)} color="danger" aria-label="delete">
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
            count={listUser.length}
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

export default ProjectTables;
