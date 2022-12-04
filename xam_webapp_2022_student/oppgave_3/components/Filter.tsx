export default function Filter({ search }: any) {
  return (
    <>
      <form className="search" onSubmit={search}>
        <input
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
