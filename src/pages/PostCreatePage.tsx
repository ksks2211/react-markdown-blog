import { useSearchParams } from "react-router-dom";
import Menu from "../contexts/Menu.enum";
import { useChangeMenu } from "../hooks/useGlobal";
import { PostCreateForm } from "../types/post.types";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { useCreatePost } from "../hooks/usePostMutation";
import withLayout from "../hoc/withLayout";

const initialState = {
  title: "",
  content: "",
  description: "",
  tags: [],
};

function PostCreatePage() {
  useChangeMenu(Menu.POSTS);

  const mutation = useCreatePost();
  const [searchParams] = useSearchParams();
  const param = searchParams.get("category") || "";
  const category = `/${param.split("-").splice(1).join("/")}`;
  const [state, setState] =
    useState<Omit<PostCreateForm, "category">>(initialState);

  const [tagInput, setTagInput] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(state);
    console.log({ category });
    await mutation.mutateAsync({ ...state, category });
  };

  const handleAddTag = (tag: string) => {
    if (tag && !state.tags.includes(tag)) {
      setState({
        ...state,
        tags: [...state.tags, tag],
      });
      setTagInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{category}</h1>
      <TextField
        label="Title"
        name="title"
        value={state.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Content"
        name="content"
        value={state.content}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <TextField
        label="Description"
        name="description"
        value={state.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Box sx={{ mb: 2 }}>
        {state.tags.map((tag, index) => (
          <Chip key={index} label={tag} />
        ))}

        <TextField
          label="tag-input"
          name="tag-input"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <Button
          onClick={() => {
            handleAddTag(tagInput);
          }}
        >
          Add Tag
        </Button>
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}

const PostCreatePageWithLayout = withLayout(PostCreatePage);

export default PostCreatePageWithLayout;
