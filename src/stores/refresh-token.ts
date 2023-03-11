import { create } from 'zustand';


interface RefreshToken {
    refreshToken: string
    setRefreshToken: (token: string) => void
}
  

const useRefreshToken = create<RefreshToken>()((set) => ({
    refreshToken: localStorage.getItem("festival-refresh") || "",
    setRefreshToken: (token) => set(function (_) { 
        localStorage.setItem("festival-refresh", token);
        return ({ refreshToken: token });
    }),
}));


export default useRefreshToken;
