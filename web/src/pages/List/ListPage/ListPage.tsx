import ListCell from 'src/components/List/ListCell'

type ListPageProps = {
  id: string
}

const ListPage = ({ id }: ListPageProps) => {
  return <ListCell id={id} />
}

export default ListPage
