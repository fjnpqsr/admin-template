export const mapObject = (object, handle, context) => {
  if (object) {
    if (Array.isArray(object)) {
      console.log('please use Object but not Array')
      return false
    }
    let result = {}
    Object.keys(object).map(item => {
      if (typeof (object[item]) === 'string') {
        result[item] = handle(object[item])
      } else {
        result[item] = mapObject(object[item], handle, context)
      }
    })
    return result
  }
}
