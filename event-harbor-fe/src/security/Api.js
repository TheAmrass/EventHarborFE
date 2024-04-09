import axios from "axios";



//vytvoří instanci axios
    export function createAxios() {

    const token = localStorage.getItem('token')
        if(token){
            console.log("Token api.js: " + token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

    const api = axios.create({
        baseURL: "http://localhost:8080/api/v1/", // Zde nastavte adresu vašeho backendu
        timeout: 5000, // Volitelně: nastavte timeout na 5 sekund

    })

    return api;
}
export default createAxios();
