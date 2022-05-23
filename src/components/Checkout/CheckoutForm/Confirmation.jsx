import React from "react";
import {
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const Confirmation = ({ order, error, prevStep, nextStep }) => {
  return (
    <>
      {/* If any error present */}
      {error ? (
        <>
          <Typography variant="h5">Error: {error}</Typography>
          <br />
          <Button variant="outlined" type="button" onClick={prevStep}>
            Back
          </Button>
        </>
      ) : !order.customer ? (
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
        <div>
          {/* Thank you message if payment goes through */}
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}
          </Typography>
          <Divider />
          <br />
          <br />
          <Typography variant="body1">
            Order number is:{" "}
            <span style={{ fontWeight: "bold" }}>
              {order.customer_reference}
            </span>
          </Typography>
          <br />
          <Typography variant="subtitle2" color="textSecondary">
            You will receive an email confirmation shortly at{" "}
            <span style={{ fontWeight: "bold" }}>{order.customer.email}</span>
            .
            <br />
            No money is charged.
          </Typography>
          <br />
          <Button component={Link} to="/" variant="outlined" type="button">
            Back to Home
          </Button>
        </div>
      )}
    </>
  );
};

export default Confirmation;
