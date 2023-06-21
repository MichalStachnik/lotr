import { useEffect, useState } from 'react';
import { ACCESS_TOKEN, BASE_URL } from '../App';
import { Movie } from '../types/Movie';
import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    try {
      fetch(`${BASE_URL}/movie`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setMovies([...data.docs]))
        .catch((err) => console.warn(err))
        .finally(() => setIsLoading(false));
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, []);

  return (
    <Box mt={2} data-testid="movies">
      {isLoading ? (
        <Box display="flex" gap="1rem" flexWrap="wrap" justifyContent="center">
          {Array.from({ length: 8 }).map((_) => {
            return <Skeleton width={276} height={276} />;
          })}
        </Box>
      ) : (
        <Box display="flex" gap="1rem" flexWrap="wrap" justifyContent="center">
          {movies.map((movie: Movie) => {
            return (
              <Card
                sx={{
                  minWidth: 275,
                  flex: 1,
                  ':hover': {
                    boxShadow: 10,
                  },
                }}
                key={movie._id}
              >
                <CardContent>
                  <Typography
                    color="text.secondary"
                    gutterBottom
                    fontSize="18px"
                    fontWeight="bold"
                  >
                    {movie.name}
                  </Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Academy Award Nominations</Typography>
                    <Typography>{movie.academyAwardNominations}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Academy Award Wins</Typography>
                    <Typography>{movie.academyAwardWins}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Box Office Revenue in Millions</Typography>
                    <Typography>{movie.boxOfficeRevenueInMillions}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Budget in Millions</Typography>
                    <Typography>{movie.budgetInMillions}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Rotten Tomatoes Score</Typography>
                    <Typography>{movie.rottenTomatoesScore}</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>Runtime in Minutes</Typography>
                    <Typography>{movie.runtimeInMinutes}</Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default Movies;
