class Contenedor {
    constructor(productos) {
        this.productos = [
            {
                id: 1,
                title: "mouse",
                price: 50,
                thumbnail: "https://cdn3.iconfinder.com/data/icons/essential-pack/32/21-Mouse-512.png"
            },
            {
                id: 2,
                title: "tv",
                price: 1000,
                thumbnail: "https://cdn4.iconfinder.com/data/icons/48-bubbles/48/24.TV-512.png"
            },
            {
                id: 3,
                title: "keyboard",
                price: 100,
                thumbnail: "https://cdn2.iconfinder.com/data/icons/bitsies/128/Keyboard-512.png"
                
            }
        ]
    }
    
     save(objeto) {   
        const lastProduct = this.productos[this.productos.length - 1];
        console.log("SAVE")
		if (lastProduct) {
			objeto.id = lastProduct.id + 1;
		}     
		this.productos.push(objeto)
		return this.productos;
        }

    getAll() {
        return this.productos
    }

    getById(id) {
        if (this.productos.length > id || id > 1) {
            return this.productos[id-1]
        }else{
            return {error: "producto no encontrado"}
        }
    }
    replace(id, objeto) {
        objeto.id = id
        this.productos[id-1] = objeto
        return objeto
    }
    delete(id) {
        this.productos = this.productos.filter((i)=> i.id !== parseInt(id))
        return this.productos
    }
 

}

module.exports = Contenedor 