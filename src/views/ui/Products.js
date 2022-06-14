import ProductTables from "../../components/dashboard/ProductTable";
import { Row, Col, Table, Card, CardTitle, CardBody} from "reactstrap";

const Products = () => {
  return (
    <Row>

      <Col lg="12">
        <ProductTables />
      </Col>
    </Row>
  );
};

export default Products;
