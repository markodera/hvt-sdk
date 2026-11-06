import type React from "react";
import type { HVTClient, User, RuntimeUser, SessionResponse } from "./index";

export interface HVTAuthContextValue {
  client: HVTClient | null;
  user: User | RuntimeUser | null;
  session: SessionResponse | null;
  permissions: string[];
  roles: string[];
  isLoading: boolean;
  error: Error | null;
  login: (credentials: Record<string, unknown>) => Promise<SessionResponse>;
  loginWithPasskey: (options?: { email?: string }) => Promise<SessionResponse>;
  registerPasskey: (options?: { name?: string }) => Promise<{ id: string; name: string; detail: string }>;
  requestMagicLink: (options?: { email: string; role_slug?: string }) => Promise<{ detail: string }>;
  verifyMagicLink: (options?: { token: string }) => Promise<SessionResponse>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<User | RuntimeUser | null>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

export interface HVTProviderProps {
  client: HVTClient;
  children: React.ReactNode;
  onAuthChange?: (session: SessionResponse | null) => void;
}

export function HVTProvider(props: HVTProviderProps): React.JSX.Element;

export function useHVTClient(): HVTClient;

export function useHVTAuth(): HVTAuthContextValue;

export interface PermissionGateProps {
  permission?: string;
  anyOf?: string[];
  allOf?: string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function PermissionGate(props: PermissionGateProps): React.JSX.Element | null;

export interface RoleGateProps {
  role?: string;
  anyOf?: string[];
  allOf?: string[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function RoleGate(props: RoleGateProps): React.JSX.Element | null;
