'use client'

import { use } from 'react'
import ActivityDetails from '@/app/components/ActivityDetails'
import PageTitle from '@/app/components/PageTitle'

interface ActivityPageProps {
  params: Promise<{ id: string }>
}

export default function ActivityPage({ params }: ActivityPageProps) {
  const { id } = use(params)

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTitle title="Detalhes da Atividade" />
      <ActivityDetails id={id} />
    </div>
  )
}
