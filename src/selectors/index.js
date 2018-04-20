
export const isGuest = state => state.auth.current.type === 'guest';
export const getProfile = state => state.auth.current;

export const getStatusPage = state => state.info.page.status;