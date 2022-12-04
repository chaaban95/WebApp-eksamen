export default function Filter({ search, searchFilter, setSearchFilter }: any) {
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
          onChange={search}
        />
        <button className="btn" type="submit">
          Søk
        </button>
      </form>
    </>
  )
}
