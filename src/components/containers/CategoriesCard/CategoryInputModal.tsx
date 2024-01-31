// ModalComponent.tsx
import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ButtonGroup, CircularProgress } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import isEmpty from "lodash-es/isEmpty";
import { StyledWarning } from "./CategoriesCard.styles";

interface ModalProps {
  prompt: string;
  label: string;
  open: boolean;
  handleModalClose: () => void;
  handleSubmit: (value: string) => Promise<void>;
  placeholder?: string;
  isLoading?: boolean;
  regex: RegExp;
  regexWarning: string;
}

const style: React.CSSProperties = {
  position: "absolute",
  top: "42%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  padding: "3rem",
  borderRadius: "1rem",
  width: 400,
};

const TextInputModal: React.FC<ModalProps> = ({
  open,
  handleModalClose,
  handleSubmit,
  label,
  prompt,
  placeholder,
  isLoading,
  regex,
  regexWarning,
}) => {
  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: Yup.object({
      category: Yup.string().matches(regex, regexWarning).required(),
    }),
    onSubmit: async (value, { setSubmitting, resetForm }) => {
      setSubmitting(false);

      if (formik.isValid && !isEmpty(value.category)) {
        await handleSubmit(value.category);
        handleModalClose();
      } else {
        alert("Check your form");
      }
      resetForm();
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box style={style}>
        <Typography
          variant="h6"
          mb={2}
          id="modal-title"
          sx={{ fontWeight: "600", color: (theme) => theme.palette.grey[800] }}
        >
          {prompt}
        </Typography>
        <TextField
          id="modal-description"
          {...formik.getFieldProps("category")}
          fullWidth
          color="primary"
          variant="outlined"
          label={label}
          placeholder={placeholder}
          autoComplete="off"
        />

        {formik.touched.category && formik.errors.category ? (
          <StyledWarning>{formik.errors.category}</StyledWarning>
        ) : null}
        <Box mt={4} display="flex" justifyContent="flex-end">
          <ButtonGroup aria-label="close and submit button group">
            <Button
              type="button"
              onClick={handleModalClose}
              sx={{ width: "5rem" }}
            >
              Close
            </Button>

            <Button
              {...(isLoading ? { disabled: true } : {})}
              {...(formik.isValid ? {} : { disabled: true })}
              type="button"
              variant="contained"
              onClick={formik.submitForm}
              sx={{ width: "5rem" }}
            >
              {isLoading ? (
                <CircularProgress
                  size={20}
                  thickness={4.2}
                  sx={{
                    color: (theme) => theme.palette.grey[800],
                  }}
                />
              ) : (
                "Submit"
              )}
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Modal>
  );
};

export default TextInputModal;
