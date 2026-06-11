// app.js - Motor de Renderização e Auditoria Cruzada Homologado
document.addEventListener('DOMContentLoaded', () => {
    inicializarApp();
});

const selectClasse = document.getElementById('select-classe');
const selectForma = document.getElementById('select-forma');
const searchInput = document.getElementById('search-input');
const gridProcedimentos = document.getElementById('grid-procedimentos');
const counterProcedimentos = document.getElementById('counter-procedimentos');

function inicializarApp() {
    if (!window.baseProcedimentosSIGTAP) {
        console.error("Erro crítico: Banco de dados base_sigtap.js não foi detectado ou carregado.");
        gridProcedimentos.innerHTML = '<div class="card-proc" style="padding: 2rem; border-left-color: #ef4444;"><strong>Erro de Ingestão:</strong> O arquivo base_sigtap.js não pôde ser lido. Verifique os nomes dos arquivos no repositório.</div>';
        return;
    }

    // Limpa opções antigas mantendo o padrão
    selectClasse.innerHTML = '<option value="todos">-- Todas as Classes --</option>';
    
    // Popula as Classes mapeadas
    Object.keys(baseProcedimentosSIGTAP).forEach(classe => {
        const opt = document.createElement('option');
        opt.value = classe;
        opt.textContent = classe;
        selectClasse.appendChild(opt);
    });

    // Listener inteligente para encadeamento e isolamento de Formas de Organização
    selectClasse.addEventListener('change', () => {
        const classeSel = selectClasse.value;
        selectForma.innerHTML = '<option value="todos">-- Todas as Formas --</option>';
        
        if (classeSel !== 'todos' && baseProcedimentosSIGTAP[classeSel]) {
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

    // Executa a primeira renderização em lote na inicialização da página
    filtrarERenderizar();
}

function filtrarERenderizar() {
    const classeFiltro = selectClasse.value;
    const formaFiltro = selectForma.value;
    const buscaTexto = searchInput.value.toLowerCase().trim();

    let listagemFinal = [];

    Object.keys(baseProcedimentosSIGTAP).forEach(classeNome => {
        if (classeFiltro !== 'todos' && classeFiltro !== classeNome) return;

        const classeObjeto = baseProcedimentosSIGTAP[classeNome];
        if (formaFiltro !== 'todos' && formaFiltro !== classeObjeto.forma_organizacao) return;

        if (classeObjeto && classeObjeto.procedimentos) {
            classeObjeto.procedimentos.forEach(proc => {
                const matchesTexto = buscaTexto === "" || 
                    proc.nome.toLowerCase().includes(buscaTexto) ||
                    proc.codigo.includes(buscaTexto) ||
                    proc.descricao.toLowerCase().includes(buscaTexto) ||
                    (proc.cids && proc.cids.some(cid => cid.toLowerCase().includes(buscaTexto))) ||
                    (proc.cbos && proc.cbos.some(cbo => cbo.toLowerCase().includes(buscaTexto)));

                if (matchesTexto) {
                    listagemFinal.push({
                        ...proc,
                        classe: classeNome,
                        forma: classeObjeto.forma_organizacao
                    });
                }
            });
        }
    });

    renderizarCards(listagemFinal);
}

function renderizarCards(procedimentos) {
    gridProcedimentos.innerHTML = '';
    counterProcedimentos.textContent = `Listando ${procedimentos.length} procedimento(s)`;

    if (procedimentos.length === 0) {
        gridProcedimentos.innerHTML = '<div class="card-proc" style="padding: 2rem; text-align: center; color: var(--text-muted); border-left-color: #cbd5e1;">Nenhum procedimento correspondente aos critérios de validação da Tech Reabilitar.</div>';
        return;
    }

    procedimentos.forEach(proc => {
        const card = document.createElement('article');
        card.className = 'card-proc';

        const cidsHtml = proc.cids ? proc.cids.map(cid => `<span class="pill-cid">${cid}</span>`).join('') : 'Não aplicável';
        const cbosHtml = proc.cbos ? proc.cbos.map(cbo => `<span class="pill-cbo">${cbo}</span>`).join('') : 'Não aplicável';

        card.innerHTML = `
            <div class="card-main-info">
                <div class="card-meta-top">
                    <span>${proc.classe}</span>
                    <span>Forma de Organização: ${proc.forma}</span>
                </div>
                <h3>${proc.nome}</h3>
                <span class="card-codigo-sus">Código SIGTAP: ${proc.codigo}</span>
                <p class="card-desc">${proc.descricao}</p>
                
                <div class="spec-grid">
                    <div class="spec-item"><strong>Complexidade</strong>${proc.complexidade}</div>
                    <div class="spec-item"><strong>Instrumento de Registro</strong>${proc.instrumento_registro}</div>
                    <div class="spec-item"><strong>Restrição Etária</strong>${proc.restricao_etaria}</div>
                    <div class="spec-item"><strong>CBOs Autorizados</strong><div class="pill-container">${cbosHtml}</div></div>
                    <div class="spec-item" style="grid-column: span 2;"><strong>CIDs Vinculados</strong><div class="pill-container">${cidsHtml}</div></div>
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
