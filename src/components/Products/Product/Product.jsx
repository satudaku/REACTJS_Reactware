import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";

import useStyles from "./styles";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      {/* Product image */}
      <CardMedia
        className={classes.media}
        image={product.image.url}
        title={product.name}
      />
      <CardContent>
        {/* Remove description html tags */}
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
          gutterBottom
          className={classes.productBrand}
        />
        <div className={classes.cardContent}>
          {/* Product name */}
          <Typography
            variant="body1"
            gutterBottom
            className={classes.productName}
          >
            {product.name}
          </Typography>
          {/* Product price */}
          <Typography variant="h6">
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        {/* Add product to cart */}
        <Button
          variant="contained"
          color="primary"
          aria-label="Add to cart"
          onClick={() => onAddToCart(product.id, 1)}
          className={classes.addButton}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
