import { Dialog } from "@material-ui/core";

import Sign from "./Sign";

import { ipcRenderer } from "electron";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const Modal = ({ open, handleClose }: Props) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    ipcRenderer.send("SIGN_UP", [data.get("userId"), data.get("password")]);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <Sign handleSubmit={handleSubmit} signText="Sign Up" />
      </Dialog>
    </div>
  );
};

export default Modal;
