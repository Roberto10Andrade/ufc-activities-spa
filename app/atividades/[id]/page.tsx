'use client'

import { use } from 'react'
import ActivityDetails from '@/app/components/ActivityDetails'

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
  ]
}

interface ActivityPageProps {
  params: Promise<{ id: string }>
}

export default function ActivityPage({ params }: ActivityPageProps) {
  const { id } = use(params)

  return (
    <div className="container mx-auto px-4 py-8">
      <ActivityDetails id={id} />
    </div>
  )
}
