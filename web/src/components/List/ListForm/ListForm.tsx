import { useState } from 'react'

import {
  Button,
  Checkbox,
  Content,
  Flex,
  Form,
  Heading,
  IllustratedMessage,
  NumberField,
  Switch,
  TextArea,
  TextField,
  View,
  Well,
} from '@adobe/react-spectrum'
import type { EditListById, UpdateListInput } from 'types/graphql'

import { FormError, type RWGqlError } from '@redwoodjs/forms'

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

  const onSubmit = (data: Partial<FormList>) => {
    props.onSave(data, props?.list?.id)
  }

  // const renderEmptyState = () => {
  //   return (
  //     <IllustratedMessage width="100%" minHeight="size-3600">
  //       <NoSearchResults />
  //       <Heading>No Items</Heading>

  //       <Content>This Shuffle doesn&rsquo;t have any items yet.</Content>
  //       <Button
  //         marginTop="size-300"
  //         variant="cta"
  //         onPress={() => {
  //           setShowCreateModal(!showCreateModal)
  //         }}
  //       >
  //         Create One
  //       </Button>
  //     </IllustratedMessage>
  //   )
  // }

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
          <Flex alignItems="center" justifyContent="space-between">
            <Heading>Items: ({props.list.items.length})</Heading>
            <NewListItem
              showCreateModal={showCreateModal}
              setShowCreateModal={setShowCreateModal}
              listTitle={props.list.title}
              listId={props.list.id}
            />
          </Flex>
          <ListItemsCell listId={props.list.id} />
        </View>
      )}
    </Flex>
  )
}

export default ListForm
