const TOKEN_KEY = "car_rental_token";
const USER_KEY = "car_rental_user";

export const saveSession = ({ token, user }) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getStoredUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);
