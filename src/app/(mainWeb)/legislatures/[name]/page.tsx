
'use client'

import { use } from 'react'
import LegislatorProfileComp from '@/components/layouts/legislature/legislator-profile'

export default function LegislatorPageClient({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params)

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Legislator Profile</h1>
      <LegislatorProfileComp name={name} />
    </main>
  )
}
