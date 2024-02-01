const useAuthService = () => {
    const getAccessToken = () => localStorage.getItem('accessToken');
    const setAccessToken = (accessToken) => localStorage.setItem('accessToken', accessToken);
    const removeAccessToken = () => localStorage.removeItem('accessToken');
    const getRefreshToken = () => localStorage.getItem('refreshToken');
    const setRefreshToken = (refreshToken) => localStorage.setItem('refreshToken', refreshToken);
    const removeRefreshToken = () => localStorage.removeItem('refreshToken');

    const logout = () => {
        removeRefreshToken()
        removeAccessToken()
    }
    const isAuthenticated = () => {
        const accessToken = getAccessToken();
        return accessToken !== null && accessToken !== undefined;
    };

    return {
        getAccessToken,
        setAccessToken,
        removeAccessToken,
        getRefreshToken,
        setRefreshToken,
        removeRefreshToken,
        isAuthenticated,
        logout
    };
};

export default useAuthService;