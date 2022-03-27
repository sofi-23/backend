const socket = io.connect();

socket.on("productos", data => console.log(data))

function addProduct (e) {
    const newProduct = {
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value
    }   
    console.log(newProduct)
    socket.emit("new-product", newProduct)
    return false
}

