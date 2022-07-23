import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import { Box, Button, Container, Dialog } from "@material-ui/core";

import store from "store";

import { useRouter } from "next/router";

import Chat from "../components/Chat";
import UserList from "../components/UserList";

import io from "socket.io-client";

const socket = io("http://localhost:3000");

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
  const [isClick, setIsClick] = useState(false);
  const [clickedId, setClickedId] = useState("");

  socket.on("hello", function (data) {
    console.log("hi");
    console.log("Message from Server: " + data);
  });

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
  }, []);

  const onClick = (item) => {
    setIsClick(true);
    setClickedId(item);
  };

  const onClose = () => {
    setIsClick(false);
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
        <Container maxWidth="sm">
          <Box sx={{ bgcolor: "#cfe8fc", minHeight: "70vh" }}>
            <UserList userInfo={userInfo} onClick={onClick} userId={userId} />
            <Dialog open={isClick} onClose={onClose}>
              <Chat userId={clickedId} />
            </Dialog>
          </Box>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default List;
