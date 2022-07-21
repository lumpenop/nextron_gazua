import {
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@material-ui/core";

import { useState, useEffect, ChangeEvent } from "react";

import { Button } from "@material-ui/core";

import LoginMailIcon from "../public/svgs/login-mail.svg";

import Image from "next/image";
import { relative } from "path";

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  signText: string;
}

const Sign = ({ handleSubmit, signText }: Props) => {
  const [userIdFlag, setUserIdFlag] = useState(false);
  const [passwordFlag, setPasswordFlag] = useState(false);
  const [isButtonAbled, setIsButtonAbled] = useState(false);

  useEffect(() => {
    userIdFlag && passwordFlag
      ? setIsButtonAbled(true)
      : setIsButtonAbled(false);
  }, [userIdFlag, passwordFlag]);

  const handleIdChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const userId = event.currentTarget.value;
    const idReg =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    idReg.test(userId) ? setUserIdFlag(true) : setUserIdFlag(false);
  };

  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const password = event.currentTarget.value;
    const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    passwordReg.test(password) ? setPasswordFlag(true) : setPasswordFlag(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (userIdFlag) handleSubmit(event);
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {signText}
          </Typography>
          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{ mt: 1, position: "relative" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userId"
              label="e-mail"
              name="userId"
              autoComplete="userId"
              autoFocus
              onChange={handleIdChange}
            />
            <div style={{ position: "absolute", top: "19%", right: "2%" }}>
              <Image
                style={{
                  filter: `brightness(0) invert(${userIdFlag ? 0 : 0.7})`,
                }}
                src={LoginMailIcon}
                alt="mainIcon"
                width={24}
                height={21}
              />
            </div>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            <Typography>
              {passwordFlag
                ? "good"
                : "비밀번호는 8자리 이상 영문 + 숫자 입니다"}
            </Typography>
            <Button disabled={!isButtonAbled} type="submit">
              {signText}
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Sign;
