import fetch from './axios.js'

export function test(data){
  return fetch({
    url:'/test',
    data
  })
}

export function login(data){
  return fetch({
    url:'/login',
    data
  })
}