const express = require("express")

const app = express()
const PORT = 8080

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
// Endpoint

app.get('/', (req, res) => {
    res.jsonp({ mensaje: "GET API"})
})

app.post('/', (req, res) => {
    res.jsonp({ mensaje: "POST API"})
})

app.put('/', (req, res) => {
    res.jsonp({ mensaje: "PUT API"})
})

app.delete('/', (req, res) => {
    res.jsonp({ mensaje: "DELETE API"})
})

// Tarea

let tasks = [
    { id: 1, titulo: "Estudiar los metodos"},
    { id: 2, titulo: "Repasar express"},
    { id: 3, titulo: "Realizar un proyecto"}
]
app.get('/tarea', (req, res) => {
    res.jsonp({tasks})
})

app.get('/tarea/:id', (req,res) => {
const taskID = parseInt(req.params.id)
const task = tasks.find((task) => task.id === taskID)

if (task) {
    res.json(task)
} else {
    res.status(404).json({MENSAJE: "Tarea no encontrada"})
}
})

app.post('/tarea', (req,res) => {
    const { titulo } = req.body
    const newTask = {id: tasks.length + 1, titulo: titulo || "Nueva tarea"}
    tasks.push(newTask)
    res.status(201).json(newTask)
})

app.put('/tarea/:id', (req, res) => {
    const taskID= parseInt(req.params.id)
    const task = tasks.find((task) => task.id === taskID)
    if (task) {
        const { titulo } = req.body
        task.titulo = titulo
        res.json(task)
     } else {
            res.status(404).json( {Mensaje: "No existe esta tarea"})
        }     
})

app.delete(`/tarea/:id`, (req, res) => {
    const taskID = parseInt(req.params.id)
    tasks = tasks.filter((task) => task.id !== taskID)
    res.json({ MENSAJE: `Tarea con el id: ${taskID} fue eliminada correctamente`})
})







app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})