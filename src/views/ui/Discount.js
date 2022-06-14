import DiscountTable from "../../components/dashboard/DiscountTable";
import { Row, Col, Table, Card, CardTitle, CardBody} from "reactstrap";

const Discount = () => {
  return (
    <Row>

      <Col lg="12">
        <DiscountTable />
      </Col>
    </Row>
  );
};

export default Discount;