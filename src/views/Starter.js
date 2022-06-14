import { Col, Row, CardTitle } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import TopCards from "../components/dashboard/TopCards";
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/bg/bg1.jpg";
import bg2 from "../assets/images/bg/bg2.jpg";
import bg3 from "../assets/images/bg/bg3.jpg";
import bg4 from "../assets/images/bg/bg4.jpg";
import OrderChart from "../components/dashboard/OrderChart";

import callApi from '../api/ApiSevice'
import { useState, useEffect } from 'react';

const BlogData = [
  {
    image: bg1,
    title: "This is simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "Lets be simple blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "Don't Lamp blog",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "Simple is beautiful",
    subtitle: "2 comments, 1 Like",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    btnbg: "primary",
  },
];

const Starter = () => {
  const [listSanPhamBanChay, setListSanPhamBanChay] = useState([])
    useEffect(() => {
        callApi(`api/SanPham/topsanphambanchay/4`, "GET")
            .then((res) => {
                setListSanPhamBanChay(res.data.data)
                console.log(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


  return (
    <div>
      {/***Top Cards***/}
      <Row>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-success text-success"
            title="Profit"
            subtitle="Doanh thu mỗi năm"
            earning="210tr"
            icon="bi bi-wallet"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-danger text-danger"
            title="Refunds"
            subtitle="Số tiền hoàn lại"
            earning="5tr"
            icon="bi bi-coin"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-warning text-warning"
            title="New Project"
            subtitle="Số sản phẩm còn"
            earning="456"
            icon="bi bi-basket3"
          />
        </Col>
        <Col sm="6" lg="3">
          <TopCards
            bg="bg-light-info text-into"
            title="Sales"
            subtitle="Hàng bán được mỗi tuần"
            earning="10"
            icon="bi bi-bag"
          />
        </Col>
      </Row>
      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="12">
          <SalesChart />
        </Col>
        {/* <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col> */}
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <OrderChart></OrderChart>
        </Col>
      </Row>
      {/***Blog Cards***/}
      
      <CardTitle style={{marginTop: "10px"}} tag="h5">Top sản phẩm bán chạy</CardTitle>
      <Row>        
        {listSanPhamBanChay.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.hinhAnh}
              // image={bg1}
              title={blg.tenSP}
              subtitle={blg.soLuongDaBan}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Starter;
