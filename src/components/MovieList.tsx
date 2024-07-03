import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MovieCard from "./ui/MovieCard";

const MovieList = async () => {
    const movies = await db.movie.findMany();

    return (
        <section>
            <h1 className="text-4xl font-bold">Movie List</h1>
            <div className="flex justify-center w-fit">
                <div className="grid justify-start grid-cols-2 gap-3 px-1 py-2 overflow-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            variant="default"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MovieList;
