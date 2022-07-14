import { SelectOption } from '@app/controls';
import { buildCdnUrl } from '@app/models';

export class User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  public: boolean;
  avatar: string;
  favorite_pokemon_variant_id: string;
  favorite_pokemon: any;

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
    value: buildCdnUrl('user-icons/bulbasaur.jpg'),
    image: buildCdnUrl('user-icons/bulbasaur.jpg'),
  }),
  new SelectOption({
    text: 'Charmander',
    value: buildCdnUrl('user-icons/charmander.jpg'),
    image: buildCdnUrl('user-icons/charmander.jpg'),
  }),
  new SelectOption({
    text: 'Chikorita',
    value: buildCdnUrl('user-icons/chikorita.jpg'),
    image: buildCdnUrl('user-icons/chikorita.jpg'),
  }),
  new SelectOption({
    text: 'Cubone',
    value: buildCdnUrl('user-icons/cubone.jpg'),
    image: buildCdnUrl('user-icons/cubone.jpg'),
  }),
  new SelectOption({
    text: 'Cyndaquil',
    value: buildCdnUrl('user-icons/cyndaquil.jpg'),
    image: buildCdnUrl('user-icons/cyndaquil.jpg'),
  }),
  new SelectOption({
    text: 'Eevee',
    value: buildCdnUrl('user-icons/eevee.jpg'),
    image: buildCdnUrl('user-icons/eevee.jpg'),
  }),
  new SelectOption({
    text: 'Machop',
    value: buildCdnUrl('user-icons/machop.jpg'),
    image: buildCdnUrl('user-icons/machop.jpg'),
  }),
  new SelectOption({
    text: 'Meowth',
    value: buildCdnUrl('user-icons/meowth.jpg'),
    image: buildCdnUrl('user-icons/meowth.jpg'),
  }),
  new SelectOption({
    text: 'Mudkip',
    value: buildCdnUrl('user-icons/mudkip.jpg'),
    image: buildCdnUrl('user-icons/mudkip.jpg'),
  }),
  new SelectOption({
    text: 'Pikachu',
    value: buildCdnUrl('user-icons/pikachu.jpg'),
    image: buildCdnUrl('user-icons/pikachu.jpg'),
  }),
  new SelectOption({
    text: 'Psyduck',
    value: buildCdnUrl('user-icons/psyduck.jpg'),
    image: buildCdnUrl('user-icons/psyduck.jpg'),
  }),
  new SelectOption({
    text: 'Skitty',
    value: buildCdnUrl('user-icons/skitty.jpg'),
    image: buildCdnUrl('user-icons/skitty.jpg'),
  }),
  new SelectOption({
    text: 'Squirtle',
    value: buildCdnUrl('user-icons/squirtle.jpg'),
    image: buildCdnUrl('user-icons/squirtle.jpg'),
  }),
  new SelectOption({
    text: 'Torchic',
    value: buildCdnUrl('user-icons/torchic.jpg'),
    image: buildCdnUrl('user-icons/torchic.jpg'),
  }),
  new SelectOption({
    text: 'Totodile',
    value: buildCdnUrl('user-icons/totodile.jpg'),
    image: buildCdnUrl('user-icons/totodile.jpg'),
  }),
  new SelectOption({
    text: 'Treeko',
    value: buildCdnUrl('user-icons/treeko.jpg'),
    image: buildCdnUrl('user-icons/treeko.jpg'),
  }),
];
