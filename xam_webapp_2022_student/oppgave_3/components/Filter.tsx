export default function Filter({}: any) {
  return (
    <>
      <form className="search">
        <input
          className="inSearch"
          id="search"
          name="search"
          type="search"
          placeholder="Søk etter navn"
        />
        <button className="btn" type="submit">
          Søk
        </button>
      </form>
    </>
  )
}
