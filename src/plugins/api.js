import fetch from './axios.js'

export function test(data){
  return fetch({
    url:'test',
    data
  })
}