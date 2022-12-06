type SearchProps = {
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>
  searchFilter: string
  search: any
  reset: any
}

export default function Search({
  search,
  searchFilter,
  setSearchFilter,
  reset,
}: SearchProps) {
  return (
    <>
      <form className="search" onSubmit={search}>
        <input
          size="20"
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
