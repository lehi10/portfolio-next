// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { API_TRAVELTIME_URL_TIME_MAP } from 'constants/API_URLS';
import type { NextApiRequest, NextApiResponse } from 'next';
import NodeCache from 'node-cache';

const cache = new NodeCache({
    stdTTL: 3000,
  });

  
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const lat = req.body.lat;
    const lng = req.body.lng;
    const transportation = req.body.transportation;
    const time= req.body.time;

    const body = {
        arrival_searches:[
            {
                id:"isochrone-0",
                coords:{
                    lat: lat,
                    lng: lng
                },
                arrival_time:"2023-05-08T14:00:00.000Z",
                travel_time: time,
                transportation:{
                    type: transportation, // "public_transport", "walking"
                },
                single_shape: false,
            }
        ]    
    };

    const cacheEntry = (cache.get(`${lat},${lng},${time},${transportation}`) as string) || null;
    var data: any | null = cacheEntry;

    if(!data){
        data = await fetch(API_TRAVELTIME_URL_TIME_MAP,{
            headers: {
                'Content-Type': 'application/json',
                'X-Application-Id': `${process.env.TRAVELTIME_APP_ID}`,
                'X-Api-Key': `${process.env.TRAVELTIME_API_KEY}`,
                'Accept': 'application/geo+json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        }).then((res)=>res.json())
    }


    
    res.status(200).json({ data: data });
}
