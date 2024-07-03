import MovieList from "@/components/MovieList";
import NowShowing from "@/components/NowShowing";

export default function Home() {
    return (
        <main className="h-full space-y-4 ">
            <NowShowing />
            <MovieList />
        </main>
    );
}
