import React from "react";
import {
  IconButton,
  Button,
  ButtonGroup,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import useStyles from "./styles";

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles();

  // When user update item quantity call function onUpdateCartQty
  const handleUpdateCartQty = (lineItemId, newQuantity) =>
    onUpdateCartQty(lineItemId, newQuantity);

  // When user remove item from cart call function onRemoveFromCart
  const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId);

  return (
    <TableRow>
      {/* Remove item from cart button */}
      <TableCell align="center">
        <IconButton
          variant="outlined"
          onClick={() => handleRemoveFromCart(item.id)}
          alt="remove item"
        >
          <CloseIcon />
        </IconButton>
      </TableCell>
      {/* Item image */}
      <TableCell align="center" className={classes.rowImage}>
        <img
          alt={item.name}
          src={item.image.url}
          width="100px"
          height="75px"
          style={{ objectFit: "contain" }}
        />
      </TableCell>
      {/* Item name */}
      <TableCell>{item.name}</TableCell>
      {/* Item price */}
      <TableCell align="right">{item.price.formatted_with_symbol}</TableCell>
      {/* Item quantity */}
      <TableCell align="center">
        <ButtonGroup variant="contained" aria-label="update quantity">
          {/* Reduce item quantity button */}
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
          >
            -
          </Button>
          {/* Show current item quantity in the cart */}
          <Button disabled>
            <Typography className={classes.quantity}>
              {item.quantity}
            </Typography>
          </Button>
          {/* Increase item quantity in the cart button*/}
          <Button
            type="button"
            size="small"
            onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </ButtonGroup>
      </TableCell>
      {/* Subtotal of item row */}
      <TableCell align="right">
        {item.line_total.formatted_with_symbol}
      </TableCell>
    </TableRow>
  );
};

export default CartItem;
