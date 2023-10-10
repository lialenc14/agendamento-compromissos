document.addEventListener("DOMContentLoaded", function () {
    const novoEventoBtn = document.getElementById("btnEvento");
    const form = document.getElementById("novoEvento");
    const nomeInput = document.getElementById("nomeEvento");
    const descricaoInput = document.getElementById("descreverEvento");
    const dataInput = document.getElementById("dataEvento");
    const localInput = document.getElementById("localEvento");
    const listaEventos = document.querySelector("tbody");
    let eventoEditando = null;
    const pesquisaInput = document.getElementById("pesquisaEvento");
    const nenhumEventoRow = document.getElementById("nenhumEventoRow");

    function carregarEventosDoLocalStorage() {
        const eventosSalvos = JSON.parse(localStorage.getItem("eventos")) || [];
        eventosSalvos.forEach(evento => adicionarEventoNaTabela(evento));

        if (eventosSalvos.length > 0) {
            nenhumEventoRow.style.display = "none";
        }
    }

    function salvarEventoNoLocalStorage(evento) {
        const eventosSalvos = JSON.parse(localStorage.getItem("eventos")) || [];
        eventosSalvos.push(evento);
        localStorage.setItem("eventos", JSON.stringify(eventosSalvos));
    }

    function removerEventoDoLocalStorage(evento) {
        const eventosSalvos = JSON.parse(localStorage.getItem("eventos")) || [];
        const eventosFiltrados = eventosSalvos.filter(e =>
            e.data !== evento.data || e.nome !== evento.nome
        );
        localStorage.setItem("eventos", JSON.stringify(eventosFiltrados));
    }

    function adicionarEventoNaTabela(evento) {
        const newRow = listaEventos.insertRow();
        const dataEvento = newRow.insertCell(0);
        const nomeEvento = newRow.insertCell(1);
        const descreverEvento = newRow.insertCell(2);
        const localEvento = newRow.insertCell(3);
        const acoesEvento = newRow.insertCell(4);

        dataEvento.innerText = evento.data;
        nomeEvento.innerText = evento.nome;
        descreverEvento.innerText = evento.descricao;
        localEvento.innerText = evento.local;

        const deletarBtn = criarBotao("Deletar", () => {
            newRow.remove();
            removerEventoDoLocalStorage(evento);
            if (listaEventos.rows.length === 1) {
                nenhumEventoRow.style.display = "";
            }
        });

        const editarBtn = criarBotao("Editar", () => {
            dataInput.value = evento.data;
            nomeInput.value = evento.nome;
            descricaoInput.value = evento.descricao;
            localInput.value = evento.local;
            eventoEditando = newRow;
            form.style.display = "block";
            novoEventoBtn.style.display = "none";
        });

        acoesEvento.appendChild(deletarBtn);
        acoesEvento.appendChild(editarBtn);

        if (listaEventos.rows.length > 1) {
            nenhumEventoRow.style.display = "none";
        }
    }

    function criarBotao(texto, onClickCallback) {
        const botao = document.createElement("button");
        botao.innerText = texto;
        botao.addEventListener("click", onClickCallback);
        return botao;
    }

    carregarEventosDoLocalStorage();

    novoEventoBtn.addEventListener("click", () => {
        limparFormulario();
        form.style.display = "block";
        novoEventoBtn.style.display = "none";
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = nomeInput.value;
        const data = dataInput.value;
        const descricao = descricaoInput.value;
        const local = localInput.value;

        if (eventoEditando) {
            eventoEditando.cells[0].innerText = data;
            eventoEditando.cells[1].innerText = nome;
            eventoEditando.cells[2].innerText = descricao;
            eventoEditando.cells[3].innerText = local;
            limparFormulario();
            form.style.display = "none";
            novoEventoBtn.style.display = "block";
            eventoEditando = null;
        } else {
            const evento = { data, nome, descricao, local };
            adicionarEventoNaTabela(evento);
            salvarEventoNoLocalStorage(evento);

            limparFormulario();
            form.style.display = "none";
            novoEventoBtn.style.display = "block";
        }
    });

    pesquisaInput.addEventListener("input", () => {
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
    });

    function limparFormulario() {
        nomeInput.value = "";
        dataInput.value = "";
        descricaoInput.value = "";
        localInput.value = "";
    }
});
