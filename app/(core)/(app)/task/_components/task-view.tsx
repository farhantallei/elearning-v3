"use client"

import { use } from "react"

import { CoreContext } from "@/app/(core)/_providers/core-provider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs"

import TaskTable from "./task-table"

export default function TaskView() {
  const { taskPendingList, taskMissedList, taskCompletedList } =
    use(CoreContext)

  return (
    <div className="space-y-2">
      <Tabs defaultValue="pending">
        <TabsList className="**:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1">
          <TabsTab value="pending">
            Tertunda
            {taskPendingList.length > 0 ? (
              <>
                {" "}
                <Badge variant="secondary">{taskPendingList.length}</Badge>
              </>
            ) : null}
          </TabsTab>
          <TabsTab value="missed">
            Tidak Dikerjakan
            {taskMissedList.length > 0 ? (
              <>
                {" "}
                <Badge variant="secondary">{taskMissedList.length}</Badge>
              </>
            ) : null}
          </TabsTab>
          <TabsTab value="completed">
            Selesai
            {taskCompletedList.length > 0 ? (
              <>
                {" "}
                <Badge variant="secondary">{taskCompletedList.length}</Badge>
              </>
            ) : null}
          </TabsTab>
        </TabsList>

        <TabsPanel value="pending">
          <TaskTable showDaysRemaining taskList={taskPendingList} />
        </TabsPanel>

        <TabsPanel value="missed">
          <TaskTable taskList={taskMissedList} />
        </TabsPanel>

        <TabsPanel value="completed">
          <TaskTable taskList={taskCompletedList} />
        </TabsPanel>
      </Tabs>
    </div>
  )
}
