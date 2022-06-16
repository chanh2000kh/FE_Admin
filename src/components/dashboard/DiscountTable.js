// import { Card, CardBody, CardTitle, CardSubtitle, Table, Button } from "reactstrap";

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
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'Mã giảm giá',
    },
    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: 'Tên mã giảm',
    },
    {
        id: 'time',
        numeric: true,
        disablePadding: false,
        label: 'Thời gian sử dụng',
    },
    {
        id: 'discountMax',
        numeric: true,
        disablePadding: false,
        label: 'Giảm tối đa',
    },
    {
        id: 'discountMin',
        numeric: true,
        disablePadding: false,
        label: 'Đơn có thể sử dụng',
    },
    {
        id: 'number',
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
    const [openAddDiscount, setOpenAddDiscount] = React.useState(false);

    const [codeMaGiam, setCodeMaGiam] = useState('');
    const [tenMaGiamGia, setTenMaGiamGia] = useState('');
    const [noiDungChiTiet, setNoiDungChiTiet] = useState('');
    const [ngayBatDau, setNgayBatDau] = useState('');
    const [ngayHetHang, setNgayHetHang] = useState(new Date());
    const [giamToiDa, setGiamToiDa] = useState('');
    const [donToiThieu, setDonToiThieu] = useState('');
    const [kieuGiam, setkieuGiam] = useState(0);
    const [giamGia, setGiamGia] = useState(100);
    const [soLuongSuDUng, setSoLuongSuDUng] = useState('');

    const [value, setValue] = React.useState(new Date());

    const handleChangeDate = (newValue) => {
        setValue(newValue);
    };

    const handleCloseAddDiscount = () => {
        setOpenAddDiscount(false);
    };
    const handleOpenAddDiscount = () => {
        setOpenAddDiscount(true);
    };

    const handleChange = (event) => {
        setkieuGiam(event.target.value);
    };

    const addDiscount = () => {
        const data = {
            maGiamGiaId: codeMaGiam,
            tenMaGiamGia: tenMaGiamGia,
            noiDungChiTiet: noiDungChiTiet,
            ngayHetHang: ngayHetHang,
            ngayBatDau: ngayBatDau,
            giamToiDa: giamToiDa,
            donToiThieu: donToiThieu,
            kieuGiam: kieuGiam,
            giamGia: giamGia,
            soLuongSuDUng: soLuongSuDUng
        }
        console.log(data)
        callApi(`api/MaGiamGia/themMaGiamGia`, "POST", data)
            .then((res) => {
                window.alert("Thêm thành công!")
                window.location.reload()                
            })
            .catch((err) => {
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
                open={openAddDiscount}
                keepMounted
                onClose={handleCloseAddDiscount}
                aria-describedby="alert-dialog-slide-description"
            >
                <TextField onChange={(event) => setCodeMaGiam(event.target.value)} value={codeMaGiam} style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Mã giảm giá" variant="outlined" />
                <TextField onChange={(event) => setTenMaGiamGia(event.target.value)} value={tenMaGiamGia} style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Tên mã giảm giá" variant="outlined" />
                <TextField onChange={(event) => setNoiDungChiTiet(event.target.value)} value={noiDungChiTiet} style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Nội dung chi tiết" variant="outlined" />
                <TextField onChange={(event) => setNgayBatDau(event.target.value)} value={ngayBatDau} type="date" style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Ngày bắt đầu" variant="outlined" InputLabelProps={{
                    shrink: true,
                }} />
                <TextField onChange={(event) => setNgayHetHang(event.target.value)} value={ngayHetHang} type="date" style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Ngày hết hạn" variant="outlined" InputLabelProps={{
                    shrink: true,
                }} />
                <TextField onChange={(event) => setGiamToiDa(event.target.value)} value={giamToiDa} type="number" style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Giảm tối đa" variant="outlined" />
                <TextField onChange={(event) => setDonToiThieu(event.target.value)} value={donToiThieu} type="number" style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Đơn tối thiểu" variant="outlined" />
                <TextField onChange={(event) => setSoLuongSuDUng(event.target.value)} value={soLuongSuDUng} type="number" style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Số lượng mã" variant="outlined" />


                <Box sx={{ marginTop: '10px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Loại giảm</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={kieuGiam}
                            label="Loại giảm"
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>Giảm trực tiếp</MenuItem>
                            <MenuItem value={1}>Giảm theo phần trăm</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {
                    kieuGiam == 1 && <TextField onChange={(event) => {
                        if (event.target.value > 100) setGiamGia(100)
                        if (event.target.value < 0) setGiamGia(0)
                        if (event.target.value >= 0 && event.target.value <= 100) setGiamGia(event.target.value)
                    }} value={giamGia} type="number" style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Giảm theo phần trăm" variant="outlined" />
                }

                <Button onClick={addDiscount} style={{ margin: "auto", marginBottom: "5px" }} variant="contained">Thêm Mã Giảm Giá</Button>
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
                    Danh sách mã giảm giá
                </Typography>
            )}

            <Box style={{ float: "right" }} x={{ '& > :not(style)': { m: 1 } }} >
                <Fab onClick={handleOpenAddDiscount} color="success" aria-label="add">
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

