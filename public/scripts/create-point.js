function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}
populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
  citySelect.innerHTML = "<option value>Selecione a cidade</option>";
  citySelect.disabled = false;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

// itens de coleta

// vamos pegar e adicionar um ouvidor de eventos para todos os elementos da lista, todos os lis
const itemsToCollect = document.querySelectorAll(".items-grid");
for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const collectedItens = document.querySelector("input[name=items]");

//criar variável para o item selecionado, input hiddern
let selectedItems = []; //isso está vazio neste momento

function handleSelectedItem(event) {
  //adiconar ou remover uma classe com java script
  const itemLi = event.target;
  // toggle adicionar ou remover
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;
  // console.log("ITEM ID:", itemId);

  // verificar se há itens selecionados
  // se tiver, pegar o item selecionado
  const alreadySelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemId; //isso será true ou false
    return itemFound;
  });
  // se já tiver selecionado, tirar da seleção
  if (alreadySelected >= 0) {
    //tirar da seleção
    const filteredItems = selectedItems.filter((items) => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent;
    });
    selectedItems = filteredItems;
  }
  // se não tiver, adicionar a seleção
  else {
    //adicionar a seleção
    selectedItems.push(itemId);
  }
  // console.log("selectedItems:", selectedItems);
  // atualizar o campo escondido com os dados selecionados
  collectedItens.value = selectedItems;
}
