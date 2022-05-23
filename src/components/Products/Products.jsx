import React from "react";
import { Grid, Typography, Divider } from "@material-ui/core";

import Product from "./Product/Product";
import logo from "../../assets/logo.png";
import useStyles from "./styles";

const Products = ({ categories, products, onAddToCart }) => {
  const classes = useStyles();
  return (
    <>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.title}>
          <Typography variant="h2" component="h1" align="center">
            Welcome to React
            <img
              src={logo}
              alt="logo"
              height="50px"
              className="classes.logoImage"
            />
            ware
          </Typography>
          <Typography
            variant="h4"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            Complete your kitchen goodies here
          </Typography>
          <Typography variant="subtitle2" align="center" color="secondary">
            *This is a mock environment. No item will be sent and no money will
            be charged.*
          </Typography>
        </div>
        {/* Map over categories object */}
        {categories
          .map((category) => (
            <div key={category.id}>
              <div className={classes.category}>
                <Typography variant="h5">{category.name}</Typography>
                <Divider />
              </div>

              <Grid container justifyContent="center" spacing={4}>
                {products.map((product) => (
                  <>
                    {/* Display products depending on category id */}
                    {category.id === product.categories[0].id && (
                      <Grid item xs={12} sm={6} md={4} lg={2}>
                        <Product
                          product={product}
                          onAddToCart={onAddToCart}
                          key={product.id}
                        />
                      </Grid>
                    )}
                  </>
                ))}
              </Grid>
            </div>
          ))
          .reverse()}
      </main>
    </>
  );
};

export default Products;
