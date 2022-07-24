import {
  Box,
  TextField,
  Container,
  Button,
  Typography,
  SnackbarContent,
} from "@material-ui/core";

import {
  useState,
  ChangeEvent,
  useEffect,
  useRef,
  useLayoutEffect,
  LegacyRef,
} from "react";

import store from "store";

import io from "socket.io-client";
const socket = io("http://localhost:3000");

interface Props {
  userId: string;
  clickedId: string;
}

interface ChatText {
  user: string;
  text: string;
}

const Chat = ({ userId, clickedId }: Props) => {
  const [inputText, setInputText] = useState("");
  const scrollRef: LegacyRef<HTMLDivElement> = useRef();
  const [chatTexts, setChatTexts] = useState<ChatText[]>([]);

  const setTexts = () => {
    const storeText1 = store.get(userId + clickedId);
    const storeText2 = store.get(clickedId + userId);

    let storeText = storeText1 || storeText2;
    if (clickedId === "전체") storeText = store.get(clickedId);
    if (storeText) {
      setChatTexts(storeText);
    }
  };

  const storageSetTexts = (data) => {
    let storeText;
    let storeName;

    if (clickedId === "전체") {
      storeText = store.get(clickedId);
      storeName = clickedId;
    } else {
      const storeText1 = store.get(userId + clickedId);
      const storeText2 = store.get(clickedId + userId);
      storeText = storeText1 || storeText2;
      storeName = storeText1 ? userId + clickedId : clickedId + userId;
    }

    if (storeText) {
      const TextSet = [
        ...storeText,
        { user: data.userId, text: data.inputText },
      ];
      store.set(storeName, TextSet);
      setChatTexts(TextSet);
    } else {
      if (clickedId === "전체")
        store.set(clickedId, [{ user: data.userId, text: data.inputText }]);
      else
        store.set(userId + clickedId, [
          { user: data.userId, text: data.inputText },
        ]);
      setChatTexts([{ user: data.userId, text: data.inputText }]);
    }
  };

  useEffect(() => {
    socket.on("message", function (data) {
      storageSetTexts(data);
    });
    setTexts();
  }, []);

  useLayoutEffect(() => {
    if (scrollRef) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [chatTexts]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    socket.emit("message", { userId, inputText });

    setInputText("");
  };

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputText(event.currentTarget.value);
  };

  return (
    <Container>
      <Box sx={{ height: "80vh", width: "60vh", padding: "10px" }}>
        <Box
          component="form"
          sx={{ height: "90%", width: "100%" }}
          onSubmit={onSubmit}
        >
          <Box sx={{ marginBottom: "12px" }}>
            <Typography>To. {clickedId}</Typography>
          </Box>
          <Box sx={{ height: "80%", overflow: "scroll" }}>
            {chatTexts.map((item, index) => {
              return (
                <Box key={item.user + index} sx={{ padding: "4px" }}>
                  <SnackbarContent
                    style={{
                      backgroundColor: `${item.user !== userId && "#D5a6ff"}`,
                    }}
                    message={item.text}
                    action={
                      <Button color="secondary" size="small">
                        {item.user === userId ? "me" : item.user}
                      </Button>
                    }
                  />
                </Box>
              );
            })}
            <div ref={scrollRef}></div>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userId"
              name="userId"
              autoComplete="userId"
              autoFocus
              value={inputText}
              onChange={onChange}
            />
            <Box sx={{ height: "30px" }}>
              <Button type="submit">전송</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Chat;
