

















app.route('/orders')
    .get(async (req, res) => {

        try {

            const ordersCollection = db.collection('orders')

            snapshot = await ordersCollection.get()

            if (snapshot.empty) {
                return res.status(200).json([])
            }

            const orders = []

            snapshot.forEach((order) => {
                orders.push({
                    id: order.id,
                    ...order.data()
                })
            })

            res.status(200).json(orders)

        } catch (error) {

            console.log('Something wrong with get-endpoint.')
            res.status(500).send('Something wrong in the server.')

        }
    })
    .post(async (req, res) => {

        try {

            const orders = req.body

            const docRef = await db.collection('orders').add({
                customer: orders.customer,
                items: orders.items,
                pris: orders.pris
            })

            const newOrder = {
                id: docRef.id,
                customer: orders.customer,
                items: orders.items,
                pris: orders.pris,
                createdAt: admin.firestore.FieldValue.serverTimeStamp(),
            }

            res.status(200).json({
                id: docRef.id,
                ...newOrder
            })

        } catch (error) {

            console.log('Something wrong with post-endpoint')
            res.status(500).send('Something wrong in the server.')

        }
    })