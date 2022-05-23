import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  FormControl,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

import { commerce } from "../../../lib/commerce";
import FormInput from "./CustomTextField";

const AddressForm = ({ checkoutToken, next, errorMessage }) => {
  const methods = useForm();
  const [shippingSubdivisions, setShippingSubdivisions] = useState("");
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const shippingCountry = "US";

  // Fetch shipping subdivisions
  const fetchShippingSubdivisions = async (shippingCountry) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      shippingCountry
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  // Fetch shipping options
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    stateProvince = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region: stateProvince }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  // Calling function to fetch shipping subdivisions
  useEffect(() => {
    fetchShippingSubdivisions(shippingCountry);
  }, []);

  // Calling function to fetch shipping options after shipping subdivision is set
  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [checkoutToken.id, shippingSubdivision]);

  return (
    <>
      {!shippingOption ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Waiting for order info */}
          <CircularProgress />
        </div>
      ) : (
        <>
          <Typography variant="h6" gutterBottom>
            Shipping Address
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            You can fill with mock data but if you want to get the receipt of
            this transaction use your actual email address. No money will be
            charged! Mock credit card will be provided. Details will be saved in
            Commercejs.
          </Typography>
          <br /> <br />
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit((data) =>
                next({
                  ...data,
                  shippingCountry,
                  shippingSubdivision,
                  shippingOption,
                })
              )}
            >
              <Grid container spacing={3}>
                <FormInput required name="firstName" label="First name" />
                <FormInput required name="lastName" label="Last name" />
                <FormInput required name="email" label="Email" />
              </Grid>
              <Grid container spacing={3}>
                <FormInput required name="address1" label="Address" />
                <FormInput required name="city" label="City" />
                <FormInput required name="zip" label="Zip / Postal code" />
                <Grid item xs>
                  <InputLabel>Shipping Subdivision</InputLabel>
                  <Select
                    value={shippingSubdivision}
                    fullWidth
                    onChange={(e) => setShippingSubdivision(e.target.value)}
                  >
                    {/* Mapping over subdivisions object */}
                    {Object.entries(shippingSubdivisions)
                      .map(([code, name]) => ({ id: code, label: name }))
                      .map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.label}
                        </MenuItem>
                      ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Shipping Options</InputLabel>
                  <Select
                    value={shippingOption}
                    fullWidth
                    onChange={(e) => setShippingOption(e.target.value)}
                  >
                    {/* Mapping over shipping options available */}
                    {shippingOptions
                      .map((sO) => ({
                        id: sO.id,
                        label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                      }))
                      .map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.label}
                        </MenuItem>
                      ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth disabled variant="standard">
                    <InputLabel>Country</InputLabel>
                    <Input name="country" value={shippingCountry} />
                  </FormControl>
                </Grid>
              </Grid>
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button component={Link} to="/cart" variant="outlined">
                  Back to Cart
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Next
                </Button>
              </div>
            </form>
          </FormProvider>
        </>
      )}
    </>
  );
};

export default AddressForm;
