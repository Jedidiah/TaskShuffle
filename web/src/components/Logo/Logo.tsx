import { Heading } from '@adobe/react-spectrum'
import sample from 'lodash/sample'

export default function Logo() {
  return (
    <Heading level={1}>
      {'Shuffle'.split('').map((letter, i) => (
        <span
          key={i + letter}
          style={{
            transition: 'all ease-in-out 0.5',
            display: 'inline-block',
            transform: `rotate(${Math.floor(Math.random() * 30) - 15}deg)`,
            fontFamily: sample([
              'serif',
              'sans-serif',
              'monospace',
              'sans-serif',
              undefined,
              undefined,
              undefined,
              undefined,
            ]),
          }}
        >
          {letter}
        </span>
      ))}
    </Heading>
  )
}
