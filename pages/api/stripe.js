import Stripe from 'stripe';
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default async function handler(req, res) {
   if(req.method === 'POST'){
    console.log(req.body);
    try{
        //Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            submit_type: 'pay',
            mode:'payment',
            payment_method_types : ['card'],
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'GB', 'NO', 'KR'],
            },
            allow_promotion_codes : true,
            shipping_options : [
                {shipping_rate: 'shr_1LcRJ2Dxx03WMrQhCdcKH8fp'}
            ],
            line_items: req.body.map((item) => {
                return {
                    price_data: { 
                        currency: 'usd',
                        product_data: {
                            name: item.title,
                            images: [item.image.data.attributes.formats.thumbnail.url],
                        },
                        unit_amount: item.price * 100, 
                    },
                    adjustable_quantity:{
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity,
                };
            }),
            //Bring people to the success or failed page
            success_url: `${req.headers.origin}/success`,
            cancel_url: `${req.headers.origin}/canceled`,
        });
        res.status(200).json(session);
    } catch (error) {
        res.status(error.statusCode || 500).json(error.message);
    }
   }
}