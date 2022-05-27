const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method
  if (url === '/') {
    res.write(`
    <html><head>
    <title>Enter Message</title>
    <head>
    <body>
    <form action="/message" method="POST">
    <label>First Name :</label>
    <input type="text" name="fName"><br><br>
    <label>Last Name :</label>
    <input type="text" name="lName">
    <button type="submit">Send</button>
    </form>
    </body></html>
    `)

    return res.end()
  }

  if (url === '/message' && method === 'POST') {
    let data = []

    req.on('data', (chunk) => {
      console.log(chunk)
      data.push(chunk)

      console.log(`Printing data: ${data}`)
    })

    return req.on('end', () => {
      let parsedBody = Buffer.concat(data).toString()

      console.log('from line no.-39 :', parsedBody)

      fs.writeFileSync('message.json', parsedBody, (err) => {
        if (err) {
          console.log('Error writing file', err)
        } else {
          console.log('Successfully wrote file')
          res.statusCode = 302
          res.setHeader('Location', '/')
          return res.end()
        }
      })
    })
  }

  res.setHeader('Content-Type', 'text/html')
  res.write(`
  <html><head>
  <title>My First Page</title>
  <head>
  <body><h1>Hello from my Node.js Server!</h1></body>
  </html>`)

  res.end()
})

server.listen(3000)
