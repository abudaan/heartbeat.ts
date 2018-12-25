// fetch helpers

export function status(response:Response) {
  if(response.status >= 200 && response.status < 300){
    return Promise.resolve(response)
  }
  return Promise.reject(new Error(response.statusText))

}

export function json(response:Response){
  return response.json()
}

export function arrayBuffer(response:Response){
  return response.arrayBuffer()
}


export function fetchJSON(url:string){
  return new Promise((resolve, reject) => {
    // fetch(url, {
    //   mode: 'no-cors'
    // })
    fetch(url)
    .then(status)
    .then(json)
    .then(data => {
      resolve(data)
    })
    .catch(e => {
      reject(e)
    })
  })
}

export function fetchArraybuffer(url:string){
  return new Promise((resolve, reject) => {
    // fetch(url, {
    //   mode: 'no-cors'
    // })
    fetch(url)
    .then(status)
    .then(arrayBuffer)
    .then(data => {
      resolve(data)
    })
    .catch(e => {
      reject(e)
    })
  })
}
