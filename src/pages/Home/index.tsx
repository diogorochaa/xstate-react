import React from 'react';
import { useMachine } from '@xstate/react';
import { assign, createMachine } from 'xstate';

import { Header } from '../../components/Header';

const API_URL = 'https://rickandmortyapi.com/api';

interface CharacterProps {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
}

async function fetchCharacters() {
  try {
    const response = await fetch(`${API_URL}/character`);
    if (!response.ok) {
      return Promise.reject('Ocorreu um erro');
    }
    const { results } = await response.json();
    return results;
  } catch (error) {
    console.error(error);
  }
}

const fetchMachine = createMachine({
  id: 'fetcher',
  context: {
    characters: [],
    error: null,
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        FETCH: {
          target: 'loading',
        },
      },
    },
    loading: {
      invoke: {
        src: 'fetchCharacters',
        onDone: {
          target: 'success',
          actions: assign({ characters: (_, event) => event.data }),
        },
        onError: {
          target: 'failure',
          actions: assign({ error: (_, event) => event.data }),
        },
      },
    },
    success: {
      type: 'final',
    },
    failure: {
      type: 'final',
    },
  },
});

export function Home() {
  const [current, send] = useMachine(fetchMachine, {
    services: {
      fetchCharacters,
    },
  });

  React.useEffect(() => {
    send('FETCH');
  }, [send]);

  return (
    <div>
      <Header />
      {current.matches('failure') && <p>{current.context.error}</p>}
      {current.matches('loading') && <p>Loading...</p>}
      {current.matches('success') && (
        <ul>
          {current.context.characters.map((char: CharacterProps) => (
            <li key={char.id}>{char.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
