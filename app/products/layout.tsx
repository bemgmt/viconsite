import type React from "react"

import CommerceShell from "@/components/commerce-shell"

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <CommerceShell>{children}</CommerceShell>
}
