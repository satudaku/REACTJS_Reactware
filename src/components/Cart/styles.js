import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: "5%",
  },
  emptyCart: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  table: {
    width: "100%",
    minWidth: "550px",
  },
  rowImage: {
    width: "100px",
    height: "75px",
    img: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  },
  cartDetails: {
    margin: "20px 0",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    textAlign: "right",
  },
  checkoutButton: {
    margin: "10px 0 0 20px",
  },
  emptyButton: {
    marginTop: "10px",
  },
}));
