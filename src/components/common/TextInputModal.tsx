// ModalComponent.tsx
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface ModalProps {
  prompt: string;
  label: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
}

const TextInputModal: React.FC<ModalProps> = ({
  open,
  onClose,
  onSubmit,
  label,
  prompt,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState(placeholder || "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
    onClose();
  };

  const style: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "3rem",
    width: 400,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box style={style}>
        <Typography variant="h6" mb={2}>
          {prompt}
        </Typography>
        <TextField
          value={inputValue}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          label={label}
          placeholder={placeholder}
        />
        <Box mt={1} display="flex" justifyContent="flex-end">
          <Button color="primary" onClick={onClose}>
            Close
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TextInputModal;
