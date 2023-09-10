import { useCallback, useEffect, useState } from 'react'

import {
  Flex,
  Tooltip,
  TooltipTrigger,
  Link as SpectrumLink,
  Picker,
  Item,
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
  setTagScope,
}: {
  list: NonNullable<FindListById['list']>
  fetchItem: () => void
  setTagScope: (key: string) => void
}) => {
  const userTags = String(list.tags).split(',')
  return (
    <>
      <h1 style={{ fontSize: '5em', textAlign: 'center', marginTop: 0 }}>
        {list.title}
      </h1>
      <p style={{ fontSize: '2em', maxWidth: '30em', textAlign: 'center' }}>
        {list.description}
      </p>
      <Flex direction="row" alignItems="center">
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

        <Picker
          label="From:"
          defaultSelectedKey="all"
          isQuiet
          margin="size-350"
          marginTop="size-600"
          minWidth="size-1200"
          onSelectionChange={setTagScope}
        >
          <Item key="all">All Tags</Item>
          {userTags.map((tag) => (
            <Item key={tag}>{tag.toUpperCase()}</Item>
          ))}
        </Picker>
      </Flex>
    </>
  )
}

const ViewItem = ({
  item,
  delay = 0,
  shouldColor,
  color,
}: {
  list: NonNullable<FindListById['list']>
  item: Partial<ListItem>
  fetchItem: () => void
  delay?: number
  shouldColor?: boolean
  color?: string
}) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, delay)
  }, [delay])
  return (
    <div
      className="result-card"
      style={{
        margin: '1em',
        borderRadius: '16px',
        backgroundColor: 'white',
        borderTopColor: shouldColor ? color ?? 'white' : 'white',
        borderTopWidth: 40,
        borderTopStyle: 'solid',
        boxSizing: 'border-box',
        flexGrow: 1,
        minHeight: '30vh',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 4px 5px rgba(0,0,0,0.3)',
        flexDirection: 'column',
        padding: '3em',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-10em)',
        transition: 'all ease-in-out 1s',
      }}
    >
      <h1 className="result-title" style={{ textAlign: 'center', margin: 0 }}>
        {item.title}
      </h1>
      <p
        className="result-description"
        style={{ textAlign: 'center', maxWidth: '35em', margin: '2em 0' }}
      >
        {item.description}
      </p>
      <Embed url={item.url} />
    </div>
  )
}

const colorPalette = [
  'hsl(306.3, 30.2%, 87.6%)',
  'hsl(237.3, 67.7%, 80.6%)',
  'hsl(187.8, 88%, 67.5%)',
  'hsl(137.8, 88%, 67.5%)',
]

const List = ({ list }: Props) => {
  const [item, setItem] = useState<Partial<ListItem>[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [tagScope, setTagScope] = useState('all')

  const { isAuthenticated } = useAuth()

  const fetchItem = useCallback(async () => {
    setLoading(true)
    try {
      const tags = tagScope === 'all' ? list.themeProperties : tagScope
      const response = await fetch(
        `/.redwood/functions/nextFromList?id=${list.id}&tags=${tags}`
      )
      const responseJSON = await response.json()
      setItem(responseJSON.data)
      setLoading(false)
    } catch (error) {
      setError(true)
      setLoading(false)
    }
  }, [setLoading, setItem, list.id, list.themeProperties, tagScope])

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
        width="100%"
        UNSAFE_style={{ backgroundColor: '#ccc' }}
      >
        {item ? (
          <>
            <Flex
              direction="row"
              alignItems="stretch"
              justifyContent="stretch"
              wrap
              width="80%"
            >
              {item.map((i, index) => (
                <ViewItem
                  key={i.id}
                  list={list}
                  fetchItem={fetchItem}
                  item={i}
                  delay={500 * (index + 1)}
                  shouldColor={true}
                  color={colorPalette[index]}
                />
              ))}
            </Flex>
            <button
              onClick={() => setItem(null)}
              style={{
                position: 'absolute',
                top: '1em',
                left: '1em',
                fontSize: '1em',
                padding: '0.5em 2em',
                borderRadius: '2em',
                backgroundColor: 'blue',
                borderWidth: 0,
                color: 'white',
                boxShadow: '0px 2px 3px rgba(0,0,0,0.3)',
              }}
            >
              Back
            </button>
          </>
        ) : (
          <Intro list={list} fetchItem={fetchItem} setTagScope={setTagScope} />
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
