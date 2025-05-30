
//classes
class Produto {
    constructor(nome, ingredientes, preco) {
        this.nome = nome;
        this.ingredientes = ingredientes;
        this.preco = preco;
    }

    toHtmlRow() {
        const labelIngredientes = this.ingredientes.toLowerCase().includes('pão') ? 'Ingredientes' : 'Descrição';
        
        return `
            <tr>
                <td data-label="Produto">${this.nome}</td>
                <td data-label="${labelIngredientes}">${this.ingredientes}</td>
                <td data-label="Preço">R$ ${this.preco.toFixed(2).replace('.', ',')}</td>
            </tr>
        `;
    }
}

//objetos
const cardapioHotDogs = [
    new Produto("HOT DOG SIMPLES", "Pão, Salsicha, Maionese, Catchup e Batata Palha", 15.00),
    new Produto("HOT DOG COMPLETO", "Pão, Salsicha, Molho de Carne ou Frango, Catchup, Maionese, Batata Palha", 17.00),
    new Produto("HOT DOG COMPLETO (BACON)", "Pão, Salsicha, Molho de Carne ou Frango, Catchup, Maionese, Batata Palha e Bacon", 18.00),
    new Produto("HOT DOG DUPLO", "Pão, 2 Salsichas, Molho de Carne ou Frango, Catchup, Maionese, Batata-Palha", 18.00),
    new Produto("HOT DOG DUPLO (BACON)", "Pão, 2 Salsichas, Molho de Carne ou Frango, Catchup, Maionese, Batata-Palha e Bacon", 19.00)
];

const cardapioSanduiches = [
    new Produto("Misto Quente", "pão, presunto, mussarela, tomate, alface", 18.00),
    new Produto("Americano", "pão, ovo, presunto, mussarela, maionese", 18.00)
];

const cardapioHamburguer = [
    new Produto("X-Burger", "pão, hambúrguer, presunto, mussarela, maionese, catchup", 20.00),
    new Produto("X-Salada", "pão, hambúrguer, presunto, mussarela, tomate, alface, milho", 21.00),
    new Produto("X-Egg Salada", "pão, hambúrguer, presunto, mussarela, catchup, maionese, tomate, alface, milho, ovo", 22.00),
    new Produto("X-Egg Bacon Salada", "pão, hambúrguer, ovo, bacon, presunto, mussarela, tomate, alface, milho", 23.00),
    new Produto("X-Bacon", "pão, hambúrguer, bacon, presunto, mussarela", 21.00),
    new Produto("X-Bacon Salada", "pão, hambúrguer, bacon, presunto, mussarela, tomate, alface, milho", 22.00),
    new Produto("X-Tudo", "pão, hambúrguer, ovo, bacon, presunto, mussarela, tomate, alface, milho, batata-palha", 25.00)
];

const cardapioFileDeFrango = [
    new Produto("X-Frango", "Pão, maionese, catchup, filé frango, presunto e queijo", 20.00),
    new Produto("X-Frango Salada", "pão, filé de frango, presunto, mussarela, tomate, alface, milho", 23.00),
    new Produto("X-Frango Tudo", "pão, filé de frango, ovo, bacon, presunto, mussarela, tomate, alface, milho, batata-palha", 28.00)
];

const cardapioBebidas = [
    new Produto("Água mineral lindoya sem gás", "-", 3.00), 
    new Produto("Fanta laranja, uva lata", "Lata 350ml", 6.00),
    new Produto("Sprite lata", "Lata 350ml", 6.00),
    new Produto("Coca Cola lata", "Lata 350ml", 6.00),
    new Produto("Pepsi lata", "Lata 350ml", 6.00),
    new Produto("Schweppes lata", "Lata 350ml", 6.00),
    new Produto("Pic NIC", "600ml", 5.00),
    new Produto("Coca Cola", "1 litro", 10.00),
    new Produto("Pic NIC", "2 Litros", 7.00),
    new Produto("Poti", "2 Litros", 10.00),
    new Produto("Roler", "2 Litros", 12.00),
    new Produto("Coca Cola", "2 Litros", 14.00)
];



function carregarSecao(idTbody, itens) {
    const tbody = document.getElementById(idTbody);
    let htmlContent = '';
    itens.forEach(produto => {
        htmlContent += produto.toHtmlRow();
    });
    tbody.innerHTML = htmlContent;
}
//mostrar cardapio
function mostrarSecao(targetId) {
    const todasAsSecoes = document.querySelectorAll('.categoria-cardapio');
    todasAsSecoes.forEach(secao => {
        secao.classList.remove('show');
        setTimeout(() => {
            if (!secao.classList.contains('show')) {
                secao.style.display = 'none';
            }
        }, 500);
    });

    const secaoAlvo = document.getElementById(targetId);
    if (secaoAlvo) {
        secaoAlvo.style.display = 'block'; 
        setTimeout(() => {
            secaoAlvo.classList.add('show');
        }, 10);
    }

    const todosOsBotoes = document.querySelectorAll('.btn-navegacao');
    todosOsBotoes.forEach(btn => {
        btn.classList.remove('active');
    });
    const botaoClicado = document.querySelector(`.btn-navegacao[data-target="${targetId}"]`);
    if (botaoClicado) {
        botaoClicado.classList.add('active');
    }
}
//monta o cardapio
function inicializarCardapioInterativo() {
    carregarSecao('cardapio-hotdogs', cardapioHotDogs);
    carregarSecao('cardapio-sanduiches', cardapioSanduiches);
    carregarSecao('cardapio-hamburguer', cardapioHamburguer);
    carregarSecao('cardapio-filedefrango', cardapioFileDeFrango);
    carregarSecao('cardapio-bebidas', cardapioBebidas);

    const botoesNavegacao = document.querySelectorAll('.btn-navegacao');
    botoesNavegacao.forEach(botao => {
        botao.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = botao.dataset.target;
            mostrarSecao(targetId);
        });
    });


    const todasAsSecoes = document.querySelectorAll('.categoria-cardapio');
    todasAsSecoes.forEach(secao => {
        secao.style.display = 'none'; 
    });

    
    if (cardapioHotDogs.length > 0) { 
        mostrarSecao('hotdogs');
    }
}

document.addEventListener('DOMContentLoaded', inicializarCardapioInterativo);