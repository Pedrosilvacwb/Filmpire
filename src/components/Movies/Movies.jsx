import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { ThemeContext } from '@emotion/react';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';
import Pagination from '../Pagination/Pagination';
import { FeaturedMovie } from '..';

const Movies = () => {
  const [page, setPage] = React.useState(1);
  const large = useGetMoviesQuery((theme) => theme.breakpoints.onl('lg'));

  const numberOfMovies = large ? 19 : 17;
  const { genreOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentGenreOrCategory,
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreOrCategoryName,
    page,
    searchQuery,
  });

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
      <FeaturedMovie movie={data?.results[0]} />
      <MovieList movies={data} numberOfMovies={numberOfMovies} />
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={data?.total_pages}
      />
    </div>
  );
};

export default Movies;
