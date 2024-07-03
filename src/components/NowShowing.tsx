import { axiosInstance } from "@/lib/axios";
import { Movie } from "@prisma/client";
import React from "react";
import MovieCard from "./ui/MovieCard";
import { Loader2 } from "lucide-react";
import { fetchMovies } from "@/service/movies";

const NowShowing = async () => {
    const { data: movies } = await fetchMovies();

    if (!movies || movies.length == 0) return null;

    return (
        <section>
            <h1 className="text-4xl font-bold">Now Showing</h1>
            <div className="flex gap-3 py-2 overflow-auto">
                {movies?.map((movie: Movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        variant="now-showing"
                    />
                ))}
            </div>
        </section>
    );
};

export default NowShowing;
