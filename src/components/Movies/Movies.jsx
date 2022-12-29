import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';

const Movies = () => {
  const { data, error, isFetching } = useGetMoviesQuery();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (!data.results.length) {
    return (
      <Box display="flex" alignItens="center" mt="20px">
        <Typography>
          No movies that match that name. <br /> Please Try again.
        </Typography>
      </Box>
    );
  }

  if (error) {
    return 'An error has occured!';
  }
  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
