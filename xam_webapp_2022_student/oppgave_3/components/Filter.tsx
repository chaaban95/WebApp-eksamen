export default function Filter({
  filter,
  filterState,
  filterState2,
  setFilterState,
  setFilterState2,
  reset,
}: any) {
  return (
    <>
      <form className="search" onSubmit={filter}>
        <label>Filtrer periode:</label>
        <input
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
          min="1"
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
