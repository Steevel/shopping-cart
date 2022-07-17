import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Cart = () => {
    const {
        state: { cart },
        dispatch,
    } = CartState();

    const [total, setTotal] = useState();

    useEffect(() => {
        setTotal(cart.reduce((acc, cur) => acc + Number(cur.price) * cur.qty, 0));
    }, [cart]);

    return (
        <div className="home">
            <div className="productContainer">
                <ListGroup>
                    {cart.map((prod) => (
                        <ListGroup.Item key={prod.id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={prod.image} alt={prod.name} fluid rounded />
                                </Col>
                                <Col md={2}>
                                    <span>{prod.name}</span>
                                </Col>
                                <Col md={2}>
                                    <span>₹ {prod.price.split(".")[0]}</span>
                                </Col>
                                <Col md={2}>{<Rating rating={prod.ratings} />}</Col>
                                <Col md={2}>
                                    <Form.Select onChange={(e) => {
                                        dispatch({
                                            type: "CHANGE_CART_QUANTITY",
                                            payload: {
                                                id: prod.id,
                                                qty: e.target.value,
                                            }
                                        })
                                    }}>
                                        {[...Array(prod.inStock).keys()].map((x) => (
                                            <option key={x + 1}>{x + 1}</option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={2}>
                                    <FaTrash onClick={() => dispatch({
                                        type: 'REMOVE_FROM_CART',
                                        payload: prod,
                                    })} />
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
            <div className="filters summary">
                <div className="title">Subtotal ({cart.length}) items</div>
                <span style={{ fontWeight: 700, fontSize: 20 }}>₹Total: {total}</span>
                <Button variant="primary" disabled={cart.length === 0}>
                    Proceed to checkout
                </Button>
            </div>
        </div>
    );
};

export default Cart;
