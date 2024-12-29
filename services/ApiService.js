import AxiosService from "./AxiosService";
import AsyncStorage from "@react-native-async-storage/async-storage";
//API call to login
export const logIn = async (email, password) => {

    try {
        const response = await AxiosService.post("/auth/login", { username: email, password: password, expiresInMins: 1 },
        );
        await AsyncStorage.setItem("accessToken", response.data.accessToken);
        await AsyncStorage.setItem("refreshToken", response.data.refreshToken);
        return response.data;
    } catch (error) {
        //can be mapped to a more readable format
        throw new Error("Authentication failed");
    }
};

//API call to fetch user details
export const getUserDetails = async () => {
    try {
        const response = await AxiosService.get("auth/me");
        return response.data;
    } catch (error) {
        //can be mapped to a more readable format
        throw new Error("Detail Fetch failed");
    }
};
