import { useCallback, useState } from 'react'

import {
  ComboBox,
  Content,
  ContextualHelp,
  Divider,
  Flex,
  Heading,
  Item,
  Switch,
  TagGroup,
  Text,
  TextArea,
  TextField,
  Well,
} from '@adobe/react-spectrum'
import remove from 'lodash/remove'
import uniq from 'lodash/uniq'
import type { EditListItemById } from 'types/graphql'

import { FormError } from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

interface ListItemFormProps {
  listItem?: EditListItemById['listItem']
  listId: string
  listTags: string
  error: RWGqlError
  loading: boolean
  isCreating?: boolean
}

const ListItemForm = (props: ListItemFormProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [tags, setTags] = useState(
    String(props.listItem?.tags ?? '')
      .trim()
      .split(',')
      .map((i) => i.trim())
      .filter((i) => i !== '')
  )

  const removeTag = useCallback(
    ([tag]: [string]) => {
      setTags(remove(tags, (t: string) => t !== tag))
    },
    [tags, setTags]
  )
  const addTag = useCallback(
    (tag: string) => {
      if (tag.trim().length > 0) {
        setTags(uniq([tag.toLowerCase().replaceAll(',', ''), ...tags]))
      }
      setNewTag('')
    },
    [tags, setTags, setNewTag]
  )

  return (
    <Flex direction="column">
      <FormError
        error={props.error}
        wrapperClassName="rw-form-error-wrapper"
        titleClassName="rw-form-error-title"
        listClassName="rw-form-error-list"
      />
      <TextField
        width="95%"
        label="Title"
        isRequired
        name="title"
        autoFocus
        defaultValue={props.listItem?.title}
        marginBottom="size-200"
      />
      <TextField
        isHidden
        width="95%"
        label="List ID"
        isRequired
        name="listId"
        defaultValue={props.listId}
        marginBottom="size-200"
      />
      {/* <FieldError name="description" className="rw-field-error" /> */}
      <TextArea
        width="95%"
        label="Description"
        name="description"
        defaultValue={props.listItem?.description}
        marginBottom="size-200"
      />

      <Flex direction="row" alignItems="center" marginBottom="size-200">
        <TextField
          width="80%"
          label="URL"
          name="url"
          defaultValue={props.listItem?.url}
          marginBottom="size-150"
        />
        <ContextualHelp variant="help" marginTop={8} marginStart={10}>
          <Heading>URL</Heading>
          <Content>
            <Text>
              If this item has a url associated you can add it here. Some types
              of link will have a specific behaviour such as pulling IMDB data
              or embedding a Youtube, Vimeo or Bandcamp player. Most will just
              show a button to open the link.
            </Text>
          </Content>
        </ContextualHelp>
      </Flex>
      <Switch
        marginTop="size-200"
        isSelected={showAdvanced}
        onChange={setShowAdvanced}
        defaultSelected={false}
      >
        Advanced Options
      </Switch>
      <Well isHidden={!showAdvanced} marginBottom="size-200" width="90%">
        <Flex direction="column">
          <TextField
            width="100%"
            label={'Tags ' + tags.length}
            name="tags"
            defaultValue={props.listItem?.tags}
            value={tags.join(',').trim()}
            marginBottom="size-150"
            isReadOnly
            isHidden
          />
          <Flex direction="row">
            <ComboBox
              width="30%"
              label="Add New Tag"
              allowsCustomValue
              onBlur={() => {
                addTag(newTag)
              }}
              onInputChange={setNewTag}
              inputValue={newTag}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter' || e.key === 'Tab') {
                  e.preventDefault()
                }
              }}
              onKeyUp={(e) => {
                if (e.key === ' ' || e.key === 'Enter' || e.key === 'Tab') {
                  e.preventDefault()
                  addTag(newTag)
                }
              }}
            >
              {props.listTags?.split(',').map((tag) => (
                <Item key={tag}>{tag}</Item>
              ))}
            </ComboBox>
            <TagGroup
              marginBottom="size-200"
              marginStart="size-200"
              width="70%"
              label="Added Tags"
              renderEmptyState={() => <Text>No Tags Yet</Text>}
              onRemove={removeTag}
              aria-label="Tag Group for the Item"
            >
              {tags.map((tag) => (
                <Item key={tag}>{tag}</Item>
              ))}
            </TagGroup>
          </Flex>

          <Divider marginY="size-200" size="S" />

          <Flex direction="row" alignItems="center">
            <TextField
              width="90%"
              label="Webhook"
              name="webhook"
              defaultValue={props.listItem?.webhook}
              marginBottom="size-150"
            />
            <ContextualHelp variant="help" marginTop={8} marginStart={10}>
              <Heading>Webhooks</Heading>
              <Content>
                <Text>
                  When an item is picked it&rsquo;s webhook will be pinged, this
                  could allow automation such as playing a certain song on your
                  smart speaker, kicking off a build, or adjusting your smart
                  lighting. You can use{' '}
                  <span
                    style={{ fontFamily: 'monospace', backgroundColor: '#ccc' }}
                  >
                    {'{title}'}
                  </span>{' '}
                  <span
                    style={{ fontFamily: 'monospace', backgroundColor: '#ccc' }}
                  >
                    {'{description}'}
                  </span>{' '}
                  and{' '}
                  <span
                    style={{ fontFamily: 'monospace', backgroundColor: '#ccc' }}
                  >
                    {'{url}'}
                  </span>{' '}
                  as tokens in the webhook.
                </Text>
              </Content>
            </ContextualHelp>
          </Flex>
        </Flex>
      </Well>
    </Flex>
  )
}

export default ListItemForm
