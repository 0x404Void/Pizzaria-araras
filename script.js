let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];


function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function toggleCarrinho() {
    const painel = document.getElementById("painel-carrinho");
    const overlay = document.getElementById("overlay");

    painel.classList.toggle("ativo");
    overlay.classList.toggle("ativo");
}

function adicionar(nome, preco) {
  carrinho.push({
    nome: nome,
    preco: Number(preco)
  });

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

    total += Number(produto.preco);

    let li = document.createElement("li");

    li.innerHTML = `
      ${produto.nome} - R$ ${Number(produto.preco).toFixed(2)}
      <button onclick="remover(${index})">remover</button>
    `;

    lista.appendChild(li);
  });

  document.getElementById("total").innerText = total.toFixed(2);
}

function atualizarContador() {
    const contador = document.getElementById("contador");

    if (contador) {
        contador.innerText = carrinho.length;
    }
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
    atualizaContador();
});