import { Box } from "@mui/joy";

export default function Comment({ user, body_html, children }) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: body_html }} />
      {children.length === 0 ? (
        <div>no other replies</div>
      ) : (
        children.map(({ id_code, user, body_html, children }) => (
          <Box ml={1}>
            <Comment
              key={id_code}
              user={user}
              body_html={body_html}
              children={children}
            />
          </Box>
        ))
      )}
    </div>
  );
}
