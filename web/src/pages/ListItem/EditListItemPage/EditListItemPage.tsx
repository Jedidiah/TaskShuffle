import EditListItemCell from 'src/components/ListItem/EditListItemCell'

type ListItemPageProps = {
  id: string
}

const EditListItemPage = ({ id }: ListItemPageProps) => {
  return <EditListItemCell id={id} />
}

export default EditListItemPage
