let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function aumentar(index) {
  carrinho[index].quantidade += 1;

  salvarCarrinho();
  atualizarCarrinho();
  atualizarContador();
}

function diminuir(index) {
  if (carrinho[index].quantidade > 1) {
    carrinho[index].quantidade -= 1;
  } else {
    carrinho.splice(index, 1);
  }

  salvarCarrinho();
  atualizarCarrinho();
  atualizarContador();
}


function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function toggleCarrinho() {
    const painel = document.getElementById("painel-carrinho");
    const overlay = document.getElementById("overlay");

    painel.classList.toggle("ativo");
    overlay.classList.toggle("ativo");
}

function adicionar(nome, preco, imagem) {
  const itemExistente = carrinho.find(item => item.nome === nome);

  if (itemExistente) {
    itemExistente.quantidade +=1;
  } else {
  carrinho.push({
    nome: nome,
    preco: Number(preco),
    imagem: imagem,
    quantidade: 1
  });
  }

  salvarCarrinho();
  atualizarCarrinho();
  atualizarContador();
}

function remover(index) {
  total -= carrinho[index].preco;
  carrinho.splice(index, 1);

  salvarCarrinho();
  atualizarCarrinho();
  atualizarContador();
}

function atualizarCarrinho() {

    let lista = document.getElementById("carrinho");
    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((produto, index) => {

      let subtotal = produto.preco * produto.quantidade;
      total += subtotal;

        let li = document.createElement("li");

        li.innerHTML = `
          <div class="item-carrinho">
                <img src="${produto.imagem}" class="img-carrinho">
                <div class="info-item">
                    <p class="nome-item">${produto.nome}</p>
                    <p>Quantidade: x${produto.quantidade}</p>
                    <p class="preco-item">
                        R$ ${subtotal.toFixed(2)}
                    </p>
                </div>

                <div class="acoes">
                <button onclick="diminuir(${index})">➖</button>
                <button onclick="aumentar(${index})">➕</button>
                <button onclick="remover(${index})">❌</button>
            </div>
        </div>
        `;

        lista.appendChild(li);

    });

    document.getElementById("total").innerText = total.toFixed(2);
}

function atualizarContador() {
    let contador = document.getElementById("contador");

    let totalItens = 0;

    carrinho.forEach(item => {
      totalItens += item.quantidade;
    });

    contador.innerText = totalItens;
}

function animarContador() {
    const contador = document.getElementById("contador");

    contador.classList.add("animar");

    setTimeout(() => {
        contador.classList.remove("animar");
    }, 200);
}

function finalizarpedido() {

  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  let mensagem = "Olá, gostaria de pedir:%0A";
  let total = 0;

  carrinho.forEach(produto => {
    mensagem += `- ${produto.nome} (R$ ${Number(produto.preco).toFixed(2)})%0A`;
    total += Number(produto.preco);
  });

  mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;

  let numero = "5585981957476";

  window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
}

document.addEventListener("DOMContentLoaded", function () {
    atualizarCarrinho();
    atualizarContador();
});