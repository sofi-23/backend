const express = require("express")
const Contenedor = require("./class.js")
const app = express()
const { Router } = express
const router = Router()
let products = new Contenedor()
const { engine: handlebars } = require('express-handlebars');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.engine(
	'hbs',
	handlebars({
		layoutsDir: __dirname + '/views/layouts',
		partialsDir: __dirname + '/views/partials',
		defaultLayout: 'index',
		extname: 'hbs',
	})
);

app.use(express.static('public'));
app.use(express.json()) // para poder usar el .body
app.use(express.urlencoded({extended: true}))// para poder usar el .body

app.listen(8080, ()=> {
    console.log("Listening to server")
})

app.on("error", ()=> {console.log("Server error")})

app.use("", router)

router.get("/productos", (req, res)=> {
    let productos = products.getAll()
    res.render("list", { productos })
  
})
router.get("/", (req, res)=> {

	res.render('form');
})


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


