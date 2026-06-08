import DefinicoesModel from "./js/model/DefinicoesModel.js";
import DefinicoesView from "./js/view/DefinicoesView.js";

document.addEventListener("DOMContentLoaded", () => {
    const definicoesModel = new DefinicoesModel();
    new DefinicoesView(definicoesModel);
});

// ==========================================================================
// Loja Attentus - Dados, filtragem dinâmica e estado
// ==========================================================================

/**
 * Estrutura de dados de todos os itens da loja.
 * Cada item guarda: id, nome, preço, imagem, categoria e se está equipado.
 * Esta é a única fonte de verdade — a grelha e o avatar são gerados a partir dela.
 */
const SHOP_ITEMS = [
  // ---- Chapéus ----
  { id: 'chapeus-1', name: 'Boné Roxo', price: 10, image: 'assets/img/bone.png', category: 'chapeus', equipped: true },
  { id: 'chapeus-2', name: 'Auscultadores', price: 10, image: 'assets/img/auscultadores.png', category: 'chapeus', equipped: false },
  { id: 'chapeus-3', name: 'Cartola', price: 10, image: 'assets/img/cartola.png', category: 'chapeus', equipped: false },
  { id: 'chapeus-4', name: 'Coroa', price: 10, image: 'assets/img/coroa.png', category: 'chapeus', equipped: false },
  { id: 'chapeus-5', name: 'Chapéu de Pescador', price: 10, image: 'assets/img/chapeu-pescador.png', category: 'chapeus', equipped: false },
  { id: 'chapeus-6', name: 'Laço Cor-de-Rosa', price: 10, image: 'assets/img/lacinho.png', category: 'chapeus', equipped: false },
  { id: 'chapeus-7', name: 'Auréola', price: 10, image: 'assets/img/aureola.png', category: 'chapeus', equipped: false },
  { id: 'chapeus-8', name: 'Nuvem', price: 10, image: 'assets/img/nuvem.png', category: 'chapeus', equipped: false },
  { id: 'chapeus-9', name: 'Mascote Azul', price: 10, image: 'assets/img/mascote-mini.png', category: 'chapeus', equipped: false },

  // ---- Óculos ----
  { id: 'oculos-1', name: 'Óculos de Sol', price: 10, image: 'assets/img/oculos-sol.png', category: 'oculos', equipped: true },
  { id: 'oculos-2', name: 'Óculos Redondos', price: 10, image: 'assets/img/oculos-redondos.png', category: 'oculos', equipped: false },
  { id: 'oculos-3', name: 'Óculos de Aviador', price: 10, image: 'assets/img/oculos-aviador.png', category: 'oculos', equipped: false },
  { id: 'oculos-4', name: 'Óculos 3D', price: 10, image: 'assets/img/oculos-3d.png', category: 'oculos', equipped: false },
  { id: 'oculos-5', name: 'Monóculo', price: 10, image: 'assets/img/monoculo.png', category: 'oculos', equipped: false },
  { id: 'oculos-6', name: 'Óculos de Coração', price: 10, image: 'assets/img/oculos-coracao.png', category: 'oculos', equipped: false },
  { id: 'oculos-7', name: 'Óculos Estrela', price: 10, image: 'assets/img/oculos-estrela.png', category: 'oculos', equipped: false },
  { id: 'oculos-8', name: 'Óculos Pixel', price: 10, image: 'assets/img/oculos-pixel.png', category: 'oculos', equipped: false },
  { id: 'oculos-9', name: 'Óculos Neon', price: 10, image: 'assets/img/oculos-neon.png', category: 'oculos', equipped: false },

  // ---- Cores / Paleta ----
  { id: 'cores-1', name: 'Azul Attentus', price: 10, image: 'assets/img/cor-azul.png', category: 'cores', equipped: true },
  { id: 'cores-2', name: 'Roxo Místico', price: 10, image: 'assets/img/cor-roxo.png', category: 'cores', equipped: false },
  { id: 'cores-3', name: 'Verde Floresta', price: 10, image: 'assets/img/cor-verde.png', category: 'cores', equipped: false },
  { id: 'cores-4', name: 'Vermelho Fogo', price: 10, image: 'assets/img/cor-vermelho.png', category: 'cores', equipped: false },
  { id: 'cores-5', name: 'Amarelo Sol', price: 10, image: 'assets/img/cor-amarelo.png', category: 'cores', equipped: false },
  { id: 'cores-6', name: 'Rosa Choque', price: 10, image: 'assets/img/cor-rosa.png', category: 'cores', equipped: false },
  { id: 'cores-7', name: 'Laranja Pôr-do-sol', price: 10, image: 'assets/img/cor-laranja.png', category: 'cores', equipped: false },
  { id: 'cores-8', name: 'Ciano Glacial', price: 10, image: 'assets/img/cor-ciano.png', category: 'cores', equipped: false },
  { id: 'cores-9', name: 'Preto Ónix', price: 10, image: 'assets/img/cor-preto.png', category: 'cores', equipped: false },

  // ---- Troféus ----
  { id: 'trofeus-1', name: 'Troféu de Bronze', price: 10, image: 'assets/img/trofeu-bronze.png', category: 'trofeus', equipped: true },
  { id: 'trofeus-2', name: 'Troféu de Prata', price: 10, image: 'assets/img/trofeu-prata.png', category: 'trofeus', equipped: false },
  { id: 'trofeus-3', name: 'Troféu de Ouro', price: 10, image: 'assets/img/trofeu-ouro.png', category: 'trofeus', equipped: false },
  { id: 'trofeus-4', name: 'Troféu de Diamante', price: 10, image: 'assets/img/trofeu-diamante.png', category: 'trofeus', equipped: false },
  { id: 'trofeus-5', name: 'Taça da Vitória', price: 10, image: 'assets/img/taca-vitoria.png', category: 'trofeus', equipped: false },
  { id: 'trofeus-6', name: 'Medalha de Honra', price: 10, image: 'assets/img/medalha-honra.png', category: 'trofeus', equipped: false },
  { id: 'trofeus-7', name: 'Estrela Lendária', price: 10, image: 'assets/img/estrela-lendaria.png', category: 'trofeus', equipped: false },
  { id: 'trofeus-8', name: 'Coroa de Campeão', price: 10, image: 'assets/img/coroa-campeao.png', category: 'trofeus', equipped: false },
  { id: 'trofeus-9', name: 'Faixa de Mestre', price: 10, image: 'assets/img/faixa-mestre.png', category: 'trofeus', equipped: false },
];

