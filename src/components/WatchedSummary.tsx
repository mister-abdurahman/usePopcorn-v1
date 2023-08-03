import React from "react";

export default function WatchedSummary({ average, watchedMovies }: any) {
  const avgImdbRating = average(watchedMovies.map((el: any) => el.imdbRating));
  const avgUserRating = average(watchedMovies.map((el: any) => el.userRating));
  const avgRuntime = average(
    watchedMovies.map((el: any) => Number(el.Runtime.slice(0, -4)))
  );

  return (
    <div className="bg-secondary_lighter shadow-2xl md:px-6 md:py-6 py-2 text-white rounded-lg">
      <h1 className="uppercase font-bold md:text-lg text-xs md:text-left text-center">
        Movies you watched
      </h1>
      <div className="flex lg:gap-2 items-center md:flex-row flex-col md:text-sm text-[.6rem]">
        <span className="">#️⃣</span>
        <span>{watchedMovies.length} movies</span>
        <span>⭐{avgUserRating.toFixed(2)}</span>
        <span>🌟{avgImdbRating.toFixed(2)}</span>
        <span>⌛ {avgRuntime.toFixed(0)} min</span>
      </div>
    </div>
  );
}
