const BASE_URL = 'http://localhost:3000';

export const request = (url: string, options?: object) => {
  return fetch(`${BASE_URL}${url}`, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} - ${res.statusText}`)
      }

      console.log(res.text);
      
      return res.json()
    })
}

export const post = (url: string, data: object) => {
  return request(url, {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
}

export const patch = (url: string, data: object) => {
  return request(url, {
    method: 'PATCH',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
}

export const remove = (url: string) => {
  return request(url, {method: 'DELETE'})
}