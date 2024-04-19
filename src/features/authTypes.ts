export type AuthMode = 'login' | 'register';

export interface AuthProps {
    onSwitch: () => void;
    variant?: AuthMode;
}

export interface LoginResult {
    success: boolean;
    redirectTo?: string;
    error?: Error;
}