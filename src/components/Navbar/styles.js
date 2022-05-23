import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    position: "fixed",
    boxShadow: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    backgroundColor: "#eee",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  logo: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    textDecoration: "none",
    color: "#000",
  },
  logoImage: {
    height: "25px",
  },
  grow: {
    flexGrow: 1,
  },
}));
