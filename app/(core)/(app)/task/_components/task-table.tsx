import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { TaskModel } from "@/features/task/types"
import { getDaysRemaining } from "@/lib/formatter"

type TaskTableProps = {
  taskList: TaskModel[]
  showDaysRemaining?: boolean
}

export default function TaskTable({
  taskList,
  showDaysRemaining,
}: TaskTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Mata Kuliah</TableHead>
            <TableHead>Judul</TableHead>
            <TableHead>Mulai</TableHead>
            <TableHead>Tenggat</TableHead>
            {showDaysRemaining ? <TableHead>Sisa</TableHead> : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {taskList.length === 0 ? (
            <TableRow>
              <TableCell
                className="h-24 text-center text-muted-foreground"
                colSpan={showDaysRemaining ? 5 : 4}
              >
                Tidak ada tugas.
              </TableCell>
            </TableRow>
          ) : (
            taskList.map((task) => (
              <TableRow key={task.lecturer_task_id}>
                <TableCell>{task.course_name || "N/A"}</TableCell>
                <TableCell className="font-medium">
                  {task.lecturer_task_title}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {task.lecturer_task_start_date},{" "}
                  {task.lecturer_task_start_time}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {task.lecturer_task_finish_date},{" "}
                  {task.lecturer_task_finish_time}
                </TableCell>
                {showDaysRemaining ? (
                  <TableCell className="whitespace-nowrap">
                    {getDaysRemaining(task.lecturer_task_finish_date)}
                  </TableCell>
                ) : null}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
