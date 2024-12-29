import axios from "axios";

const API_KEY = "c29ac4903dd99ca7adc48288b55cb35f";
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: "en-US",
    },
});

export const getPopularMovies = async () => {
    const response = await tmdb.get("/movie/popular");
    return response.data.results;
};

export const searchMovies = async (query) => {
    const response = await tmdb.get("/search/movie", {
        params: { query },
    });
    return response.data.results;
};

export const getMovieDetails = async (movieId) => {
    const response = await tmdb.get(`/movie/${movieId}`);
    return response.data;
};
