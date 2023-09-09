import { useState } from 'react'

import {
  Button,
  Checkbox,
  Flex,
  Form,
  Heading,
  NumberField,
  Switch,
  TextArea,
  TextField,
  View,
  Well,
} from '@adobe/react-spectrum'
import type { EditListById, UpdateListInput } from 'types/graphql'

import { FormError, type RWGqlError } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/dist/toast'

import ListItemsCell from 'src/components/ListItem/ListItemsCell'
import NewListItem from 'src/components/ListItem/NewListItem/NewListItem'

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
  const [showCreateModal, setShowCreateModal] = useState(false)

  const onSubmit = (data: Partial<FormList> & { title: string }) => {
    props.onSave(data, props?.list?.id)
  }

  return (
    <Flex wrap direction="row" marginBottom="size-225">
      <View padding="size-200" maxWidth="30em" width="100%">
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            if (e.target?.title?.value.length >= 3) {
              onSubmit({
                id: undefined,
                title: e.target?.title?.value,
                description: e.target?.description?.value,
              })
            } else {
              toast.error(
                e.target?.title?.value.length === 0
                  ? 'Title is Required'
                  : 'Title is too short'
              )
            }
          }}
        >
          <Well>
            <Flex direction="column">
              <Heading marginTop={0}>Shuffle Details:</Heading>

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
                width="100%"
                marginBottom="size-200"
                defaultValue={props.list?.title}
                minLength={3}
              />

              {/* <FieldError name="description" className="rw-field-error" /> */}
              <TextArea
                label="Description"
                name="description"
                width="100%"
                marginBottom="size-200"
                defaultValue={props.list?.description}
              />

              <Button variant="cta" type="submit">
                {props.isCreating ? 'Create Shuffle' : 'Save Shuffle'}
              </Button>
            </Flex>
          </Well>
        </Form>
      </View>
      {!props.isCreating && (
        <Flex
          flexGrow={1}
          minHeight="70vh"
          marginX="size-1000"
          marginY="size-100"
          direction="column"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Heading>
              Items:{' '}
              <span style={{ color: '#bbb', marginLeft: 10 }}>
                ({props.list.items.length})
              </span>
            </Heading>
            <NewListItem
              showCreateModal={showCreateModal}
              setShowCreateModal={setShowCreateModal}
              listTitle={props.list.title}
              listId={props.list.id}
              listTags={props.list.tags}
            />
          </Flex>
          <View flexGrow={1} flexBasis="100%" backgroundColor="gray-100">
            <ListItemsCell listId={props.list.id} />
          </View>
        </Flex>
      )}
    </Flex>
  )
}

export default ListForm
