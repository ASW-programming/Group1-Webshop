const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config({ path: '../.env' });

const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID
};


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// hämtar våra produkter
app.get('/api/products', async (req, res) => {
    try {
        const productCollection = db.collection('products');
        const allProductsSnapshot = await productCollection.get();

        if (allProductsSnapshot.empty) {
            return res.status(200).json([])
        }

        let products = [];

        allProductsSnapshot.forEach(product => {
            products.push({
                id: product.id, ...product.data()
            })
        })

        return res.status(200).json(products);

    } catch (error) {
        console.log('Fel vid hämtning av todos');
        res.status(500).send('något gick fel på servern');
    }
})

app.get('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id

        const productDoc = db.collection('products').doc(productId)
        const productSnapshot = await productDoc.get()

        if (!productSnapshot.exists) {
            return res.status(404).send('There is no product with this id')
        }

        return res.status(200).json({ id: productSnapshot.id, ...productSnapshot.data() })

    } catch (error) {
        console.log('Fel vid hämtning av produkt data')
        res.status(500).send('Ett fel inträffade')
    }
})

// ---------------------------------------------------------
// ENDPOINT 1: POST /api/products (För en produkt i taget)
// ---------------------------------------------------------

app.post('/api/addProduct', async (req, res) => {
    try {
        const productData = req.body

        // Enkel validering
        if (!productData.name || !productData.price) {
            return res.status(400).json({ error: 'Namn och pris är obligatoriska fält.' })
        }

        // Lägg till i Firestore-kollektionen 'products'
        const docRef = await db.collection('products').add(productData)

        res.status(201).json({
            message: 'Produkt skapad!',
            id: docRef.id,
            product: productData,
        })
    } catch (error) {
        console.error('Fel vid tillägg av produkt:', error)
        res.status(500).json({ error: 'Ett internt serverfel uppstod.' })
    }
})

// ---------------------------------------------------------
// ENDPOINT 2: POST /api/products/bulk (För att skicka in hela arrayen)
// ---------------------------------------------------------
app.post('/api/products/bulk', async (req, res) => {
    try {
        const productsArray = req.body

        if (!Array.isArray(productsArray)) {
            return res.status(400).json({ error: 'Body måste vara en JSON-array.' })
        }

        // Använder en batch för att skriva alla på en gång effektivt
        const batch = db.batch()

        productsArray.forEach(product => {
            // Skapar en ny referens med ett autogenererat ID
            const docRef = db.collection('products').doc()
            batch.set(docRef, product)
        })

        await batch.commit()

        res.status(201).json({
            message: `${productsArray.length} produkter tillagda i databasen via batch!`,
        })
    } catch (error) {
        console.error('Fel vid batch-tillägg:', error)
        res.status(500).json({ error: 'Ett internt serverfel uppstod.' })
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});












