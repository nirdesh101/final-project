function FormResponse({ response }) {
  if (!response) {
    return (
      <section className="response-card response-card--empty" aria-live="polite">
        <h3>Server response</h3>
        <p>
          Submit the form to show the JSON response returned by
          `https://httpbin.org/post`.
        </p>
      </section>
    )
  }

  return (
    <section className="response-card" aria-live="polite">
      <div className="response-header">
        <div>
          <p className="eyebrow">Submission complete</p>
          <h3>Server response</h3>
        </div>
        <span className="response-badge">POST accepted</span>
      </div>

      <div className="response-grid">
        <article className="response-summary">
          <h4>Echoed form data</h4>
          <dl>
            <div>
              <dt>Name</dt>
              <dd>{response.json?.name || 'Not available'}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{response.json?.email || 'Not available'}</dd>
            </div>
            <div>
              <dt>Booking date</dt>
              <dd>{response.json?.bookingDate || 'Not available'}</dd>
            </div>
          </dl>
        </article>

        <article className="response-summary">
          <h4>Request details</h4>
          <dl>
            <div>
              <dt>URL</dt>
              <dd>{response.url}</dd>
            </div>
            <div>
              <dt>Origin</dt>
              <dd>{response.origin}</dd>
            </div>
            <div>
              <dt>Content-Type</dt>
              <dd>{response.headers?.['Content-Type'] || 'Unknown'}</dd>
            </div>
          </dl>
        </article>
      </div>

      <pre className="response-pre">
        <code>{JSON.stringify(response, null, 2)}</code>
      </pre>
    </section>
  )
}

export default FormResponse
