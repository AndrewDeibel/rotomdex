export class User {
	id: number;
	username: string;
	email: string;
	email_verified_at?: Date;
	email_verify_token: string;
	created_at: Date;
	updated_at: Date;
	full_name?: string;
	image?: string;
	bio?: string;
	reputation: number;
	patreon_id?: number;
	patreon_status?: string;
	patreon_tier?: string;

	// Authentication
	token?: string;
	expires_at?: Date;

	public constructor(init?: Partial<User>) {
		Object.assign(this, init);
	}
}
