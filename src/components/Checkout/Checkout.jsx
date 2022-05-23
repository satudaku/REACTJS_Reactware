import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
  CssBaseline,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { commerce } from "../../lib/commerce";
import AddressForm from "./CheckoutForm/AddressForm";
import PaymentFrom from "./CheckoutForm/PaymentFrom";
import Confirmation from "./CheckoutForm/Confirmation";
import useStyles from "./styles";

// Checkout form steps
const steps = ["Shipping address", "Payment details", "Confirmation"];

const Checkout = ({ cart, order, onCaptureCheckout, error, onRemoveError }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const classes = useStyles();

  // Active step
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const prevStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  // Next button function after filling shipping address
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  // Show form depending on current active step
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        checkoutToken={checkoutToken}
        next={next}
        setShippingData={setShippingData}
        error={error}
      />
    ) : activeStep === 1 ? (
      <PaymentFrom
        checkoutToken={checkoutToken}
        prevStep={prevStep}
        nextStep={nextStep}
        shippingData={shippingData}
        onCaptureCheckout={onCaptureCheckout}
      />
    ) : (
      <Confirmation
        order={order}
        error={error}
        prevStep={prevStep}
        nextStep={nextStep}
      />
    );

  useEffect(() => {
    console.log("active:", activeStep);
    // If no item in cart, don't generateCheckoutToken
    if (cart.line_items && activeStep < 1) {
      // Generate checkout token using cart id
      const generateCheckoutToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });
          setCheckoutToken(token);
        } catch (error) {
          setErrorMessage(error.data.error.message);
          alert(error.data.error.message);
        }
      };

      onRemoveError();
      generateCheckoutToken();
    }
  }, [cart, activeStep, onRemoveError]);

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {/* Show Checkout steps */}
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* You want to call the form when checkout token exist */}
          {errorMessage && activeStep < 1 ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">Your cart is empty!</Typography>
                <br />
                <br />
                <Button component={Link} to="/" variant="outlined">
                  Back to Home
                </Button>
              </div>
            </>
          ) : !checkoutToken ? (
            <Typography>Contacting Commercejs...</Typography>
          ) : (
            <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
