import { Pokemon } from '../../pages/pokemons/pokemon';
export class PokemonFactory {
  pokemon = [
    {
      id: 1,
      name: 'Bulbasaur',
      gernation: 1,
      national_dex_number: 1,
      order: 1,
      image:
        'https://cdn.bulbagarden.net/upload/thumb/2/21/001Bulbasaur.png/250px-001Bulbasaur.png',
      slug: 'bulbasaur',
    },
    {
      id: 2,
      name: 'Ivysaur',
      gernation: 1,
      national_dex_number: 2,
      order: 2,
      image:
        'https://cdn.bulbagarden.net/upload/thumb/7/73/002Ivysaur.png/250px-002Ivysaur.png',
      slug: 'ivysaur',
    },
    {
      id: 3,
      name: 'Venusaur',
      gernation: 1,
      national_dex_number: 3,
      order: 3,
      image:
        'https://cdn.bulbagarden.net/upload/thumb/a/ae/003Venusaur.png/250px-003Venusaur.png',
      slug: 'venusaur',
    },
    {
      id: 4,
      name: 'Charmander',
      gernation: 1,
      national_dex_number: 4,
      order: 4,
      image:
        'https://cdn.bulbagarden.net/upload/thumb/7/73/004Charmander.png/250px-004Charmander.png',
      slug: 'charmander',
    },
    {
      id: 5,
      name: 'Charmeleon',
      gernation: 1,
      national_dex_number: 5,
      order: 5,
      image:
        'https://cdn.bulbagarden.net/upload/thumb/4/4a/005Charmeleon.png/250px-005Charmeleon.png',
      slug: 'charmeleon',
    },
    {
      id: 6,
      name: 'Charizard',
      gernation: 1,
      national_dex_number: 6,
      order: 6,
      image:
        'https://cdn.bulbagarden.net/upload/thumb/7/7e/006Charizard.png/250px-006Charizard.png',
      slug: 'charizard',
    },
    {
      id: 7,
      name: 'Squirtle',
      gernation: 1,
      national_dex_number: 7,
      order: 7,
      image:
        'https://cdn.bulbagarden.net/upload/thumb/3/39/007Squirtle.png/250px-007Squirtle.png',
      slug: 'squirtle',
    },
    {
      id: 8,
      name: 'Wartortle',
      gernation: 1,
      national_dex_number: 8,
      order: 8,
      image:
        'https://cdn.bulbagarden.net/upload/thumb/0/0c/008Wartortle.png/250px-008Wartortle.png',
      slug: 'wartortle',
    },
    {
      id: 9,
      name: 'Blastoise',
      gernation: 1,
      national_dex_number: 9,
      order: 9,
      image:
        'https://cdn.bulbagarden.net/upload/thumb/0/02/009Blastoise.png/250px-009Blastoise.png',
      slug: 'blastoise',
    },
  ];
  createPokemon(pokemonCount: number = 1): Pokemon[] {
    const pokemon: Pokemon[] = [];
    Array.from(Array(pokemonCount)).forEach(() => {
      var randomPokemon = new Pokemon(
        this.pokemon[Math.floor(Math.random() * this.pokemon.length)]
      );
      pokemon.push(randomPokemon);
    });
    return pokemon;
  }
}
