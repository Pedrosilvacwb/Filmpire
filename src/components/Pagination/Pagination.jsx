import React from 'react';
import { Typography, Button } from '@mui/material';
import useStyles from './styles';

const Pagination = ({ page, setPage, totalPages }) => {
  const classes = useStyles();

  const handleNext = () => {
    if (page !== totalPages) {
      setPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (totalPages === 0) return null;
  return (
    <div className={classes.container}>
      <Button
        onClick={() => handlePrev()}
        variant="contained"
        color="primary"
        type="button"
        className={classes.button}
      >
        Prev
      </Button>
      <Typography variant="h4" className={classes.pageNumber}>
        {page}
      </Typography>
      <Button
        onClick={() => handleNext()}
        variant="contained"
        color="primary"
        type="button"
        className={classes.button}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
