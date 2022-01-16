import { Card } from '@app/pages';

export class CardFactory {
  cards = [
    {
      id: 1,
      name: 'Charizard GX',
      number: 'SV49',
      rarity: 'Rare',
      image:
        'https://pod.pokellector.com/cards/279/Charizard-GX.HIF.SV49.29005.png',
      hp: 250,
      slug: 'charizard1',
      artist: 'Andrew Deibel',
      price: 200,
    },
    {
      id: 2,
      name: 'Charizard V',
      number: '79/73',
      rarity: 'Secret Rare',
      image:
        'https://pod.pokellector.com/cards/298/Charizard-V.SWSH3.79.35778.png',
      hp: 220,
      slug: 'charizard2',
      artist: 'Andrew Deibel',
      price: 200,
    },
    {
      id: 3,
      name: 'Charizard VMAX',
      number: '20/189',
      rarity: 'Rare',
      image:
        'https://pod.pokellector.com/cards/296/Charizard-VMAX.SWSH3.20.35112.png',
      hp: 330,
      slug: 'charizard3',
      artist: 'Andrew Deibel',
      price: 200,
    },
    {
      id: 4,
      name: 'Charizard V',
      number: '50/107',
      rarity: 'Common',
      image:
        'https://pod.pokellector.com/cards/287/Charizard-V.SWSH.50.35783.png',
      hp: 220,
      slug: 'charizard4',
      artist: 'Andrew Deibel',
      price: 200,
    },
    {
      id: 5,
      name: 'Charizard & Braixen GX',
      number: '22/236',
      rarity: 'Rare',
      image:
        'https://pod.pokellector.com/cards/280/Charizard-Braixen-GX.CEC.22.30121.png',
      hp: 270,
      slug: 'charizard5',
      artist: 'Andrew Deibel',
      price: 200,
    },
  ];
  createCards(cardCount: number = 1): Card[] {
    let cards: Card[] = [];
    Array.from(Array(cardCount)).forEach(() => {
      var randomCard = new Card(
        this.cards[Math.floor(Math.random() * this.cards.length)]
      );
      cards.push(randomCard);
    });
    return cards;
  }
}
