import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import { Button, Dialog, Box } from "@material-ui/core";

import Modal from "../components/Modal";

import { ipcRenderer } from "electron";

import Sign from "../components/Sign";

import store from "store";

const USERS = [
  { userId: "ks@naver.com", password: "asdfqwer1" },
  { userId: "kw@naver.com", password: "asdfqwer1" },
  { userId: "sw@naver.com", password: "asdfqwer1" },
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      paddingTop: theme.spacing(4),
    },
  })
);

function Home() {
  const classes = useStyles({});
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    store.remove("user");
    store.set("user", USERS);
  });

  useEffect(() => {
    const token = store.get("authorization");
    if (token) {
      ipcRenderer.send("FIRST_CONNECTION", { token });
      ipcRenderer.on("FIRST_CONNECTION", (evt, payload) => {
        if (payload) router.push("/list");
      });
    }
  }, []);

  const handleModalClose = () => setIsModalOpen(false);
  const handleModalClick = () => {
    setIsModalOpen(true);
  };
  const alertClose = () => setAlertOpen(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = data.get("userId");
    console.log(id);
    const userInfo = store.get("user");
    if (userInfo) {
      const userId = String(data.get("userId"));

      ipcRenderer.send("SIGN_IN", { userId });

      ipcRenderer.on("TOKEN", (evt, payload) => {
        const token = payload;
        store.set("authorization", token);
      });
      router.push("/list");
    } else {
      setAlertOpen(true);
      ipcRenderer.send("SIGN_IN", false);
    }
  };
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-material-ui)</title>
      </Head>
      <div className={classes.root}>
        <Dialog open={alertOpen} onClose={alertClose}>
          <Box
            sx={{
              padding: "10px",
            }}
          >
            아이디와 비밀번호를 확인해주세요.
          </Box>
        </Dialog>
        <div style={{ textAlign: "right", padding: "20px" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleModalClick}
          >
            Sign Up
          </Button>
        </div>
        <Sign handleSubmit={handleSubmit} signText="Sign In" isSignUp={false} />
        <Modal open={isModalOpen} handleClose={handleModalClose} />
      </div>
    </React.Fragment>
  );
}

export default Home;
