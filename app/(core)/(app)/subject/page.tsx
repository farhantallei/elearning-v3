import Header from "@/components/layout/header"
import {
  PageShell,
  PageShellHeader,
  PageShellTitle,
} from "@/components/layout/page-shell"
import { getSubjectList } from "@/features/subject/api"
import SubjectTable from "./_components/subject-table"

export default async function Page() {
  const [subjectList] = await Promise.all([getSubjectList()])

  return (
    <>
      <Header breadcrumbs={[{ label: "Mata Kuliah" }]} />
      <PageShell>
        <PageShellHeader>
          <PageShellTitle>Daftar Mata Kuliah</PageShellTitle>
        </PageShellHeader>
        <SubjectTable subjectList={subjectList} />
      </PageShell>
    </>
  )
}
