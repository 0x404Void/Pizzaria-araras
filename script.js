let carrinho = [];
let total = 0;

function adicionar(nome, preco) {
  carrinho.push({ nome, preco });
  total += preco;
  atualizarCarrinho();
}

function remover(index) {
  total -= carrinho[index].preco;
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  let lista = document.getElementById("carrinho");
  lista.innerHTML = "";

  carrinho.forEach((produto, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      ${produto.nome} - R$ ${produto.preco}
      <button onclick="remover(${index})">remover</button>
    `;

    lista.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

function finalizarpedido() {

  if (carrinho.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  let mensagem = "Olá, gostaria de pedir:%0A";

  carrinho.forEach(produto => {
    mensagem += `- ${produto.nome} (R$ ${produto.preco})%0A`;
  });

  mensagem += `%0ATotal: R$ ${total}`;

  let numero = "5585981957476"; // coloque o número correto aqui

  window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
}