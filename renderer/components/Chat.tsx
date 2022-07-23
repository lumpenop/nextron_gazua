import { Box, Typography, Container } from "@material-ui/core";

interface Props {
  userId: string;
}
const Chat = ({ userId }: Props) => {
  return (
    <Container>
      <Box sx={{ height: "50vh", width: "50vh", padding: "10px" }}>
        <Box sx={{ height: "80%", width: "80%" }}>{userId}</Box>
      </Box>
    </Container>
  );
};

export default Chat;