const DiscountTable = () => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    //Edit type of product-------------------------------------------------
    const [openEditProfile, setOpenEditProfile] = React.useState(false);

    const [tenLoaiSP, setTenLoaiSP] = useState('');
    const [hinhAnh, setHinhAnh] = useState('');
    const [idMaGiam, setIdMaGiam] = React.useState('');

    const [codeMaGiam, setCodeMaGiam] = useState('');
    const [tenMaGiamGia, setTenMaGiamGia] = useState('');
    const [noiDungChiTiet, setNoiDungChiTiet] = useState('');
    const [ngayBatDau, setNgayBatDau] = useState('');
    const [ngayHetHang, setNgayHetHang] = useState(new Date());
    const [giamToiDa, setGiamToiDa] = useState('');
    const [donToiThieu, setDonToiThieu] = useState('');
    const [kieuGiam, setkieuGiam] = useState(0);
    const [giamGia, setGiamGia] = useState(100);
    const [soLuongSuDUng, setSoLuongSuDUng] = useState('');

    const handleChange = (event) => {
        setkieuGiam(event.target.value);
    };

    function format1(n) {
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    }

    function formatDate(date) {
        return new Date(date).toISOString().split('T')[0]
    }

    const handleClickOpenEditDiscount = (CodeMaGiam, TenMaGiamGia, NoiDungChiTiet, NgayBatDau, NgayHetHang, GiamToiDa, DonToiThieu, kieuGiam, GiamGia, SoLuongSuDUng) => {
        setCodeMaGiam(CodeMaGiam)
        setTenMaGiamGia(TenMaGiamGia)
        setNoiDungChiTiet(NoiDungChiTiet)
        setNgayBatDau(formatDate(NgayBatDau))
        setNgayHetHang(formatDate(NgayHetHang))
        setGiamToiDa(GiamToiDa)
        setDonToiThieu(DonToiThieu)
        setkieuGiam(kieuGiam)
        setGiamGia(GiamGia)
        setSoLuongSuDUng(SoLuongSuDUng)
        setOpenEditProfile(true)
    };

    const handleCloseEditProFile = () => {
        setOpenEditProfile(false);
    };
    //Delete product----------------------------------
    const deleteDiscount = (id) => {
        callApi(`api/MaGiamGia/deleteMaGiamGia/` + id, "DELETE")
            .then((res) => {
                window.alert("Xóa thành công!")
                getListDiscount()
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //-------------------------------------------
    const [listMaGiam, setListMaGiam] = useState([]);

    const getListDiscount = ()=>
    {
        callApi(`api/MaGiamGia/laydanhsachMaGiamGia`, "GET")
            .then((res) => {
                setListMaGiam(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {

        getListDiscount()
        
    }, []);


    const editMaGiam = () => {
        const data = {
            maGiamGiaId: codeMaGiam,
            tenMaGiamGia: tenMaGiamGia,
            noiDungChiTiet: noiDungChiTiet,
            ngayHetHang: ngayHetHang,
            ngayBatDau: ngayBatDau,
            giamToiDa: giamToiDa,
            donToiThieu: donToiThieu,
            kieuGiam: kieuGiam,
            giamGia: giamGia,
            soLuongSuDUng: soLuongSuDUng
        }
        callApi(`api/MaGiamGia/capnhatMaGiamGia`, "PUT", data)
            .then((res) => {
                window.alert("Cập nhật thành công!")
                getListDiscount()
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
            const newSelecteds = listMaGiam.map((n) => n.maGiamGiaId);
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
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listMaGiam.length) : 0;


    return (
        <div>

            <Dialog
                open={openEditProfile}
                keepMounted
                onClose={handleCloseEditProFile}
                aria-describedby="alert-dialog-slide-description"
            >
                <TextField value={codeMaGiam} style={{ margin: "5px", marginTop: "10px", width: "500px" }} disabled id="outlined-disabled" label="Mã giảm giá" />
                <TextField onChange={(event) => setTenMaGiamGia(event.target.value)} value={tenMaGiamGia} style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Tên mã giảm giá" variant="outlined" />
                <TextField onChange={(event) => setNoiDungChiTiet(event.target.value)} value={noiDungChiTiet} style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Nội dung chi tiết" variant="outlined" />
                <TextField onChange={(event) => setNgayBatDau(event.target.value)} value={ngayBatDau} type="date" style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Ngày bắt đầu" variant="outlined" InputLabelProps={{
                    shrink: true,
                }} />
                <TextField onChange={(event) => setNgayHetHang(event.target.value)} value={ngayHetHang} type="date" style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Ngày hết hạn" variant="outlined" InputLabelProps={{
                    shrink: true,
                }} />
                <TextField onChange={(event) => setGiamToiDa(event.target.value)} value={giamToiDa} type="number" style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Giảm tối đa" variant="outlined" />
                <TextField onChange={(event) => setDonToiThieu(event.target.value)} value={donToiThieu} type="number" style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Đơn tối thiểu" variant="outlined" />
                <TextField onChange={(event) => setSoLuongSuDUng(event.target.value)} value={soLuongSuDUng} type="number" style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Số lượng mã" variant="outlined" />


                <Box sx={{ marginTop: '10px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Loại giảm</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={kieuGiam}
                            label="Loại giảm"
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>Giảm trực tiếp</MenuItem>
                            <MenuItem value={1}>Giảm theo phần trăm</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {
                    kieuGiam == 1 && <TextField onChange={(event) => {
                        if (event.target.value > 100) setGiamGia(100)
                        if (event.target.value < 0) setGiamGia(0)
                        if (event.target.value >= 0 && event.target.value <= 100) setGiamGia(event.target.value)
                    }} value={giamGia} type="number" style={{ margin: "5px", marginTop: "10px", width: "500px" }} id="outlined-basic" label="Giảm theo phần trăm" variant="outlined" />
                }

                <Button onClick={editMaGiam} style={{ margin: "auto", marginBottom: "5px" }} variant="contained">Sửa thông tin</Button>
            </Dialog>



            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} listMaGiam={listMaGiam} />
                    <FormControl sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                    }}>

                    </FormControl>
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
                                rowCount={listMaGiam.length}
                            />
                            <TableBody>
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                                {stableSort(listMaGiam, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.maGiamGiaId);
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
                                                        onClick={(event) => handleClick(event, row.maGiamGiaId)}
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
                                                    {row.maGiamGiaId}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                                        {row.tenMaGiamGia}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                                        {formatDate(row.ngayBatDau)} : {formatDate(row.ngayHetHang)}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                                        {row.giamToiDa / 1000}k
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                                        {row.donToiThieu / 1000}k
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                                        {row.soLuongSuDUng}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                                        <Fab onClick={() => handleClickOpenEditDiscount(row.maGiamGiaId, row.tenMaGiamGia, row.noiDungChiTiet, row.ngayBatDau, row.ngayHetHang, row.giamToiDa,row.donToiThieu, row.kieuGiam, row.giamGia, row.soLuongSuDUng)} color="primary" aria-label="edit">
                                                            <EditIcon />
                                                        </Fab>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                                        <Fab onClick={() => deleteDiscount(row.maGiamGiaId)} color="danger" aria-label="delete">
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
                        count={listMaGiam.length}
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

export default DiscountTable;
