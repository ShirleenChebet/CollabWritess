import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import './Button.css'; // custom styling

const ChapterSubmit = ({ bookId }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      content: Yup.string()
        .min(50, 'Content must be at least 50 characters')
        .required('Content is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(`/api/chapters`, {
          ...values,
          book_id: bookId,
        });
        alert('Chapter submitted successfully!');
      } catch (error) {
        alert('Failed to submit chapter');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="chapter-submit-form">
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        label="Content"
        variant="outlined"
        fullWidth
        margin="normal"
        name="content"
        value={formik.values.content}
        onChange={formik.handleChange}
        error={formik.touched.content && Boolean(formik.errors.content)}
        helperText={formik.touched.content && formik.errors.content}
        multiline
        rows={4}
      />
      <Button variant="contained" type="submit" color="primary">
        Submit Chapter
      </Button>
    </form>
  );
};

export default ChapterSubmit;
