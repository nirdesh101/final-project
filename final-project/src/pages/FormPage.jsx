import { useState } from 'react'
import { z } from 'zod'
import FormResponse from '../components/FormResponse'

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters long.'),
  email: z.string().trim().email('Enter a valid email address.'),
  bookingDate: z.string().refine((value) => {
    if (!value) {
      return false
    }

    const selectedDate = new Date(`${value}T00:00:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return !Number.isNaN(selectedDate.getTime()) && selectedDate >= today
  }, 'Choose a date from today onward.'),
})

const initialValues = {
  name: '',
  email: '',
  bookingDate: '',
}

function FormPage() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [response, setResponse] = useState(null)
  const [submitState, setSubmitState] = useState({
    status: 'idle',
    message: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const parsed = formSchema.safeParse(values)

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors

      setErrors({
        name: fieldErrors.name?.[0] || '',
        email: fieldErrors.email?.[0] || '',
        bookingDate: fieldErrors.bookingDate?.[0] || '',
      })
      setSubmitState({
        status: 'error',
        message: 'Please fix the highlighted fields before submitting.',
      })
      return
    }

    setErrors({})
    setSubmitState({
      status: 'loading',
      message: 'Sending your form data to httpbin...',
    })

    try {
      const httpResponse = await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsed.data),
      })

      if (!httpResponse.ok) {
        throw new Error(`Request failed with status ${httpResponse.status}.`)
      }

      const responseBody = await httpResponse.json()

      setResponse(responseBody)
      setSubmitState({
        status: 'success',
        message: 'Form submitted successfully. The response is shown below.',
      })
    } catch (error) {
      setResponse(null)
      setSubmitState({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong while submitting the form.',
      })
    }
  }

  return (
    <section className="form-page">
      <article className="form-intro">
        <p className="eyebrow">Routed Subpage</p>
        <h2>Booking request form</h2>
        <p>
          Fill in the form below and submit it to `httpbin`. This page uses a
          text field, an email field, and a date field with Zod validation
          before sending the request.
        </p>
      </article>

      <div className="form-layout">
        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Ada Lovelace"
              value={values.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name ? (
              <p className="field-error" id="name-error">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ada@example.com"
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email ? (
              <p className="field-error" id="email-error">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="bookingDate">Booking date</label>
            <input
              id="bookingDate"
              name="bookingDate"
              type="date"
              value={values.bookingDate}
              onChange={handleChange}
              aria-invalid={Boolean(errors.bookingDate)}
              aria-describedby={
                errors.bookingDate ? 'bookingDate-error' : 'bookingDate-help'
              }
            />
            <p className="field-help" id="bookingDate-help">
              Choose today or a future date.
            </p>
            {errors.bookingDate ? (
              <p className="field-error" id="bookingDate-error">
                {errors.bookingDate}
              </p>
            ) : null}
          </div>

          <button
            className="primary-button"
            type="submit"
            disabled={submitState.status === 'loading'}
          >
            {submitState.status === 'loading' ? 'Sending...' : 'Submit form'}
          </button>

          {submitState.message ? (
            <p
              className={`submit-message submit-message--${submitState.status}`}
              role="status"
            >
              {submitState.message}
            </p>
          ) : null}
        </form>

        <FormResponse response={response} />
      </div>
    </section>
  )
}

export default FormPage
