import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

const Blog = (props) => {
  return (
    <Card >
      <CardImg width="281" height='149' alt="Card image cap" src={props.image} />
      <CardBody className="p-4" >
        <CardTitle style={{height : "72px"}} tag="h5">{props.title}</CardTitle>
        <CardSubtitle>Số lượng đã bán {props.subtitle}</CardSubtitle>
        {/* <CardText className="mt-3">{props.text}</CardText>
        <Button color={props.color}>Read More</Button> */}
      </CardBody>
    </Card>
  );
};

export default Blog;
