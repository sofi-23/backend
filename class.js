class Contenedor {
    constructor(productos) {
        this.productos = [
            {
                id: 1,
                title: "mouse",
                price: 50,
                thumbnail: "https://farmacityar.vteximg.com.br/arquivos/ids/193519-600-600/210425_mouse-inalambrico-simplicity-x-1-un_imagen-2.jpg?v=637152371392800000"
            },
            {
                id: 2,
                title: "tv",
                price: 1000,
                thumbnail: "https://farmacityar.vteximg.com.br/arquivos/ids/193519-600-600/210425_mouse-inalambrico-simplicity-x-1-un_imagen-2.jpg?v=637152371392800000"
            },
            {
                id: 3,
                title: "keyboard",
                price: 100,
                thumbnail: "https://farmacityar.vteximg.com.br/arquivos/ids/193519-600-600/210425_mouse-inalambrico-simplicity-x-1-un_imagen-2.jpg?v=637152371392800000"
            }
        ]
    }
    
     save(objeto) {   
        const lastProduct = this.productos[this.productos.length - 1];
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