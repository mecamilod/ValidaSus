// Base de dados em lote estruturada (Simulando o processamento do arquivo de texto)
const baseProcedimentos = [
    {
        classes_deficiencia: "Não se Aplica",
        codigo: "0309050014",
        nome: "SESSÃO DE ACUPUNTURA APLICAÇÃO DE VENTOSAS / MOXA",
        complexidade: "MC - Média Complexidade",
        modalidade: "01 - Ambulatorial, 02 - Hospitalar, 03 - Hospital Dia, 06 - Atenção Domiciliar",
        registro: "01 - BPA (Consolidado), 02 - BPA (Individualizado), 05 - AIH (Proc. Secundário)",
        restricao: "Idade Mínima: 0 Mes(es) | Idade Máxima: 130 Ano(s)",
        cids: ["F430", "F431", "F432", "G430", "G431", "G442", "M541", "M542", "M544", "M545", "M791", "R51", "R520", "R521", "R522"],
        valor: "Valor Ambulatorial SA: 3.67 | Valor Ambulatorial Total: 3.67"
    },
    {
        classes_deficiencia: "Não se Aplica",
        codigo: "0309050022",
        nome: "SESSÃO DE ACUPUNTURA COM INSERÇÃO DE AGULHAS",
        complexidade: "MC - Média Complexidade",
        modalidade: "01 - Ambulatorial, 02 - Hospitalar, 03 - Hospital Dia, 06 - Atenção Domiciliar",
        registro: "01 - BPA (Consolidado), 02 - BPA (Individualizado), 05 - AIH (Proc. Secundário)",
        restricao: "Idade Mínima: 0 Mes(es) | Idade Máxima: 130 Ano(s)",
        cids: ["Não se Aplica / Práticas Integrativas"],
        valor: "Valor Ambulatorial SA: 4.13 | Valor Ambulatorial Total: 4.13"
    },
    {
        classes_deficiencia: "Física, Sensório-Motora (Múltiplas Deficiências)",
        codigo: "0301070130",
        nome: "TRATAMENTO INTENSIVO DE PACIENTE EM REABILITAÇÃO FÍSICA (2 TURNOS PACIENTE-DIA)",
        complexidade: "MC - Média Complexidade",
        modalidade: "01 - Ambulatorial",
        registro: "02 - BPA (Individualizado)",
        restricao: "Idade Mínima: 0 Mes(es) | Idade Máxima: 130 Ano(s)",
        cids: ["A300", "B91", "G20", "G35", "G800", "G810", "I64", "M210", "S141", "Z890"],
        valor: "Valor Ambulatorial SA: 33.70 | Valor Ambulatorial Total: 33.70"
    },
    {
        classes_deficiencia: "Visual",
        codigo: "0301070148",
        nome: "TREINO DE ORIENTAÇÃO E MOBILIDADE",
        complexidade: "MC - Média Complexidade",
        modalidade: "01 - Ambulatorial",
        registro: "02 - BPA (Individualizado)",
        restricao: "Idade Mínima: 0 Mes(es) | Idade Máxima: 130 Ano(s)",
        cids: ["H540", "H541"],
        valor: "Valor Ambulatorial SA: 6.00 | Valor Ambulatorial Total: 6.00"
    }
];

// Elementos do DOM
const gridProcedimentos = document.getElementById('grid-dinamico-procedimentos');
const contadorResultados = document.getElementById('contador-resultados');
const inputBusca = document.getElementById('input-busca');
const filtroDeficiencia = document.getElementById('filtro-deficiencia');
const btnBuscar = document.getElementById('btn-buscar');

// Função de Renderização dos Cards
function renderizarCards(procedimentos) {
    gridProcedimentos.innerHTML = '';
    
    if (procedimentos.length === 0) {
        gridProcedimentos.innerHTML = '<p class="no-results">Nenhum procedimento correspondente encontrado.</p>';
        contadorResultados.textContent = '0 procedimentos encontrados';
        return;
    }

    procedimentos.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card-procedimento';
        
        card.innerHTML = `
            <div>
                <span class="card-badge-def">${item.classes_deficiencia}</span>
                <h3>${item.nome}</h3>
                <span class="card-codigo">Código SIGTAP: ${item.codigo}</span>
                
                <div class="card-detalhes">
                    <p><strong>Complexidade:</strong> ${item.complexidade}</p>
                    <p><strong>Modalidade:</strong> ${item.modalidade}</p>
                    <p><strong>Instrumento de Registro:</strong> ${item.registro}</p>
                    <p><strong>CIDs Cadastrados:</strong> ${item.cids.slice(0, 5).join(', ')}${item.cids.length > 5 ? '...' : ''}</p>
                </div>
            </div>
            <div class="card-footer-valor">
                ${item.valor}
            </div>
        `;
        gridProcedimentos.appendChild(card);
    });

    contadorResultados.textContent = `${procedimentos.length} procedimento(s) listado(s)`;
}

// Lógica de Filtro e Busca Combinada
function filtrarProcedimentos() {
    const termoBusca = inputBusca.value.toLowerCase().trim();
    const filtroDef = filtroDeficiencia.value;

    const dadosFiltrados = baseProcedimentos.filter(item => {
        // Validação da Busca Textual (Nome, Código ou CID)
        const correspondeBusca = 
            item.nome.toLowerCase().includes(termoBusca) || 
            item.codigo.includes(termoBusca) || 
            item.cids.some(cid => cid.toLowerCase().includes(termoBusca));

        // Validação do Filtro de Categoria
        const correspondeFiltro = 
            filtroDef === 'todos' || 
            item.classes_deficiencia.toLowerCase().includes(filtroDef.toLowerCase());

        return correspondeBusca && correspondeFiltro;
    });

    renderizarCards(dadosFiltrados);
}

// Event Listeners
btnBuscar.addEventListener('click', filtrarProcedimentos);
inputBusca.addEventListener('keyup', (e) => { if (e.key === 'Enter') filtrarProcedimentos(); });
filtroDeficiencia.addEventListener('change', filtrarProcedimentos);

// Inicialização da Interface
document.addEventListener('DOMContentLoaded', () => {
    renderizarCards(baseProcedimentos);
});
