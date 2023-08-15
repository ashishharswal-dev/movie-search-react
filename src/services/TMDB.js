import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API KEY - f5079ea3e284337c63875dabe0249522
// API Read Access Token
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTA3OWVhM2UyODQzMzdjNjM4NzVkYWJlMDI0OTUyMiIsInN1YiI6IjY0ZDRhNGM0ZGI0ZWQ2MDEzOTU4YWQ4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUzDF1XK_Bk5aZcwANWEk_NcYsznLnQCQnwMrj-uPbc

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    // Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),

    //* Get Movies by [Type]
    getMovies: builder.query({
      query: () => `movie/popular?page=${page}&api_key=${tmdbApiKey}`,
    }),

  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
} = tmdbApi;
