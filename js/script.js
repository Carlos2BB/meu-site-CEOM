let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let taxaEntrega = 5;

function salvar() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function addCarrinho(nome, preco) {
    let item = carrinho.find(p => p.nome === nome);
    if (item) item.qtd++;
    else carrinho.push({ nome, preco, qtd: 1 });
    salvar();
    atualizarCarrinho();
}

function aumentar(i) {
    carrinho[i].qtd++;
    salvar();
    atualizarCarrinho();
}

function diminuir(i) {
    if (carrinho[i].qtd > 1) carrinho[i].qtd--;
    else carrinho.splice(i, 1);
    salvar();
    atualizarCarrinho();
}

function total() {
    let soma = carrinho.reduce((t, i) => t + i.preco * i.qtd, 0);
    return soma + taxaEntrega;
}

function atualizarCarrinho() {
    let lista = document.getElementById("listaCarrinho");
    let totalSpan = document.getElementById("total");
    if (!lista) return;

    lista.innerHTML = "";
    carrinho.forEach((item, i) => {
        lista.innerHTML += `
        <li>
            ${item.nome} - R$ ${item.preco}<br>
            <div class="qtd">
                <button onclick="diminuir(${i})">-</button>
                ${item.qtd}
                <button onclick="aumentar(${i})">+</button>
            </div>
        </li>`;
    });

    totalSpan.innerText = total().toFixed(2);
}

function atualizarFinal() {
    let listaFinal = document.getElementById("listaFinal");
    let totalFinal = document.getElementById("totalFinal");
    if (!listaFinal) return;

    listaFinal.innerHTML = "";
    carrinho.forEach(item => {
        listaFinal.innerHTML += `<li>${item.nome} (${item.qtd}x)</li>`;
    });
    totalFinal.innerText = total().toFixed(2);
}

function mostrarPagamento() {
    document.getElementById("infoPix").style.display = "none";
    document.getElementById("infoCartao").style.display = "none";

    let tipo = document.getElementById("pagamento").value;
    if (tipo === "Pix") document.getElementById("infoPix").style.display = "block";
    if (tipo === "Cartao") document.getElementById("infoCartao").style.display = "block";
}

function gerarPedido() {
    if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    let nome = document.getElementById("nome").value;
    let telefone = document.getElementById("telefone").value;
    let endereco = document.getElementById("endereco").value;
    let pagamento = document.getElementById("pagamento").value;

    if (!nome || !telefone || !endereco || !pagamento) {
        alert("Preencha todos os dados!");
        return;
    }

    let texto = "🍔 PEDIDO - X SALADA\n\n";

    carrinho.forEach(item => {
        texto += `- ${item.nome} | ${item.qtd}x | R$ ${(item.preco * item.qtd).toFixed(2)}\n`;
    });

    texto += `\n🚚 Taxa de entrega: R$ 5,00`;
    texto += `\n💰 TOTAL: R$ ${total().toFixed(2)}\n`;

    texto += `\n👤 Nome: ${nome}`;
    texto += `\n📞 Telefone: ${telefone}`;
    texto += `\n🏠 Endereço: ${endereco}`;
    texto += `\n💳 Pagamento: ${pagamento}`;

    document.getElementById("pedidoTexto").value = texto;
}

function copiarPedido() {
    let campo = document.getElementById("pedidoTexto");
    campo.select();
    document.execCommand("copy");
    alert("Pedido copiado!");
}

window.onload = () => {
    atualizarCarrinho();
    atualizarFinal();
};
