"use client"

import { createContext } from "react"

import type { SubjectModel } from "@/features/subject/types"
import type { TaskModel } from "@/features/task/types"

type CoreContextValue = {
  subjectList: SubjectModel[]
  taskPendingList: TaskModel[]
  taskMissedList: TaskModel[]
  taskCompletedList: TaskModel[]
}

export const CoreContext = createContext({} as CoreContextValue)

type CoreProviderProps = {
  subjectList: SubjectModel[]
  taskPendingList: TaskModel[]
  taskMissedList: TaskModel[]
  taskCompletedList: TaskModel[]
} & React.PropsWithChildren

export default function CoreProvider({
  subjectList,
  taskPendingList,
  taskMissedList,
  taskCompletedList,
  children,
}: CoreProviderProps) {
  return (
    <CoreContext.Provider
      value={{
        subjectList,
        taskPendingList,
        taskMissedList,
        taskCompletedList,
      }}
    >
      {children}
    </CoreContext.Provider>
  )
}
