// import { Card, CardBody, CardTitle, CardSubtitle, Table, Button } from "reactstrap";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import "../dashboard/css/Billdetail.css"

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
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
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
        id: '1',
        numeric: false,
        disablePadding: true,
        label: 'Tổng tiền(VNĐ)',
    },
    // {
    //   id: 'calories',
    //   numeric: true,
    //   disablePadding: false,
    //   label: 'Họ và tên',
    // },
    {
        id: '2',
        numeric: true,
        disablePadding: false,
        label: 'Ngày đặt hàng',
    },
    {
        id: '3',
        numeric: true,
        disablePadding: false,
        label: 'Số điện thoại người nhận',
    },
    {
        id: '4',
        numeric: true,
        disablePadding: false,
        label: 'Địa chỉ',
    },
    {
        id: '6',
        numeric: true,
        disablePadding: false,
        label: 'Trạng thái',
    },
    {
        id: '7',
        numeric: true,
        disablePadding: false,
        label: 'Mô tả',
    },

    {
        id: '8',
        numeric: true,
        disablePadding: false,
        label: 'Xác nhận',
    },
    {
        id: '9',
        numeric: true,
        disablePadding: false,
        label: 'Hủy',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;

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
                    Danh sách hóa đơn
                </Typography>
            )}
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

