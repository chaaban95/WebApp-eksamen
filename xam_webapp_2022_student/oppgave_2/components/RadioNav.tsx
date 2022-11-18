export default function RadioNav({ handleChange }) {
  return (
    <>
      <h1>Student gruppering</h1>
      <section onChange={handleChange}>
        <label htmlFor="ingen">Ingen</label>
        <input
          name="filter"
          id="ingen"
          value="ingen"
          type="radio"
          defaultChecked
        ></input>
        <label htmlFor="alder">Alder</label>
        <input name="filter" id="alder" value="age" type="radio"></input>
        <label htmlFor="kjønn">Kjønn</label>
        <input name="filter" id="kjønn" value="gender" type="radio"></input>
        <label htmlFor="klasse">Klasse</label>
        <input name="filter" id="klasse" value="group" type="radio"></input>
      </section>
    </>
  )
}
