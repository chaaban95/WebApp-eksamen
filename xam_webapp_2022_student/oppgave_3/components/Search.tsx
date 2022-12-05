export default function Search({
  search,
  searchFilter,
  setSearchFilter,
  reset,
}: any) {
  return (
    <>
      <form className="search" onSubmit={search}>
        <input
          className="inSearch"
          id="search"
          name="search"
          type="search"
          placeholder="Søk etter navn"
          value={searchFilter}
          onChange={(event) => setSearchFilter(event.target.value)}
          required
        />
        <button className="btn" type="submit">
          Søk
        </button>
        <i className="btn" onClick={reset}>
          Reset
        </i>
      </form>
    </>
  )
}