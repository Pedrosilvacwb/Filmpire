import React from 'react';
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from '@mui/icons-material';

import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { MovieList } from '..';
import {
  useGetRecomendationsQuery,
  useGetMovieQuery,
} from '../../services/TMDB';

import useStyles from './styles';
import genreIcons from '../../assets/genres';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const MovieInformation = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const [open, setOpen] = React.useState();

  const classes = useStyles();
  const dispatch = useDispatch();

  const addToFavorites = () => {};
  const addToWatchList = () => {};

  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecomendationsQuery({
      list: '/recommendations',
      movie_id: id,
    });

  const isMovieFavorited = true;
  const isMovieWatchlisted = true;
  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something went wrong - Go Back.</Link>
      </Box>
    );
  }
  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data?.vote_average / 2} />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: '10px' }}
            >
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min /{' '}
            {data?.spoken_languages.length > 0
              ? data?.spoken_languages[0].name
              : ''}
          </Typography>
        </Grid>

        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre, index) => (
            <Link
              key={index}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                height={30}
                className={classes.genreImage}
                src={genreIcons[genre.name.toLowerCase()]}
                alt=""
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography style={{ marginTop: '10px' }} variant="h5" gutterBottom>
          Overview
        </Typography>
        <Typography style={{ marginBotton: '2rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast
              ?.map(
                (char, index) =>
                  char.profile_path && (
                    <Grid
                      item
                      key={index}
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${char.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <img
                        className={classes.castImages}
                        src={`https://image.tmdb.org/t/p/w500/${char.profile_path}`}
                        alt={char.name}
                      />
                      <Typography color="textPrimary">{char?.name}</Typography>
                      <Typography color="textSecondary">
                        {char?.character.split('/')[0]}
                      </Typography>
                    </Grid>
                  ),
              )
              .slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => {
                    setOpen(true);
                  }}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchList}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Wacthlist
                </Button>
                <Button
                  sx={{ borderColor: 'primary.main' }}
                  endIcon={<ArrowBack />}
                >
                  <Typography
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                    sx={{ textDecoration: 'none' }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>No recommendations found!</Box>
        )}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            title="Trailer"
            className={classes.video}
            frameBorder="0"
            src={`https://www.youtube.com/embed/${data.videos?.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