const BillTable = () => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [status, setStatus] = React.useState(0);
    const [rows, setListBill] = useState([])
    const [open, setOpen] = React.useState(false);
    const [hoaDonId, setHoaDonId] = React.useState('');
    const [hoaDonStatus, setHoaDonStatus] = React.useState('');

     //---------------------------
     const [openSuccess, setOpenSuccess] = React.useState(false);
     const [openError, setOpenError] = React.useState(false);

    const handleClickOpen = (id, status) => {
        setHoaDonId(id)
        setHoaDonStatus(status)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //------------------------------------------
    const [billdetail, setBilldetail] = React.useState([]);
    const [day, setDay] = React.useState();
    const [listSP, setListSP] = React.useState([]);
    const [price, setPrice] = React.useState();
    const [soSP, setSoSp] = React.useState(1);
    useEffect(() => {
        callApi(`api/HoaDon/xemchitiethoadon/` + hoaDonId, "GET")
            .then((res) => {         
                setBilldetail(res.data.data[0])
                setDay(new Date(res.data.data[0].ngayXuatDon).toISOString().split('T')[0])
                setListSP(res.data.data[0].chiTietHD)
                setPrice(format1(res.data.data[0].tongHoaDon))
                setSoSp(1)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [hoaDonId]);

    //-------------------------------------------
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    const getListBill = () => {
        callApi(`api/HoaDon/danhsachtatcahoadon`, "GET")
            .then((res) => {
                setListBill(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        filterBill(status)
    }, [status]);

    const filterBill = (status) => {
        if (status == 0) {
            getListBill()
        }
        else {
            callApi(`api/HoaDon/danhsachtatcahoadon`, "GET")
                .then((res) => {
                    const listBillNew = res.data.data.filter((data) => data.trangThaiGiaoHangId == status)
                    setListBill(listBillNew)
                })
                .catch((err) => {
                    console.log(err);
                });
            setPage(0)
        }

    }
    //-----------------------------------------
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.hoaDonId);
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
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    function format1(n) {
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    }
    const changeStatusBill = (id, status) => {
        const data = {
            hoaDonId: id,
            trangThaiGiaoHangId: status
        }
        callApi(`api/HoaDon/capnhattrangthaidonAdmin`, "PUT", data)
            .then((res) => {
                setStatus(status)
                setOpenSuccess(true)
                filterBill(status)
            })
            .catch((err) => {
                setOpenError(true)
                console.log(err);
            });
    }
    return (
        <div>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Collapse in={openError}>
                    <Alert variant="filled" severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpenError(false);

                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}>
                        <AlertTitle>Error</AlertTitle>
                        Thất bại!
                    </Alert>
                </Collapse>
                <Collapse in={openSuccess}>
                    <Alert variant="filled" severity="success"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpenSuccess(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}>
                        <AlertTitle>Success</AlertTitle>
                        Thành công!
                    </Alert>
                </Collapse>
            </Stack>

            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <div>
            <div style={{ marginLeft: "5px", minWidth: "550px", height: "210px" }} class="container-billdetil">
                <div style={{ marginTop: "5px" }}></div>
                <div class="cart-total-billdetail">
                    <div class="products-billdetil">
                        {stableSort(listSP, getComparator(order, orderBy))
                            .slice(soSP - 1, soSP).map((data, a) => {
                                return (
                                    <div style={{ height: "210px" }} class="product-billdetil">
                                        <img style={{ marginLeft: "5px", marginTop: "10px", minWidth: "220px" }} src={data.hinhAnh} />

                                        <div class="product-billdetil-info">
                                            <p style={{ marginBottom: "10px" }}>{data.tenSP}</p>
                                            <p style={{ marginBottom: "5px" }} class="product-billdetil-price">Số lượng đặt: {data.soLuongDat}   </p>


                                            <p style={{ color: "red", marginBottom: "5px", display: "flex", alignItems: "center" }} class="product-billdetil-offer">Giá: {format1(data.giaTien)} ₫ </p>
                                        </div>

                                    </div>
                                )
                            })}

                    </div> <br />
                </div>
            </div>
            <br />
            <Stack spacing={2}>
                <Pagination onChange={(event, value) => setSoSp(value)} style={{ margin: "auto" }} count={listSP.length} variant="outlined" />
            </Stack>
            <div style={{ margin: "5px" }}>
                <p>Địa chỉ giao hàng:  {billdetail.diaChiGiaoHang}</p>
                <p>Số điện thoại người nhận: {billdetail.sdtNguoiNhan} </p>
                <p>Đã thanh toán: {billdetail.daThanhToan == true ? <>xong</> : <>chưa</>} </p>
                <p>Trạng thái đơn hàng:  {billdetail.trangThaiGiaoHangId}</p>
                <p>Ngày đặt hàng: {day}</p>
                <p style={{ color: "red" }}>Tổng tiền: {price}  <sup>₫</sup></p>



            </div>
        </div >
            </Dialog>


            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <FormControl sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                    }}>

                    </FormControl>
                    <TableContainer>
                        <Box sx={{ marginTop: '10px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Trạng thái đơn hàng</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Trạng thái đơn hàng"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={0}>Xem tất cả</MenuItem>
                                    <MenuItem value={1}>Chờ xác nhận</MenuItem>
                                    <MenuItem value={3}>Đang giao</MenuItem>
                                    <MenuItem value={4}>Đã nhận</MenuItem>
                                    <MenuItem value={5}>Đã hủy</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
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
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.hoaDonId);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover

                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.hoaDonId}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onClick={(event) => handleClick(event, row.hoaDonId)}
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
                                                    {format1(row.tongHoaDon)} <sup>₫</sup>

                                                </TableCell>
                                                <TableCell align="right">{new Date(row.ngayXuatDon).toISOString().split('T')[0]}</TableCell>
                                                <TableCell align="right">{row.sdtNguoiNhan}</TableCell>
                                                <TableCell align="right">{row.diaChiGiaoHang}</TableCell>
                                                <TableCell align="right">
                                                    {row.trangThaiGiaoHangId == "1" && <>Chờ xác nhận</>} {row.trangThaiGiaoHangId == "3" && <>Đang giao</>} {row.trangThaiGiaoHangId == "4" && <>Đã nhận</>} {row.trangThaiGiaoHangId == "5" && <>Đã hủy</>}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                                        <Fab onClick={() => handleClickOpen(row.hoaDonId, row.trangThaiGiaoHangId)} color="danger" aria-label="delete">
                                                            <AutoStoriesIcon />
                                                        </Fab>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                                        {row.trangThaiGiaoHangId == "1" &&
                                                            <Fab onClick={() => changeStatusBill(row.hoaDonId, "3")} color="success" aria-label="delete">
                                                                <CheckIcon />
                                                            </Fab>
                                                        }

                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                                        {row.trangThaiGiaoHangId == "1" &&
                                                            <Fab onClick={() => changeStatusBill(row.hoaDonId, "5")} color="error" aria-label="delete">
                                                                <CloseIcon />
                                                            </Fab>
                                                        }

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
                        count={rows.length}
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

export default BillTable;
