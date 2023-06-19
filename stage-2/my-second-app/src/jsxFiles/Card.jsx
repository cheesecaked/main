import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { ColorModeContext } from "./ThemeContext";
import { useNavigate } from "react-router-dom";

export const Cards = (props) => {
  const { post } = props;
  const { theme, changeTheme, isDark } = React.useContext(ColorModeContext);
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: theme.backgroundColor,
        border: "1px solid #1976d2",
      }}
    >
      <CardActionArea
        onClick={() => {
          navigate(`/Post/${post?.id}`, {});
        }}
      >
        <CardMedia
          component="img"
          height="140px"
          image={post?.image}
          alt="img"
        />

        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            fontFamily="Mulish"
          ></Typography>
        </CardContent>

        <Stack
          paddingLeft={2}
          paddingBottom={2}
          gap={2}
          sx={{ color: theme.color }}
        >
          <Box>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "15px",
              }}
              fontFamily="Mulish"
            >
              <Button
                sx={{
                  color: theme.color,
                  backgroundColor: theme.backgroundColor,
                }}
                variant="outlined"
              >
                {post?.tags[1]}
              </Button>
              <Button
                sx={{
                  color: theme.color,
                  backgroundColor: theme.backgroundColor,
                }}
                variant="outlined"
              >
                {post?.tags[2]}{" "}
              </Button>
            </Typography>
          </Box>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
            <Box
              component="img"
              sx={{ height: 35, width: 35, borderRadius: "50%" }}
              src={post?.owner.picture}
            />
            <Typography>|</Typography>
            <Typography fontFamily="Mulish">
              {post?.owner.firstName} {post?.owner.lastName}
            </Typography>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
};
export default Cards;
