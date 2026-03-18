import { SidebarProvider } from "@/components/ui/sidebar"
import { getAuth } from "@/features/auth/lib/server"
import AuthProvider from "@/features/auth/providers/auth-provider"
import { getProfile, getProfileDp } from "@/features/profile/api"
import { getSubjectList } from "@/features/subject/api"
import { sortSubjectList } from "@/features/subject/utils"
import { getTaskList } from "@/features/task/api"
import type { TaskModel } from "@/features/task/types"
import { groupTaskList } from "@/features/task/utils"

import CoreProvider from "./_providers/core-provider"

export default async function Layout({ children }: LayoutProps<"/">) {
  const auth = await getAuth()

  const [profile, profileDp, subjectList] = await Promise.all([
    getProfile({ encryptedKey: auth.encryptedKey }),
    getProfileDp({ encryptedKey: auth.encryptedKey }),
    getSubjectList(),
  ])

  const sortedSubjectList = sortSubjectList(subjectList)

  const allTaskList = await Promise.all(
    sortedSubjectList.map((subject) =>
      getTaskList({ classScheduleId: subject.detail.class_schedule_id }).then(
        (taskList) =>
          taskList.map<TaskModel>((task) => ({
            ...task,
            course_name: subject.course_name_id,
          })),
      ),
    ),
  )

  const taskList = groupTaskList(allTaskList.flat())

  return (
    <AuthProvider
      auth={auth}
      profile={{ ...profile, photo_profile: profileDp?.file_content_base64 }}
    >
      <CoreProvider
        subjectList={sortedSubjectList}
        taskCompletedList={taskList.completed}
        taskMissedList={taskList.missed}
        taskPendingList={taskList.pending}
      >
        <SidebarProvider>{children}</SidebarProvider>
      </CoreProvider>
    </AuthProvider>
  )
}
