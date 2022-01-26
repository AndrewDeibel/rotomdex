import { SelectOption } from '@app/controls';

export class User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  public: boolean;
  avatar: string;
  favorite_pokemon_variant_id: string;

  // Authentication
  token?: string;
  expires_at?: Date;
  email_verified_at?: Date;
  email_verify_token: string;
  hasNovaAccess: boolean;

  // Scanner
  device_id: string;
  closed_scanner_instructions: boolean;

  public constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}

export const getUserAvatars = () => [
  new SelectOption({
    text: 'Bulbasaur',
    value: 'https://images.rotomdex.app/user-icons/bulbasaur.jpg',
    image: 'https://images.rotomdex.app/user-icons/bulbasaur.jpg',
  }),
  new SelectOption({
    text: 'Charmander',
    value: 'https://images.rotomdex.app/user-icons/charmander.jpg',
    image: 'https://images.rotomdex.app/user-icons/charmander.jpg',
  }),
  new SelectOption({
    text: 'Chikorita',
    value: 'https://images.rotomdex.app/user-icons/chikorita.jpg',
    image: 'https://images.rotomdex.app/user-icons/chikorita.jpg',
  }),
  new SelectOption({
    text: 'Cubone',
    value: 'https://images.rotomdex.app/user-icons/cubone.jpg',
    image: 'https://images.rotomdex.app/user-icons/cubone.jpg',
  }),
  new SelectOption({
    text: 'Cyndaquil',
    value: 'https://images.rotomdex.app/user-icons/cyndaquil.jpg',
    image: 'https://images.rotomdex.app/user-icons/cyndaquil.jpg',
  }),
  new SelectOption({
    text: 'Eevee',
    value: 'https://images.rotomdex.app/user-icons/eevee.jpg',
    image: 'https://images.rotomdex.app/user-icons/eevee.jpg',
  }),
  new SelectOption({
    text: 'Machop',
    value: 'https://images.rotomdex.app/user-icons/machop.jpg',
    image: 'https://images.rotomdex.app/user-icons/machop.jpg',
  }),
  new SelectOption({
    text: 'Meowth',
    value: 'https://images.rotomdex.app/user-icons/meowth.jpg',
    image: 'https://images.rotomdex.app/user-icons/meowth.jpg',
  }),
  new SelectOption({
    text: 'Mudkip',
    value: 'https://images.rotomdex.app/user-icons/mudkip.jpg',
    image: 'https://images.rotomdex.app/user-icons/mudkip.jpg',
  }),
  new SelectOption({
    text: 'Pikachu',
    value: 'https://images.rotomdex.app/user-icons/pikachu.jpg',
    image: 'https://images.rotomdex.app/user-icons/pikachu.jpg',
  }),
  new SelectOption({
    text: 'Psyduck',
    value: 'https://images.rotomdex.app/user-icons/psyduck.jpg',
    image: 'https://images.rotomdex.app/user-icons/psyduck.jpg',
  }),
  new SelectOption({
    text: 'Skitty',
    value: 'https://images.rotomdex.app/user-icons/skitty.jpg',
    image: 'https://images.rotomdex.app/user-icons/skitty.jpg',
  }),
  new SelectOption({
    text: 'Squirtle',
    value: 'https://images.rotomdex.app/user-icons/squirtle.jpg',
    image: 'https://images.rotomdex.app/user-icons/squirtle.jpg',
  }),
  new SelectOption({
    text: 'Torchic',
    value: 'https://images.rotomdex.app/user-icons/torchic.jpg',
    image: 'https://images.rotomdex.app/user-icons/torchic.jpg',
  }),
  new SelectOption({
    text: 'Totodile',
    value: 'https://images.rotomdex.app/user-icons/totodile.jpg',
    image: 'https://images.rotomdex.app/user-icons/totodile.jpg',
  }),
  new SelectOption({
    text: 'Treeko',
    value: 'https://images.rotomdex.app/user-icons/treeko.jpg',
    image: 'https://images.rotomdex.app/user-icons/treeko.jpg',
  }),
];
