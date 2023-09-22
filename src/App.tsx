import { useEffect, useState, useRef } from "react";
import NavBar from "./components/NavBar";
import Box from "./components/Box";
import Movies from "./components/Movies";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovies from "./components/WatchedMovies";
import Input from "./components/Input";
import Result from "./components/Result";
import MovieDetails from "./components/MovieDetails";
import { useKey } from "./components/useKey";
import useLocalStorage from "./components/useLocalStorage";
import useMovies from "./components/useMovies";
import Loader from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";

export const KEY = "6f126002";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr: any[]) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function App() {
  const [query, setQuery] = useState("");
  const [watchedMovies, setWatchedMovies] = useLocalStorage(
    "watchedMovies",
    []
  );
  const [selectedId, setSelectedId] = useState(null);

  useKey("Escape", handleCloseMovie);

  const { isLoading, movies, error } = useMovies(query);

  useEffect(
    function () {
      localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
    },
    [watchedMovies]
  );

  useEffect(
    function () {
      const titleToDisplay: any = movies.find(
        (el: any) => el.imdbID === selectedId
      );
      // console.log(titleToDisplay.Title);
      if (titleToDisplay) {
        document.title = `usePopcorn | ${titleToDisplay.Title}`;
      }
      return function () {
        document.title = "usePopcorn | Movies";
      };
    },
    [selectedId]
  );

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleDeleteMovieFromWatchedList(id: string) {
    setWatchedMovies((prev: any) => prev.filter((el: any) => el.imdbID !== id));
  }

  return (
    <div className="bg-secondary h-screen md:pt-8 pt-4">
      <NavBar>
        <Input query={query} setQuery={setQuery} />
        <Result numMovies={movies.length} />
      </NavBar>
      <main className="flex gap-4 justify-center h-[75%] my-12">
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <Movies movies={movies} setSelectedId={setSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              watchedMovies={watchedMovies}
              setWatchedMovies={setWatchedMovies}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              {" "}
              <WatchedSummary average={average} watchedMovies={watchedMovies} />
              <WatchedMovies
                watchedMovies={watchedMovies}
                onDeleteMovie={handleDeleteMovieFromWatchedList}
              />{" "}
            </>
          )}
        </Box>
      </main>
    </div>
  );
}

export default App;
