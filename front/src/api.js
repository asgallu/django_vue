import { ApiAuth } from "../src//components/login/ApiAuth"
const apiAuth = new ApiAuth()


const SERVER_URL = 'http://127.0.0.1:8000/api/v1/'
const DOCS_URL = SERVER_URL + "loadingport/"
const TOKEN_URL = SERVER_URL + 'token/'
//const USUARIO = "javier"
//const PASSWORD = "89_Lp%wD"
//this.USUARIO = apiAuth.USUARIO
//this.PASSWORD = apiAuth.PASSWORD
const USUARIO = apiAuth.USUARIO
const PASSWORD = apiAuth.PASSWORD

const credenciales = { "username": USUARIO, "password": PASSWORD }
//const credenciales = { "username": this.USUARIO, "password": this.PASSWORD }

const getToken = async () => {
    try {
        const r = await fetch(
            TOKEN_URL, {
            method: "POST",
            body: JSON.stringify(credenciales),
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        const token = await r.json();
        return token;
    } catch (error) {
        console.warn(error.message)
        return error.message;
    }
}

export default {
    getAll: async () => {
        const token = await getToken();
        if (typeof (token) === "string") {
            return token;
        }

        const res = await fetch(DOCS_URL, {
            method: "GET",

            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token.access
            }
        });

        const items = await res.json();
        console.log(items);
        return items;
    },

    insert: async (doc) => {
        const token = await getToken();

        if (typeof (token) === "string") {
            return token;
        }

        const res = await fetch(DOCS_URL, {
            method: "POST",
            body: JSON.stringify(doc),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token.access
            }
        });

        console.log(res);

        if (!res.ok) {
            return res.statusText;
        }

        const item = await res.json();
        return item;
    },

    update: async (doc) => {
        const token = await getToken();
        let url = DOCS_URL + doc.id + "/";

        const res = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(doc),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token.access
            }
        });

        if (!res.ok) {
            return res.statusText;
        }

        const item = await res.json();
        return item;
    },

    //get an id
    deleteForId: async (id) => {
        const token = await getToken();
        let url = DOCS_URL + id + "/";

        fetch(url, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token.access
            }
        })
            .catch(error => console.error("Error:", error));
    }
}
