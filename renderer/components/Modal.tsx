import { Dialog } from "@material-ui/core";

import Sign from "./Sign";

import { ipcRenderer } from "electron";

import store from "store";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const Modal = ({ open, handleClose }: Props) => {
  const storeInput = (userId, password) => {
    const userInfo = {};
    userInfo[userId] = password;
    store.set("user", userInfo);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userId = String(data.get("userId"));
    const password = data.get("password");

    ipcRenderer.send("SIGN_UP", [userId, password]);
    storeInput(userId, password);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Sign handleSubmit={handleSubmit} signText="Sign Up" isSignUp={true} />
      </Dialog>
    </div>
  );
};

export default Modal;
