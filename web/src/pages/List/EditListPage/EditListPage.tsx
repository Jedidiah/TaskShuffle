import EditListCell from 'src/components/List/EditListCell'

type ListPageProps = {
  id: string
}

const EditListPage = ({ id }: ListPageProps) => {
  return <EditListCell id={id} />
}

export default EditListPage
