// app.js

document.addEventListener('DOMContentLoaded', () => {
    inicializarApp();
});

const selectClasse = document.getElementById('select-classe');
const selectForma = document.getElementById('select-forma');
const searchInput = document.getElementById('search-input');
const gridProcedimentos = document.getElementById('grid-procedimentos');
const counterProcedimentos = document.getElementById('counter-procedimentos');

function inicializarApp() {
    // Popula o seletor de Classes
    Object.keys(baseProcedimentosSIGTAP).forEach(classe => {
        const opt = document.createElement('option');
        opt.value = classe;
        opt.textContent = classe;
        selectClasse.appendChild(opt);
    });

    // Listener para encadeamento do seletor de Forma de Organização
    selectClasse.addEventListener('change', () => {
        const classeSel = selectClasse.value;
        selectForma.innerHTML = '<option value="todos">-- Todas as Formas --</option>';
        
        if (classeSel !== 'todos') {
            selectForma.disabled = false;
            const forma = baseProcedimentosSIGTAP[classeSel].forma_organizacao;
            const opt = document.createElement('option');
            opt.value = forma;
            opt.textContent = forma;
            selectForma.appendChild(opt);
        } else {
            selectForma.disabled = true;
        }
        filtrarERenderizar();
    });

    selectForma.addEventListener('change', filtrarERenderizar);
    searchInput.addEventListener('input', filtrarERenderizar);

    // Renderização Inicial (Geral)
    filtrarERenderizar();
}

function filtrarERenderizar() {
    const classeFiltro = selectClasse.value;
    const formaFiltro = selectForma.value;
    const buscaTexto = searchInput.value.toLowerCase().trim();

    let listagemFinal = [];

    // Varre a estrutura do banco de dados para consolidar os itens
    Object.keys(baseProcedimentosSIGTAP).forEach(classeNome => {
        if (classeFiltro !== 'todos' && classeFiltro !== classeNome) return;

        const classeObjeto = baseProcedimentosSIGTAP[classeNome];
        if (formaFiltro !== 'todos' && formaFiltro !== classeObjeto.forma_organizacao) return;

        classeObjeto.procedimentos.forEach(proc => {
            // Realiza busca cruzada e inteligente (Nome, código, CIDs ou CBOs)
            const matchesTexto = buscaTexto === "" || 
                proc.nome.toLowerCase().includes(buscaTexto) ||
                proc.codigo.includes(buscaTexto) ||
                proc.descricao.toLowerCase().includes(buscaTexto) ||
                proc.cids.some(cid => cid.toLowerCase().includes(buscaTexto)) ||
                proc.cbos.some(cbo => cbo.toLowerCase().includes(buscaTexto));

            if (matchesTexto) {
                listagemFinal.push({
                    ...proc,
                    classe: classeNome,
                    forma: classeObjeto.forma_organizacao
                });
            }
        });
    });

    renderizarCards(listagemFinal);
}

function renderizarCards(procedimentos) {
    gridProcedimentos.innerHTML = '';
    counterProcedimentos.textContent = `Listando ${procedimentos.length} procedimento(s)`;

    if (procedimentos.length === 0) {
        gridProcedimentos.innerHTML = '<div class="card-proc" style="padding: 2rem; text-align: center; color: var(--text-muted);">Nenhum procedimento correspondente aos critérios de validação.</div>';
        return;
    }

    procedimentos.forEach(proc => {
        const card = document.createElement('article');
        card.className = 'card-proc';

        // Geração das pílulas de CIDs e CBOs
        const cidsHtml = proc.cids.map(cid => `<span class="pill-cid">${cid}</span>`).join('');
        const cbosHtml = proc.cbos.map(cbo => `<span class="pill-cbo">${cbo}</span>`).join('');

        card.innerHTML = `
            <div class="card-main-info">
                <div class="card-meta-top">
                    <span>${proc.classe}</span>
                    <span>Forma: ${proc.forma}</span>
                </div>
                <h3>${proc.nome}</h3>
                <span class="card-codigo-sus">Código SIGTAP: ${proc.codigo}</span>
                <p class="card-desc">${proc.descricao}</p>
                
                <div class="spec-grid">
                    <div class="spec-item"><strong>Complexidade</strong>${proc.complexidade}</div>
                    <div class="spec-item"><strong>Instrumento de Registro</strong>${proc.instrumento_registro}</div>
                    <div class="spec-item"><strong>Restrição Etária</strong>${proc.restricao_etaria}</div>
                    <div class="spec-item"><strong>CBOs Autorizados</strong><div class="pill-container">${cbosHtml}</div></div>
                    <div class="spec-item" style="grid-column: span 2;"><strong>CIDs Vinculados Suscetíveis</strong><div class="pill-container">${cidsHtml}</div></div>
                </div>
            </div>
            <div class="card-footer-valor">
                <span class="valor-label">VALOR DO REPASSE AMBULATORIAL:</span>
                <span class="valor-dinheiro">R$ ${proc.valor_ambulatorial.toFixed(2).replace('.', ',')}</span>
            </div>
        `;
        gridProcedimentos.appendChild(card);
    });
}
