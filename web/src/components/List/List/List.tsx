import { useCallback, useState } from 'react'

import {
  Flex,
  Tooltip,
  TooltipTrigger,
  Link as SpectrumLink,
} from '@adobe/react-spectrum'
import Home from '@spectrum-icons/workflow/Home'
import Settings from '@spectrum-icons/workflow/Settings'
import type { FindListById, List, ListItem } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import Embed from './Embeds'

interface Props {
  list: NonNullable<FindListById['list']>
}

const Intro = ({
  list,
  fetchItem,
}: {
  list: NonNullable<FindListById['list']>
  fetchItem: () => void
}) => {
  return (
    <>
      <h1 style={{ fontSize: '5em', textAlign: 'center', marginTop: 0 }}>
        {list.title}
      </h1>
      <p style={{ fontSize: '2em', maxWidth: '30em', textAlign: 'center' }}>
        {list.description}
      </p>
      <button
        onClick={fetchItem}
        style={{
          fontSize: '3em',
          padding: '0.5em 2em',
          borderRadius: '2em',
          backgroundColor: 'blueviolet',
          borderWidth: 0,
          color: 'white',
          boxShadow: '0px 4px 5px rgba(0,0,0,0.3)',
          marginTop: '1em',
        }}
      >
        Shuffle!
      </button>
    </>
  )
}

const ViewItem = ({
  item,
  back,
}: {
  list: NonNullable<FindListById['list']>
  item: Partial<ListItem>
  fetchItem: () => void
  back: () => void
}) => {
  return (
    <>
      <h1>{item.title}</h1>
      <Embed url={item.url} />
      <p>{item.description}</p>
      <button
        onClick={back}
        style={{
          fontSize: '1em',
          padding: '0.5em 2em',
          borderRadius: '2em',
          backgroundColor: 'blueviolet',
          borderWidth: 0,
          color: 'white',
          boxShadow: '0px 4px 5px rgba(0,0,0,0.3)',
          marginTop: '1em',
        }}
      >
        Back
      </button>
    </>
  )
}

const List = ({ list }: Props) => {
  const [item, setItem] = useState<Partial<ListItem> | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const { isAuthenticated } = useAuth()

  const fetchItem = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `/.redwood/functions/nextFromList?id=${list.id}`
      )
      const responseJSON = await response.json()
      setItem(responseJSON.data)
      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }, [setLoading, setItem, list.id])

  if (loading) {
    return <p>Loading</p>
  }

  if (error) {
    return <p>Error!</p>
  }

  return (
    <>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        {item ? (
          <ViewItem
            list={list}
            fetchItem={fetchItem}
            item={item}
            back={() => setItem(null)}
          />
        ) : (
          <Intro list={list} fetchItem={fetchItem} />
        )}
        {isAuthenticated && (
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <TooltipTrigger delay={0} placement="bottom">
              <SpectrumLink>
                <Link
                  style={{ display: 'block', marginRight: '10px' }}
                  to={routes.shuffles()}
                >
                  <Home />
                </Link>
              </SpectrumLink>

              <Tooltip>View your Shuffles</Tooltip>
            </TooltipTrigger>

            <TooltipTrigger delay={0} placement="bottom">
              <SpectrumLink>
                <Link
                  style={{ display: 'block' }}
                  to={routes.editList({ id: list.id })}
                >
                  <Settings />
                </Link>
              </SpectrumLink>
              <Tooltip>Edit this Shuffle</Tooltip>
            </TooltipTrigger>
          </div>
        )}
      </Flex>
    </>
  )
}

export default List
