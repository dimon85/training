
export const isGuest = state => state.auth.current.type === 'guest';
export const getProfile = state => state.auth.current;