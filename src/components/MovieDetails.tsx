import React, { useEffect, useState } from "react";
import { KEY } from "../App";
import StarRating from "./StarRating";
import Button from "./Button";
import Loader from "./Loader";

interface movieDetailProps {
  Poster: string;
  Plot: string;
  Runtime: string;
  Year: string;
  imdbRating: string;
  Released: string;
  Genre: string;
  Actors: string;
  Title: string;
  Director: string;
}

export default function MovieDetails({
  selectedId,
  setSelectedId,
  watchedMovies,
  setWatchedMovies,
  onCloseMovie,
}: any) {
  const [movieDetail, setMovieDetail] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  useEffect(
    function () {
      async function fetchDetails() {
        setIsLoading(true);
        const data = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const dataJSON = await data.json();
        setMovieDetail(dataJSON);
        setIsLoading(false);
      }
      fetchDetails();
    },
    [selectedId]
  );

  const isWatched = watchedMovies
    .map((el: any) => el.imdbID)
    .includes(selectedId);

  function handleAddToWatchedList() {
    const movie = {
      imdbID: selectedId,
      Title: movieDetail.Title,
      Year: movieDetail.Year,
      Poster: movieDetail.Poster,
      Runtime: movieDetail.Runtime,
      imdbRating: movieDetail.imdbRating,
      userRating,
    };
    setWatchedMovies((prev: any) => [...prev, movie]);
    onCloseMovie();
  }

  return (
    <div className="relative text-white">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <span
            onClick={onCloseMovie}
            className="absolute top-3 left-3 leading-normal bg-white text-black shadow-lg rounded-full md:h-7 h-7 aspect-square text-center cursor-pointer"
          >
            &larr;
          </span>
          <header className="flex md:flex-row flex-col bg-secondary_lighter gap-3 items-center">
            <img
              src={movieDetail?.Poster}
              alt=""
              className="md:w-[33%] w-full"
            />
            <div className="flex flex-col md:gap-3 gap-1 md:text-base text-[.7rem]">
              <h2 className="font-bold md:text-2xl text-sm">
                {movieDetail?.Title}
              </h2>
              <p>
                {movieDetail?.Released} • {movieDetail?.Runtime}
              </p>
              <p>{movieDetail?.Genre}</p>
              <p>{movieDetail?.imdbRating}</p>
            </div>
          </header>
          <main>
            <div
              className={`flex flex-col md:gap-5 gap-2 justify-center bg-secondary_lighter rounded-lg md:px-8 px-3 md:py-3 py-1 md:w-[75%] w-[80%] mx-auto md:my-8 my-3 md:text-base text-[.7rem]`}
            >
              {isWatched ? (
                <h4 className="text-center md:text-base text-[.7rem] font-semibold">
                  You rated this movie{" "}
                  {
                    watchedMovies.find((el: any) => el.imdbID === selectedId)
                      .userRating
                  }{" "}
                  star{" "}
                </h4>
              ) : (
                <>
                  <StarRating length={10} func={setUserRating} />
                  {userRating ? (
                    <button
                      onClick={handleAddToWatchedList}
                      className="bg-primary py-1 font-bold rounded-lg md:text-base text-[.5rem]"
                    >
                      Add to watch list +
                    </button>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
            <div className="flex flex-col md:gap-4 gap-2 md:px-6 px-2 py-2 md:text-sm text-[.7rem]">
              <p className="italic">{movieDetail?.Plot}</p>
              <p>Starring: {movieDetail?.Actors || "N/A"}</p>
              <p>Directed by: {movieDetail?.Director}</p>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
