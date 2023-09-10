import {
  Button,
  Content,
  Heading,
  IllustratedMessage,
} from '@adobe/react-spectrum'
import FileIllustration from '@spectrum-icons/illustrations/Folder'
import type { FindLists } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Lists from 'src/components/List/Lists'

export const QUERY = gql`
  query FindLists {
    lists {
      id
      title
      description
      createdAt
      webhook
      url
      isPrivate
      themeProperties
      customTheme
      theme
      skipLimit
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <>
      <IllustratedMessage width="100%" minHeight="size-3600">
        <FileIllustration />
        <Heading>Create your first Shuffle to get started</Heading>

        <Content>
          A Shuffle is a list of anything that you want but don&rsquo;t need or
          want to think about the order in which you get them. For example films
          you want to watch.
          <br /> Check out the public gallery for ideas
        </Content>
      </IllustratedMessage>
      <div className="rw-text-center">
        <Link to={routes.newList()} className="rw-link">
          <Button variant="cta">Create your first Shuffle</Button>
        </Link>
      </div>
    </>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ lists }: CellSuccessProps<FindLists>) => {
  return <Lists lists={lists} />
}
