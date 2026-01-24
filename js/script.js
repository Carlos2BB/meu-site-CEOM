let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

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
    return carrinho.reduce((t,i)=>t+i.preco*i.qtd,0);
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

window.onload = ()=>{
    atualizarCarrinho();

    let listaFinal = document.getElementById("listaFinal");
    let totalFinal = document.getElementById("totalFinal");

    if (listaFinal) {
        carrinho.forEach(item=>{
            listaFinal.innerHTML += `<li>${item.nome} (${item.qtd}x)</li>`;
        });
        totalFinal.innerText = total().toFixed(2);
    }
};

function enviarWhatsApp() {
    let nome = nome.value;
    let telefone = telefone.value;
    let endereco = endereco.value;
    let pagamento = pagamento.value;

    let msg = "🍔 Pedido X Salada%0A%0A";
    carrinho.forEach(i=>{
        msg += `${i.nome} - ${i.qtd}x%0A`;
    });

    msg += `%0A💰 Total: R$ ${total().toFixed(2)}`;
    msg += `%0A👤 ${nome}`;
    msg += `%0A📞 ${telefone}`;
    msg += `%0A🏠 ${endereco}`;
    msg += `%0A💳 ${pagamento}`;

    window.open("https://wa.me/55SEUNUMEROAQUI?text="+msg);
}
