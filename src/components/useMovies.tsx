import React, { useEffect, useState } from "react";
import { KEY } from "../App";

export default function useMovies(query: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController(); //browser method for cancelling http requests
      async function fetchMovies() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");
          const dataJSON = await res.json();
          if (dataJSON.Response === "False") throw new Error(dataJSON.Error);
          setMovies(dataJSON.Search);
        } catch (err: any) {
          console.error(err.message);
          if (err.name !== "AbortError") setError(err.message); //only display error msg if error is not due to aborting requests upon rerenders
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setError("");
        return;
      }
      fetchMovies();

      return function () {
        controller.abort(); //cancel requests upon rerender, this ensures only the last one runs successfully.
      };
    },
    [query]
  );
  return { isLoading, movies, error };
}
