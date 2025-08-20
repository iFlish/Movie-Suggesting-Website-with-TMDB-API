const tmdbKey = "4518787a900ddc56ef2cbd7dd2b81437";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;

  try {
    const response = await fetch(urlToFetch);
    if (!response.ok) throw new Error("Failed to fetch genres");
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse.genres;
  } catch (error) {
    console.error(error);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = "/discover/movie";
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;
  try {
    const response = await fetch(urlToFetch);
    if (!response.ok) throw new Error("Failed to fetch movies");
    const jsonResponse = await response.json();
    console.log(jsonResponse);

    const movies = jsonResponse.results;
    console.log(movies);
    return movies;
  } catch (error) {
    console.error(error);
  }
};

const getMovieInfo = async (movie) => {
  if (!movie) {
    console.error("No movie provided to getMovieInfo");
    return;
  }
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;
  try {
    const response = await fetch(urlToFetch);
    if (!response.ok) throw new Error("Failed to fetch movie info");
    const movieInfo = await response.json();
    return movieInfo; 
  } catch (error) {
    console.error(error); 
  }
};

const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }

  const movies = await getMovies(); // FIXED
  if (!movies || movies.length === 0) {
    console.error("No movies available");
    return;
  }

  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie); // FIXED
  if (info) displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
