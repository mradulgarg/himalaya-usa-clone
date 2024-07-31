import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Account = () => {
  const { name, email } = useSelector((state) => state.user);
  console.log(name, email);

  return (
    <Grid container direction="column" sx={{ margin: "20px 10px" }}>
      <Typography variant="h4" textAlign="center">
        My Account
      </Typography>

      <Grid
        container
        direction="column"
        xs={12}
        sm={10}
        md={8}
        lg={6}
        justifyContent="center"
        marginTop={5}
        mx="auto"
        gap={2}
      >
        <Typography variant="h6">Account Details</Typography>
        <Typography>Name: {name}</Typography>
        <Typography>Email: {email}</Typography>
      </Grid>
    </Grid>
  );
};

export default Account;
