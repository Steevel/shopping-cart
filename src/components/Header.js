import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Badge, Button, Dropdown, Form, Image } from "react-bootstrap";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";

const Header = () => {
    const {
        state: { cart },
        dispatch,
        productDispatch,
    } = CartState();

    return (
        <div>
            <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
                <Container>
                    <Navbar.Brand>
                        <Link to="/">Shopping Cart</Link>{" "}
                    </Navbar.Brand>
                    <Navbar.Text className="search">
                        <Form.Control
                            style={{ width: 500 }}
                            placeholder="Search a product"
                            className="m-auto"
                            onChange={(e) => {
                                productDispatch({
                                    type: "FILTER_BY_SEARCH",
                                    payload: e.target.value,
                                });
                            }}
                        />
                    </Navbar.Text>
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="primary">
                            <FaShoppingCart color="white" fontSize="25px" />
                            <Badge>{cart.length}</Badge>
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{ minWidth: 370 }}>
                            {cart.length > 0 ? (
                                <>
                                    {cart.map((prod) => (
                                        <div className="cartItem" key={prod.id}>
                                            <Image
                                                roundedCircle
                                                src={prod.image}
                                                style={{ width: "50px", height: "50px", margin: "4px" }}
                                            />
                                            <div className="cartItemDetail">
                                                <span>{prod.name}</span>
                                                <span>₹ {prod.price.split(".")[0]}</span>
                                            </div>
                                            <FaTrash
                                                onClick={() =>
                                                    dispatch({
                                                        type: "REMOVE_FROM_CART",
                                                        payload: prod,
                                                    })
                                                }
                                            />
                                        </div>
                                    ))}
                                    <Link to="cart">
                                        <Button
                                            variant="primary"
                                            style={{ width: "95%", margin: "0 10px" }}
                                        >
                                            Go To Cart
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <span style={{ padding: 10 }}>Cart is empty</span>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;
