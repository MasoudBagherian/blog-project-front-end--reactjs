import * as authActions from './authActions';
import * as userActions from './userActions';

export const allActions = { ...authActions, ...userActions };
