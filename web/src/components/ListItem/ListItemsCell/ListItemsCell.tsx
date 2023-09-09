import { Content, Heading, IllustratedMessage } from '@adobe/react-spectrum'
import ErrorIllustration from '@spectrum-icons/illustrations/Error'
import FileIllustration from '@spectrum-icons/illustrations/File'
import type { FindListItems } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ListItems from 'src/components/ListItem/ListItems'

export const QUERY = gql`
  query FindListItems($listId: String!) {
    listItems: listItems(listId: $listId) {
      id
      title
      description
      createdAt
      url
      listId
      webhook
      tags
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <IllustratedMessage width="100%" minHeight="size-3600">
      <FileIllustration />
      <Heading>No Items</Heading>

      <Content>This Shuffle doesn&rsquo;t have any items yet.</Content>
    </IllustratedMessage>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <IllustratedMessage width="100%" minHeight="size-3600">
    <ErrorIllustration />
    <Heading>Failed to load items</Heading>

    <Content>{error?.message}</Content>
  </IllustratedMessage>
)

export const Success = ({ listItems }: CellSuccessProps<FindListItems>) => {
  return <ListItems listItems={listItems} />
}
