import React from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack, MoveDown } from '@mui/icons-material';
import {
  useGetActorDetailsQuery,
  useGetMoviesByActorIdQuery,
} from '../../services/TMDB';
import useStyles from './styles';
import { MovieList, Pagination } from '..';

const Actors = () => {
  const { id } = useParams();
  const [page, setPage] = React.useState(1);
  const { data, isFetching, error } = useGetActorDetailsQuery(id);
  const { data: actorMovies } = useGetMoviesByActorIdQuery({ id, page });
  const navigate = useNavigate();
  const classes = useStyles();

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItens="center">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          color="primary"
        >
          Go back
        </Button>
      </Box>
    );
  }
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data.name}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h2" gutterBottom>
            {data?.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant="body1" align="justify" paragraph>
            {data?.biography || 'Sorry, no biography yet!'}
          </Typography>

          <Box marginTop="2rem" display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              color="primary"
              startIcon={<ArrowBack />}
              onClick={() => navigate('/')}
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography variant="h2" gutterBottom align="center">
          Movies
        </Typography>
        {actorMovies && <MovieList movies={actorMovies} numberOfMovies={12} />}
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={actorMovies?.total_pages}
        />
      </Box>
    </>
  );
};

export default Actors;
