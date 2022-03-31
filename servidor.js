const express = require("express")
const Contenedor = require("./class.js")
const app = express()
const { Router } = express
const router = Router()
let products = new Contenedor()
const { Server: IOServer } = require("socket.io") //importando socket
const { Server: HttpServer } = require("http")
const fs = require("fs")

const { engine: handlebars } = require('express-handlebars');
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

let messages = [];


app.use(express.static("./public"))

app.set('view engine', 'hbs');
app.set('views', __dirname + '/public');

app.engine(
	'hbs',
	handlebars({
		layoutsDir: __dirname + '/public',
		partialsDir: __dirname + '/views/partials',
		defaultLayout: 'index',
		extname: 'hbs',
	})
);

/*
app.use(express.json()) // para poder usar el .body
app.use(express.urlencoded({extended: true}))// para poder usar el .body
*/
httpServer.listen(8080, () => console.log("Server running on http://localhost:8080"))

httpServer.on("error", ()=> {console.log("Server error")})

app.use("", router)


router.get("/", (req, res)=> {
    let productos = products.getAll()
    res.render("index", { productos, messages })
})

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado' );
	socket.emit("productos", products)
	socket.on('new-product', data => {
	
		products.save(data)
		io.sockets.emit("productos", products)
	})
	socket.on('new-message', data => {
		messages.push(data)
		console.log([...messages])
		let stringMessages = JSON.stringify(messages, 2, null)
		fs.writeFile("./messages.txt", stringMessages, error => {
			if(error) {
				console.log(error)
			}else {
				console.log("success!")
			}
		})
		io.sockets.emit("messages", messages)
	})
	
});


/*
router.post('/', (req, res) => {
	const { name, price, thumbnail } = req.body;
    console.log("POST")
	products.save({
		name,
		price,
		thumbnail,
	});
    console.log(products)

	res.redirect('/');
});

*/
