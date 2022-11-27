import data from '../data/lunch.json'

export default function UkerNav() {
  return (
    <>
      <h2>Uker</h2>
      <section className="ukerWrapper">
        {Object?.entries(data.year)?.map(([key]) => (
          <span className="uker" key={key}>
            <span>{key}</span>
          </span>
        ))}
      </section>
    </>
  )
}
