import { Paper, MenuList, MenuItem, Box } from "@material-ui/core";

interface UserList {
  userId: string;
  password: string;
}

interface Props {
  userInfo: UserList[];
  onClick: (item: string) => void;
  userId: string;
}

const UserList = ({ userInfo, onClick, userId }: Props) => {
  return (
    <Box sx={{ width: "40%", padding: "10px", minWidth: "180px" }}>
      <Paper>
        <MenuList>
          <MenuItem onClick={() => onClick("전체")}>그룹 채팅</MenuItem>
          {userInfo
            .filter((item) => item.userId !== userId)
            .map((item, index) => {
              return (
                <MenuItem
                  key={item.userId + index}
                  onClick={() => onClick(item.userId)}
                >
                  {item.userId}
                </MenuItem>
              );
            })}
        </MenuList>
      </Paper>
    </Box>
  );
};

export default UserList;
