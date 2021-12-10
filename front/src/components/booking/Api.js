import { ApiAuth } from "../login/ApiAuth"
const apiAuth = new ApiAuth()

export default class Api {
  constructor() {
    this.SERVER_URL = 'http://127.0.0.1:8000/api/v1/'
    this.TOKEN_URL = this.SERVER_URL + 'token/'
    //this.USUARIO = 'javier'
    //this.PASSWORD = '89_Lp%wD'
    this.USUARIO = apiAuth.USUARIO
    this.PASSWORD = apiAuth.PASSWORD
    this.credenciales = { username: this.USUARIO, password: this.PASSWORD }
  }

  //async getToken() {
  getToken = async () => {
    /*
    const r = await fetch(this.TOKEN_URL,
      {
        method: "POST",
        body: JSON.stringify(this.credenciales),
        mode: "cors",
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const token = await r.json()
    return token;
    */
    const token = await apiAuth.getToken()
    console.log(token, "guardado")
    return token;

  }

  async get(nombre, id = -1) {

    const token = await this.getToken();

    let url = this.SERVER_URL + nombre + "/";
    if (id !== -1) {
      url += id + "/"
    }

    console.log(url)

    const res = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token.access,
      }
    });
    const items = await res.json();

    if (items.results === undefined) {
      return items
    }
    return items.results;
  }



  async save(nombre, obj) {
    const token = await this.getToken();

    let url = this.SERVER_URL + nombre + "/";
    let method = "POST"

    if (obj.id !== -1) {
      method = "PUT";
      url += obj.id + "/";
    }

    let r = await fetch(url, {
      method: method,
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token.access,
      }
    })

    if (!r.ok) {
      //console.log(r.statusText);
      return r.statusText;
    }
    const data = await r.json();
    return data;
  }

  async delete(nombre, id) {
    const token = await this.getToken();

    let url = this.SERVER_URL + nombre + "/" + id + "/";

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token.access,
      }
    })
      .catch(error => console.error('Error:', error))
  }


}