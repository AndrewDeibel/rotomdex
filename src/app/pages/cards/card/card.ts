import '@app/helpers/string.extensions';
import { UserCard } from '@app/pages/collection';
import { Expansion } from '@app/pages/expansions';
import { PokemonVariant } from '@app/pages/pokemons/pokemon/pokemon';

export const DEFAULT_IMAGE = '/assets/back.jpg';

export class Weakness {
  type: string;
  value: string;
}

export class Resistance {
  type: string;
  value: string;
}

export class Attack {
  cost: string[] = [];
  name: string;
  text: string;
  damage: number;
  convertedEnergyCost: number;
}

export class Ability {
  name: string;
  text: string;
  type: string;
}

export class Rarity {
  id: number;
  name: string;
  slug: string;
  constructor(init?: Partial<Rarity>) {
    Object.assign(this, init);
  }
}

export class Card {
  // Both can be used
  id: number;
  card_id: number;

  // Data
  default: boolean;
  name: string;
  slug: string;
  primary_pokemon_variants: PokemonVariant[] = [];
  secondary_pokemon_variants: PokemonVariant[] = [];
  expansion: Expansion;
  number: string;
  rarity: Rarity;
  image: string;
  image_high_res?: string;
  super_type: string;
  sub_type?: string;
  hp?: number;
  retreat_cost: string[] = [];
  weaknesses: Weakness[] = [];
  resistances: Resistance[] = [];
  attacks: Attack[] = [];
  abilities: Ability[] = [];
  artist: string;
  is_shiny: boolean;
  is_promo: boolean;
  is_favorite: boolean;
  types: string[] = [];
  gfx: boolean;
  variations: Card[] = [];
  rules: string[] = [];
  previous_card: string;
  next_card: string;
  flavor_text: string;

  // Prices
  price: number;
  prices: any;

  // Collection
  user_cards: UserCard[] = [];
  on_wishlist: boolean;
  total_cards_owned: number;

  // Purchase links
  tcgplayer_url: string;
  ebay_url: string;

  // Route
  get route() {
    return this.slug && '/card/' + this.slug;
  }

  // Admin
  nova_edit_url: string;

  // Scanner
  scan: boolean;
  scan_id: number;
  tempId: number;
  placeholder: boolean;
  other_results: Card[] = [];

  private getCardNumber(): string {
    // IS number
    if (!isNaN(+this.number) && this.expansion) {
      const x = `${this.number}`;
      const y = `${this.expansion.total_cards}`;
      const pad = '000';
      const xFormatted = pad.substring(0, pad.length - x.length) + x;
      const yFormatted = pad.substring(0, pad.length - y.length) + y;
      return `${xFormatted}/${yFormatted}`;
    }
    // NOT number (promo)
    else {
      return this.number;
    }
  }

  constructor(init?: Partial<Card>) {
    Object.assign(this, init);

    // Number formatting
    this.number = this.getCardNumber();

    // ID
    if (init?.card_id) this.id = init.card_id;

    // Initalize expansion
    if (init?.expansion) this.expansion = new Expansion(init.expansion);

    // Initalize pokemon
    if (init?.primary_pokemon_variants)
      this.primary_pokemon_variants = init.primary_pokemon_variants.map(
        (pokemonVariant) => new PokemonVariant(pokemonVariant)
      );

    if (init?.secondary_pokemon_variants)
      this.secondary_pokemon_variants = init.secondary_pokemon_variants.map(
        (pokemonVariant) => new PokemonVariant(pokemonVariant)
      );

    // GFX
    if (this.rarity) {
      const r = this.rarity.name.toLocaleLowerCase();
      this.gfx =
        r === 'rare holo v' ||
        r === 'rare ultra' ||
        r === 'rare holo vmax' ||
        r === 'rare holo' ||
        r === 'rare secret' ||
        r === 'rare rainbow' ||
        r === 'rare holo ex' ||
        r === 'rare radiant' ||
        r === 'rare holo gx';
    }

    if (init?.other_results) {
      this.other_results = init.other_results
        .filter((result) => result)
        .map((result) => new Card(result));
    }
  }
}

export class CardLastPrices {
  id: number;
  card_id: number;
  variation: string;
  condition: string;
  created_at: Date;
  updated_at: Date;

  // Prices
  market_price: number;
  direct_price: string;
  high_price: number;
  mid_price: number;
  low_price: number;
  source: string;

  constructor(init?: Partial<CardLastPrices>) {
    Object.assign(this, init);
  }
}

export class CardCount {
  get count(): number {
    return this.cards.length;
  }
  cards: Card[] = [];
  constructor(init?: Partial<CardCount>) {
    Object.assign(this, init);
  }
}
