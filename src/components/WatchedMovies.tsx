import React from "react";
import Button from "./Button";

export default function WatchedMovies({ watchedMovies, onDeleteMovie }: any) {
  return (
    <ul>
      {watchedMovies.map((el: any) => (
        <li className="text-white md:py-3 py-1 md:px-4 px-2 flex items-center md:gap-6 gap-1 relative">
          <img src={el.Poster} alt="" className="md:w-10 w-8" />
          <div>
            <h1 className="font-bold md:text-base text-[.75rem]">{el.Title}</h1>
            <div className="flex md:gap-2 md:text-base text-[.6rem]">
              <span>⭐{el.userRating}</span>
              <span>🌟 {el.imdbRating}</span>
              <span>⌛ {el.Runtime}</span>
            </div>
          </div>
          <Button
            positionStyle={`md:top-6 top-1 right-3`}
            onDeleteMovie={() => onDeleteMovie(el.imdbID)}
          >
            ❌
          </Button>
        </li>
      ))}
    </ul>
  );
}
