const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const url = req.url
  console.log(url)
  const method = req.method
  if (url === '/') {
    res.write(`
    <html>
    <head>
    <title>Enter Message</title>
    <head>
    <body>
    <form action="/message" method="POST">
    <input type="text" name="message">
    <button type="submit">Send</button>
    </form>
    </body>
    </html>
    `)

    return res.end()
  }
  if (url === '/message' && method === 'POST') {
    fs.writeFileSync('message.txt', 'DUMM')
    res.statusCode = 302
    res.setHeader('Location', '/')
    return res.end()
  }
})

server.listen(3000)
