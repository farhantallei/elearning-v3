import Header from "@/components/layout/header"
import {
  PageShell,
  PageShellHeader,
  PageShellTitle,
} from "@/components/layout/page-shell"
import { getSubjectList } from "@/features/subject/api"
import { sortByDayName } from "@/lib/utils"
import SubjectTable from "./_components/subject-table"

export default async function Page() {
  const [subjectList] = await Promise.all([getSubjectList()])
  const byTime = [...subjectList].sort((a, b) =>
    a.detail.class_start_time.localeCompare(b.detail.class_start_time),
  )
  const sortedSubjectList = sortByDayName(byTime, (s) => s.detail.day_name)

  return (
    <>
      <Header breadcrumbs={[{ label: "Mata Kuliah" }]} />
      <PageShell>
        <PageShellHeader>
          <PageShellTitle>Daftar Mata Kuliah</PageShellTitle>
        </PageShellHeader>
        <SubjectTable subjectList={sortedSubjectList} />
      </PageShell>
    </>
  )
}
