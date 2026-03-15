import { ComponentExample } from "@/components/component-example"
import Header from "@/components/layout/header"
import { PageShell } from "@/components/layout/page-shell"

export default function Page() {
  return (
    <>
      <Header breadcrumbs={[{ label: "Beranda" }]} />
      <PageShell className="h-full">
        <ComponentExample />
      </PageShell>
    </>
  )
}
