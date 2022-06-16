import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

import callApi from '../../api/ApiSevice'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';

const SalesChart = () => {
  const [listTurnover, setListTurnover] = useState([]);
  const [year, setYear] = useState('2022');
  const handleChange = (event) => {
    setYear(event.target.value);
};
  function format1(n) {
    return n.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
  }

  useEffect(() => {
    callApi(`api/HoaDon/thongkedoanhthutheothang/`+year, "GET")
        .then((res) => {
          const listNew = res.data.data.map((data)=> data.tongDoanhThu)          
            setListTurnover(listNew)
        })
        .catch((err) => {
            console.log(err);
        });


}, [year]);
  const chartoptions = {
    series: [
      {
        name: "Tổng doanh thu(VNĐ)",
        data: listTurnover,
      },
      // {
      //   name: "Oneplue 9",
      //   data: [0, 11, 32, 45, 32, 34, 52, 41],
      // },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
      },
    },
  };
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Thống kê doanh thu theo tháng mỗi năm</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          {/* Yearly Sales Report */}
          <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Năm</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={year}
                            label="Năm"
                            onChange={handleChange}
                        >
                            <MenuItem value={'2020'}>2020</MenuItem>
                            <MenuItem value={'2021'}></MenuItem>
                            <MenuItem value={'2022'}>2022</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
        </CardSubtitle>
        <Chart
          type="area"
          width="100%"
          height="390"
          options={chartoptions.options}
          series={chartoptions.series}
        ></Chart>
      </CardBody>
    </Card>
  );
};

export default SalesChart;
