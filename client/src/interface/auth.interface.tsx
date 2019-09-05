export interface ILogin {
	email: string;
	password: string;
}

export interface IRegister {
	name: string;
	email: string;
	password: string;
	password2: string;
}

export interface IAuthState {
	isAuthenticated: boolean;
	user: any;
}

export interface ILoginState {
	email: string;
	password: string;
}
