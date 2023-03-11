import { create } from 'zustand';


interface AccessToken {
    accessToken: string
    setAccessToken: (token: string) => void
}
  

const useAccessToken = create<AccessToken>()((set) => ({
    accessToken: localStorage.getItem("festival-access") || "",
    setAccessToken: (token) => set(function (_) {
        localStorage.setItem("festival-access", token);
        return ({ accessToken: token });
    }),
}));


export default useAccessToken;
