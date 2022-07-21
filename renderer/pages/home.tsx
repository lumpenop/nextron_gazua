import React from "react";
import Head from "next/head";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import Link from "../components/Link";
import Modal from "../components/Modal";

import { ipcRenderer } from "electron";

import Sign from "../components/Sign";

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
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    ipcRenderer.send("SIGN_IN", [data.get("userId"), data.get("password")]);
  };
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-typescript-material-ui)</title>
      </Head>
      <div className={classes.root}>
        <div style={{ textAlign: "right", padding: "20px" }}>
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Sign Up
          </Button>
        </div>
        <Sign handleSubmit={handleSubmit} signText="Sign In" />
        <Modal open={open} handleClose={handleClose} />
        <div style={{ marginTop: "10px" }}>
          <Link href="/list">Go to the next page</Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
