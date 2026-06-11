// app.js - Motor Avançado de Auditoria - ValidaSUS
document.addEventListener('DOMContentLoaded', () => {
    // Pequena pausa assíncrona para garantir que o navegador processou o arquivo de dados
    setTimeout(inicializarValidaSUS, 100);
});

function inicializarValidaSUS() {
    const selectClasse = document.getElementById('select-classe');
    const selectForma = document.getElementById('select-forma');
    const searchInput = document.getElementById('search-input');
    const gridProcedimentos = document.getElementById('grid-procedimentos');
    const counterProcedimentos = document.getElementById('counter-procedimentos');

    // Elemento de salvaguarda caso o banco de dados falhe
    const bancoDados = window.baseProcedimentosSIGTAP || null;

    if (!bancoDados) {
        console.error("Erro Crítico: O objeto 'baseProcedimentosSIGTAP' não foi carregado globalmente.");
        if (gridProcedimentos) {
            gridProcedimentos.innerHTML = `
                <div class="card-proc" style="padding: 2rem; border-left: 5px solid #ef4444; background: #fef2f2;">
                    <h3 style="color: #991b1b;">Erro de Carregamento de Dados</h3>
                    <p style="color: #7f1d1d; margin-top: 0.5rem;">
                        O ficheiro <strong>base_sigtap.js</strong> não pôde ser lido pelo navegador. 
                        Verifique se o nome do ficheiro está totalmente em minúsculas no seu repositório do GitHub.
                    </p>
                </div>`;
        }
        return;
    }

    // Configuração inicial segura dos seletores
    if (selectClasse) {
        selectClasse.innerHTML = '<option value="todos">-- Todas as Classes --</option>';
        Object.keys(bancoDados).forEach(classe => {
            const opt = document.createElement('option');
            opt.value = classe;
            opt.textContent = classe;
            selectClasse.appendChild(opt);
        });
    }

    // Função interna isolada para evitar conflitos de escopo global
    function executarFiltro() {
        if (!gridProcedimentos || !counterProcedimentos) return;

        const classeFiltro = selectClasse ? selectClasse.value : 'todos';
        const formaFiltro = selectForma ? selectForma.value : 'todos';
        const buscaTexto = searchInput ? searchInput.value.toLowerCase().trim() : '';

        let listagemFinal = [];

        Object.keys(bancoDados).forEach(classeNome => {
            if (classeFiltro !== 'todos' && classeFiltro !== classeNome) return;

            const classeObjeto = bancoDados[classeNome];
            if (!classeObjeto) return;

            if (formaFiltro !== 'todos' && formaFiltro !== classeObjeto.forma_organizacao) return;

            if (classeObjeto.procedimentos && Array.isArray(classeObjeto.procedimentos)) {
                classeObjeto.procedimentos.forEach(proc => {
                    const matchesTexto = buscaTexto === "" || 
                        (proc.nome && proc.nome.toLowerCase().includes(buscaTexto)) ||
                        (proc.codigo && proc.codigo.includes(buscaTexto)) ||
                        (proc.descricao && proc.descricao.toLowerCase().includes(buscaTexto)) ||
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

        // Atualização da Interface Visual
        gridProcedimentos.innerHTML = '';
        counterProcedimentos.textContent = `Listando ${listagemFinal.length} procedimento(s)`;

        if (listagemFinal.length === 0) {
            gridProcedimentos.innerHTML = '<div class="card-proc" style="padding: 2rem; text-align: center; color: #475569; border-left: 5px solid #cbd5e1;">Nenhum procedimento correspondente encontrado na base de dados.</div>';
            return;
        }

        listagemFinal.forEach(proc => {
            const card = document.createElement('article');
