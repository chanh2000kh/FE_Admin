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
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

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
        label: 'Sản phẩm',
    },
    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: 'Tên người đánh giá',
    },
    {
        id: 'star',
        numeric: true,
        disablePadding: false,
        label: 'Số sao',
    },
    {
        id: 'evaluation',
        numeric: true,
        disablePadding: false,
        label: 'Lời đánh giá',
    },
    {
        id: 'edit',
        numeric: true,
        disablePadding: false,
        label: 'Xác nhận',
    },
    {
        id: 'delete',
        numeric: true,
        disablePadding: false,
        label: 'Hủy',
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
                    Danh sách đánh giá chờ duyệt
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

const EvaluationTable = () => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [tenLoaiSP, setTenLoaiSP] = useState('');
    const [hinhAnh, setHinhAnh] = useState('');



    function formatDate(date) {
        return new Date(date).toISOString().split('T')[0]
    }
    //Delete product----------------------------------
    const cancelEvaluation = (id, idsp) => {
        const data = {
            hoaDonId: id,
            sanPhamId: idsp,
            trangThai: 3
        }
        callApi(`api/SanPham/capnhattrangthaidanhgiaSP`, "POST", data)
            .then((res) => {
                window.alert("Thành công!")
                getListEvaluation()
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //-------------------------------------------
    const [listEvaluation, setListEvaluation] = useState([]);

    const getListEvaluation = () => {
        callApi(`api/SanPham/laydanhsachdanhgiaSP/` + 1, "GET")
            .then((res) => {
                console.log(res.data)
                setListEvaluation(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {

        getListEvaluation()

    }, []);


    const acceptEvaluation = (id, idsp) => {
        const data = {
            hoaDonId: id,
            sanPhamId: idsp,
            trangThai: 2
        }
        callApi(`api/SanPham/capnhattrangthaidanhgiaSP`, "POST", data)
            .then((res) => {
                window.alert("Thành công!")
                getListEvaluation()
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
            const newSelecteds = listEvaluation.map((n) => n.maGiamGiaId);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const isSelected = (email) => selected.indexOf(email) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listEvaluation.length) : 0;


    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} listEvaluation={listEvaluation} />
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
                                rowCount={listEvaluation.length}
                            />
                            <TableBody>
                                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                                {stableSort(listEvaluation, getComparator(order, orderBy))
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
                                                            <h6 className="mb-0">{row.tenSp}</h6>
                                                        </div>
                                                    </div>
                                                </TableCell>


                                                <TableCell align="right">
                                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                                        {row.tenNguoiDung}
                                                    </Box>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                                        {row.soSao}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                                        {row.binhLuanDanhGia}
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                                        <Fab onClick={() => acceptEvaluation(row.hoaDonId, row.sanPhamId)} color="success" aria-label="edit">
                                                            <CheckIcon />
                                                        </Fab>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                                        <Fab onClick={() => cancelEvaluation(row.hoaDonId, row.sanPhamId)} color="error" aria-label="delete">
                                                            <CloseIcon />
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
                        count={listEvaluation.length}
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

export default EvaluationTable;
