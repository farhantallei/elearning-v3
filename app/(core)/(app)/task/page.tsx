import Header from "@/components/layout/header"
import {
  PageShell,
  PageShellHeader,
  PageShellTitle,
} from "@/components/layout/page-shell"

import TaskView from "./_components/task-view"

export default function Page() {
  return (
    <>
      <Header breadcrumbs={[{ label: "Tugas" }]} />
      <PageShell>
        <PageShellHeader>
          <PageShellTitle>Daftar Tugas</PageShellTitle>
        </PageShellHeader>
        <TaskView />
      </PageShell>
    </>
  )
}
