import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    margin: "10px auto",
  },
  logo: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  category: {
    margin: "30px 0 10px",
    Typography: {
      paddingLeft: "10px",
    },
  },
  root: {
    flexGrow: 1,
  },
}));
