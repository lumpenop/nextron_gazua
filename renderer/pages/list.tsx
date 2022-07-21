import React from "react";
import Head from "next/head";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import { Paper, MenuList, MenuItem, Box, Button } from "@material-ui/core";

import store from "store";

import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      paddingTop: theme.spacing(4),
    },
  })
);

function List() {
  const classes = useStyles({});
  const router = useRouter();
  const userInfo = Object.keys(store.get("user"));

  const logout = () => {
    router.push("/home");
  };

  return (
    <React.Fragment>
      <Head>
        <title>Next - Nextron (with-typescript-material-ui)</title>
      </Head>
      <div className={classes.root}>
        <Box sx={{ height: "40px" }}>
          <Box sx={{ position: "absolute", right: "5%" }}>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: "40%" }}>
          <Paper>
            <MenuList>
              {userInfo.map((item, index) => {
                return <MenuItem key={item + index}>{item}</MenuItem>;
              })}
            </MenuList>
          </Paper>
        </Box>
      </div>
    </React.Fragment>
  );
}

export default List;
