import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Paper,
  MenuList,
  MenuItem,
  Box,
  Button,
  Container,
} from "@material-ui/core";

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
  const userInfo = store.get("user");
  const [userId, setUserId] = useState("");

  const logout = () => {
    store.remove("authorization");
    router.push("/home");
  };

  useEffect(() => {
    const token = store.get("authorization").accessToken;
    const base64Payload = token.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64");
    const id = JSON.parse(payload.toString()).userId.userId;
    setUserId(id);
    console.log(id);
  }, []);

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
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
            <Box sx={{ width: "40%", padding: "10px" }}>
              <Paper>
                <MenuList>
                  {userInfo
                    .filter((item) => item.userId !== userId)
                    .map((item, index) => {
                      return (
                        <MenuItem key={item.userId + index}>
                          {item.userId}
                        </MenuItem>
                      );
                    })}
                </MenuList>
              </Paper>
            </Box>
          </Box>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default List;
