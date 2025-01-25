export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Lakukan permintaan GET ke API untuk membuat email sementara
      const response = await fetch('https://api.paxsenix.biz.id/tempmail/create', {
        method: 'GET',
        headers: {
          'accept': '*/*'
        }
      });

      // Ambil data dari API
      const data = await response.json();

      if (response.ok) {
        // Mengirimkan email yang diterima dari response ke frontend
        res.status(200).json({ email: data.email });
      } else {
        res.status(response.status).json({ message: 'Failed to fetch email', error: data });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
