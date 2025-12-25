import EditActivityClient from './EditActivityClient'

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

interface EditActivityProps {
  params: Promise<{ id: string }>
}

export default async function EditActivity({ params }: EditActivityProps) {
  const { id } = await params
  return <EditActivityClient id={id} />
}
