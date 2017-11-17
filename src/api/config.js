export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options = {
  param: 'jsonpCallback' // 和后台约定的一个参数，后台会返回这个参数所命名的方法
}

export const ERR_OK = 0