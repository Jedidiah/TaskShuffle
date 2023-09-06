import { useState } from 'react'

import {
  Content,
  ContextualHelp,
  Flex,
  Form,
  Heading,
  Switch,
  Text,
  TextArea,
  TextField,
  Well,
} from '@adobe/react-spectrum'
import type { EditListItemById, UpdateListItemInput } from 'types/graphql'

import {
  // Form,
  FormError,
  // FieldError,
  // Label,
  // TextField,
  // Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormListItem = NonNullable<EditListItemById['listItem']>

interface ListItemFormProps {
  listItem?: EditListItemById['listItem']
  listId: string
  error: RWGqlError
  loading: boolean
  isCreating?: boolean
}

const ListItemForm = (props: ListItemFormProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false)

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
      />

      <TextField
        isHidden
        width="95%"
        label="List ID"
        isRequired
        name="listId"
        defaultValue={props.listId}
      />

      {/* <FieldError name="description" className="rw-field-error" /> */}
      <TextArea
        width="95%"
        label="Description"
        name="description"
        defaultValue={props.listItem?.description}
      />

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
          <Flex direction="row-reverse" alignItems="center">
            <ContextualHelp variant="help">
              <Heading>URL</Heading>
              <Content>
                <Text>
                  If this item has a url associated you can add it here. Some
                  types of link will have a specific behaviour such as pulling
                  IMDB data or embedding a Youtube, Vimeo or Bandcamp player.
                  Most will just show a button to open the link.
                </Text>
              </Content>
            </ContextualHelp>
            <TextField
              width="100%"
              label="URL"
              name="url"
              defaultValue={props.listItem?.url}
              marginBottom="size-150"
            />
          </Flex>
          <Flex direction="row-reverse" alignItems="center">
            <ContextualHelp variant="help">
              <Heading>Webhooks</Heading>
              <Content>
                <Text>
                  When an item is picked it&rsquo;s webhook will be pinged, this
                  could allow automation such as playing a certain song on your
                  smart speaker, kicking off a build, or adjusting your smart
                  lighting.
                </Text>
              </Content>
            </ContextualHelp>
            <TextField
              width="100%"
              label="Webhook"
              name="webhook"
              defaultValue={props.listItem?.webhook}
              marginBottom="size-150"
            />
          </Flex>
        </Flex>
      </Well>
    </Flex>
  )
}

export default ListItemForm
