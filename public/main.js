const socket = io.connect();


socket.on("productos", data => {
    const fetchDocument = async () => {
            const response = await fetch("./public/index.hbs")
            const template =  await response.text()
            template = Handlebars.compile(template)
            template({data})
            console.log(template)
    }
    fetchDocument()   
    }
        )

function addProduct (e) {
    const newProduct = {
        title: document.getElementById("name").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }   
    socket.emit("new-product", newProduct)
}

function sendMessage(e) {
    const newMessage = {
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        date: moment().format('DD/MM/YYYY, hh:mm:ss')
    }
    console.log(newMessage)
    socket.emit("new-message", newMessage)
}