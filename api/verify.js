export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, reason: 'WRONG_METHOD' });
  }

  const { token } = req.body;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!token) {
    return res.status(400).json({ success: false, reason: 'NO_TOKEN' });
  }

  if (!secretKey) {
    return res.status(500).json({ success: false, reason: 'MISSING_SECRET_KEY' });
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    if (!data.success) {
      return res.status(200).json({ success: false, reason: 'BOT_OR_INVALID_TOKEN', details: data['error-codes'] });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ success: false, reason: 'CONNECTION_FAILED' });
  }
}
