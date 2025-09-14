import { useParams } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Ratings from "../components/Ratings";
import { Row, Col, Card, ListGroup, Button, Image } from "react-bootstrap";

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
      } catch (err) {
        console.error(`unable to fetch product with error ${err}`);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        <SlArrowLeft /> <span>Go Back</span>
      </Link>
      <Row>
        <Col md={5}>
          <Image
            src={product.image}
            alt={product.name}
            fluid
            className="rounded-4"
          />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Ratings
                rating={product.rating}
                text={`${product.rating} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item className="text-justify">
              <strong>Description:</strong> {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
