let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let taxaEntrega = 5;
let desconto = 0;

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
    else carrinho.splice(i,1);
    salvar();
    atualizarCarrinho();
}

function total() {
    let soma = carrinho.reduce((t,i)=>t+i.preco*i.qtd,0);
    return soma + taxaEntrega - desconto;
}

function atualizarCarrinho() {
    let lista = document.getElementById("listaCarrinho");
    let totalSpan = document.getElementById("total");
    if (!lista) return;

    lista.innerHTML = "";
    carrinho.forEach((item,i)=>{
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

function aplicarCupom() {
    let cupom = document.getElementById("cupom").value;
    if (cupom === "X10") {
        desconto = 10;
        alert("Cupom aplicado! R$10 OFF");
    } else {
        desconto = 0;
        alert("Cupom inválido");
    }
    atualizarCarrinho();
    atualizarFinal();
}

function atualizarFinal() {
    let listaFinal = document.getElementById("listaFinal");
    let totalFinal = document.getElementById("totalFinal");
    if (!listaFinal) return;

    listaFinal.innerHTML = "";
    carrinho.forEach(item=>{
        listaFinal.innerHTML += `<li>${item.nome} (${item.qtd}x)</li>`;
    });
    totalFinal.innerText = total().toFixed(2);
}

window.onload = ()=>{
    atualizarCarrinho();
    atualizarFinal();
};

function enviarWhatsApp() {
    let hora = new Date().getHours();
    if (hora < 18 || hora > 23) {
        alert("Estamos fechados! Funcionamos das 18h às 23h.");
        return;
    }

    let nome = document.getElementById("nome").value;
    let telefone = document.getElementById("telefone").value;
    let endereco = document.getElementById("endereco").value;
    let pagamento = document.getElementById("pagamento").value;

    if (!nome || !telefone || !endereco) {
        alert("Preencha todos os dados!");
        return;
    }

    let msg = "🍔 *PEDIDO X SALADA* %0A%0A";
    carrinho.forEach(i=>{
        msg += `• ${i.nome} - ${i.qtd}x%0A`;
    });

    msg += `%0A🚚 Taxa: R$ 5,00`;
    msg += `%0A💸 Desconto: R$ ${desconto}`;
    msg += `%0A💰 *Total:* R$ ${total().toFixed(2)}`;
    msg += `%0A%0A👤 ${nome}`;
    msg += `%0A📞 ${telefone}`;
    msg += `%0A🏠 ${endereco}`;
    msg += `%0A💳 ${pagamento}`;

    window.open("https://wa.me/55SEUNUMEROAQUI?text="+msg,"_blank");

    localStorage.clear();
    document.getElementById("confirmacao").innerText =
        "✅ Pedido enviado com sucesso!";
}
