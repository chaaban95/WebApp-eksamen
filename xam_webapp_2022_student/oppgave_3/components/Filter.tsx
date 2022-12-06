type FilterProps = {
  setFilterState: React.Dispatch<React.SetStateAction<string>>
  setFilterState2: React.Dispatch<React.SetStateAction<string>>
  filterState: number
  filterState2: number
  filter: any
  reset: any
}

export default function Filter({
  filter,
  filterState,
  filterState2,
  setFilterState,
  setFilterState2,
  reset,
}: FilterProps) {
  return (
    <>
      <form className="filter" onSubmit={filter}>
        <label>Filtrer periode:</label>
        <input
          size="9"
          min="1"
          max="52"
          className="inSearch"
          id="search"
          name="search"
          type="number"
          placeholder="fra"
          value={filterState}
          onChange={(event) => setFilterState(event.target.value)}
          required
        />
        <input
          size="9"
          min={filterState}
          max="52"
          className="inSearch"
          id="search"
          name="search"
          type="number"
          placeholder="til"
          value={filterState2}
          onChange={(event) => setFilterState2(event.target.value)}
          required
        />
        <button className="btn" type="submit">
          Filtrer
        </button>
        <i className="btn" onClick={reset}>
          Reset
        </i>
      </form>
    </>
  )
}