const COIN_ICON = 'assets/img/moeda.png';

let currentCategory = 'chapeus';

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-btn');
  const grid = document.querySelector('.items-grid');

  setupCategoryTabs(tabs, grid);

  // Renderização inicial: mostra a categoria da aba ativa por defeito
  renderItemsGrid(grid, currentCategory);
  updateAvatarPreview(currentCategory);
});

/**
 * Liga o clique de cada aba à troca de categoria ativa:
 * atualiza a classe 'active', re-renderiza a grelha e o avatar.
 */
function setupCategoryTabs(tabs, grid) {
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      currentCategory = tab.dataset.category;
      renderItemsGrid(grid, currentCategory);
      updateAvatarPreview(currentCategory);
    });
  });
}

/**
 * Limpa a grelha e reconstrói o HTML apenas com os itens da categoria pedida.
 */
function renderItemsGrid(grid, category) {
  const items = SHOP_ITEMS.filter((item) => item.category === category);

  grid.innerHTML = '';

  items.forEach((item) => {
    grid.appendChild(buildItemBox(item));
  });
}

/**
 * Cria o elemento DOM de uma "Item Box" a partir dos dados do item,
 * já com o botão no estado correto (Equipado ou Comprar).
 */
function buildItemBox(item) {
  const box = document.createElement('div');
  box.className = 'item-box' + (item.equipped ? ' equipped' : '');
  box.dataset.id = item.id;

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'item-image';

  const image = document.createElement('img');
  image.src = item.image;
  image.alt = item.name;
  imageWrapper.appendChild(image);

  const button = buildItemButton(item);

  box.appendChild(imageWrapper);
  box.appendChild(button);

  button.addEventListener('click', () => {
    if (!item.equipped) {
      equipItem(item);
    }
  });

  return box;
}

/**
 * Cria o botão de estado do item (Equipado / Comprar com preço e moeda).
 */
function buildItemButton(item) {
  const button = document.createElement('button');

  if (item.equipped) {
    button.className = 'item-status-btn equipped-text';
    button.textContent = 'Equipado';
  } else {
    button.className = 'item-status-btn buy-btn';
    button.innerHTML = `<span>${item.price}</span> <img src="${COIN_ICON}" alt="Moedas" class="coin-icon">`;
  }

  return button;
}

/**
 * Marca o item escolhido como equipado dentro da sua categoria
 * (apenas um item por categoria pode estar equipado de cada vez),
 * volta a renderizar a grelha e atualiza a pré-visualização do avatar.
 */
function equipItem(selectedItem) {
  SHOP_ITEMS
    .filter((item) => item.category === selectedItem.category)
    .forEach((item) => {
      item.equipped = (item.id === selectedItem.id);
    });

  const grid = document.querySelector('.items-grid');
  renderItemsGrid(grid, currentCategory);
  updateAvatarPreview(currentCategory);
}

/**
 * Atualiza a camada de avatar correspondente à categoria indicada,
 * mostrando a imagem do item atualmente equipado nessa categoria
 * (simulando o avatar a "vestir" o item escolhido).
 */
function updateAvatarPreview(category) {
  const layer = document.querySelector(`.avatar-layer[data-layer="${category}"]`);
  if (!layer) return;

  const equippedItem = SHOP_ITEMS.find((item) => item.category === category && item.equipped);

  if (equippedItem) {
    layer.src = equippedItem.image;
    layer.alt = equippedItem.name;
  } else {
    layer.src = '';
    layer.alt = '';
  }
}

// --------------------------------------------------------------------------------------------------------

>>>>>>> origin
