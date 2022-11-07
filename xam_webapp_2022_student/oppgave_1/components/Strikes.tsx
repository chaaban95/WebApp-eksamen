// TODO: Her er det bugs

export type Strike = { icon: string; guess: number}

export default function Strikes({ strikes }: { strikes: Strike[] }) {
  return (
    <ul className="strikes">
      {strikes.map((strike: Strike, index: number) => (
        <li key={index}>{strike.icon}</li>
      ))}
    </ul>
  )
}
