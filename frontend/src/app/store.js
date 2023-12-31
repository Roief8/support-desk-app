import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import ticketReducer from "../features/tickets/TicketSlice"
import noteReducer from "../features/notes/NoteSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
    notes: noteReducer,
  },
})
