class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById("product-list");
        const element = document.createElement("div");
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product</strong> ${product.name}
                    <strong>Price</strong> ${product.price}
                    <strong>Year</strong> ${product.year}
                    <a href="#" name="delete" class="btn btn-danger">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
        this.resetForm();
    }

    resetForm() {
        document.getElementById("product-form").reset();
    }

    deleteProduct(element) {
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto remonivo','danger');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        //mostrando en el dom
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div,app);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 2000);
    }
}

//DOM events

document.getElementById("product-form").addEventListener("submit", (e) => {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const year = document.getElementById("year").value;
    const product = new Product(name, price, year);
    const ui = new UI();

    if(name === '' || price ==='' || year===''){
        return ui.showMessage('Complete los campos', 'info');
    }
    ui.addProduct(product);
    ui.showMessage('producto agregado satisfactoriamente', 'success');
    e.preventDefault();
});

document.getElementById("product-list").addEventListener("click", e => {
    //console.log(e.target);
    const ui = new UI();

    ui.deleteProduct(e.target);
});
