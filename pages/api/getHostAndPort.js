// /pages/api/getHostAndPort.js
export default function handler(req, res) {
    const host = req.headers.host; // Get the host from the request
    const port = req.connection.localPort; // Get the port from the request
  
    res.status(200).json({ host, port });
  }