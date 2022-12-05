export default function Search({ search, searchFilter, setSearchFilter }: any) {
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
        />
        <button className="btn" type="submit">
          Søk
        </button>
      </form>
    </>
  )
}
