/*let boxBuscar = document.querySelector('.buscar-box');
let lupa = document.querySelector('.lupa-buscar');
let btnFechar = document.querySelector('.btn-fechar');

lupa.addEventListener('click', ()=> {
    boxBuscar.classList.add('ativar')
})

btnFechar.addEventListener('click', ()=> {
    boxBuscar.classList.remove('ativar')
})

// Create an empty array to store form data
let formDataList = [];

// Function to handle form submission
function handleFormSubmit(event) {
 event.preventDefault();

 // Get form data
 let formData = {
    nomeEvento: event.target.nomeEvento.value,
    dataEvento: event.target.dataEvento.value,
    descreverEvento: event.target.descreverEvento.value,
    localEvento: event.target.localEvento.value
 };

 // Save form data to the list
 formDataList.push(formData);

 // Clear form fields
 event.target.nomeEvento.value = '';
 event.target.dataEvento.value = '';
 event.target.descreverEvento.value = '';
 event.target.localEvento.value = '';

 // Display a success message
 alert('Form submitted successfully');
}

// Get the form element
let form = document.querySelector('form');

// Attach the form submission handler
form.addEventListener('submit', handleFormSubmit);

// Get the table element
const table = document.querySelector('table');
// Create a new row for each event
events.forEach(event => {
  const row = document.createElement('tr');
  // Create a new cell for each column
  const dataEvento = document.createElement('td');
  const tituloEvento = document.createElement('td');
  const acoesBotao = document.createElement('td');
  // Set the text content of each cell
  dataEvento.textContent = event.data;
  tituloEvento.textContent = event.nome;
  acoesBotao.textContent = event.acoes;
  // Add the cells to the row
  row.appendChild(dataEvento);
  row.appendChild(tituloEvento);
  row.appendChild(acoesBotao);
  // Add the row to the table
  table.appendChild(row);
});

const eventos = console.log(formDataList);*/

const novoEventoBtn = document.getElementById("btnEvento");
const form = document.getElementById("novoEvento");
const nomeInput = document.getElementById("nomeEvento");
const descricaoInput = document.getElementById("descreverEvento");
const dataInput = document.getElementById("dataEvento");
const localInput = document.getElementById("localEvento");
const table = document.getElementById("eventoTable");
const listaEventos = document.getElementById("evento-list");
const pesquisaInput = document.getElementById("pesquisaEvento");

novoEventoBtn.addEventListener("click", function () {
    form.style.display = "block";
    novoEventoBtn.style.display = "none";
    });

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = nomeInput.value;
    const descricaoInput = descricaoInput.value;
    const data = dataInput.value;
    const localInput = localInput.value;

    const newRow = listaEventos.insertRow();
    const dataEvento = newRow.insertCell(0);
    const nomeEvento = newRow.insertCell(1);
    const acoesEvento = newRow.insertCell(2);

    dataEvento.innerText = datatime;
    nomeEvento.innerText = nome;

    const deletarBtn = document.createElement("button");
    deletarBtn.innerText = "Deletar";
    deletarBtn.addEventListener("click", function () {
        newRow.remove();
    });

    const atualizarBtn = document.createElement("button");
    atualizarBtn.innerText = "Atualizar";
    atualizarBtn.addEventListener("click", function () {
        // Adicione aqui a lógica para atualizar o evento
    });

    acoesEvento.appendChild(deletarBtn);
    acoesEvento.appendChild(atualizarBtn);

    limparFormulario();
    form.style.display = "none";
    novoEventoBtn.style.display = "block";
    });

    function limparFormulario() {
        nomeInput.value = "";
        descricaoInput.value = "";
        dataInput.value = "";
        localInput.value = "";
    }

    function pesquisarEventos() {
        const termoPesquisa = pesquisaInput.value.toLowerCase();
        const linhas = listaEventos.getElementsByTagName("tr");

        for (let i = 1; i < linhas.length; i++) {
            const nomeEvento = linhas[i].getElementsByTagName("td")[1].innerText.toLowerCase();

            if (nomeEvento.includes(termoPesquisa)) {
                linhas[i].style.display = "";
            } else {
                linhas[i].style.display = "none";
            }
        }
    }