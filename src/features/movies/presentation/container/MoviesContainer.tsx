import Container from "@/shared/components/layout/Container";
import NowShowing from "../ui/NowShowing";
import MovieList from "../ui/MovieList";


export default function HomeContainer() {
    return (
      <Container as="section">
        <h1 className="text-4xl font-bold">Now Showing</h1>
        <div className="flex ">
          <NowShowing />
        </div>
        <h1 className="text-4xl font-bold">Movie List</h1>
        <div className="flex justify-center w-fit">
          <MovieList />
        </div>
      </Container>
    )
  }