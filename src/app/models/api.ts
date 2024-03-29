import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class APIResponse {
  success: boolean;
  data: any;
  meta: APIReponseMeta;
}

export class APIReponseMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

// Class when using paged API endpoints
export class APIGetPaged {
  page: number;
  page_size: number;
  sort_by: string;
  sort_direction: string;
  query: string;
  artist: string;
  type: string;
  supertype: string;
  subtype: string;
  rarity: string;
  shiny: boolean;
  user_id: number;
  card_group_id: number;
  slug: string;
  code: string;
  name: string;

  url: string;

  buildUrl = (folder: string) => {
    let query = new HttpParams();

    // Page
    if (this.page && this.page.toString().length)
      query = query.set('page', this.page.toString());
    else query = query.delete('page');

    // Page size
    if (this.page_size && this.page_size.toString().length)
      query = query.set('page_size', this.page_size.toString());
    else query = query.delete('page_size');

    // Sort by
    if (this.sort_by && this.sort_by.toString().length)
      query = query.set('sort_by', this.sort_by);
    else query = query.delete('sort_by');

    // Sort direction
    if (this.sort_direction && this.sort_direction.toString().length)
      query = query.set('sort_direction', this.sort_direction);
    else query = query.delete('sort_direction');

    // Query
    if (this.query && this.query.length)
      query = query.set('search', this.query);
    else query = query.delete('search');

    // Name
    if (this.name && this.name.length) query = query.set('name', this.name);
    else query = query.delete('name');

    // Artist
    if (this.artist && this.artist.length)
      query = query.set('artist', this.artist);
    else query = query.delete('artist');

    // Type
    if (this.type && this.type.length) query = query.set('type', this.type);
    else query = query.delete('type');

    // Super type
    if (this.supertype && this.supertype.length)
      query = query.set('supertype', this.supertype);
    else query = query.delete('supertype');

    // Sub type
    if (this.subtype && this.subtype.length)
      query = query.set('subtype', this.subtype);
    else query = query.delete('subtype');

    // Rarity
    if (this.rarity && this.rarity.length)
      query = query.set('rarity', this.rarity);
    else query = query.delete('rarity');

    // Shiny
    if (this.shiny) query = query.set('shiny', this.shiny);
    else query = query.delete('shiny');

    // User ID
    if (this.user_id && this.user_id.toString().length)
      query = query.set('user_id', this.user_id.toString());
    else query = query.delete('user_id');

    // Card group ID
    if (this.card_group_id && this.card_group_id.toString().length)
      query = query.set('card_group_id', this.card_group_id.toString());
    else query = query.delete('card_group_id');

    // Slug
    if (this.slug && this.slug.length) query = query.set('slug', this.slug);
    else query = query.delete('slug');

    // Include ? and query string if provided
    this.url = buildUrl(folder, query.toString());
    return this.url;
  };

  constructor(init?: Partial<APIGetPaged>) {
    Object.assign(this, init);
  }
}

export const buildUrl = (folder: string, queryString = '') =>
  `${environment.api}${folder}${queryString.length ? '?' + queryString : ''}`;

export const buildCdnUrl = (path: string) => `${environment.images}${path}`;
