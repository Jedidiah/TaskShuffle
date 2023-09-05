import { useState } from 'react'

import {
  ActionMenu,
  Button,
  Checkbox,
  Content,
  ContextualHelp,
  Flex,
  Form,
  Heading,
  IllustratedMessage,
  Item,
  ListView,
  NumberField,
  Switch,
  Text,
  TextArea,
  TextField,
  View,
  Well,
} from '@adobe/react-spectrum'
import NoSearchResults from '@spectrum-icons/illustrations/File'
import Delete from '@spectrum-icons/workflow/Delete'
import Edit from '@spectrum-icons/workflow/Edit'
import type { EditListById, UpdateListInput } from 'types/graphql'

// import {
//   Form,
//   FormError,
//   FieldError,
//   Label,
//   TextField,
//   CheckboxField,
//   NumberField,
//   Submit,
// } from '@redwoodjs/forms'
import { FormError, type RWGqlError } from '@redwoodjs/forms'

type FormList = NonNullable<EditListById['list']>

interface ListFormProps {
  list?: EditListById['list']
  onSave: (data: UpdateListInput, id?: FormList['id']) => void
  error: RWGqlError
  loading: boolean
  isCreating?: boolean
}

const ListForm = (props: ListFormProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const onSubmit = (data: Partial<FormList>) => {
    props.onSave(data, props?.list?.id)
  }

  const renderEmptyState = () => {
    return (
      <IllustratedMessage width="100%" minHeight="size-3600">
        <NoSearchResults />
        <Heading>No Items</Heading>

        <Content>This Shuffle doesn&rsquo;t have any items yet.</Content>
        <Button marginTop="size-300" variant="cta">
          Create One
        </Button>
      </IllustratedMessage>
    )
  }

  return (
    <Flex wrap direction="row">
      <View padding="size-200" maxWidth="30em" width="100%">
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit({
              id: undefined,
              title: e.target?.title?.value,
              description: e.target?.description?.value,
              isPrivate: e.target?.isPrivate?.checked,
              url: e.target?.url?.value,
              webhook: e.target?.webhook?.value,
              skipLimit: Number(e.target?.skipLimit?.value),
            })
          }}
        >
          <FormError
            error={props.error}
            wrapperClassName="rw-form-error-wrapper"
            titleClassName="rw-form-error-title"
            listClassName="rw-form-error-list"
          />

          {/* <FieldError name="title" className="rw-field-error" /> */}
          <TextField
            label="Title"
            isRequired
            name="title"
            defaultValue={props.list?.title}
          />

          {/* <FieldError name="description" className="rw-field-error" /> */}
          <TextArea
            label="Description"
            name="description"
            defaultValue={props.list?.description}
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
                      If this item has a url associated you can add it here.
                      Some types of link will have a specific behaviour such as
                      pulling IMDB data or embedding a Youtube, Vimeo or
                      Bandcamp player. Most will just show a button to open the
                      link.
                    </Text>
                  </Content>
                </ContextualHelp>
                <TextField
                  width="100%"
                  label="URL"
                  name="url"
                  defaultValue={props.list?.url}
                  marginBottom="size-150"
                />
              </Flex>
              <Flex direction="row-reverse" alignItems="center">
                <ContextualHelp variant="help">
                  <Heading>Webhooks</Heading>
                  <Content>
                    <Text>
                      When an item is picked it&rsquo;s webhook will be pinged,
                      this could allow automation such as playing a certain song
                      on your smart speaker, kicking off a build, or adjusting
                      your smart lighting.
                    </Text>
                  </Content>
                </ContextualHelp>
                <TextField
                  width="100%"
                  label="Webhook"
                  name="webhook"
                  defaultValue={props.list?.webhook}
                  marginBottom="size-150"
                />
              </Flex>
              <NumberField
                label="Skip Limit"
                name="skipLimit"
                minValue={0}
                maxValue={100}
                formatOptions={{ maximumFractionDigits: 0 }}
                defaultValue={props.list?.skipLimit ?? 0}
                marginBottom="size-150"
              />
              <Checkbox
                defaultSelected={props.list?.isPrivate}
                name="isPrivate"
              >
                Make Shuffle Private?
              </Checkbox>
            </Flex>
          </Well>

          <Button variant="cta" type="submit">
            {props.isCreating ? 'Create Shuffle' : 'Save Shuffle'}
          </Button>
        </Form>
      </View>
      {!props.isCreating && (
        <View
          flexGrow={1}
          minHeight="size-4600"
          marginX="size-1000"
          marginY="size-500"
        >
          <ListView
            // maxWidth="size-6000"
            aria-label="ListView example with complex items"
            onAction={(key) => alert(`Triggering action on item ${key}`)}
            renderEmptyState={renderEmptyState}
            minHeight="size-4600"
          >
            {props.list.items.map((item) => (
              <Item key={item.id} textValue="Utilities" hasChildItems>
                <Text>Utilities</Text>
                <Text slot="description">16 items</Text>
                <ActionMenu>
                  <Item key="edit" textValue="Edit">
                    <Edit />
                    <Text>Edit</Text>
                  </Item>
                  <Item key="delete" textValue="Delete">
                    <Delete />
                    <Text>Delete</Text>
                  </Item>
                </ActionMenu>
              </Item>
            ))}
          </ListView>
        </View>
      )}
    </Flex>
  )
}

export default ListForm
