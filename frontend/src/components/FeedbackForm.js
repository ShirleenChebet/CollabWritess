import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Rating } from '@mui/material';
import axios from 'axios';
import './Button.css'; // custom styling

const FeedbackForm = ({ chapterId }) => {
  const formik = useFormik({
    initialValues: {
      content: '',
      rating: 1,
    },
    validationSchema: Yup.object({
      content: Yup.string()
        .min(20, 'Feedback must be at least 20 characters')
        .required('Feedback content is required'),
      rating: Yup.number().min(1).max(5).required('Rating is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(`/api/feedback`, {
          ...values,
          chapter_id: chapterId,
        });
        alert('Feedback submitted successfully!');
      } catch (error) {
        alert('Failed to submit feedback');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="feedback-form">
      <TextField
        label="Your Feedback"
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
      <div className="rating">
        <Rating
          name="rating"
          value={formik.values.rating}
          onChange={(event, newValue) => formik.setFieldValue('rating', newValue)}
        />
      </div>
      <Button variant="contained" type="submit" color="primary">
        Submit Feedback
      </Button>
    </form>
  );
};

export default FeedbackForm;
