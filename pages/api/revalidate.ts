// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // check for secret to confirm this is a valid request
  if(req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token'})
  }
  try {
    // Revalidate our index page - Regenerate our index route showing the images
    await res.unstable_revalidate('/')
    return res.json({revalidate:true})
  } catch(err){
    // if there was an error, Next.js will continue
    // to show the last successifully generated page
    return res.status(500).json({ message: 'Error revalidating'})
  }
}
