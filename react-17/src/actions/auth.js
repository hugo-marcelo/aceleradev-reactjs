import AuthConstants from "../constants/auth";

/**
 *
 * @param {string} errorMessage
 * @returns {{poayload: *, type: *}}
 */
export const authCallbackError = (errorMessage) => ({
  type: AuthConstants.AUTH_CALLBACK_ERROR,
  payload: errorMessage,
});

/**
 *
 * @param {object} credentials
 * @returns {{payload, type: string}}
 */
export const authCallbackSucess = (credentials) => ({
  type: AuthConstants.AUTH_CALLBACK_SUCCESS,
  payload: { ...credentials },
});
