import React from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import CartItem from "./CartItem/CartItem";
import noItem from "../../assets/empty-cart.png";
import useStyles from "./styles";

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const classes = useStyles();

  const handleEmptyCart = () => onEmptyCart();

  const renderEmptyCart = () => (
    // If user dont have any item inside the cart
    <div className={classes.emptyCart}>
      <img
        src={noItem}
        alt="no item in the cart"
        height="300px"
        width="400px"
      />
      <Button component={Link} to="/" variant="contained" color="primary">
        Start adding item into cart
      </Button>
    </div>
  );

  if (!cart.line_items) return "Loading";

  const renderCart = () => (
    <>
      {/* Product list inside the cart */}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="cart table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Product</TableCell>
              <TableCell align="right">@</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.line_items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateCartQty={onUpdateCartQty}
                onRemoveFromCart={onRemoveFromCart}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.cartDetails}>
        <div>
          {/* Cart subtotal */}
          <Typography variant="h5">
            Cart subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          {/* Empty cart button */}
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty cart
          </Button>
          {/* Proceed to checkout button */}
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Shopping Cart
      </Typography>
      {!cart.line_items.length ? renderEmptyCart() : renderCart()}
    </Container>
  );
};

export default Cart;
