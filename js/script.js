let pedido = [];
let total = 0;

function adicionar(nome, preco) {
    pedido.push({ nome, preco });
    total += preco;
    localStorage.setItem("pedido", JSON.stringify(pedido));
    localStorage.setItem("total", total);
    alert(nome + " adicionado!");
}

window.onload = function () {
    let lista = document.getElementById("listaPedido");
    let totalSpan = document.getElementById("total");

    if (lista) {
        let pedidoSalvo = JSON.parse(localStorage.getItem("pedido")) || [];
        let totalSalvo = localStorage.getItem("total") || 0;

        pedidoSalvo.forEach(item => {
            let li = document.createElement("li");
            li.innerText = item.nome + " - R$ " + item.preco;
            lista.appendChild(li);
        });

        totalSpan.innerText = totalSalvo;
    }
};
