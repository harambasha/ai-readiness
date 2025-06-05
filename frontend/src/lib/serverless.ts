import { NextApiRequest, NextApiResponse } from 'next';

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export function createServerlessHandler(handler: ApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
} 