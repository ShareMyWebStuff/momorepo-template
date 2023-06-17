/* eslint-disable */
async function handler (event) {
    var request = event.request
    var uri = request.uri
  
    console.log ('hello')

    if (uri.endsWith('/')) {
      request.uri += 'index.html'
    } else if (!uri.includes('.')) {
      request.uri += '.html'
    }
  
    return request
  }

export default { handler }