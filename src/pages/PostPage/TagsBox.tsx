import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { rgba } from "polished";

interface TagsBoxProps {
  tags: string[];
}
export default function TagsBox({ tags }: TagsBoxProps) {
  return (
    <Box pt={4} pb={4}>
      <Stack flexWrap="wrap" direction="row" spacing={1} justifyContent="end">
        {tags.map((tag) => (
          <Chip
            label={tag}
            variant="outlined"
            key={tag}
            color="info"
            sx={{
              fontWeight: "500",
              backgroundColor: (theme) => rgba(theme.palette.info.light, 0.03),
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
