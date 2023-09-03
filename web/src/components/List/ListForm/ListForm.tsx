import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditListById, UpdateListInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormList = NonNullable<EditListById['list']>

interface ListFormProps {
  list?: EditListById['list']
  onSave: (data: UpdateListInput, id?: FormList['id']) => void
  error: RWGqlError
  loading: boolean
}

const ListForm = (props: ListFormProps) => {
  const onSubmit = (data: FormList) => {
    props.onSave(data, props?.list?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormList> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.list?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.list?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <TextField
          name="userId"
          defaultValue={props.list?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="webhook"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Webhook
        </Label>

        <TextField
          name="webhook"
          defaultValue={props.list?.webhook}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="webhook" className="rw-field-error" />

        <Label
          name="url"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Url
        </Label>

        <TextField
          name="url"
          defaultValue={props.list?.url}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="url" className="rw-field-error" />

        <Label
          name="isPrivate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is private
        </Label>

        <CheckboxField
          name="isPrivate"
          defaultChecked={props.list?.isPrivate}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="isPrivate" className="rw-field-error" />

        <Label
          name="skipLimit"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Skip limit
        </Label>

        <NumberField
          name="skipLimit"
          defaultValue={props.list?.skipLimit}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="skipLimit" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ListForm
