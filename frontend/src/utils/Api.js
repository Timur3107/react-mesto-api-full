class Api {
  constructor(options) {
    this._url = options.baseUrl
    this._headers = options.headers
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers
    })
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers
    })
  }

  setUserInfo(name, about) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  addCard(data) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    })
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this._request(`${this._url}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers
      })
    } else {
      return this._request(`${this._url}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers
      })
    }
  }

  setAvatar(url) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    })
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: 'edca42ab-b867-4886-8abe-7c55631044f1',
    'Content-Type': 'application/json'
  }
});