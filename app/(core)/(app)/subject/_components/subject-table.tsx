"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { SubjectModel } from "@/features/subject/types"

type SubjectTableProps = {
  subjectList: SubjectModel[]
}

export default function SubjectTable({ subjectList }: SubjectTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Kode</TableHead>
            <TableHead>Mata Kuliah</TableHead>
            <TableHead>SKS</TableHead>
            <TableHead>Dosen</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Jadwal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjectList.map((subject) => (
            <TableRow key={subject.course_code}>
              <TableCell className="font-mono text-sm">
                {subject.course_code}
              </TableCell>
              <TableCell className="font-medium">
                {subject.course_name_id}
              </TableCell>
              <TableCell>{subject.credits}</TableCell>
              <TableCell>{subject.detail.lecturer_name}</TableCell>
              <TableCell>{subject.detail.class_name}</TableCell>
              <TableCell className="whitespace-nowrap">
                {subject.detail.day_name}, {subject.detail.class_start_time}–
                {subject.detail.class_finish_time}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
