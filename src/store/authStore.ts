import { getCookie } from "cookies-next";
import { create } from "zustand";
import type { Screening, Movie } from "@prisma/client";

interface AuthState {
  isAuthenticated: boolean;
  loginHandler: () => void;
  logoutHandler: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(getCookie("logged-in")),
  loginHandler: () => {
    set({ isAuthenticated: true });
  },
  logoutHandler: () => {
    set({ isAuthenticated: false });
  },
}));

interface TicketBookingState {
  selectedMovieId: number | null;
  selectedScreeningId: number | null;
  selectedSeatsId: number[];
  availableSeatsId: number[];

  // setSelectedMovieId: (movieId: number) => void;
  // setSelectedScreeningId: (screeningId: number) => void;
  // setSelectedSeatsId: (selectedSeatsId: number[]) => void;
  // toggleSelectedSeatsId: (seatId: number) => void;
}

export const useTicketBookingStore = create<TicketBookingState>((set) => ({
  selectedMovieId: null,
  selectedScreeningId: null,
  availableSeatsId: [1, 2, 3, 4, 5, 6, 7],
  selectedSeatsId: [],

  // setSelectedMovie: (movie) => {},
  // setSelectedScreening: (screening) => {},
  // setSelectedSeats: (seats: string[]) => set({ selectedSeatsId: seats }),
  // // Action to add or remove a seat from selected seats
  // toggleSelectedSeatsId: (seatId: string) => set(),
}));
