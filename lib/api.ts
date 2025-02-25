//.fetchHandler (url),{
//...method:"PUT",
//...body:JSON.stringify(AccountData),
//});
//api.createAccount(AccountData);

import { fetchHandlers } from "./handlers/fetch";
import { IUser } from "@/database/user.model";
import { IAccount } from "@/database/account.model";
import ROUTES from "@/constants/routes";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const api = {
  users: {
    getAll: () => fetchHandlers(`${API_BASE_URL}/users`),
    getById: (id: string) => fetchHandlers(`${API_BASE_URL}/users/${id}`),
    getByEmail: (email: string) =>
      fetchHandlers(`${API_BASE_URL}/users/email`, {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    create: (userData: Partial<IUser>) =>
      fetchHandlers(`${API_BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    update: (id: string, userData: Partial<IUser>) =>
      fetchHandlers(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      }),
    delete: (id: string) =>
      fetchHandlers(`${API_BASE_URL}/users/${id}`, { method: "DELETE" }),
  },

  accounts: {
    getAll: () => fetchHandlers(`${API_BASE_URL}/accounts`),
    getById: (id: string) => fetchHandlers(`${API_BASE_URL}/accounts/${id}`),
    getByProvider: (providerAccountId: string) =>
      fetchHandlers(`${API_BASE_URL}/accounts/provider`, {
        method: "POST",
        body: JSON.stringify({ providerAccountId }),
      }),
    create: (accountData: Partial<IAccount>) =>
      fetchHandlers(`${API_BASE_URL}/accounts`, {
        method: "POST",
        body: JSON.stringify(accountData),
      }),
    update: (id: string, accountData: Partial<IAccount>) =>
      fetchHandlers(`${API_BASE_URL}/accounts/${id}`, {
        method: "PUT",
        body: JSON.stringify(accountData),
      }),
    delete: (id: string) =>
      fetchHandlers(`${API_BASE_URL}/accounts/${id}`, { method: "DELETE" }),
  },

  auth: {
    oAuthSignIn: ({
      provider,
      providerAccountId,
      user,
    }: SignInWithOauthParams) =>
      fetchHandlers(`${API_BASE_URL}/auth/${ROUTES.SIGN_IN_WITH_OAUTH}`, {
        method: "POST",
        body: JSON.stringify({ provider, providerAccountId, user }),
      }),
  },
};
