document.addEventListener("DOMContentLoaded", function () {
    const novoEventoBtn = document.getElementById("btnEvento");
    const form = document.getElementById("novoEvento");
    const nomeInput = document.getElementById("nomeEvento");
    const descricaoInput = document.getElementById("descreverEvento");
    const dataInput = document.getElementById("dataEvento");
    const localInput = document.getElementById("localEvento");
    const listaEventos = document.querySelector("tbody");
    let eventoEditando = null; // Variável para rastrear o evento que está sendo editado
    const pesquisaInput = document.getElementById("pesquisaEvento");
    const nenhumEventoRow = document.getElementById("nenhumEventoRow"); // Adicionado


    novoEventoBtn.addEventListener("click", function () {
        limparFormulario();
        form.style.display = "block";
        novoEventoBtn.style.display = "none";
    });


    form.addEventListener("submit", function (e) {
        e.preventDefault();


        const nome = nomeInput.value;
        const data = dataInput.value;
        const descricao = descricaoInput.value;
        const local = localInput.value;


        if (eventoEditando) {
            // Se um evento está sendo editado, atualize-o em vez de criar um novo
            eventoEditando.cells[0].innerText = data;
            eventoEditando.cells[1].innerText = nome;
            eventoEditando.cells[2].innerText = descrição;
            eventoEditando.cells[3].innerText = local;
            limparFormulario();
            form.style.display = "none";
            novoEventoBtn.style.display = "block";
            eventoEditando = null; // Limpe a variável de evento editando
        } else {
            if (listaEventos.rows.length === 1) {
                nenhumEventoRow.style.display = "none"; // Ocultar a mensagem "Nenhum evento" quando a primeira tarefa for adicionada
            }


            // Crie um novo evento
            const newRow = listaEventos.insertRow();
            const dataEvento = newRow.insertCell(0);
            const nomeEvento = newRow.insertCell(1);
            const descreverEvento = newRow.insertCell(2);
            const localEvento = newRow.insertCell(3);
            const acoesEvento = newRow.insertCell(4);


            dataEvento.innerText = data;
            nomeEvento.innerText = nome;
            descreverEvento.innerText = descricao;
            localEvento.innerText = local;


            const deletarBtn = document.createElement("button");
            deletarBtn.innerText = "Deletar";
            deletarBtn.addEventListener("click", function () {
                newRow.remove();
                if (listaEventos.rows.length === 1) {
                    nenhumEventoRow.style.display = ""; // Mostrar a mensagem "Nenhum evento" quando a última tarefa for removida
                }
            });


            const editarBtn = document.createElement("button");
            editarBtn.innerText = "Editar";
            editarBtn.addEventListener("click", function () {
                // Preencha o formulário com os valores atuais do evento para edição
                dataInput.value = dataEvento.innerText;
                nomeInput.value = nomeEvento.innerText;
                descricaoInput.value = descreverEvento.innerText;
                localInput.value = localEvento.innerText;
                eventoEditando = newRow; // Defina o evento que está sendo editado
                form.style.display = "block";
                novoEventoBtn.style.display = "none";
            });


            acoesEvento.appendChild(deletarBtn);
            acoesEvento.appendChild(editarBtn);


            limparFormulario();
            form.style.display = "none";
            novoEventoBtn.style.display = "block";
        }
    });


    pesquisaInput.addEventListener("input", function () {
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
