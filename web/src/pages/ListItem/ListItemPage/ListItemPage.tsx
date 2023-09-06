import ListItemCell from 'src/components/ListItem/ListItemCell'

type ListItemPageProps = {
  id: string
}

const ListItemPage = ({ id }: ListItemPageProps) => {
  return <ListItemCell id={id} />
}

export default ListItemPage
