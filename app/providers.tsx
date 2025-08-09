"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

// Types
interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface CV {
  id: string
  name: string
  personal: {
    fullName: string
    email: string
    phone: string
    address: string
    objective: string
  }
  education: Array<{
    school: string
    major: string
    degree: string
    gpa: string
    startYear: string
    endYear: string
  }>
  experience: Array<{
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  skills: string[]
  createdAt: string
  score: number
}

interface AppState {
  user: User | null
  cvs: CV[]
  currentCV: CV | null
  isAuthenticated: boolean
  interviewSessions: Array<{
    id: string
    type: string
    score: number
    date: string
    feedback: string[]
  }>
}

type AppAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "SAVE_CV"; payload: CV }
  | { type: "SET_CURRENT_CV"; payload: CV }
  | { type: "ADD_INTERVIEW_SESSION"; payload: any }

const initialState: AppState = {
  user: null,
  cvs: [],
  currentCV: null,
  isAuthenticated: false,
  interviewSessions: [],
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        currentCV: null,
      }
    case "SAVE_CV":
      const existingIndex = state.cvs.findIndex((cv) => cv.id === action.payload.id)
      const updatedCVs =
        existingIndex >= 0
          ? state.cvs.map((cv, index) => (index === existingIndex ? action.payload : cv))
          : [...state.cvs, action.payload]
      return {
        ...state,
        cvs: updatedCVs,
        currentCV: action.payload,
      }
    case "SET_CURRENT_CV":
      return {
        ...state,
        currentCV: action.payload,
      }
    case "ADD_INTERVIEW_SESSION":
      return {
        ...state,
        interviewSessions: [...state.interviewSessions, action.payload],
      }
    default:
      return state
  }
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

export function Providers({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within Providers")
  }
  return context
}
