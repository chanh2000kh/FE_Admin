import BillTable from "../../components/dashboard/BillTable";
import { Row, Col, Table, Card, CardTitle, CardBody} from "reactstrap";

const Bill = () => {
  return (
    <Row>

      <Col lg="12">
        <BillTable />
      </Col>
    </Row>
  );
};

export default Bill;