const express = require('express')
const cors = require("cors")
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cors())

let itemList = []
let currentId = 1;

app.get('/', (req, res) => {
    res.status(200).json({
        data: itemList,
        message: 'Data Featch succesfully'
    })
})

app.post('/add', (req, res) => {
    console.log(req.body)
    const { assignedTo, status, dueDate, priority, description } = req.body

    if (!assignedTo || !status || !priority) {
        return res.status(400).json({
            message: 'Invalid input'
        });
    }

    const taskItem = { id: currentId++, assignedTo, status, dueDate, priority, description }
    itemList.push(taskItem)

    res.status(201).json({
        data: [...itemList],
        message: "Record add successfully"
    })
})

app.put('/update/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = itemList.findIndex(i => i.id === itemId);

    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' });
    }

    const { assignedTo, status, dueDate,priority, description } = req.body;

    if (!assignedTo || !status || !priority) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    itemList[itemIndex] = { id: itemId, assignedTo, status, dueDate,priority, description };

    res.status(200).json({
        message: "Data updated successfully",
        data: [...itemList]
    });
});

app.delete("/delete/:id", (req, res) => {
    const itemId = parseInt(req.params.id)
    const itemIndex = itemList.findIndex(i => i.id === itemId)

    if (itemIndex === -1) {
        res.status(404).json({
            message: "Item not found"
        })
    }

    itemList.splice(itemIndex, 1);
    res.status(200).json({
        message: "Record delete successfully",
        data: [...itemList]
    })

})


app.listen(PORT, () => {
    console.log(`server is runnint on port : ${PORT}`)
})