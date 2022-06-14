import React from 'react'

import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from './fShortenNumber';
//
import BaseOptionChart from './BaseOptionChart'
//
import { CardTitle } from "reactstrap";
// ----------------------------------------------------------------------
import callApi from '../../api/ApiSevice'
import { useState, useEffect } from 'react';

const CHART_HEIGHT = 550;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

const CHART_DATA = [4344, 5435, 1443, 4443];

export default function OrderChart(props) {
  const theme = useTheme();

  const [statisticalBill, setStatisticalBill] = useState([])
  

  useEffect(() => {
    callApi(`api/HoaDon/thongketrangthaidonhang`, "GET")
      .then((res) => {
        const dataNew = res.data.data.map((data)=> data.soLuongHoaDon) 
        setStatisticalBill(dataNew)
        console.log(dataNew)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.warning.main,
      theme.palette.success.main,
      theme.palette.error.main
    ],
    labels: ['Chờ xác nhận', 'Đang giao', 'Đã nhận', 'Đã hủy'],
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card>
      <CardHeader title="Biểu đồ thống kê đơn đặt hàng" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={statisticalBill} options={chartOptions} height={500} />
      </ChartWrapperStyle>
    </Card>
  );
}

