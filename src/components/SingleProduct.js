import React from "react";
import { Button, Card } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const SingleProduct = ({ prod }) => {
    const {
        state: { cart },
        dispatch,
    } = CartState();

    return (
        <div className="products">
            <Card
                border="dark"
                style={{ width: "22rem", margin: "10px", border: "1px solid" }}
            >
                <Card.Img variant="top" src={prod.image} />
                <Card.Body>
                    <Card.Title>{prod.name}</Card.Title>
                    <Card.Subtitle className="mb-2">
                        ₹ {prod.price.split(".")[0]}
                    </Card.Subtitle>
                    <Card.Subtitle>
                        {prod.fastDelivery ? "Fast Delivery" : "4 days delivery"}
                    </Card.Subtitle>
                    {<Rating rating={prod.ratings} />}
                    {cart.some((p) => p.id === prod.id) ? (
                        <Button onClick={() => {
                            dispatch({
                                type: 'REMOVE_FROM_CART',
                                payload: prod
                            })
                        }} variant="danger" className="mt-2">
                            Remove from cart
                        </Button>
                    ) : (
                        <Button onClick={() => {
                            dispatch({
                                type: 'ADD_TO_CART',
                                payload: prod
                            })
                        }} variant="primary" disabled={!prod.inStock} className="mt-2">
                            {!prod.inStock ? "Out of stock" : "Add to cart"}
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};

export default SingleProduct;
