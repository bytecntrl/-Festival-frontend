import { create } from 'zustand';


interface AccessToken {
    accessToken: string
    setAccessToken: (token: string) => void
    reset: () => void
}
  

const useAccessToken = create<AccessToken>()((set) => ({
    accessToken: localStorage.getItem("festival-access") || "",
    setAccessToken: (token) => set(function (_) {
        localStorage.setItem("festival-access", token);
        return ({ accessToken: token });
    }),
    reset: () => set(function (_) {
        localStorage.setItem("festival-access", "");
        return ({ accessToken: "" });
    })
}));


export default useAccessToken;
