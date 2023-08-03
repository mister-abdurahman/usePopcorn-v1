import React from "react";

export default function Movies({ movies, setSelectedId }: any) {
  return (
    <ul>
      {movies.map((el: any) => (
        <li
          onClick={() => setSelectedId(el.imdbID)}
          className="flex cursor-pointer text-white md:gap-4 gap-2 py-3 md:px-7 px-3 border-b-2 border-gray-700 hover:bg-secondary_lighter"
        >
          <img src={el.Poster} alt="" className="md:w-10 w-8" />
          <div className="flex flex-col justify-center">
            <h2 className="font-bold md:pb-3 pb-1 md:text-sm text-xs">
              {el.Title}
            </h2>
            <p className="md:text-base text-xs">{el.Year}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
