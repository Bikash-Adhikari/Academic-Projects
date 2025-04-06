
import express from 'express';

const app = express();
const port = 3000;



// app.get('/', (req, res) => {
//     res.send("Hello I am Biksh Adhikari")
// });


//use middleware for JSON parsing
app.use(express.json());

let burgerData = [];
let nextId = 1;



//create a product
app.post('/burgers', (req, res) => {
    const { name, price } = req.body;
    const newBurger = { id: nextId++, name, price, }
    burgerData.push(newBurger);
    res.status(201).send(newBurger);
})


//list all items
app.get('/burgers', (req, res) => {
    res.status(202).send(burgerData);
})




// list single item
app.get('/burgers/:id', (req, res) => {
    const bugr = burgerData.find(b => b.id === parseInt(req.params.id));

    if (!bugr) {
        return res.status(404).send("Burger ID nnot found")
    }

    res.status(201).send(bugr);
})




//edit & update item by id
app.put('/burgers/:id', (req, res) => {
    const bugr = burgerData.find(b => b.id === parseInt(req.params.id));
    if (!bugr) {
        res.status(404).send("Burger not found!!!")
    }

    const { name, price } = req.body;
    bugr.name = name;
    bugr.price = price;

    res.status(200).send(bugr);
});




// Delete item by id
app.delete('/burgers/:id', (req, res) => {
    const index = burgerData.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).send("Burger item not found !!!")
    }

    burgerData.splice(index, 1);
    res.status(200).send("Deleted")
})







app.listen(port, () => {
    console.log(`Server is running at  port: ${port}`)
});