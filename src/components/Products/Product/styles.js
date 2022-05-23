import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
    minHeight: "385px",
    margin: "auto",
  },
  media: {
    height: "100%",
    width: "100%",
    paddingTop: "75%", // 3:4 aspect ratio
    backgroundSize: "contain",
  },
  cardContent: {
    display: "block",
    justifyContent: "space-between",
  },
  productBrand: {
    marginTop: "14px",
    height: "20px",
  },
  productName: {
    minHeight: "48px",
  },
  carActions: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  addButton: {
    width: "100%",
  },
}));
