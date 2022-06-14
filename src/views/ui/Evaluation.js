import EvaluationTable from "../../components/dashboard/EvaluationTable";
import { Row, Col, Table, Card, CardTitle, CardBody} from "reactstrap";

const Evaluation = () => {
  return (
    <Row>

      <Col lg="12">
        <EvaluationTable />
      </Col>
    </Row>
  );
};

export default Evaluation;