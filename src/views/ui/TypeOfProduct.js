import TypeTables from "../../components/dashboard/TypeTable";
import { Row, Col, Table, Card, CardTitle, CardBody} from "reactstrap";

const Products = () => {
  return (
    <Row>

      <Col lg="12">
        <TypeTables/>
      </Col>
    </Row>
  );
};

export default Products;
