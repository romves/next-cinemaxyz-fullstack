import MovieList from "@/components/MovieList";
import NowShowing from "@/components/NowShowing";

export default function Home() {
  return (
    <section className="container space-y-4 h-full py-10">
      <h1 className="text-4xl font-bold">Now Showing</h1>
      <div className="flex ">
        <NowShowing />
      </div>
      <h1 className="text-4xl font-bold">Movie List</h1>
      <div className="flex w-fit justify-center">
        <MovieList />
      </div>
    </section>
  );
}
