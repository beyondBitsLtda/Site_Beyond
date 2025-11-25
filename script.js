// --- INICIALIZAÇÃO E DADOS GLOBAIS ---
let testCaseCounter = 0;
let ticketCounter = 0;
let testCaseData = {};
let ticketData = {};
let isFilteringFailed = false;
let roadmapAggregatedData = {};
let currentLoadedProjectName = null;
let attachingLogToCaseId = null; 
let attachingFlowchartToCaseId = null;
let currentAuthor = null; 
let currentView = 'list'; // 'list' ou 'kanban' ou 'tickets'
let aiCorrectionContext = { caseId: null, field: null };
let stagedTicketEvidences = {}; // NOVO: Armazena evidências para o próximo ticket a ser gerado
let currentMacroProjectId = null;
// --- SUBSTITUA AS CONSTANTES DE ARMAZENAMENTO NO TOPO DO ARQUIVO ---

const MACRO_PROJECTS_KEY = 'testAppMacroProjects'; // Nova chave principal

// --- NOVAS CONSTANTES PARA PLANEJAMENTO ---
const planningPriorities = ["N/A", "Baixa", "Média", "Alta", "Crítica"];
const planningWeights = ["N/A", "1", "2", "3", "5", "8"];

let activeFilters = {
    workflowStatus: [],
    tipoTeste: [],
    tipoFalha: []
};
const LOCAL_STORAGE_KEY = 'testCaseProjects'; // Esta chave pode ser removida ou mantida para migração futura
const USER_SETTINGS_KEY = 'testAppUserSettings';

// --- CHAVE DE API GLOBAL ---
// Defina um valor padrão apenas para desenvolvimento; a chave pode ser salva pelo usuário no painel de controle.
const DEFAULT_GOOGLE_AI_API_KEY = "SUA_CHAVE_DE_API_VAI_AQUI";
let GOOGLE_AI_API_KEY = DEFAULT_GOOGLE_AI_API_KEY;

let userSettings = {
    authorName: 'Anônimo',
    profilePicture: 'profile_default.png',
    darkMode: false,
    aiApiKey: '',
    ai: {
        generateDescription: true,
        generateFlowchart: true,
        importFromWord: true,
        prioritizeFailure: true,
        summarizeRoadmap: true,
        generateEmailReport: true,
        analyzeLog: true,
        analyzeMedia: true,
        chatAssistant: true,
        correctWithAI: true
    }
};

window.addEventListener('message', function(event) {
    if (!event.data || !event.data.type) {
        return;
    }
    const { type, caseId, field, value, payload } = event.data;
    switch (type) {
        case 'UPDATE_DATA':
            updateTestCaseData(caseId, field, value);
            const cardElement = document.getElementById(caseId);
            if (cardElement) {
                const inputElement = cardElement.querySelector(`[onchange*="${field}"], [data-field="${field}"]`);
                if (inputElement) {
                    if (inputElement.type === 'checkbox') inputElement.checked = value;
                    else inputElement.value = value;
                    if (inputElement.tagName === 'SELECT') handleResultChange(caseId, value);
                }
            }
            break;
        case 'APPLY_BULK_UPDATE':
            const changes = payload.data;
            const newEvidences = payload.evidence;
            for (const id in changes) {
                if (testCaseData[id]) {
                    for (const changedField in changes[id]) {
                        const changedValue = changes[id][changedField];
                        updateTestCaseData(id, changedField, changedValue);
                        const mainCard = document.getElementById(id);
                        if (mainCard) {
                            const inputEl = mainCard.querySelector(`[data-field="${changedField}"], [onchange*="'${changedField}'"]`);
                            if (inputEl) {
                                inputEl.value = changedValue;
                                inputEl.dispatchEvent(new Event('change', { bubbles: true }));
                            }
                        }
                    }
                }
            }
            for (const id in newEvidences) {
                 if (testCaseData[id]) {
                    newEvidences[id].forEach(evidence => {
                        testCaseData[id].evidences.push(evidence);
                        renderEvidencePreview(id, evidence, false);
                    });
                }
            }
            updateSummary();
            if (currentView === 'kanban') renderKanbanBoard();
            break;
        case 'ADD_EVIDENCE':
            if (testCaseData[caseId]) {
                testCaseData[caseId].evidences.push(payload);
                renderEvidencePreview(caseId, payload, false);
                updateSummary();
            }
            break;
        case 'START_RECORDING':
            startCardScreenRecording(caseId, true);
            break;
    }
});

function receiveCaptureData(event) {
    if (!event.source || event.source.opener !== window) return;
    const { type, caseId, field, value, payload } = event.data;
    if (!caseId || !testCaseData[caseId]) {
        console.warn('Mensagem recebida da janela de teste para um ID de caso inválido:', caseId);
        return;
    }
    console.log(`Mensagem recebida: Tipo=${type}, CaseID=${caseId}`);
    switch (type) {
        case 'UPDATE_DATA':
            updateTestCaseData(caseId, field, value);
            const cardElement = document.getElementById(caseId);
            if (cardElement) {
                const inputElement = cardElement.querySelector(`[onchange*="${field}"], [data-field="${field}"]`);
                if (inputElement) {
                    inputElement.value = value;
                    if (field === 'resultado') handleResultChange(caseId, value);
                }
            }
            break;
        case 'ADD_EVIDENCE':
            if (payload) {
                testCaseData[caseId].evidences.push(payload);
                renderEvidencePreview(caseId, payload, false);
                updateSummary();
            }
            break;
        case 'START_RECORDING':
            console.log(`Recebida solicitação para iniciar gravação para o caso: ${caseId}`);
            startCardScreenRecording(caseId);
            window.focus();
            break;
        default:
            console.warn('Tipo de mensagem desconhecido recebido da janela de teste:', type);
            break;
    }
}

const testResults = ["Selecione um resultado", "Aprovado", "Reprovado", "Inválido"];
const testTypes = ["Selecione um tipo", "Unidade", "Componente", "Sistema"];
const failureTypes = ["N/A", "Erro de preenchimento", "Erro de performance", "Erro de dados", "Erro de usabilidade"];
const resolutionStatusTypes = ["Selecione um status", "Pendente", "Em Análise", "Corrigido", "Não será corrigido"];
const projectStatusTypes = ['Ativo', 'Finalizado', 'Inativo'];
const ticketStatuses = ["Aberto", "Em Análise", "Em Desenvolvimento", "Aguardando QA", "Fechado"];
const ticketPriorities = ["Baixa", "Média", "Alta", "Crítica"];

let mediaRecorder;
let recordedChunks = [];
let screenStream;
let recordingCaseId = null;
let currentRecordingBlob = null;
let recordingTimerInterval = null; 
let floatingControls = null; 
let drawingCanvas = null;
let canvasCtx = null;
let isDrawing = false;
let isPencilActive = false;
const PENCIL_COLORS = ['#E6194B', '#3CB44B', '#FFE119', '#4363D8', '#F58231', '#911EB4', '#46F0F0', '#F032E6', '#BCF60C', '#FABEBE', '#008080', '#E6BEFF', '#9A6324', '#FFFAC8', '#800000', '#000075'];
let drawingColor = PENCIL_COLORS[0];
let chatHistory = [];
let isAssistantTyping = false;
const capturedLogs = [];
const originalConsole = {};
let resultsChartInstance = null;
let failureTypesChartInstance = null;
const failureTypeColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF'];

// SUBSTITUA TODA A SUA FUNÇÃO 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', () => {
    mermaid.initialize({ startOnLoad: false, theme: 'default' });
    loadUserSettings();
    setupConsoleLogger();
    if (Object.keys(testCaseData).length === 0) showInitialView();
    else showTestCaseView();
    updateSummary();
    renderGlobalTagFilter();
    window.addEventListener('message', receiveCaptureData);
    document.getElementById('open-chat-btn').onclick = () => toggleChatAssistant(true);
    document.getElementById('chat-close-btn').onclick = () => toggleChatAssistant(false);
    document.getElementById('chat-send-btn').onclick = handleSendMessage;
    document.getElementById('chat-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); handleSendMessage(); } });
    document.getElementById('view-toggle-btn').onclick = toggleView;

    // Listeners adicionados
    document.getElementById('retrospective-btn').onclick = showRetrospective;
    document.getElementById('analytics-btn').onclick = showAnalyticsPanel;

    const controlPanelLogoutBtn = document.getElementById('control-panel-logout-btn');
    if (controlPanelLogoutBtn) controlPanelLogoutBtn.onclick = () => document.getElementById('logout-btn')?.click();

    document.getElementById('ticket-filter-status').addEventListener('change', renderTicketKanbanBoard);
    document.getElementById('ticket-filter-priority').addEventListener('change', renderTicketKanbanBoard);
    document.getElementById('ticket-filter-assignee').addEventListener('input', renderTicketKanbanBoard);
});

function loadUserSettings() {
    // --- NOVO: Ícone de perfil SVG embutido para não depender de arquivos externos ---
    const defaultProfilePic = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

    const savedSettings = localStorage.getItem(USER_SETTINGS_KEY);
    if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        // Garante que a foto de perfil não seja nula ou vazia
        if (!parsedSettings.profilePicture) {
            parsedSettings.profilePicture = defaultProfilePic;
        }
        userSettings = { ...userSettings, ...parsedSettings, ai: { ...userSettings.ai, ...(parsedSettings.ai || {}) } };
        const img = new Image();
        img.src = userSettings.profilePicture;
        // Se a imagem salva falhar ao carregar, usa o SVG padrão
        img.onerror = () => { 
            userSettings.profilePicture = defaultProfilePic; 
            document.getElementById('control-panel-img').src = userSettings.profilePicture; 
        };
    } else {
        userSettings.profilePicture = defaultProfilePic;
    }
    currentAuthor = userSettings.authorName;
    applySettings();
}

function saveUserSettings() {
    userSettings.authorName = document.getElementById('control-panel-name').value.trim() || 'Anônimo';
    userSettings.darkMode = document.getElementById('toggle-dark-mode').checked;
    userSettings.aiApiKey = document.getElementById('ai-api-key').value.trim();
    for (const key in userSettings.ai) {
        const toggle = document.getElementById(`toggle-ai-${key}`);
        if (toggle) userSettings.ai[key] = toggle.checked;
    }
    localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(userSettings));
    currentAuthor = userSettings.authorName;
    applySettings();
    alert("Configurações salvas!");
    closeModal('control-panel-modal');
}

function applySettings() {
    document.body.classList.toggle('dark-mode', userSettings.darkMode);
    applyAISettings();
}

function applyAISettings() {
    for (const feature in userSettings.ai) {
        const isEnabled = userSettings.ai[feature];
        document.querySelectorAll(`[data-ai-feature="${feature}"]`).forEach(el => el.style.display = isEnabled ? '' : 'none');
    }
}

function getConfiguredGeminiApiKey() {
    const savedKey = (userSettings.aiApiKey || '').trim();
    const fallbackKey = (GOOGLE_AI_API_KEY || '').trim();
    return savedKey || fallbackKey || DEFAULT_GOOGLE_AI_API_KEY;
}

function getGeminiApiKey(showAlert = true) {
    const key = getConfiguredGeminiApiKey();
    const isConfigured = Boolean(key && key !== DEFAULT_GOOGLE_AI_API_KEY);
    if (!isConfigured && showAlert) {
        alert("Por favor, configure sua chave de API do Google AI Studio no Painel de Controle.");
        return null;
    }
    return isConfigured ? key : null;
}

// Utilize o alias estável do modelo para evitar erros 404 em diferentes versões da API.
const GEMINI_MODEL = 'gemini-2.5-flash';

function buildGeminiEndpoint(showAlert = true) {
    const key = getGeminiApiKey(showAlert);
    if (!key) return null;
    // Usa a versão v1 da API, que fornece o alias "-latest" para os modelos atuais.
    return `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${key}`;
}

function showControlPanel() {
    document.getElementById('control-panel-name').value = userSettings.authorName;
    document.getElementById('control-panel-img').src = userSettings.profilePicture;
    document.getElementById('toggle-dark-mode').checked = userSettings.darkMode;
    const apiKeyInput = document.getElementById('ai-api-key');
    if (apiKeyInput) apiKeyInput.value = userSettings.aiApiKey || '';
    for (const key in userSettings.ai) {
        const toggle = document.getElementById(`toggle-ai-${key}`);
        if (toggle) toggle.checked = userSettings.ai[key];
    }
    const summary = getSummaryData();
    document.getElementById('cp-total-tests').textContent = summary.total;
    document.getElementById('cp-approved-tests').textContent = summary.approved;
    document.getElementById('cp-failed-tests').textContent = summary.failed;
    document.getElementById('control-panel-modal').style.display = 'flex';
}

function handleProfilePictureUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const imageUrl = e.target.result;
        document.getElementById('control-panel-img').src = imageUrl;
        userSettings.profilePicture = imageUrl;
    };
    reader.readAsDataURL(file);
}

function toggleView() {
    const listContainer = document.getElementById('test-case-container');
    const kanbanModal = document.getElementById('kanban-modal');
    const toggleBtn = document.getElementById('view-toggle-btn');
    document.getElementById('ticket-management-container').style.display = 'none';

    if (currentView === 'list') {
        currentView = 'kanban';
        listContainer.style.display = 'none';
        toggleBtn.textContent = 'Ver Modo Lista'; // Garante o texto correto
        renderKanbanBoard();
        kanbanModal.style.display = 'flex';
    } else {
        currentView = 'list';
        kanbanModal.style.display = 'none';
        toggleBtn.textContent = 'Planejamento'; // Garante o texto correto
        listContainer.style.display = 'block';
    }
}

function showInitialView() {
    document.getElementById('initial-view-container').style.display = 'block';
    document.getElementById('test-case-container').style.display = 'none';
    document.getElementById('kanban-board-container').style.display = 'none';
    document.getElementById('ticket-management-container').style.display = 'none';
    
    // Agora renderiza a lista de Macro-Projetos na view inicial
    renderMacroProjectsList('initial-project-list', 'load'); 
}

function showTestCaseView() {
    document.getElementById('initial-view-container').style.display = 'none';
    document.getElementById('ticket-management-container').style.display = 'none';
    currentView = 'list';
    document.getElementById('kanban-modal').style.display = 'none';
    document.getElementById('test-case-container').style.display = 'block';
    document.getElementById('view-toggle-btn').textContent = 'Ver Modo Kanban';
}

function setupConsoleLogger() {
    const logOutputElement = document.getElementById('log-output');
    originalConsole.log = console.log;
    originalConsole.warn = console.warn;
    originalConsole.error = console.error;
    originalConsole.info = console.info;
    const logToConsole = (type, ...args) => {
        const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ');
        const timestamp = new Date().toLocaleTimeString();
        const typeLabel = type.toUpperCase();
        const logEntry = { type, message: `${timestamp} - ${typeLabel}: ${message}` };
        capturedLogs.push(logEntry);
        renderLog(logEntry, logOutputElement);
        originalConsole[type].apply(console, args);
    };
    console.log = (...args) => logToConsole('log', ...args);
    console.warn = (...args) => logToConsole('warn', ...args);
    console.error = (...args) => logToConsole('error', ...args);
    console.info = (...args) => logToConsole('info', ...args);
}

function renderLog(logEntry, logOutputElement) {
    const logDiv = document.createElement('div');
    logDiv.className = `log-entry log-${logEntry.type}`;
    logDiv.textContent = logEntry.message;
    logOutputElement.appendChild(logDiv);
    logOutputElement.scrollTop = logOutputElement.scrollHeight;
}

function clearCapturedLogs() {
    capturedLogs.length = 0;
    document.getElementById('log-output').innerHTML = '';
}

// SUBSTITUA TODA A SUA FUNÇÃO por esta versão definitiva

// SUBSTITUA A FUNÇÃO INTEIRA PELA VERSÃO ABAIXO

// SUBSTITUA A FUNÇÃO INTEIRA por esta versão definitiva

function addNewTestCase(data = {}) {
    showTestCaseView();
    testCaseCounter++;
    const currentId = `test-case-${testCaseCounter}`;
    const parentId = data.parentId || null;
    const isReTest = data.isReTest || false;
    let displayId;

    if (isReTest && parentId && testCaseData[parentId]) {
        testCaseData[parentId].reTestCount = (testCaseData[parentId].reTestCount || 0) + 1;
        displayId = `${testCaseData[parentId].displayId}.${testCaseData[parentId].reTestCount}`;
    } else {
        displayId = testCaseCounter.toString();
    }

    if (data.devComment && !data.devComments) {
        data.devComments = [{ text: data.devComment, author: 'DEV', evidences: data.devEvidences || [], timestamp: new Date().toISOString() }];
    }

    const card = document.createElement('div');
    card.className = `test-case-card ${isReTest ? 'is-retest' : ''}`;
    card.id = currentId;
    if (isReTest && parentId) card.setAttribute('data-parent-id', parentId);

    const buildOptions = (options, selectedValue) => options.map(opt => `<option value="${opt}" ${opt === selectedValue ? 'selected' : ''}>${opt}</option>`).join('');
    const showDevCommentSection = (data.devComments && data.devComments.length > 0);
    
    // HTML SEM a seção de planejamento visual
    card.innerHTML = `
        <div id="${currentId}-status-indicator" class="status-indicator"></div>
        <div class="test-case-header">
            <div class="test-case-title-container" style="display: flex; align-items: center; flex-grow: 1;">
                 <div id="${currentId}-title-text" class="test-case-title">ID #${displayId} ${isReTest ? '<span class="retest-label">🔄 Re-teste</span>' : ''}</div>
            </div>
            <div>
                <button class="btn-history-card" onclick="showHistoryModal('${currentId}')" title="Ver Histórico de Status">📜</button>
                <button class="btn-window-capture" onclick="openCaptureWindow('${currentId}')">👁️ Testar em Janela</button>
                ${!isReTest ? `<button class="btn btn-toggle-retests hidden-field" onclick="toggleRetests('${currentId}', this)">➖ Recolher Re-testes</button>` : ''}
                <button class="btn-remove" onclick="removeTestCase('${currentId}')">🗑️ Remover</button>
                ${!isReTest ? `<button class="btn btn-retest" onclick="addReTest('${currentId}')">🔄 Re-testar</button>` : ''}
            </div>
        </div>

        <div id="${currentId}-resolution-progress-container" class="resolution-progress-container hidden-field">
            <span id="${currentId}-traffic-light-indicator" class="traffic-light-indicator"></span>
            <span class="resolution-progress-label">Resolução Tickets:</span>
            <div class="resolution-progress-bar"><div id="${currentId}-progress-bar-inner" class="resolution-progress-bar-inner"></div></div>
            <span id="${currentId}-progress-percent" class="resolution-progress-label">0%</span>
        </div>

        <div id="${currentId}-generated-tickets-section" class="generated-tickets-section hidden-field">
            <h4>Tickets Gerados:</h4>
            <div id="${currentId}-tickets-list" class="tickets-list-inline"></div>
        </div>

        <div class="test-case-body">
            <div class="form-group form-group-with-icon"><label class="form-label">Nome do item a ser testado:</label><input type="text" class="form-input" value="${data.itemTestado || ''}" onchange="updateTestCaseData('${currentId}', 'itemTestado', this.value)" data-field="itemTestado" ${isReTest ? 'readonly' : ''}><button class="btn-ai-correct" title="Corrigir com IA" data-ai-feature="correctWithAI" onclick="openAICorrectionModal('${currentId}', 'itemTestado')">✨</button></div>
            <div class="form-group"><label class="form-label">Condição de aprovação:</label><textarea class="form-textarea" onchange="updateTestCaseData('${currentId}', 'condicaoAprovacao', this.value)">${data.condicaoAprovacao || ''}</textarea></div>
            
            <div class="form-group form-group-with-icon"><label class="form-label">Descrição do caso de teste:</label><textarea id="${currentId}-descricao" class="form-textarea" onchange="updateTestCaseData('${currentId}', 'descricao', this.value)" data-field="descricao">${data.descricao || ''}</textarea><button class="btn-ai-correct" title="Corrigir com IA" data-ai-feature="correctWithAI" onclick="openAICorrectionModal('${currentId}', 'descricao')">✨</button></div>
            <button class="btn btn-record" data-ai-feature="generateDescription" style="margin-bottom: 15px;" onclick="generateDescriptionWithAI('${currentId}')">🤖 Gerar Descrição com IA</button>
            <div class="form-group"><label class="form-label">Tipo de teste:</label><select class="form-select" onchange="updateTestCaseData('${currentId}', 'tipoTeste', this.value)">${buildOptions(testTypes, data.tipoTeste)}</select></div>
            <div id="${currentId}-result-container" class="form-group"><label class="form-label">Resultado:</label><select class="form-select" onchange="handleResultChange('${currentId}', this.value)">${buildOptions(testResults, data.resultado)}</select></div>
            <div id="${currentId}-failure-field" class="form-group ${data.resultado === 'Reprovado' ? '' : 'hidden-field'}"><label class="form-label">Tipo de falha:</label><select class="form-select" onchange="updateTestCaseData('${currentId}', 'tipoFalha', this.value)">${buildOptions(failureTypes, data.tipoFalha)}</select></div>
            <div id="${currentId}-resolution-status-field" class="form-group ${data.resultado === 'Reprovado' || data.resultado === 'Inválido' ? '' : 'hidden-field'}"><label class="form-label">Status da Resolução:</label><select class="form-select" onchange="updateTestCaseData('${currentId}', 'resolutionStatus', this.value)">${buildOptions(resolutionStatusTypes, data.resolutionStatus)}</select></div>
            <div id="${currentId}-priority-field" class="form-group hidden-field" data-ai-feature="prioritizeFailure"><label class="form-label">Prioridade Sugerida (IA):</label><div class="ai-suggestion-box" id="${currentId}-priority-output"></div></div>
            <div id="${currentId}-team-field" class="form-group hidden-field" data-ai-feature="prioritizeFailure"><label class="form-label">Equipe Sugerida (IA):</label><div class="ai-suggestion-box" id="${currentId}-team-output"></div></div>
            <div id="${currentId}-ticket-generation-section" class="hidden-field"><hr class="sidebar-divider"><div class="form-group"><label class="form-label" style="color: var(--cor-status-reprovado); font-weight: bold;">Descrição do Erro (para o Ticket):</label><textarea id="${currentId}-error-description" class="form-textarea" placeholder="Detalhe o erro encontrado para que um ticket seja criado para a equipe de desenvolvimento."></textarea></div><button class="btn btn-generate-ticket" onclick="generateTicket('${currentId}')">🎫 Gerar Novo Ticket</button><hr class="sidebar-divider"></div>
            <button class="btn btn-toggle-dev-comment" onclick="toggleDevComment('${currentId}', this)">${showDevCommentSection ? '💬 Ocultar Comentários' : '💬 Exibir Comentários'}</button>
            <div id="${currentId}-dev-comment-wrapper" class="dev-comment-section ${showDevCommentSection ? '' : 'hidden-field'}"><div id="${currentId}-dev-comments-list" class="dev-comments-list"></div><div class="new-comment-area"><label class="form-label">Adicionar novo comentário técnico/resposta:</label><textarea id="${currentId}-new-dev-comment" class="form-textarea" placeholder="Digite seu comentário aqui..."></textarea><button class="btn btn-add-comment-dev" onclick="addComment('${currentId}', 'DEV')">Adicionar Comentário DEV</button><button class="btn btn-add-comment-qa" onclick="addComment('${currentId}', 'QA')">Adicionar Resposta QA</button></div></div>
            <div class="evidence-section"><div class="evidence-section-header"><div class="evidence-title">📸 Evidências do QA</div><div class="card-record-controls"><button id="attach-log-${currentId}" class="attach-log-btn" onclick="showLogAttachModal('${currentId}')">📝 Anexar Log</button><button id="start-record-${currentId}" class="start-record-btn" onclick="startCardScreenRecording('${currentId}')">▶️ Gravar Tela</button></div></div><div id="${currentId}-evidence-grid" class="evidence-grid"><label class="evidence-upload"><input type="file" accept="image/*,video/*" multiple onchange="handleEvidenceUpload('${currentId}', this.files, false)"><span>➕ Adicionar via Arquivo</span></label><div class="evidence-paste-area"><span>📋 Ou cole (Ctrl+V) uma imagem aqui</span></div></div></div>
            <div class="tags-section"><div class="form-label">🏷️ Tags</div><div id="${currentId}-tags-container" class="tags-container"></div><input type="text" class="tag-input" placeholder="Adicionar tag e pressionar Enter..." onkeydown="if(event.key === 'Enter') addTag('${currentId}', this)"></div>
        </div>`;
        
    const container = document.getElementById('test-case-container');
    if (isReTest && parentId) {
        const parentCard = document.getElementById(parentId);
        if (parentCard) {
            const retests = document.querySelectorAll(`[data-parent-id="${parentId}"]`);
            (retests.length > 0 ? retests[retests.length - 1] : parentCard).after(card);
            card.classList.add('indented-retest');
            parentCard.querySelector('.btn-toggle-retests').classList.remove('hidden-field');
        } else { container.appendChild(card); }
    } else { container.appendChild(card); }
    
    const evidenceGrid = document.getElementById(`${currentId}-evidence-grid`);
    if (evidenceGrid) evidenceGrid.addEventListener('paste', (event) => handlePastedEvidence(event, currentId));
    
    // O objeto de dados continua salvando os campos, mesmo sem inputs visíveis
    testCaseData[currentId] = { 
        id: testCaseCounter, 
        displayId, 
        parentId, 
        isReTest, 
        reTestCount: 0, 
        itemTestado: data.itemTestado || '', 
        condicaoAprovacao: data.condicaoAprovacao || '', 
        descricao: data.descricao || '', 
        tipoTeste: data.tipoTeste || testTypes[0], 
        resultado: data.resultado || testResults[0], 
        tipoFalha: data.tipoFalha || failureTypes[0], 
        resolutionStatus: data.resolutionStatus || resolutionStatusTypes[0], 
        evidences: data.evidences || [], 
        devComments: data.devComments || [], 
        priority: data.priority || null, 
        suggestedTeam: data.suggestedTeam || null, 
        tags: data.tags || [], 
        executionHistory: data.executionHistory || [], 
        tickets: data.tickets || [],
        // Os dados de planejamento continuam aqui
        dataEntrega: data.dataEntrega || '',
        responsavel: data.responsavel || '',
        prioridadePlanejamento: data.prioridadePlanejamento || planningPriorities[0],
        peso: data.peso || planningWeights[0]
    };
    
    if (!data.executionHistory) addInitialHistory(currentId);
    
    updateTestCaseDisplay(currentId);
    renderComments(currentId);
    updateCommentButtonText(currentId);
    (data.evidences || []).forEach(evidence => renderEvidencePreview(currentId, evidence, false));
    renderTags(currentId);
    updateStatusIndicator(currentId);
    updateResolutionStatusStyle(currentId);
    updateSummary();
    applyAISettings(); 
    if (currentView === 'kanban') renderKanbanBoard();
}
function addReTest(parentCaseId) {
    const parent = testCaseData[parentCaseId];
    addNewTestCase({ parentId: parentCaseId, isReTest: true, itemTestado: parent.itemTestado, condicaoAprovacao: parent.condicaoAprovacao, tipoTeste: parent.tipoTeste, descricao: `Re-teste para: ${parent.displayId} - ${parent.itemTestado || 'Item não informado'}` });
}

function removeTestCase(caseId) {
    if (!confirm('Tem certeza que deseja remover este caso de teste e todos os seus re-testes?')) return;
    const caseToRemove = testCaseData[caseId];
    if (caseToRemove && !caseToRemove.isReTest) {
        (caseToRemove.tickets || []).forEach(ticketId => { delete ticketData[ticketId]; });
        document.querySelectorAll(`[data-parent-id="${caseId}"]`).forEach(child => {
            (testCaseData[child.id]?.tickets || []).forEach(ticketId => { delete ticketData[ticketId]; });
            delete testCaseData[child.id];
            child.remove();
        });
    }
    document.getElementById(caseId).remove();
    delete testCaseData[caseId];
    updateSummary();
    renderGlobalTagFilter();
    if (currentView === 'kanban') renderKanbanBoard();
    if (currentView === 'tickets') renderTicketKanbanBoard();
}

// Substitua sua função updateTestCaseData por esta
function updateTestCaseData(caseId, key, value) {
    if (testCaseData[caseId]) {
        testCaseData[caseId][key] = value;
        if (key === 'resolutionStatus' && value === 'Corrigido') {
            testCaseData[caseId].resultado = 'Aprovado';
            const card = document.getElementById(caseId);
            if (card) {
                const resultSelect = card.querySelector('select[onchange*="handleResultChange"]');
                if (resultSelect) {
                    resultSelect.value = 'Aprovado';
                    handleResultChange(caseId, 'Aprovado');
                }
            }
        }
        updateSummary();
        if (key === 'resolutionStatus') updateResolutionStatusStyle(caseId);

        // Adicione esta linha para atualizar o quadro Kanban após qualquer mudança
        if (currentView === 'kanban') renderKanbanBoard();
    }
}

function handleResultChange(caseId, result) {
    const oldResult = testCaseData[caseId].resultado;
    if (oldResult !== result) addExecutionHistory(caseId, oldResult, result);
    updateTestCaseData(caseId, 'resultado', result);
    const failureField = document.getElementById(`${caseId}-failure-field`);
    const statusField = document.getElementById(`${caseId}-resolution-status-field`);
    const priorityField = document.getElementById(`${caseId}-priority-field`);
    const teamField = document.getElementById(`${caseId}-team-field`);
    const ticketGenSection = document.getElementById(`${caseId}-ticket-generation-section`);
    const caseData = testCaseData[caseId];
    const isFailed = result === 'Reprovado';
    const isInvalid = result === 'Inválido';
    failureField.classList.toggle('hidden-field', !isFailed);
    ticketGenSection.classList.toggle('hidden-field', !(isFailed || isInvalid));
    const shouldShowStatusField = isFailed || isInvalid || (caseData && caseData.resolutionStatus === 'Corrigido');
    statusField.classList.toggle('hidden-field', !shouldShowStatusField);
    if (isFailed && userSettings.ai.prioritizeFailure) {
        priorityField.style.display = '';
        teamField.style.display = '';
        analyzeAndPrioritizeFailure(caseId);
    } else {
        priorityField.style.display = 'none';
        teamField.style.display = 'none';
    }
    if (!isFailed) {
        updateTestCaseData(caseId, 'tipoFalha', failureTypes[0]);
        if(failureField.querySelector('select')) failureField.querySelector('select').value = failureTypes[0];
    }
    if (!shouldShowStatusField) {
        updateTestCaseData(caseId, 'resolutionStatus', resolutionStatusTypes[0]);
        if(statusField.querySelector('select')) statusField.querySelector('select').value = resolutionStatusTypes[0];
    }
    updateStatusIndicator(caseId);
    updateResolutionStatusStyle(caseId);
    if (currentView === 'kanban') renderKanbanBoard();
}

function updateStatusIndicator(caseId) {
    const indicator = document.getElementById(`${caseId}-status-indicator`);
    const result = testCaseData[caseId].resultado;
    indicator.className = 'status-indicator';
    const statusClass = { 'Aprovado': 'approved', 'Reprovado': 'failed', 'Inválido': 'invalid' }[result];
    if (statusClass) indicator.classList.add(statusClass);
}

function updateResolutionStatusStyle(caseId) {
    const card = document.getElementById(caseId);
    if (!card) return;
    card.classList.remove('status-pendente', 'status-em-analise', 'status-corrigido', 'status-nao-corrigido');
    const result = testCaseData[caseId].resultado;
    const status = testCaseData[caseId].resolutionStatus;
    const shouldShowStatusField = (result === 'Reprovado' || result === 'Inválido' || status === 'Corrigido');
    if (!shouldShowStatusField) return;
    const statusClass = { 'Pendente': 'status-pendente', 'Em Análise': 'status-em-analise', 'Corrigido': 'status-corrigido', 'Não será corrigido': 'status-nao-corrigido' }[status];
    if (statusClass) card.classList.add(statusClass);
}

function toggleDevComment(caseId, button) {
    document.getElementById(`${caseId}-dev-comment-wrapper`).classList.toggle('hidden-field');
    updateCommentButtonText(caseId);
}

function toggleRetests(parentCaseId, button) {
    const retests = document.querySelectorAll(`.test-case-card[data-parent-id="${parentCaseId}"]`);
    let makeVisible = retests.length > 0 && retests[0].style.display === 'none';
    retests.forEach(child => child.style.display = makeVisible ? '' : 'none');
    button.textContent = makeVisible ? '➖ Recolher Re-testes' : '➕ Expandir Re-testes';
}

function addComment(caseId, author, prefilledText = null) {
    const textarea = document.getElementById(`${caseId}-new-dev-comment`);
    let text = prefilledText ? prefilledText.trim() : textarea.value.trim();
    if (!text) { if (!prefilledText) alert("O comentário não pode estar vazio."); return; }
    const finalAuthor = author === 'QA' ? (currentAuthor || 'QA') : author;
    const newComment = { text, author: finalAuthor, timestamp: new Date().toISOString(), evidences: [] };
    if (!testCaseData[caseId].devComments) testCaseData[caseId].devComments = [];
    testCaseData[caseId].devComments.push(newComment);
    renderComments(caseId);
    textarea.value = ''; 
    const wrapper = document.getElementById(`${caseId}-dev-comment-wrapper`);
    if (wrapper.classList.contains('hidden-field')) toggleDevComment(caseId, wrapper.previousElementSibling);
}

function renderComments(caseId) {
    const listContainer = document.getElementById(`${caseId}-dev-comments-list`);
    if (!listContainer) return;
    listContainer.innerHTML = '';
    const comments = testCaseData[caseId].devComments || [];
    comments.forEach((comment, index) => {
        const author = comment.author || 'DEV';
        const commentEntry = document.createElement('div');
        commentEntry.className = `comment-entry ${author === 'DEV' ? 'comment-author-dev' : 'comment-author-qa'}`;
        const timestamp = new Date(comment.timestamp).toLocaleString('pt-BR');
        commentEntry.innerHTML = `
            <div class="comment-header"><span class="comment-author">${author}</span><span class="comment-timestamp">Em: ${timestamp}</span></div>
            <p class="comment-text">${comment.text.replace(/\n/g, '<br>')}</p>
            <div class="dev-evidence-section">
                <div class="dev-evidence-title">Evidências deste comentário:</div>
                <div id="dev-evidence-grid-${caseId}-${index}" class="dev-evidence-grid">
                    <label class="dev-evidence-upload"><input type="file" accept="image/*,video/*" multiple onchange="handleDevEvidenceUpload('${caseId}', ${index}, this.files)"><span>➕ Anexar</span></label>
                </div>
            </div>`;
        listContainer.appendChild(commentEntry);
        if (comment.evidences) comment.evidences.forEach(evidence => renderEvidencePreview(caseId, evidence, true, index));
    });
}

async function startCardScreenRecording(caseId) {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') { alert("Uma gravação já está em andamento."); return; }
    try {
        screenStream = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: "always" }, audio: true });
        recordingCaseId = caseId;
        recordedChunks = [];
        mediaRecorder = new MediaRecorder(screenStream, { mimeType: 'video/webm' });
        mediaRecorder.ondataavailable = e => e.data.size > 0 && recordedChunks.push(e.data);
        mediaRecorder.onstop = () => {
            if (floatingControls) floatingControls.remove();
            clearInterval(recordingTimerInterval);
            floatingControls = null;
            currentRecordingBlob = new Blob(recordedChunks, { type: 'video/webm' });
            const videoURL = URL.createObjectURL(currentRecordingBlob);
            document.getElementById('recording-preview-player').src = videoURL;
            document.getElementById('recording-preview-modal').style.display = 'flex';
        };
        screenStream.getVideoTracks()[0].onended = () => stopCardScreenRecording();
        mediaRecorder.start();
        createFloatingControls();
        document.querySelectorAll('.start-record-btn').forEach(btn => btn.disabled = true);
        console.log("Gravação de tela iniciada.");
    } catch (err) {
        console.error("Erro ao iniciar a gravação:", err);
        alert("Não foi possível iniciar a gravação. Verifique as permissões do navegador.");
        cleanupAfterRecording(true);
    }
}

function setupDrawingCanvas() {
    if (drawingCanvas) drawingCanvas.remove();
    drawingCanvas = document.createElement('canvas');
    drawingCanvas.id = 'drawing-canvas';
    drawingCanvas.width = window.innerWidth;
    drawingCanvas.height = window.innerHeight;
    document.body.appendChild(drawingCanvas);
    canvasCtx = drawingCanvas.getContext('2d');
    canvasCtx.lineWidth = 4;
    canvasCtx.lineJoin = 'round';
    canvasCtx.lineCap = 'round';
    canvasCtx.strokeStyle = drawingColor;
}

function activatePencil() {
    isPencilActive = !isPencilActive;
    drawingCanvas.style.display = isPencilActive ? 'block' : 'none';
    floatingControls.classList.toggle('drawing-active', isPencilActive);
    if (isPencilActive) setupCanvasListeners();
    else {
        drawingCanvas.removeEventListener('mousedown', startDrawing);
        drawingCanvas.removeEventListener('mousemove', draw);
        drawingCanvas.removeEventListener('mouseup', stopDrawing);
        drawingCanvas.removeEventListener('mouseout', stopDrawing);
    }
}

function setupCanvasListeners() {
    drawingCanvas.addEventListener('mousedown', startDrawing);
    drawingCanvas.addEventListener('mousemove', draw);
    drawingCanvas.addEventListener('mouseup', stopDrawing);
    drawingCanvas.addEventListener('mouseout', stopDrawing);
}

function startDrawing(e) {
    isDrawing = true;
    canvasCtx.strokeStyle = drawingColor;
    canvasCtx.beginPath();
    canvasCtx.moveTo(e.clientX, e.clientY);
}

function draw(e) {
    if (!isDrawing) return;
    canvasCtx.lineTo(e.clientX, e.clientY);
    canvasCtx.stroke();
}

function stopDrawing() {
    isDrawing = false;
    canvasCtx.closePath();
}

function changeDrawingColor(color, element) {
    drawingColor = color;
    document.querySelectorAll('.color-palette .color-box').forEach(box => box.classList.remove('active'));
    element.classList.add('active');
}

function createFloatingControls() {
    if (floatingControls) floatingControls.remove();
    floatingControls = document.createElement('div');
    floatingControls.id = 'recording-controls-floating';
    floatingControls.className = 'recording-controls-floating';
    floatingControls.innerHTML = `
        <span class="status-dot"></span><span id="rec-timer">00:00</span>
        <button id="pause-rec-btn" title="Pausar">⏸️</button>
        <button id="resume-rec-btn" style="display:none;" title="Retomar">▶️</button>
        <button id="stop-rec-btn-floating" title="Parar Gravação">⏹️</button>`;
    document.body.appendChild(floatingControls);
    document.getElementById('pause-rec-btn').onclick = pauseRecording;
    document.getElementById('resume-rec-btn').onclick = resumeRecording;
    document.getElementById('stop-rec-btn-floating').onclick = stopCardScreenRecording;
    let seconds = 0;
    const timerElement = document.getElementById('rec-timer');
    recordingTimerInterval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        timerElement.textContent = `${mins}:${secs}`;
    }, 1000);
    dragMouseDown(floatingControls);
}

function cleanupAfterRecording(stopTracks) {
    if (stopTracks && screenStream) screenStream.getTracks().forEach(track => track.stop());
    if (floatingControls) floatingControls.remove();
    clearInterval(recordingTimerInterval);
    floatingControls = null;
    mediaRecorder = null;
    recordedChunks = [];
    currentRecordingBlob = null;
    recordingCaseId = null;
    screenStream = null;
    document.querySelectorAll('.start-record-btn').forEach(btn => btn.disabled = false);
}

function pauseRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.pause();
        floatingControls.classList.add('paused');
        document.getElementById('pause-rec-btn').style.display = 'none';
        document.getElementById('resume-rec-btn').style.display = 'inline-block';
        clearInterval(recordingTimerInterval);
    }
}

function resumeRecording() {
    if (mediaRecorder && mediaRecorder.state === 'paused') {
        mediaRecorder.resume();
        floatingControls.classList.remove('paused');
        document.getElementById('pause-rec-btn').style.display = 'inline-block';
        document.getElementById('resume-rec-btn').style.display = 'none';
        const timerElement = document.getElementById('rec-timer');
        let currentSeconds = (parseInt(timerElement.textContent.split(':')[0]) * 60) + parseInt(timerElement.textContent.split(':')[1]);
        recordingTimerInterval = setInterval(() => {
            currentSeconds++;
            const mins = Math.floor(currentSeconds / 60).toString().padStart(2, '0');
            const secs = (currentSeconds % 60).toString().padStart(2, '0');
            timerElement.textContent = `${mins}:${secs}`;
        }, 1000);
    }
}

function stopCardScreenRecording() {
    if (mediaRecorder && (mediaRecorder.state === 'recording' || mediaRecorder.state === 'paused')) mediaRecorder.stop();
    if(screenStream) screenStream.getTracks().forEach(track => track.stop());
}

function attachRecording() {
    if (currentRecordingBlob && recordingCaseId) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const evidenceData = { src: e.target.result, type: currentRecordingBlob.type, name: `gravacao-tela-${new Date().toISOString().replace(/[:.]/g, '-')}.webm` };
            if (testCaseData[recordingCaseId]) {
                 testCaseData[recordingCaseId].evidences.push(evidenceData);
                 renderEvidencePreview(recordingCaseId, evidenceData, false);
            }
            closeModal('recording-preview-modal');
        };
        reader.readAsDataURL(currentRecordingBlob);
    } else {
        console.error("Tentativa de anexar gravação sem dados (blob ou ID do caso).");
        closeModal('recording-preview-modal');
    }
}

function discardRecording() { closeModal('recording-preview-modal'); }

function dragMouseDown(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = e => {
        if (e.target.tagName === 'BUTTON' || e.target.closest('.color-palette')) return;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    };
    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function showLogAttachModal(caseId) {
    attachingLogToCaseId = caseId;
    const textarea = document.getElementById('log-attach-textarea');
    textarea.value = '';
    document.getElementById('log-attach-modal').style.display = 'flex';
    textarea.focus();
}

function attachPastedLogs() {
    if (!attachingLogToCaseId) return;
    const logText = document.getElementById('log-attach-textarea').value.trim();
    if (!logText) { alert("O campo de log está vazio."); return; }
    const logBlob = new Blob([logText], { type: 'text/plain' });
    const reader = new FileReader();
    reader.onload = (e) => {
        const evidenceData = { src: e.target.result, type: 'text/plain', name: `console-log-${new Date().toISOString().replace(/[:.]/g, '-')}.txt` };
        testCaseData[attachingLogToCaseId].evidences.push(evidenceData);
        renderEvidencePreview(attachingLogToCaseId, evidenceData, false);
        attachingLogToCaseId = null;
        closeModal('log-attach-modal');
    };
    reader.readAsDataURL(logBlob);
}

function handleEvidenceUpload(caseId, files, isDevEvidence, commentIndex = null) {
    if (!files || files.length === 0) return;
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = ((theFile) => (e) => {
            try {
                const evidenceData = { src: e.target.result, type: theFile.type, name: theFile.name };
                if (isDevEvidence) testCaseData[caseId].devComments[commentIndex].evidences.push(evidenceData);
                else testCaseData[caseId].evidences.push(evidenceData);
                renderEvidencePreview(caseId, evidenceData, isDevEvidence, commentIndex);
            } catch (error) {
                console.error("Erro ao processar evidência:", error);
                alert("Ocorreu um erro ao anexar a evidência.");
            }
        })(file);
        reader.readAsDataURL(file);
    }
}

function handleDevEvidenceUpload(caseId, commentIndex, files) { handleEvidenceUpload(caseId, files, true, commentIndex); }

function renderEvidencePreview(caseId, evidence, isDevEvidence, commentIndex = null) {
    const gridId = isDevEvidence ? `dev-evidence-grid-${caseId}-${commentIndex}` : `${caseId}-evidence-grid`;
    const uploadClass = isDevEvidence ? '.dev-evidence-upload' : '.evidence-upload';
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const uploadLabel = grid.querySelector(uploadClass);
    const previewWrapper = document.createElement('div');
    previewWrapper.className = 'evidence-preview-wrapper';
    let mediaElementHTML = '';
    let analysisButtonHTML = '';
    const sanitizedEvidenceSrc = evidence.src ? evidence.src.replace(/'/g, "&apos;").replace(/"/g, "&quot;") : '';
    const descriptionTagHTML = evidence.description ? `<div class="evidence-description-tag">${evidence.description}</div>` : '';
    if (evidence.type === 'text/mermaid') {
        const encodedSrc = btoa(encodeURIComponent(evidence.src));
        mediaElementHTML = `<div class="log-preview preview-media" onclick="openFlowchartViewerModal('${encodedSrc}')">📈<br>Fluxograma</div>`;
    } else if (evidence.type.startsWith('image/')) {
        mediaElementHTML = `<img src="${sanitizedEvidenceSrc}" class="preview-media" onclick="openMediaModal('${sanitizedEvidenceSrc}', '${evidence.type}', '${evidence.name}')">`;
        analysisButtonHTML = `<button class="btn btn-record" data-ai-feature="analyzeMedia" style="position:absolute; bottom:5px; left:5px; z-index:11; font-size:0.8rem; padding: 4px 8px;" onclick="analyzeImageWithAI(event, '${caseId}', '${sanitizedEvidenceSrc}', '${evidence.type}')">🤖 Analisar</button>`;
    } else if (evidence.type.startsWith('video/')) {
        mediaElementHTML = `<video src="${sanitizedEvidenceSrc}" class="preview-media" onclick="openMediaModal('${sanitizedEvidenceSrc}', '${evidence.type}', '${evidence.name}')"></video>`;
        analysisButtonHTML = `<button class="btn btn-record" data-ai-feature="analyzeMedia" style="position:absolute; bottom:5px; left:5px; z-index:11; font-size:0.8rem; padding: 4px 8px;" onclick="analyzeVideoWithAI(event, '${caseId}', '${sanitizedEvidenceSrc}')">🤖 Analisar</button>`;
    } else if (evidence.type.startsWith('text/plain')) {
        mediaElementHTML = `<div class="log-preview preview-media" onclick="openMediaModal('${sanitizedEvidenceSrc}', '${evidence.type}', '${evidence.name}')">📝<br>Log.txt</div>`;
    } else {
        mediaElementHTML = `<div class="log-preview preview-media" onclick="openMediaModal('${sanitizedEvidenceSrc}', '${evidence.type}', '${evidence.name}')">📎<br>Anexo</div>`;
    }
    const removeBtnHTML = `<button class="remove-evidence-btn" onclick="(function(e){ e.stopPropagation(); removeEvidence('${caseId}', '${sanitizedEvidenceSrc}', ${isDevEvidence}, ${commentIndex}); e.target.parentElement.parentElement.remove(); })(event)">&times;</button>`;
    const evidenceContainer = document.createElement('div');
    evidenceContainer.className = 'evidence-item-container';
    const descriptionInputHTML = `<input type="text" class="evidence-description-input" placeholder="Descrição da evidência..." value="${evidence.description || ''}" onkeyup="updateEvidenceDescription(event, '${caseId}', '${sanitizedEvidenceSrc}', ${isDevEvidence}, ${commentIndex})">`;
    previewWrapper.innerHTML = descriptionTagHTML + mediaElementHTML + removeBtnHTML + analysisButtonHTML;
    evidenceContainer.appendChild(previewWrapper);
    evidenceContainer.innerHTML += descriptionInputHTML;
    grid.insertBefore(evidenceContainer, uploadLabel);
    applyAISettings(); 
}

function updateEvidenceDescription(event, caseId, srcToFind, isDevEvidence, commentIndex) {
    const newDescription = event.target.value;
    let evidenceArray = isDevEvidence ? testCaseData[caseId]?.devComments[commentIndex]?.evidences : testCaseData[caseId]?.evidences;
    if (evidenceArray) {
        const evidence = evidenceArray.find(e => e.src === srcToFind);
        if (evidence) {
            evidence.description = newDescription;
            const container = event.target.previousElementSibling;
            let tag = container.querySelector('.evidence-description-tag');
            if (newDescription) {
                if (!tag) {
                    tag = document.createElement('div');
                    tag.className = 'evidence-description-tag';
                    container.insertBefore(tag, container.firstChild);
                }
                tag.textContent = newDescription;
            } else if (tag) tag.remove();
        }
    }
}

function removeEvidence(caseId, srcToRemove, isDevEvidence, commentIndex = null) {
    if (!testCaseData[caseId]) return;
    let evidenceArray = isDevEvidence ? testCaseData[caseId].devComments[commentIndex].evidences : testCaseData[caseId].evidences;
    const indexToRemove = evidenceArray.findIndex(e => e.src === srcToRemove);
    if (indexToRemove > -1) evidenceArray.splice(indexToRemove, 1);
}

function getAuthorName() { if (!currentAuthor) loadUserSettings(); }

function openMediaModal(src, type, name) {
    if (!src || !type) return;

    let targetEvidence = null;
    let parentCaseId = null;

    //-- CORREÇÃO: Lógica de busca robusta para encontrar a evidência e seu caso de teste pai
    // Procura primeiro nas evidências dos casos de teste
    for (const caseId in testCaseData) {
        const caseData = testCaseData[caseId];
        const found = (caseData.evidences || []).find(e => e.src === src);
        if (found) {
            targetEvidence = found;
            parentCaseId = caseId;
            break;
        }
    }

    // Se não encontrou, procura nas evidências dos tickets
    if (!targetEvidence) {
        for (const ticketId in ticketData) {
            const ticket = ticketData[ticketId];
            const foundInAttached = (ticket.attachedEvidences || []).find(e => e.src === src);
            if (foundInAttached) {
                targetEvidence = foundInAttached;
                parentCaseId = ticket.originalCaseId;
                break;
            }
            const foundInResolution = (ticket.resolutionEvidences || []).find(e => e.src === src);
            if (foundInResolution) {
                targetEvidence = foundInResolution;
                parentCaseId = ticket.originalCaseId;
                break;
            }
        }
    }
    
    if (type.startsWith('video/')) {
        //-- CORREÇÃO: Passa o caseId para a função de setup e ajusta o z-index do modal de vídeo
        setupVideoCommenter(targetEvidence, parentCaseId);
        const videoModal = document.getElementById('video-commenter-modal');
        videoModal.style.display = 'flex';
        videoModal.style.zIndex = '1051'; // Garante que o modal de vídeo fique na frente
    } else {
        const player = document.getElementById('media-modal-player');
        player.innerHTML = '';
        let mediaElement;
        if (type.startsWith('image/')) {
            mediaElement = document.createElement('img');
            mediaElement.src = src;
        } else if (type.startsWith('text/plain')) {
            try {
                const base64Data = src.split(',')[1];
                const decodedText = atob(base64Data);
                mediaElement = document.createElement('pre');
                mediaElement.className = 'log-modal-content';
                mediaElement.textContent = decodedText;
            } catch (e) {
                mediaElement = document.createElement('p');
                mediaElement.textContent = "Erro ao exibir o conteúdo do log.";
            }
        } else {
             mediaElement = document.createElement('p');
             mediaElement.textContent = `Visualização para o tipo "${type}" não suportada.`;
        }
        if (mediaElement) player.appendChild(mediaElement);
        const mediaModal = document.getElementById('media-modal');
        mediaModal.style.display = 'flex';
        mediaModal.style.zIndex = '1051'; // Garante que o modal de imagem fique na frente
    }
}
function createVideoBugReportUI(evidence, caseId) {
    const playerContainer = document.getElementById('media-modal-player');
    const modalContent = document.querySelector('#media-modal .modal-content');
    modalContent.style.maxWidth = '1400px';
    if (!evidence || !caseId || !testCaseData[caseId]) {
        playerContainer.innerHTML = "<p>Erro: evidência ou caso de teste não encontrado.</p>";
        return;
    }
    if (!evidence.comentariosPorTempo) evidence.comentariosPorTempo = [];
    if (!evidence.postIts) evidence.postIts = [];
    const caseData = testCaseData[caseId];
    const creationDate = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
    playerContainer.innerHTML = `
        <div class="video-commenter-wrapper">
            <div id="video-main-container" class="video-commenter-main"><video id="video-commenter-player" controls></video></div>
            <div class="video-commenter-sidebar">
                <div class="commenter-header">
                    <h2 class="commenter-title">${caseData.itemTestado || 'Título do Teste'}</h2>
                    <p class="commenter-author-date">Criado em ${creationDate}</p>
                    <button class="btn-add-postit" id="add-postit-btn">📌 Adicionar Post-it</button>
                </div>
                <ol id="comment-steps-list"></ol>
                <div id="comment-reply-section"><textarea id="new-comment-textarea" placeholder="Adicione um novo passo ou comentário..."></textarea><button id="add-comment-btn" class="btn">Comentar no tempo atual</button></div>
            </div>
        </div>`;
    const videoElement = document.getElementById('video-commenter-player');
    videoElement.src = evidence.src;
    const stepsListContainer = document.getElementById('comment-steps-list');
    renderBugReportSteps(evidence, stepsListContainer, videoElement);
    const videoMainContainer = document.getElementById('video-main-container');
    renderAllPostIts(evidence, videoMainContainer);
    document.getElementById('add-postit-btn').onclick = () => addNewPostIt(evidence, videoMainContainer);
    document.getElementById('add-comment-btn').onclick = () => {
        const textarea = document.getElementById('new-comment-textarea');
        const commentText = textarea.value.trim();
        if (commentText) {
            getAuthorName();
            evidence.comentariosPorTempo.push({ time: videoElement.currentTime, text: commentText, author: currentAuthor });
            textarea.value = '';
            renderBugReportSteps(evidence, stepsListContainer, videoElement);
        }
    };
    videoElement.addEventListener('timeupdate', () => {
        const currentTime = videoElement.currentTime;
        const allSteps = stepsListContainer.querySelectorAll('.comment-step-item');
        let activeStep = null;
        allSteps.forEach(stepEl => {
            const stepTime = parseFloat(stepEl.dataset.time);
            if (currentTime >= stepTime) activeStep = stepEl;
        });
        allSteps.forEach(el => el.classList.remove('active-comment'));
        if (activeStep) activeStep.classList.add('active-comment');
    });
}

function renderBugReportSteps(evidence, container, videoElement) {
    container.innerHTML = '';
    if (evidence.comentariosPorTempo) {
        evidence.comentariosPorTempo.sort((a, b) => a.time - b.time);
        evidence.comentariosPorTempo.forEach(comment => {
            const stepLi = document.createElement('li');
            stepLi.className = 'comment-step-item';
            stepLi.dataset.time = comment.time;
            const minutes = Math.floor(comment.time / 60);
            const seconds = Math.floor(comment.time % 60);
            const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            stepLi.innerHTML = `<div class="comment-step-text"><span class="author">${comment.author || 'Anônimo'} comentou:</span> ${comment.text}</div><a href="#" class="comment-step-time">${formattedTime}</a>`;
            stepLi.querySelector('.comment-step-time').onclick = (e) => { e.preventDefault(); videoElement.currentTime = comment.time; videoElement.play(); };
            container.appendChild(stepLi);
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        //-- CORREÇÃO: Reseta o z-index ao fechar para não interferir com outros modais
        modal.style.zIndex = ''; 
    }

    if (modalId === 'media-modal') {
        const player = document.getElementById('media-modal-player');
        if (player) player.innerHTML = '';
    }
    
    if (modalId === 'video-commenter-modal') {
        const videoPlayer = document.getElementById('video-commenter-player');
        if (videoPlayer) {
            videoPlayer.pause();
            videoPlayer.src = '';
            // Remove os listeners para evitar memory leaks
            videoPlayer.onloadedmetadata = null;
            videoPlayer.ontimeupdate = null;
        }
        const canvasElement = document.getElementById('video-drawing-canvas');
        if (canvasElement) {
            const ctx = canvasElement.getContext('2d');
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasElement.onmousedown = null;
            canvasElement.onmousemove = null;
            canvasElement.onmouseup = null;
            canvasElement.onmouseout = null;
        }
        window.removeEventListener('resize', () => {}); // A lógica para remover o listener específico precisaria ser mais robusta, mas isso ajuda
    }
    
    if (modalId === 'recording-preview-modal') {
        const videoPlayer = document.getElementById('recording-preview-player');
        if (videoPlayer && videoPlayer.src) {
            URL.revokeObjectURL(videoPlayer.src);
            videoPlayer.src = '';
        }
        cleanupAfterRecording(true);
    }
    
    if (modalId === 'flowchart-viewer-modal') {
        document.getElementById('flowchart-viewer-output').innerHTML = '';
    }
    
    if (modalId === 'roadmap-modal') {
        if (resultsChartInstance) resultsChartInstance.destroy();
        if (failureTypesChartInstance) failureTypesChartInstance.destroy();
    }
    
    if (modalId === 'chat-assistant-modal') {
        toggleChatAssistant(false);
    }
}

function closeModalIfOverlay(event, modalId) { if (event.target.id === modalId) closeModal(modalId); }

function openCaptureWindow(initialCaseId) {
    const allCases = Object.values(testCaseData).filter(tc => !tc.isReTest).sort((a, b) => a.id - b.id);
    if (allCases.length === 0) { alert("Não há casos de teste principais para exibir na janela de captura."); return; }
    const caseSelectorOptions = allCases.map(tc => `<option value="test-case-${tc.id}" ${`test-case-${tc.id}` === initialCaseId ? 'selected' : ''}>ID #${tc.displayId} - ${tc.itemTestado || 'Item sem nome'}</option>`).join('');
    const captureWindow = window.open('', 'capture_window', 'width=600,height=850,scrollbars=yes,resizable=yes');
    if (!captureWindow) { alert("Não foi possível abrir a janela pop-up. Verifique se os pop-ups estão bloqueados pelo seu navegador."); return; }
    captureWindow.focus();
    const content = `
        <!DOCTYPE html><html lang="pt-BR"><head><title>Janela de Teste e Captura</title><link rel="stylesheet" href="style.css">
        <style>body{padding:15px;background-color:#f0f2f5;font-family:'Segoe UI',sans-serif}.capture-header{background:white;padding:15px;border-radius:8px;margin-bottom:15px;box-shadow:0 2px 8px rgba(0,0,0,0.1)}.header-controls{display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap}.header-controls .form-group{flex-grow:1;margin:0;min-width:250px}#case-selector{width:100%;padding:8px;border-radius:6px;border:1px solid #ccc;font-size:1rem}.header-buttons{display:flex;gap:10px;align-self:flex-end}#capture-card-container .test-case-card{margin-bottom:0;box-shadow:none;border:1px solid #ccc}#save-feedback{color:var(--cor-status-aprovado);font-weight:bold;margin-left:15px;transition:opacity .5s}</style>
        </head><body>
            <div class="capture-header"><div class="header-controls"><div class="form-group"><label for="case-selector" style="font-weight:600;display:block;margin-bottom:5px">Alternar Caso de Teste:</label><select id="case-selector" onchange="loadCaseData(this.value)">${caseSelectorOptions}</select></div><div class="header-buttons"><button class="btn btn-add" onclick="saveData()">💾 Salvar Alterações</button><button class="btn btn-remove" onclick="closeWindow()">❌ Fechar</button></div></div><span id="save-feedback" style="opacity:0"></span></div>
            <div id="capture-card-container"></div>
            <script>
                let sessionChanges={data:{},evidence:{}};const allCasesData=${JSON.stringify(testCaseData)};const testResultsOptions=${JSON.stringify(testResults)};const failureTypesOptions=${JSON.stringify(failureTypes)};const resolutionStatusTypesOptions=${JSON.stringify(resolutionStatusTypes)};let currentCaseId='${initialCaseId}';
                function loadCaseData(newCaseId){currentCaseId=newCaseId;const container=document.getElementById('capture-card-container');if(allCasesData[currentCaseId]){document.title='Testando: ID #'+allCasesData[currentCaseId].displayId;container.innerHTML=generateCardHTML(currentCaseId);renderUnsavedEvidencePreviews(currentCaseId);attachAllEventListeners()}}
                function generateCardHTML(caseId){const escapeHTML=str=>str?str.toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'):'';const buildOptions=(options,selectedValue)=>options.map(opt=>'<option value="'+escapeHTML(opt)+'" '+(opt===selectedValue?'selected':'')+'>'+escapeHTML(opt)+'</option>').join('');const originalData=allCasesData[caseId];const unsavedChanges=sessionChanges.data[caseId]||{};const latestData={...originalData,...unsavedChanges};const originalEvidences=originalData.evidences||[];let evidenceHTML=originalEvidences.map(ev=>generateEvidencePreviewHTML(ev)).join('');return'<div class="test-case-card"><div class="test-case-header"><div class="test-case-title">Testando ID #'+escapeHTML(latestData.displayId)+'</div></div><div class="test-case-body"><div class="form-group"><label class="form-label">Nome do item:</label><input type="text" class="form-input" value="'+escapeHTML(latestData.itemTestado)+'" readonly></div><div class="form-group"><label class="form-label">Descrição:</label><textarea class="form-textarea" data-field="descricao">'+escapeHTML(latestData.descricao)+'</textarea></div><div class="form-group"><label class="form-label">Condição de aprovação:</label><textarea class="form-textarea" readonly>'+escapeHTML(latestData.condicaoAprovacao)+'</textarea></div><div class="form-group"><label class="form-label">Resultado:</label><select class="form-select" data-field="resultado">'+buildOptions(testResultsOptions,latestData.resultado)+'</select></div><div class="form-group"><label class="form-label">Tipo de falha:</label><select class="form-select" data-field="tipoFalha">'+buildOptions(failureTypesOptions,latestData.tipoFalha)+'</select></div><div class="form-group"><label class="form-label">Status da Resolução:</label><select class="form-select" data-field="resolutionStatus">'+buildOptions(resolutionStatusTypesOptions,latestData.resolutionStatus)+'</select></div><div class="evidence-section"><div class="evidence-section-header"><div class="evidence-title">📸 Evidências</div></div><div class="evidence-grid" id="popup-evidence-grid">'+evidenceHTML+'<label class="evidence-upload"><input type="file" accept="image/*,video/*" multiple id="evidence-upload-input"><span>➕ Adicionar via Arquivo</span></label><div class="evidence-upload" style="cursor:default;background-color:#e9ecef;border-style:dashed"><span>📋 Ou cole (Ctrl+V) aqui</span></div></div></div></div></div>'}
                function attachAllEventListeners(){document.querySelectorAll('[data-field]').forEach(el=>el.addEventListener('change',e=>storeUpdate(e.target.dataset.field,e.target.value)));document.getElementById('evidence-upload-input').addEventListener('change',function(e){handleFileUpload(e.target.files);this.value='';});document.body.addEventListener('paste',handlePastedEvidence)}
                function storeUpdate(field,value){if(!sessionChanges.data[currentCaseId])sessionChanges.data[currentCaseId]={};sessionChanges.data[currentCaseId][field]=value}
                function storeEvidence(evidenceData){if(!sessionChanges.evidence[currentCaseId])sessionChanges.evidence[currentCaseId]=[];sessionChanges.evidence[currentCaseId].push(evidenceData);addPreviewToPopup(evidenceData,true)}
                function sendBulkUpdate(){if(Object.keys(sessionChanges.data).length>0||Object.keys(sessionChanges.evidence).length>0){window.opener.postMessage({type:'APPLY_BULK_UPDATE',payload:sessionChanges},'*');sessionChanges={data:{},evidence:{}};return true}return false}
                function saveData(){const saved=sendBulkUpdate();const feedback=document.getElementById('save-feedback');if(saved){feedback.textContent='Alterações salvas com sucesso!'}else{feedback.textContent='Nenhuma nova alteração para salvar.'}feedback.style.opacity=1;setTimeout(()=>{feedback.style.opacity=0},2500)}
                function closeWindow(){const hasUnsavedChanges=Object.keys(sessionChanges.data).length>0||Object.keys(sessionChanges.evidence).length>0;if(hasUnsavedChanges){if(confirm('Você possui alterações não salvas. Deseja fechar mesmo assim e descartá-las?'))window.close()}else window.close()}
                function generateEvidencePreviewHTML(evidenceData,isUnsaved=false){const wrapperStyle='position:relative;width:120px;padding-top:75%;overflow:hidden;border-radius:8px;background-color:#e9ecef;margin-bottom:10px;border:'+(isUnsaved?'2px dashed var(--cor-primaria)':'none');const mediaHTML=evidenceData.type.startsWith('image/')?'<img src="'+evidenceData.src+'" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover">':'<div style="padding:10px">📎 '+escapeHTML(evidenceData.name)+'</div>';return'<div style="'+wrapperStyle+'">'+mediaHTML+'</div>'}
                function addPreviewToPopup(evidenceData,isUnsaved=false){const grid=document.getElementById('popup-evidence-grid');const previewHTML=generateEvidencePreviewHTML(evidenceData,isUnsaved);grid.insertAdjacentHTML('afterbegin',previewHTML)}
                function renderUnsavedEvidencePreviews(caseId){const unsaved=sessionChanges.evidence[caseId]||[];unsaved.forEach(ev=>addPreviewToPopup(ev,true))}
                function handleFileUpload(files){for(const file of files){const reader=new FileReader();reader.onload=e=>storeEvidence({src:e.target.result,type:file.type,name:file.name});reader.readAsDataURL(file)}}
                function handlePastedEvidence(e){for(const item of(e.clipboardData||window.clipboardData).items){if(item.kind==='file'&&item.type.startsWith('image/')){e.preventDefault();const file=item.getAsFile();const reader=new FileReader();reader.onload=event=>storeEvidence({src:event.target.result,type:file.type,name:'pasted-image.png'});reader.readAsDataURL(file);return}}}
                window.addEventListener('DOMContentLoaded',()=>loadCaseData(currentCaseId));
            <\/script></body></html>`;
    captureWindow.document.open();
    captureWindow.document.write(content);
    captureWindow.document.close();
}

function filterFailedTests() {
    isFilteringFailed = !isFilteringFailed;
    const button = document.getElementById('filter-failed-button');
    document.querySelectorAll('.test-case-card').forEach(card => {
        const caseData = testCaseData[card.id];
        if (!caseData) return;
        card.style.display = isFilteringFailed && caseData.resultado !== 'Reprovado' ? 'none' : '';
    });
    button.classList.toggle('active-filter', isFilteringFailed);
    if (isFilteringFailed) {
        button.textContent = "✅";
        button.title = "Mostrar Todos os Casos";
    } else {
        button.textContent = "⚠️";
        button.title = "Mostrar Apenas Reprovados";
    }
}

async function exportForEmail() {
    if (Object.keys(testCaseData).length === 0) { alert("Não há dados no projeto para exportar."); return; }
    const emailButtonInModal = document.querySelector('#email-modal .btn-email');
    const originalButtonText = emailButtonInModal.innerHTML;
    const feedbackElement = document.getElementById('email-copy-feedback');
    feedbackElement.textContent = '';
    feedbackElement.style.color = "var(--cor-status-aprovado)";
    emailButtonInModal.disabled = true;
    emailButtonInModal.innerHTML = '🤖 Gerando com IA...';
    document.getElementById('email-modal').style.display = 'flex';
    try {
        const aiReport = await generateAIReport(testCaseData);
        let subject, body;
        if (aiReport && aiReport.assunto && aiReport.corpoEmail) {
            subject = encodeURIComponent(aiReport.assunto);
            await navigator.clipboard.writeText(aiReport.corpoEmail);
            feedbackElement.textContent = "Relatório copiado para a área de transferência!";
            const shortBody = "Prezados,\n\nO relatório completo foi copiado para a sua área de transferência.\n\nPor favor, cole o conteúdo (Ctrl+V ou Cmd+V) aqui.\n\nAtenciosamente,";
            body = encodeURIComponent(shortBody);
        } else {
            throw new Error("A IA não conseguiu gerar o relatório. Nenhuma ação foi tomada.");
        }
        document.getElementById('email-link').href = `mailto:?subject=${subject}&body=${body}`;
    } catch (error) {
        alert(error.message);
        feedbackElement.textContent = "Ocorreu um erro. Tente novamente.";
        feedbackElement.style.color = "var(--cor-status-reprovado)";
    } finally {
        emailButtonInModal.disabled = false;
        emailButtonInModal.innerHTML = originalButtonText;
    }
    const downloadButton = document.getElementById('download-json-button');
    const projectToExport = { name: currentLoadedProjectName || `Backup Projeto - ${new Date().toLocaleDateString()}`, timestamp: new Date().toISOString(), status: 'Ativo', state: { counter: testCaseCounter, data: testCaseData, ticketCounter: ticketCounter, ticketData: ticketData } };
    const dataStr = JSON.stringify([projectToExport], null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const newDownloadButton = downloadButton.cloneNode(true);
    downloadButton.parentNode.replaceChild(newDownloadButton, downloadButton);
    newDownloadButton.onclick = () => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `backup_projeto_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const modal = document.getElementById('email-modal');
    const observer = new MutationObserver(() => {
        if (modal.style.display === 'none') {
            URL.revokeObjectURL(url);
            observer.disconnect();
        }
    });
    observer.observe(modal, { attributes: true, attributeFilter: ['style'] });
}

function showSaveRunModal() {
    if (Object.keys(testCaseData).length === 0) {
        alert("Não há dados de execução na tela para salvar.");
        return;
    }

    const macroProjects = JSON.parse(localStorage.getItem(MACRO_PROJECTS_KEY)) || [];
    if (macroProjects.length === 0) {
        alert("Nenhum Macro-Projeto encontrado. Por favor, crie um primeiro em 'Gerenciar Macro-Projetos'.");
        return;
    }

    const select = document.getElementById('macro-project-select');
    select.innerHTML = '';
    macroProjects.forEach(mp => {
        const option = document.createElement('option');
        option.value = mp.macroId;
        option.textContent = mp.macroName;
        select.appendChild(option);
    });

    document.getElementById('run-name-input').value = `Execução - ${new Date().toLocaleString('pt-BR')}`;
    document.getElementById('save-run-modal').style.display = 'flex';
}
function executeSaveRun() {
    const macroId = document.getElementById('macro-project-select').value;
    const runName = document.getElementById('run-name-input').value.trim();

    if (!macroId) {
        alert("Por favor, selecione um Macro-Projeto.");
        return;
    }
    if (!runName) {
        alert("O nome da execução não pode ser vazio.");
        return;
    }

    try {
        const macroProjects = JSON.parse(localStorage.getItem(MACRO_PROJECTS_KEY)) || [];
        const projectIndex = macroProjects.findIndex(mp => mp.macroId === macroId);

        if (projectIndex === -1) {
            alert("Erro: Macro-Projeto não encontrado. Tente novamente.");
            return;
        }

        const runExists = macroProjects[projectIndex].runs.some(run => run.runName === runName);
        if (runExists) {
            if (!confirm(`Já existe uma execução com o nome "${runName}" neste Macro-Projeto. Deseja sobrescrevê-la?`)) {
                return;
            }
        }

        const currentState = { counter: testCaseCounter, data: testCaseData, ticketCounter: ticketCounter, ticketData: ticketData };
        const newRun = {
            runId: `run-${Date.now()}`,
            runName: runName,
            timestamp: new Date().toISOString(),
            state: currentState
        };

        if (runExists) {
            // Sobrescreve a execução existente
            const runIndex = macroProjects[projectIndex].runs.findIndex(run => run.runName === runName);
            macroProjects[projectIndex].runs[runIndex] = newRun;
        } else {
            // Adiciona nova execução
            macroProjects[projectIndex].runs.push(newRun);
        }

        localStorage.setItem(MACRO_PROJECTS_KEY, JSON.stringify(macroProjects));
        alert(`Execução "${runName}" salva com sucesso no Macro-Projeto "${macroProjects[projectIndex].macroName}"!`);
        closeModal('save-run-modal');

    } catch (error) {
        alert("Ocorreu um erro ao salvar a execução.");
        console.error("Erro em executeSaveRun:", error);
    }
}
function overwriteProject(projectName) {
    try {
        const savedProjects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        saveOrUpdateProject(projectName, savedProjects);
    } catch (error) { alert(`Ocorreu um erro ao sobrescrever o projeto "${projectName}".`); }
}

function saveOrUpdateProject(projectName, projectsArray) {
    const currentState = { counter: testCaseCounter, data: testCaseData, ticketCounter: ticketCounter, ticketData: ticketData };
    const newProjectEntry = { name: projectName, timestamp: new Date().toISOString(), status: 'Ativo', state: currentState };
    const existingIndex = projectsArray.findIndex(p => p.name === projectName);
    if (existingIndex > -1) {
        newProjectEntry.status = projectsArray[existingIndex].status || 'Ativo';
        projectsArray[existingIndex] = newProjectEntry;
    } else projectsArray.push(newProjectEntry);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projectsArray));
    alert(`Projeto "${projectName}" salvo com sucesso!`);
    currentLoadedProjectName = projectName;
}

function renderProjectList(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    try {
        const savedProjects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        if (savedProjects.length === 0) { container.innerHTML = '<p>Nenhum projeto salvo encontrado.</p>'; return; }
        savedProjects.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        savedProjects.forEach(project => {
            const item = document.createElement('div');
            const projectStatus = project.status || 'Ativo';
            item.className = `project-item status-${projectStatus.toLowerCase()}`;
            const date = new Date(project.timestamp).toLocaleString('pt-BR');
            item.innerHTML = `
                <div class="project-item-info"><strong>${project.name}</strong><span>Salvo em: ${date}</span></div>
                <div class="project-item-actions">
                    <button class="btn btn-load" onclick="loadProjectFromStorage('${project.name}')">Carregar</button>
                    <button class="btn btn-remove" onclick="deleteProjectAndRefresh('${project.name}', '${containerId}')">Excluir</button>
                </div>`;
            container.appendChild(item);
        });
    } catch (error) { container.innerHTML = '<p>Erro ao ler os projetos salvos.</p>'; }
}

function showLoadMacroProjectSelectionModal() {
    // Reutiliza a função de renderização do gerenciador, mas com ação diferente
    renderMacroProjectsList('project-list-container', 'load');
    // Renomeia o modal para refletir a ação
    document.querySelector('#project-modal h2').textContent = '📂 Selecione um Macro-Projeto para Carregar';
    document.getElementById('project-modal').style.display = 'flex';
}

function showRunListForMacroProject(macroId) {
    const macroProjects = JSON.parse(localStorage.getItem(MACRO_PROJECTS_KEY)) || [];
    const macroProject = macroProjects.find(mp => mp.macroId === macroId);

    if (!macroProject) {
        alert("Macro-Projeto não encontrado.");
        return;
    }

    currentMacroProjectId = macroId; // Guarda o ID do macro-projeto atual
    const runListContainer = document.getElementById('run-list-container');
    runListContainer.innerHTML = '';
    document.getElementById('load-run-modal-title').textContent = `📂 Execuções em "${macroProject.macroName}"`;

    if (macroProject.runs.length === 0) {
        runListContainer.innerHTML = '<p>Nenhuma execução salva neste Macro-Projeto.</p>';
    } else {
        macroProject.runs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .forEach(run => {
                const item = document.createElement('div');
                item.className = 'run-item';
                item.onclick = () => loadRunFromStorage(macroId, run.runId);
                item.innerHTML = `
                    <div class="project-item-info">
                        <strong>${run.runName}</strong>
                        <span>Salvo em: ${new Date(run.timestamp).toLocaleString('pt-BR')}</span>
                    </div>
                    <button class="btn btn-remove" style="background-color: #dc3545;" onclick="event.stopPropagation(); deleteRun('${macroId}', '${run.runId}')">Excluir</button>
                `;
                runListContainer.appendChild(item);
            });
    }

    closeModal('project-modal');
    document.getElementById('load-run-modal').style.display = 'flex';
}

function loadRunFromStorage(macroId, runId) {
    if (!confirm(`Carregar esta execução substituirá todos os dados atuais na tela. Deseja continuar?`)) return;

    try {
        const macroProjects = JSON.parse(localStorage.getItem(MACRO_PROJECTS_KEY)) || [];
        const macroProject = macroProjects.find(mp => mp.macroId === macroId);
        if (!macroProject) throw new Error("Macro-Projeto não encontrado.");

        const runToLoad = macroProject.runs.find(run => run.runId === runId);
        if (!runToLoad || !runToLoad.state) throw new Error("Formato de execução inválido ou não encontrado.");

        // Limpa a tela e carrega os novos dados
        showTestCaseView();
        document.getElementById('test-case-container').innerHTML = '';
        testCaseData = {};
        ticketData = {};
        testCaseCounter = 0;
        ticketCounter = 0;

        const importedState = runToLoad.state;
        ticketCounter = importedState.ticketCounter || 0;
        ticketData = importedState.ticketData || {};
        
        const sortedData = Object.values(importedState.data).sort((a, b) => a.id - b.id);
        sortedData.forEach(testCase => {
            if (testCase.id > testCaseCounter) testCaseCounter = testCase.id - 1;
            addNewTestCase(testCase);
        });
        
        testCaseCounter = importedState.counter;
        
        updateSummary();
        renderGlobalTagFilter();
        closeModal('load-run-modal');
        alert(`Execução "${runToLoad.runName}" carregada com sucesso!`);
    } catch (error) {
        alert("Erro ao carregar a execução: " + error.message);
        console.error("Erro em loadRunFromStorage:", error);
    }
}


function showProjectManagementModal() {
    const container = document.getElementById('management-list-container');
    container.innerHTML = '';
    try {
        const savedProjects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        if (savedProjects.length === 0) container.innerHTML = '<p>Nenhum projeto salvo encontrado.</p>';
        else {
            savedProjects.sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
            savedProjects.forEach(project => {
                const item = document.createElement('div');
                const projectStatus = project.status || 'Ativo';
                item.className = `project-item status-${projectStatus.toLowerCase()}`;
                item.id = `project-mgmt-item-${project.name.replace(/\s+/g, '-')}`;
                const date = new Date(project.timestamp).toLocaleString('pt-BR');
                const statusOptions = projectStatusTypes.map(status => `<option value="${status}" ${status === projectStatus ? 'selected' : ''}>${status}</option>`).join('');
                item.innerHTML = `
                    <div class="project-item-info"><strong>${project.name}</strong><span>Salvo em: ${date}</span></div>
                    <div class="project-item-status">
                        <label for="status-select-${project.name.replace(/\s+/g, '-')}" class="sr-only">Status do Projeto</label>
                        <select id="status-select-${project.name.replace(/\s+/g, '-')}" onchange="updateProjectStatus('${project.name}', this.value)">${statusOptions}</select>
                    </div>
                    <div class="project-item-actions"><button class="btn btn-remove" onclick="deleteProjectAndRefresh('${project.name}', 'management-list-container')">Excluir</button></div>`;
                container.appendChild(item);
            });
        }
        document.getElementById('management-modal').style.display = 'flex';
    } catch (error) { alert("Erro ao ler os projetos salvos."); }
}

function updateProjectStatus(projectName, newStatus) {
    try {
        const savedProjects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        const projectIndex = savedProjects.findIndex(p => p.name === projectName);
        if(projectIndex > -1) {
            savedProjects[projectIndex].status = newStatus;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedProjects));
            const itemElement = document.getElementById(`project-mgmt-item-${projectName.replace(/\s+/g, '-')}`);
            if(itemElement) {
                itemElement.className = 'project-item';
                itemElement.classList.add(`status-${newStatus.toLowerCase()}`);
            }
        }
    } catch(error) { alert('Ocorreu um erro ao atualizar o status do projeto.'); }
}

function loadProjectFromStorage(projectName) {
     if (!confirm(`Carregar o projeto "${projectName}" substituirá todos os dados atuais na tela. Deseja continuar?`)) return;
    try {
        const savedProjects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        const projectToLoad = savedProjects.find(p => p.name === projectName);
        if (!projectToLoad || !projectToLoad.state) throw new Error("Formato de projeto inválido ou não encontrado.");
        showTestCaseView();
        document.getElementById('test-case-container').innerHTML = '';
        testCaseData = {};
        ticketData = {};
        testCaseCounter = 0;
        ticketCounter = 0;
        const imported = projectToLoad.state;
        ticketCounter = imported.ticketCounter || 0;
        ticketData = imported.ticketData || {};
        const sortedData = Object.values(imported.data).sort((a, b) => a.id - b.id);
        sortedData.forEach(testCase => {
            if (testCase.id > testCaseCounter) testCaseCounter = testCase.id - 1;
            addNewTestCase(testCase);
        });
        testCaseCounter = imported.counter;
        currentLoadedProjectName = projectToLoad.name; 
        updateSummary();
        closeModal('project-modal');
        renderGlobalTagFilter();
        alert(`Projeto "${projectToLoad.name}" carregado com sucesso!`);
    } catch (error) {
        alert("Erro ao carregar o projeto: " + error.message);
        currentLoadedProjectName = null;
    }
}

function deleteProjectAndRefresh(projectName, listContainerId) {
    if (!confirm(`Tem certeza que deseja excluir o projeto "${projectName}" permanentemente?`)) return;
    try {
        let savedProjects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
        const initialCount = savedProjects.length;
        savedProjects = savedProjects.filter(p => p.name !== projectName);
        if (savedProjects.length < initialCount) {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedProjects));
            alert(`Projeto "${projectName}" excluído com sucesso.`);
            if (currentLoadedProjectName === projectName) currentLoadedProjectName = null;
            if(document.getElementById(listContainerId)?.offsetParent !== null) {
                if (listContainerId === 'management-list-container') showProjectManagementModal();
                else renderProjectList(listContainerId);
            }
        } else throw new Error("Projeto não encontrado para exclusão.");
    } catch (error) { alert("Erro ao excluir o projeto: " + error.message); }
}

function showExportModal() {
    const content = document.getElementById('export-modal-content');
    content.innerHTML = `
        <h3>Selecione um Macro-Projeto para exportar:</h3>
        <div id="export-macro-list" class="project-list-container"></div>
    `;

    const macroProjects = JSON.parse(localStorage.getItem(MACRO_PROJECTS_KEY)) || [];
    const listContainer = document.getElementById('export-macro-list');
    listContainer.innerHTML = '';

    if (macroProjects.length === 0) {
        listContainer.innerHTML = '<p style="text-align:center;">Nenhum Macro-Projeto encontrado.</p>';
    } else {
        macroProjects.forEach(mp => {
            const item = document.createElement('div');
            item.className = 'macro-project-item';
            // Adiciona um onclick para mostrar as opções de exportação para este macro-projeto
            item.onclick = () => showExportOptionsForMacro(mp.macroId);
            item.innerHTML = `
                <div class="macro-project-info">
                    <strong>${mp.macroName}</strong>
                    <span>${mp.runs.length} execução(ões)</span>
                </div>
            `;
            listContainer.appendChild(item);
        });
    }

    document.getElementById('export-modal').style.display = 'flex';
}


// SUBSTITUA A FUNÇÃO 'importAndDisplayProject' INTEIRA POR ESTA VERSÃO:

/**
 * IMPORTAÇÃO INTELIGENTE DE PROJETOS (NOVA VERSÃO)
 * Lê um arquivo .json contendo uma lista de Macro-Projetos.
 * Em vez de sobrescrever os dados na tela, esta função "funde" (merge) os dados importados
 * com os Macro-Projetos já existentes no localStorage do navegador.
 * - Se um Macro-Projeto do arquivo não existe localmente, ele é adicionado.
 * - Se um Macro-Projeto já existe, a função adiciona apenas as execuções (runs) novas, evitando duplicatas.
 * Isso torna o processo de importação seguro e não destrutivo.
 * @param {Event} event - O evento do input de arquivo.
 */
function importAndMergeProjects(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const fileContent = e.target.result;
            const importedMacroProjects = JSON.parse(fileContent);

            if (!Array.isArray(importedMacroProjects) || !importedMacroProjects.every(p => p.macroId && p.macroName && Array.isArray(p.runs))) {
                throw new Error("O arquivo não parece ser um backup de Macro-Projetos válido. A estrutura esperada é uma lista de projetos, cada um com 'macroId', 'macroName' e 'runs'.");
            }

            const existingMacroProjects = JSON.parse(localStorage.getItem(MACRO_PROJECTS_KEY)) || [];
            let newProjectsCount = 0;
            let updatedProjectsCount = 0;
            let newRunsCount = 0;

            importedMacroProjects.forEach(importedProject => {
                const existingProjectIndex = existingMacroProjects.findIndex(p => p.macroId === importedProject.macroId);

                if (existingProjectIndex > -1) {
                    // O Macro-Projeto já existe, então vamos fundir as execuções.
                    const existingProject = existingMacroProjects[existingProjectIndex];
                    let runsAddedToExisting = 0;
                    
                    importedProject.runs.forEach(importedRun => {
                        const runExists = existingProject.runs.some(r => r.runId === importedRun.runId);
                        if (!runExists) {
                            existingProject.runs.push(importedRun);
                            newRunsCount++;
                            runsAddedToExisting++;
                        }
                    });

                    if(runsAddedToExisting > 0) {
                        updatedProjectsCount++;
                    }
                } else {
                    // O Macro-Projeto é novo, então adicionamos ele inteiro.
                    existingMacroProjects.push(importedProject);
                    newProjectsCount++;
                    newRunsCount += importedProject.runs.length;
                }
            });
            
            localStorage.setItem(MACRO_PROJECTS_KEY, JSON.stringify(existingMacroProjects));
            
            alert(`Importação concluída com sucesso!\n\n- ${newProjectsCount} novo(s) Macro-Projeto(s) adicionado(s).\n- ${updatedProjectsCount} Macro-Projeto(s) existente(s) atualizado(s).\n- ${newRunsCount} nova(s) Execução(ões) importada(s) no total.`);

        } catch (error) {
            console.error("Erro ao importar e fundir projetos:", error);
            alert("Erro ao processar o arquivo de backup: " + error.message);
        } finally {
            // Limpa o valor do input para permitir importar o mesmo arquivo novamente
            event.target.value = '';
        }
    };
    reader.onerror = () => {
        alert("Ocorreu um erro ao ler o arquivo.");
        event.target.value = '';
    };
    reader.readAsText(file);
}

function getSummaryData() {
    const allCases = Object.values(testCaseData);
    const summary = { total: allCases.length, approved: allCases.filter(tc => tc.resultado === 'Aprovado').length, failed: allCases.filter(tc => tc.resultado === 'Reprovado').length, invalid: allCases.filter(tc => tc.resultado === 'Inválido').length };
    summary.notRun = summary.total - (summary.approved + summary.failed + summary.invalid);
    return summary;
}

function updateSummary() {
    const summary = getSummaryData();
    document.getElementById('total-cases').textContent = summary.total;
    document.getElementById('total-approved').textContent = summary.approved;
    document.getElementById('total-failed').textContent = summary.failed;
    document.getElementById('total-invalid').textContent = summary.invalid;
}

// SUBSTITUA SUA FUNÇÃO generateTicket POR ESTA
function generateTicket(caseId) {
    const caseData = testCaseData[caseId];
    if (!caseData) return;
    const errorDescriptionTextarea = document.getElementById(`${caseId}-error-description`);
    const errorDescription = errorDescriptionTextarea.value.trim();
    if (!errorDescription) {
        alert("Por favor, preencha a 'Descrição do Erro' para gerar o ticket.");
        errorDescriptionTextarea.focus();
        return;
    }
    
    ticketCounter++;
    const newTicketId = `ticket-${ticketCounter}`;
    const creationTime = new Date().toISOString();
    
    const evidencesToMove = [...(caseData.evidences || [])]; 

    ticketData[newTicketId] = { 
        id: newTicketId, 
        displayId: ticketCounter, 
        originalCaseId: caseId, 
        originalCaseDisplayId: caseData.displayId, 
        status: ticketStatuses[0], 
        priority: ticketPriorities[1], 
        assignee: 'Ninguém', 
        errorDescription: errorDescription, 
        attachedEvidences: evidencesToMove, 
        clonedData: { 
            itemTestado: caseData.itemTestado, 
            condicaoAprovacao: caseData.condicaoAprovacao
        }, 
        ticketComments: [],
        createdAt: creationTime,
        statusHistory: [{ status: ticketStatuses[0], timestamp: creationTime }]
    };

    caseData.tickets = caseData.tickets || [];
    caseData.tickets.push(newTicketId);
    caseData.evidences = []; 
    
    alert(`Ticket #${ticketCounter} gerado com sucesso para o Caso de Teste #${caseData.displayId}!`);

    errorDescriptionTextarea.value = '';
    const evidenceGrid = document.getElementById(`${caseId}-evidence-grid`);
    if(evidenceGrid) {
        evidenceGrid.innerHTML = `
            <label class="evidence-upload"><input type="file" accept="image/*,video/*" multiple onchange="handleEvidenceUpload('${caseId}', this.files, false)"><span>➕ Adicionar via Arquivo</span></label>
            <div class="evidence-paste-area"><span>📋 Ou cole (Ctrl+V) uma imagem aqui</span></div>
        `;
    }
    
    const resultSelect = document.querySelector(`#${caseId} select[onchange*="handleResultChange"]`);
    if(resultSelect) {
        resultSelect.value = testResults[0]; 
        handleResultChange(caseId, testResults[0]);
    }
    
    updateTestCaseDisplay(caseId);
    if (currentView === 'tickets') renderTicketKanbanBoard();
}

// MODIFICAÇÃO: Atualiza a exibição do card de teste para mostrar a lista de tickets e a barra de progresso
// SUBSTITUIR A FUNÇÃO INTEIRA
// SUBSTITUA a função existente por esta versão completa

function updateTestCaseDisplay(caseId) {
    const caseData = testCaseData[caseId];
    if (!caseData) return;
    
    const progressContainer = document.getElementById(`${caseId}-resolution-progress-container`);
    const generatedTicketsContainer = document.getElementById(`${caseId}-generated-tickets-section`);

    if (caseData.tickets && caseData.tickets.length > 0) {
        progressContainer.classList.remove('hidden-field');
        generatedTicketsContainer.classList.remove('hidden-field');
        calculateAndDisplayResolution(caseId);
        renderTicketListForCase(caseId);
    } else {
        progressContainer.classList.add('hidden-field');
        generatedTicketsContainer.classList.add('hidden-field');
    }

    updateOverallTicketStatusIndicator(caseId);
}

// ADICIONAR ESTA NOVA FUNÇÃO (pode ser abaixo da updateTestCaseDisplay)
function updateOverallTicketStatusIndicator(caseId) {
    const caseData = testCaseData[caseId];
    const indicator = document.getElementById(`${caseId}-ticket-status-indicator`);

    if (!indicator || !caseData || !caseData.tickets || caseData.tickets.length === 0) {
        if (indicator) {
            indicator.style.display = 'none';
        }
        return;
    }

    const hasOpenTickets = caseData.tickets.some(ticketId => ticketData[ticketId]?.status !== 'Fechado');

    if (hasOpenTickets) {
        indicator.textContent = '🟡 Tickets em Andamento';
        indicator.className = 'ticket-status-indicator in-progress';
    } else {
        indicator.textContent = '✅ Tickets Resolvidos';
        indicator.className = 'ticket-status-indicator resolved';
    }
}

// NOVO: Renderiza a lista de tickets dentro do card de teste
function renderTicketListForCase(caseId) {
    const listContainer = document.getElementById(`${caseId}-tickets-list`);
    const caseData = testCaseData[caseId];
    if (!listContainer || !caseData || !caseData.tickets) return;

    listContainer.innerHTML = '';
    caseData.tickets.forEach(ticketId => {
        const ticket = ticketData[ticketId];
        if (ticket) {
            const ticketPill = document.createElement('a');
            ticketPill.href = "#";
            const statusClass = ticket.status.toLowerCase().replace(/ /g, '-');
            ticketPill.className = `ticket-list-item status-${statusClass}`;
            ticketPill.textContent = `TICKET #${ticket.displayId}`;
            ticketPill.onclick = (e) => {
                e.preventDefault();
                showTicketDetailsModal(ticket.id);
            };
            listContainer.appendChild(ticketPill);
        }
    });
}

// SUBSTITUA A FUNÇÃO INTEIRA por esta versão com a lógica do farol

function calculateAndDisplayResolution(caseId) {
    const caseData = testCaseData[caseId];
    // --- LÓGICA DO FAROL ---
    const trafficLight = document.getElementById(`${caseId}-traffic-light-indicator`);

    if (!caseData || !caseData.tickets || caseData.tickets.length === 0) {
        if(trafficLight) trafficLight.style.display = 'none';
        return;
    }

    const totalTickets = caseData.tickets.length;
    const closedTickets = caseData.tickets.filter(ticketId => ticketData[ticketId]?.status === 'Fechado').length;
    const percentage = totalTickets > 0 ? (closedTickets / totalTickets) * 100 : 0;
    
    const progressBarInner = document.getElementById(`${caseId}-progress-bar-inner`);
    const progressPercentLabel = document.getElementById(`${caseId}-progress-percent`);
    
    if (progressBarInner) progressBarInner.style.width = `${percentage}%`;
    if (progressPercentLabel) progressPercentLabel.textContent = `${Math.round(percentage)}%`;

    // --- LÓGICA DO FAROL ---
    if(trafficLight) {
        trafficLight.className = 'traffic-light-indicator'; // Reseta as classes
        if (percentage === 0) {
            trafficLight.classList.add('status-danger'); // Vermelho
        } else if (percentage > 0 && percentage < 100) {
            trafficLight.classList.add('status-warning'); // Amarelo
        } else if (percentage === 100) {
            trafficLight.classList.add('status-success'); // Verde
        }
    }
    // --- FIM DA LÓGICA DO FAROL ---

    if (percentage === 100 && caseData.resultado !== 'Aprovado') {
        updateTestCaseData(caseId, 'resultado', 'Aprovado');
        const card = document.getElementById(caseId);
        if (card) {
            const resultSelect = card.querySelector('select[onchange*="handleResultChange"]');
            if (resultSelect) resultSelect.value = 'Aprovado';
            updateStatusIndicator(caseId);
        }
    }
}

function showTicketManagementView() {
    currentView = 'tickets';
    document.getElementById('test-case-container').style.display = 'none';
    document.getElementById('initial-view-container').style.display = 'none';
    document.getElementById('kanban-modal').style.display = 'none';
    const ticketContainer = document.getElementById('ticket-management-container');
    ticketContainer.style.display = 'flex';
    populateTicketFilterOptions();
    renderTicketKanbanBoard();
}

function populateTicketFilterOptions() {
    const statusFilter = document.getElementById('ticket-filter-status');
    const priorityFilter = document.getElementById('ticket-filter-priority');
    
    if (statusFilter.options.length <= 1) {
        ticketStatuses.forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            statusFilter.appendChild(option);
        });
    }

    if (priorityFilter.options.length <= 1) {
        ticketPriorities.forEach(priority => {
            const option = document.createElement('option');
            option.value = priority;
            option.textContent = priority;
            priorityFilter.appendChild(option);
        });
    }
}

function renderTicketKanbanBoard() {
    const boardContainer = document.getElementById('ticket-kanban-board');
    boardContainer.innerHTML = '';
    
    const statusFilter = document.getElementById('ticket-filter-status').value;
    const priorityFilter = document.getElementById('ticket-filter-priority').value;
    const assigneeFilter = document.getElementById('ticket-filter-assignee').value.toLowerCase();

    ticketStatuses.forEach(status => {
        const columnEl = document.createElement('div');
        columnEl.className = 'ticket-kanban-column';
        columnEl.dataset.status = status;
        const statusClass = status.toLowerCase().replace(/ /g, '-');
        columnEl.innerHTML = `<div class="ticket-kanban-header status-${statusClass}">${status}</div><div class="ticket-cards-container"></div>`;
        boardContainer.appendChild(columnEl);
    });

    Object.values(ticketData)
        .filter(ticket => {
            const statusMatch = !statusFilter || ticket.status === statusFilter;
            const priorityMatch = !priorityFilter || ticket.priority === priorityFilter;
            const assigneeMatch = !assigneeFilter || ticket.assignee.toLowerCase().includes(assigneeFilter);
            return statusMatch && priorityMatch && assigneeMatch;
        })
        .forEach(ticket => {
            const column = boardContainer.querySelector(`.ticket-kanban-column[data-status="${ticket.status}"] .ticket-cards-container`);
            if (column) {
                const cardEl = createTicketCard(ticket);
                column.appendChild(cardEl);
            }
        });
}

// MODIFICAÇÃO: Card do kanban de ticket usa classe de status para a cor da borda
function createTicketCard(ticket) {
    const card = document.createElement('div');
    const priorityClass = (ticket.priority || 'média').toLowerCase();
    const statusClass = ticket.status.toLowerCase().replace(/ /g, '-');
    
    card.className = `ticket-card status-${statusClass}`; // Cor principal baseada no status
    card.id = ticket.id;
    card.draggable = true;
    card.onclick = () => showTicketDetailsModal(ticket.id);
    card.addEventListener('dragstart', e => {
        e.stopPropagation();
        e.dataTransfer.setData('text/plain', ticket.id);
        e.dataTransfer.effectAllowed = 'move';
    });
    card.innerHTML = `
        <div class="ticket-card-header">
            <span class="ticket-id">TICKET #${ticket.displayId}</span>
            <span class="ticket-priority-badge priority-${priorityClass}">${ticket.priority}</span>
        </div>
        <div class="ticket-card-title">${ticket.clonedData.itemTestado}</div>
        <p style="font-size: 0.9em; margin-bottom: 10px;">${ticket.errorDescription.substring(0, 100)}...</p>
        <div class="ticket-card-footer">
            <span class="ticket-origin">Origem: CT #${ticket.originalCaseDisplayId}</span>
            <span class="ticket-assignee">${ticket.assignee}</span>
        </div>`;
    return card;
}

document.addEventListener('dragover', e => { const column = e.target.closest('.ticket-kanban-column'); if (column) { e.preventDefault(); column.querySelector('.ticket-cards-container').classList.add('drag-over'); } });
document.addEventListener('dragleave', e => { const column = e.target.closest('.ticket-kanban-column'); if (column) column.querySelector('.ticket-cards-container').classList.remove('drag-over'); });
document.addEventListener('drop', e => {
    const column = e.target.closest('.ticket-kanban-column');
    if (column) {
        e.preventDefault();
        column.querySelector('.ticket-cards-container').classList.remove('drag-over');
        const ticketId = e.dataTransfer.getData('text/plain');
        const newStatus = column.dataset.status;
        updateTicketStatus(ticketId, newStatus);
    }
});

// SUBSTITUA esta função para garantir a chamada de atualização

// SUBSTITUA SUA FUNÇÃO updateTicketStatus POR ESTA
function updateTicketStatus(ticketId, newStatus) {
    const ticket = ticketData[ticketId];
    
    if (ticket && ticket.status !== newStatus) {
        ticket.status = newStatus;
        
        // Garante que o histórico exista antes de adicionar
        if (!ticket.statusHistory) {
            ticket.statusHistory = [];
        }
        ticket.statusHistory.push({ status: newStatus, timestamp: new Date().toISOString() });
        
        renderTicketKanbanBoard();
        updateTestCaseDisplay(ticket.originalCaseId);
    }
}

function showTicketDetailsModal(ticketId) {
    //-- MODIFICAÇÃO: Lógica de busca do ticket foi melhorada
    const ticket = ticketData[ticketId];
    if (!ticket) {
        console.error(`Ticket com ID ${ticketId} não encontrado.`);
        return;
    }

    const modalBody = document.getElementById('ticket-details-body');
    const buildOptions = (options, selectedValue) => options.map(opt => `<option value="${opt}" ${opt === selectedValue ? 'selected' : ''}>${opt}</option>`).join('');

    let specificEvidencesHTML = (ticket.attachedEvidences && ticket.attachedEvidences.length > 0) ? `
        <div class="ticket-details-section">
            <h3>Evidências Anexadas ao Ticket</h3>
            <div id="ticket-details-evidence-grid" class="evidence-grid"></div>
        </div>` : `<div class="ticket-details-section"><p>Nenhuma evidência foi anexada a este ticket.</p></div>`;

    let resolutionEvidencesHTML = `
        <div class="ticket-details-section">
            <h3>Evidências de Resolução</h3>
            <div id="ticket-resolution-evidence-grid" class="evidence-grid">
                <label class="evidence-upload"><input type="file" accept="image/*,video/*" multiple onchange="handleResolutionEvidenceUpload(event, '${ticketId}')"><span>➕ Adicionar Evidência</span></label>
                <div class="evidence-paste-area-resolution"><span>📋 Ou cole a imagem aqui</span></div>
            </div>
        </div>`;
    
    modalBody.innerHTML = `
        <h2 style="text-align: center; color: var(--cor-ticket-btn);">Detalhes do Ticket #${ticket.displayId}</h2>
        <div class="ticket-details-grid">
            <div class="ticket-details-section">
                <h3>Detalhes do Ticket</h3>
                <div class="ticket-data-field"><label>Status:</label><select class="form-select" onchange="updateTicketField('${ticketId}', 'status', this.value)">${buildOptions(ticketStatuses, ticket.status)}</select></div>
                <div class="ticket-data-field"><label>Prioridade:</label><select class="form-select" onchange="updateTicketField('${ticketId}', 'priority', this.value)">${buildOptions(ticketPriorities, ticket.priority)}</select></div>
                <div class="ticket-data-field"><label>Responsável:</label><input type="text" class="form-input" value="${ticket.assignee}" onchange="updateTicketField('${ticketId}', 'assignee', this.value)"></div>
                <div class="ticket-data-field"><label>Descrição do Erro:</label><div class="value">${ticket.errorDescription.replace(/\n/g, '<br>')}</div></div>
            </div>
            <div class="ticket-details-section">
                <h3>Informações do Caso de Teste Original (ID #${ticket.originalCaseDisplayId})</h3>
                <div class="ticket-data-field"><label>Item Testado:</label><div class="value">${ticket.clonedData.itemTestado}</div></div>
                <div class="ticket-data-field"><label>Condição de Aprovação:</label><div class="value">${ticket.clonedData.condicaoAprovacao}</div></div>
            </div>
        </div>
        ${specificEvidencesHTML}
        ${resolutionEvidencesHTML}
        <div class="ticket-comment-section">
             <h3>Comentários do Ticket</h3>
             <div id="ticket-comments-list" class="ticket-comments-list"></div>
             <div class="ticket-new-comment-area">
                <textarea id="ticket-new-comment-textarea" class="form-textarea" placeholder="Adicionar um comentário..."></textarea>
                <button class="btn" onclick="addTicketComment('${ticketId}')">Adicionar Comentário</button>
             </div>
        </div>
    `;

    const renderReadOnlyEvidence = (evidence, grid) => {
        //-- CORREÇÃO: Adicionada verificação para evitar erro com evidências inválidas.
        if (!evidence || !evidence.src) {
            console.warn("Tentativa de renderizar uma evidência inválida ou sem 'src':", evidence);
            return; 
        }

        const previewWrapper = document.createElement('div');
        previewWrapper.className = 'evidence-preview-wrapper';
        let mediaElementHTML = '';
        const sanitizedSrc = evidence.src.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
        if (evidence.type.startsWith('image/')) {
            mediaElementHTML = `<img src="${sanitizedSrc}" class="preview-media" onclick="openMediaModal('${sanitizedSrc}', '${evidence.type}', '${evidence.name}')">`;
        } else if (evidence.type.startsWith('video/')) {
            mediaElementHTML = `<video src="${sanitizedSrc}" class="preview-media" onclick="openMediaModal('${sanitizedSrc}', '${evidence.type}', '${evidence.name}')"></video>`;
        } else {
             mediaElementHTML = `<div class="log-preview preview-media" onclick="openMediaModal('${sanitizedSrc}', '${evidence.type}', '${evidence.name}')">📎<br>Anexo</div>`;
        }
        previewWrapper.innerHTML = mediaElementHTML;
        grid.appendChild(previewWrapper);
    };

    const evidenceGrid = modalBody.querySelector('#ticket-details-evidence-grid');
    if (evidenceGrid && ticket.attachedEvidences) {
        ticket.attachedEvidences.forEach(evidence => renderReadOnlyEvidence(evidence, evidenceGrid));
    }

    const resolutionEvidenceGrid = modalBody.querySelector('#ticket-resolution-evidence-grid');
    if (resolutionEvidenceGrid && ticket.resolutionEvidences) {
        ticket.resolutionEvidences.forEach(evidence => renderReadOnlyEvidence(evidence, resolutionEvidenceGrid));
    }
    
    const pasteAreaResolution = modalBody.querySelector('.evidence-paste-area-resolution');
    if (pasteAreaResolution) {
        pasteAreaResolution.addEventListener('paste', (event) => handlePastedResolutionEvidence(event, ticketId));
    }

    renderTicketComments(ticketId);
    document.getElementById('ticket-details-modal').style.display = 'flex';
}
// SUBSTITUA A SUA FUNÇÃO 'updateTicketField' POR ESTA:
function updateTicketField(ticketId, field, value) {
    const ticket = ticketData[ticketId];
    if (ticket) {
        // ALTERAÇÃO: Se o campo for 'status', apenas chamamos a função principal
        // de atualização, sem alterar o dado aqui.
        if (field === 'status') {
            updateTicketStatus(ticketId, value);
        } else {
            // Para outros campos (como prioridade ou responsável), atualizamos diretamente.
            ticket[field] = value;
            renderTicketKanbanBoard();
        }
    }
}

function addTicketComment(ticketId) {
    const textarea = document.getElementById('ticket-new-comment-textarea');
    const text = textarea.value.trim();
    if (!text) {
        alert('O comentário não pode ser vazio.');
        return;
    }
    const ticket = ticketData[ticketId];
    if (ticket) {
        getAuthorName();
        const newComment = {
            author: currentAuthor,
            text: text,
            timestamp: new Date().toISOString()
        };
        if (!ticket.ticketComments) {
            ticket.ticketComments = [];
        }
        ticket.ticketComments.push(newComment);
        textarea.value = '';
        renderTicketComments(ticketId);
    }
}

function renderTicketComments(ticketId) {
    const listContainer = document.getElementById('ticket-comments-list');
    const ticket = ticketData[ticketId];
    if (!listContainer || !ticket || !ticket.ticketComments) {
        listContainer.innerHTML = '<p>Nenhum comentário ainda.</p>';
        return;
    }
    listContainer.innerHTML = '';
    if (ticket.ticketComments.length === 0) {
        listContainer.innerHTML = '<p>Nenhum comentário ainda.</p>';
    } else {
        ticket.ticketComments.forEach(comment => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'ticket-comment-entry';
            const date = new Date(comment.timestamp).toLocaleString('pt-BR');
            entryDiv.innerHTML = `
                <div class="ticket-comment-header">
                    <span class="ticket-comment-author">${comment.author}</span>
                    <span>${date}</span>
                </div>
                <p class="ticket-comment-text">${comment.text.replace(/\n/g, '<br>')}</p>
            `;
            listContainer.appendChild(entryDiv);
        });
    }
    listContainer.scrollTop = listContainer.scrollHeight;
}

// SUBSTITUA A SUA FUNÇÃO 'generateTestRoadmap' POR ESTA:
function generateTestRoadmap() {
    const allTestCases = Object.values(testCaseData);
    if (allTestCases.length === 0) {
        alert("Não há casos de teste para gerar um roadmap.");
        return;
    }

    const failureTypeCounts = {};
    failureTypes.slice(1).forEach(type => failureTypeCounts[type] = 0);
    
    let mostRetestedCase = null;
    let maxRetests = -1;

    // Novas categorias para o roadmap usando a função central
    const classifiedData = {
        'Em Andamento (DEV)': [],
        'Pronto para Re-teste (QA)': [],
        'Aprovado e Concluído': [],
        'Falha Nova (Aguardando Ticket)': [],
        'Inválido': [],
        'Pendente': []
    };

    allTestCases.forEach(testCase => {
        // Lógica de Re-testes (continua a mesma)
        if (!testCase.isReTest && testCase.reTestCount > maxRetests) {
            maxRetests = testCase.reTestCount;
            mostRetestedCase = testCase;
        }

        // Lógica de Tipos de Falha (continua a mesma)
        if (testCase.resultado === 'Reprovado') {
            if (testCase.tipoFalha && testCase.tipoFalha !== 'N/A') {
                failureTypeCounts[testCase.tipoFalha] = (failureTypeCounts[testCase.tipoFalha] || 0) + 1;
            }
        }
        
        // --- CLASSIFICAÇÃO INTELIGENTE USANDO A FUNÇÃO CENTRAL ---
        const workflowStatus = getTestCaseWorkflowStatus(testCase);
        if (classifiedData[workflowStatus]) {
            classifiedData[workflowStatus].push(testCase);
        }
    });
    
    // Agrega os dados para passar para as outras funções
    roadmapAggregatedData = { 
        classifiedData,
        resultsCount: { // Contagens para o gráfico e sumário
            'Em Andamento (DEV)': classifiedData['Em Andamento (DEV)'].length,
            'Pronto para Re-teste (QA)': classifiedData['Pronto para Re-teste (QA)'].length,
            'Aprovado e Concluído': classifiedData['Aprovado e Concluído'].length,
            'Falha Nova (Aguardando Ticket)': classifiedData['Falha Nova (Aguardando Ticket)'].length,
            'Inválido': classifiedData['Inválido'].length,
            'Pendente': classifiedData['Pendente'].length
        },
        failureTypeCounts, 
        mostRetestedCase, 
        maxRetests 
    };
    
    generateRoadmapSummaryAI(roadmapAggregatedData);
    renderResultsChart(roadmapAggregatedData.resultsCount);
    
    const failureTypesContainer = document.getElementById('failureTypesChart').parentElement;
    const totalFailures = Object.values(failureTypeCounts).reduce((sum, count) => sum + count, 0);
    if (totalFailures > 0) {
        failureTypesContainer.style.display = 'flex';
        renderFailureTypesChart(failureTypeCounts);
    } else {
        failureTypesContainer.style.display = 'none';
        if (failureTypesChartInstance) { failureTypesChartInstance.destroy(); failureTypesChartInstance = null; }
    }
    
    renderRoadmapHighlight(mostRetestedCase, maxRetests);
    renderRoadmapTextualDetails(classifiedData);
    document.getElementById('roadmap-modal').style.display = 'flex';
}

function renderRoadmapHighlight(testCase, retestCount) {
    const highlightSection = document.getElementById('roadmap-highlight-section');
    if (testCase && retestCount > 0) {
        highlightSection.querySelector('.highlight-id').textContent = `ID #${testCase.displayId}`;
        highlightSection.querySelector('.highlight-item').textContent = testCase.itemTestado || 'Item não informado';
        highlightSection.querySelector('.highlight-count').textContent = retestCount;
        highlightSection.style.display = 'block';
    } else highlightSection.style.display = 'none';
}

// SUBSTITUA A SUA FUNÇÃO 'renderRoadmapTextualDetails' POR ESTA:
function renderRoadmapTextualDetails(classifiedData) {
    const container = document.getElementById('roadmap-textual-details');
    container.innerHTML = '';

    const createSubsection = (title, icon, items, className) => {
        if (!items || items.length === 0) return '';
        let itemsHtml = items.map(tc => `<div class="roadmap-item"><span class="item-id">ID #${tc.displayId}</span>: <span class="item-name">${tc.itemTestado || 'Item não informado'}</span></div>`).join('');
        return `<div class="roadmap-subsection ${className}"><h4><span class="status-icon">${icon}</span> ${title} (${items.length})</h4>${itemsHtml}</div>`;
    };

    const typeSection = document.createElement('div');
    typeSection.className = 'roadmap-type-section';
    
    let sectionContent = `<h3>Status Detalhado dos Casos de Teste</h3>`;
    sectionContent += createSubsection('Em Andamento (Desenvolvimento)', '👨‍💻', classifiedData['Em Andamento (DEV)'], 'em-andamento-dev');
    sectionContent += createSubsection('Pronto para Re-teste (QA)', '🔬', classifiedData['Pronto para Re-teste (QA)'], 'pronto-para-qa');
    sectionContent += createSubsection('Falha Nova (Aguardando Ticket)', '🎟️', classifiedData['Falha Nova (Aguardando Ticket)'], 'falha-nova');
    sectionContent += createSubsection('Aprovado e Concluído', '✅', classifiedData['Aprovado e Concluído'], 'approved');
    sectionContent += createSubsection('Inválido', '⚠️', classifiedData['Inválido'], 'invalid');
    
    typeSection.innerHTML = sectionContent;
    container.appendChild(typeSection);
}

function copyRoadmapText() {
    const { resultsCount, failureTypeCounts, groupedByTypes, mostRetestedCase, maxRetests } = roadmapAggregatedData;
    if (!resultsCount) { alert("Dados do roadmap não encontrados. Gere o roadmap primeiro."); return; }
    let textToCopy = '🗺️ Detalhes dos Testes\n\n';
    if (mostRetestedCase && maxRetests > 0) textToCopy += `🔄 Caso de Teste com Mais Re-testes\nO caso de teste ID #${mostRetestedCase.displayId} (${mostRetestedCase.itemTestado || 'Item não informado'}) teve ${maxRetests} re-testes.\n\n`;
    const total = Object.values(resultsCount).reduce((a, b) => a + b, 0);
    textToCopy += `📊 Resumo dos Resultados\nTotal: ${total} | Aprovados: ${resultsCount['Aprovado']} | Reprovados: ${resultsCount['Reprovado']} | Inválidos: ${resultsCount['Inválido']} | Pendentes: ${resultsCount['Pendente']}\n\n`;
    const failedTypes = Object.entries(failureTypeCounts).filter(([, count]) => count > 0);
    if (failedTypes.length > 0) {
        textToCopy += '📉 Resumo dos Tipos de Falha\n';
        failedTypes.forEach(([type, count]) => { textToCopy += `- ${type}: ${count}\n`; });
        textToCopy += '\n';
    }
    textToCopy += '📋 Detalhes por Categoria\n';
    for (const type in groupedByTypes) {
        const typeData = groupedByTypes[type];
        if (Object.values(typeData).every(arr => arr.length === 0)) continue;
        textToCopy += `\n--- ${type} Tests ---\n`;
        const addItemsToText = (title, items, detailsFn) => {
            if (!items || items.length === 0) return;
            textToCopy += `\n  ${title}:\n`;
            items.forEach(tc => {
                textToCopy += `    - ID #${tc.displayId}: ${tc.itemTestado || 'Item não informado'}\n`;
                if (detailsFn) textToCopy += detailsFn(tc);
            });
        };
        addItemsToText('✅ Aprovados', typeData.approved);
        addItemsToText('❌ Reprovados', typeData.failed, tc => `      Tipo de Falha: ${tc.tipoFalha || 'Não informado'}\n`);
        addItemsToText('⚠️ Inválidos', typeData.invalid);
        addItemsToText('⏳ Pendentes', typeData.pending);
    }
    navigator.clipboard.writeText(textToCopy.trim()).then(() => alert('Texto do Roadmap copiado para a área de transferência!')).catch(err => console.error("Erro ao copiar texto do roadmap:", err));
}

// SUBSTITUA A SUA FUNÇÃO 'renderResultsChart' POR ESTA:
function renderResultsChart(resultsCount) {
    if (resultsChartInstance) resultsChartInstance.destroy();
    
    const rootStyles = getComputedStyle(document.documentElement);
    const ctx = document.getElementById('resultsChart').getContext('2d');
    
    const labels = Object.keys(resultsCount).filter(key => resultsCount[key] > 0);
    const data = labels.map(label => resultsCount[label]);
    
    const colorMap = {
        'Em Andamento (DEV)': rootStyles.getPropertyValue('--cor-ticket-analise').trim(),
        'Pronto para Re-teste (QA)': rootStyles.getPropertyValue('--cor-aviso').trim(),
        'Aprovado e Concluído': rootStyles.getPropertyValue('--cor-status-aprovado').trim(),
        'Falha Nova (Aguardando Ticket)': rootStyles.getPropertyValue('--cor-status-reprovado').trim(),
        'Inválido': rootStyles.getPropertyValue('--cor-status-invalido').trim(),
        'Pendente': '#6c757d'
    };

    const backgroundColors = labels.map(label => colorMap[label]);

    resultsChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            }
        }
    });
}
function renderFailureTypesChart(failureTypeCounts) {
    if (failureTypesChartInstance) failureTypesChartInstance.destroy();
    const labels = Object.keys(failureTypeCounts).filter(key => failureTypeCounts[key] > 0);
    const data = Object.values(failureTypeCounts).filter(value => value > 0);
    const colors = labels.map((_, index) => failureTypeColors[index % failureTypeColors.length]);
    const ctx = document.getElementById('failureTypesChart').getContext('2d');
    failureTypesChartInstance = new Chart(ctx, { type: 'bar', data: { labels: labels, datasets: [{ label: 'Ocorrências', data: data, backgroundColor: colors, borderWidth: 1 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } } });
}

function showFlowchartModal(caseId) {
    attachingFlowchartToCaseId = caseId;
    const descriptionTextarea = document.getElementById('flowchart-description');
    const codeTextarea = document.getElementById('flowchart-code');
    const preview = document.getElementById('flowchart-preview');
    descriptionTextarea.value = '';
    codeTextarea.value = '';
    preview.innerHTML = '';
    document.getElementById('flowchart-modal').style.display = 'flex';
}

async function renderFlowchartPreview() {
    const code = document.getElementById('flowchart-code').value;
    const preview = document.getElementById('flowchart-preview');
    if (!code.trim()) { preview.innerHTML = ''; return; }
    try {
        const tempId = 'temp-svg-' + Math.random().toString(36).substring(2);
        const { svg } = await mermaid.render(tempId, code);
        preview.innerHTML = svg;
    } catch (e) { preview.innerHTML = `<div class="error-text">Erro na sintaxe: ${e.message}</div>`; }
}

function attachFlowchart() {
    if (!attachingFlowchartToCaseId) return;
    const mermaidCode = document.getElementById('flowchart-code').value.trim();
    if (!mermaidCode) { alert("O código do fluxograma está vazio."); return; }
    const evidenceData = { src: mermaidCode, type: 'text/mermaid', name: `fluxograma-${new Date().toISOString().replace(/[:.]/g, '-')}.txt` };
    testCaseData[attachingFlowchartToCaseId].evidences.push(evidenceData);
    renderEvidencePreview(attachingFlowchartToCaseId, evidenceData, false);
    attachingFlowchartToCaseId = null;
    closeModal('flowchart-modal');
}

async function openFlowchartViewerModal(encodedMermaidCode) {
    try {
        const mermaidCode = decodeURIComponent(atob(encodedMermaidCode));
        const viewerOutput = document.getElementById('flowchart-viewer-output');
        viewerOutput.innerHTML = '';
        const { svg } = await mermaid.render('flowchart-viewer-svg', mermaidCode);
        viewerOutput.innerHTML = svg;
        document.getElementById('flowchart-viewer-modal').style.display = 'flex';
    } catch (error) { alert("Ocorreu um erro ao tentar exibir este fluxograma."); }
}

function renderAllPostIts(evidence, container) { (evidence.postIts || []).forEach(postItData => createPostItElement(postItData, evidence, container)); }

function addNewPostIt(evidence, container) {
    const newPostItData = { id: `postit-${Date.now()}`, text: 'Dê um duplo clique para editar...', x: 20, y: 20, width: 150, height: 150 };
    if (!evidence.postIts) evidence.postIts = [];
    evidence.postIts.push(newPostItData);
    createPostItElement(newPostItData, evidence, container);
}

function createPostItElement(postItData, evidence, container) {
    const postIt = document.createElement('div');
    postIt.id = postItData.id;
    postIt.className = 'post-it';
    postIt.style.left = `${postItData.x}px`;
    postIt.style.top = `${postItData.y}px`;
    postIt.style.width = `${postItData.width}px`;
    postIt.style.height = `${postItData.height}px`;
    postIt.innerHTML = `<div class="post-it-header"><button class="remove-postit-btn">&times;</button></div><div class="post-it-content">${postItData.text}</div><div class="post-it-resize-handle"></div>`;
    container.appendChild(postIt);
    const contentDiv = postIt.querySelector('.post-it-content');
    const removeBtn = postIt.querySelector('.remove-postit-btn');
    const resizeHandle = postIt.querySelector('.post-it-resize-handle');
    removeBtn.onclick = (e) => {
        e.stopPropagation();
        const index = evidence.postIts.findIndex(p => p.id === postItData.id);
        if (index > -1) evidence.postIts.splice(index, 1);
        postIt.remove();
    };
    contentDiv.ondblclick = (e) => {
        e.stopPropagation();
        const currentText = postItData.text === 'Dê um duplo clique para editar...' ? '' : postItData.text;
        contentDiv.style.display = 'none';
        const textArea = document.createElement('textarea');
        textArea.className = 'post-it-textarea';
        textArea.value = currentText;
        postIt.appendChild(textArea);
        textArea.focus();
        textArea.onblur = () => {
            postItData.text = textArea.value;
            contentDiv.textContent = postItData.text;
            contentDiv.style.display = 'block';
            textArea.remove();
        };
    };
    makeDraggable(postIt, postItData);
    makeResizable(postIt, postItData, resizeHandle);
}

function makeDraggable(element, data) {
    let offsetX, offsetY;
    element.onmousedown = (e) => {
        if (e.target.classList.contains('remove-postit-btn') || e.target.classList.contains('post-it-resize-handle') || e.target.tagName === 'TEXTAREA') return;
        e.preventDefault();
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
        document.onmousemove = (moveEvent) => {
            element.style.left = `${moveEvent.clientX - offsetX}px`;
            element.style.top = `${moveEvent.clientY - offsetY}px`;
        };
        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
            data.x = element.offsetLeft;
            data.y = element.offsetTop;
        };
    };
}

function makeResizable(element, data, handle) {
    handle.onmousedown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = element.offsetWidth;
        const startHeight = element.offsetHeight;
        document.onmousemove = (moveEvent) => {
            const newWidth = startWidth + (moveEvent.clientX - startX);
            const newHeight = startHeight + (moveEvent.clientY - startY);
            element.style.width = `${newWidth > 100 ? newWidth : 100}px`;
            element.style.height = `${newHeight > 100 ? newHeight : 100}px`;
        };
        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
            data.width = element.offsetWidth;
            data.height = element.offsetHeight;
        };
    };
}

function renderKanbanBoard() {
    const boardContainer = document.getElementById('kanban-modal-board');
    boardContainer.innerHTML = '';
    const columns = { 
        'backlog': { title: 'Backlog / A Fazer', status: 'Pendente', cards: [] }, 
        'analise': { title: 'Em Análise', status: 'Em Análise', cards: [] }, 
        'corrigido': { title: 'Corrigido (Para Re-teste)', status: 'Corrigido', cards: [] }, 
        'concluido': { title: 'Concluído', status: 'Aprovado', cards: [] } 
    };

    for (const caseId in testCaseData) {
        const testCase = testCaseData[caseId];
        if (!testCase || typeof testCase.resultado === 'undefined' || typeof testCase.resolutionStatus === 'undefined') { 
            console.warn('Caso de teste inválido ou incompleto ignorado:', { caseId, testCase }); 
            continue; 
        }

        if (testCase.resultado === 'Aprovado' || testCase.resolutionStatus === 'Não será corrigido') {
            columns.concluido.cards.push(testCase);
        } else if (testCase.resolutionStatus === 'Corrigido') {
            columns.corrigido.cards.push(testCase);
        } else if (testCase.resolutionStatus === 'Em Análise') {
            columns.analise.cards.push(testCase);
        } else {
            columns.backlog.cards.push(testCase);
        }
    }

    for (const columnKey in columns) {
        const columnData = columns[columnKey];
        const columnEl = document.createElement('div');
        columnEl.className = 'kanban-column';
        columnEl.dataset.columnKey = columnKey;
        columnEl.dataset.status = columnData.status;
        // Adicionado o contador no título da coluna (inicialmente 0)
        columnEl.innerHTML = `<div class="kanban-column-header">${columnData.title} (0)</div><div class="kanban-cards-container"></div>`;
        
        const cardsContainer = columnEl.querySelector('.kanban-cards-container');
        columnData.cards.forEach(cardData => cardsContainer.appendChild(createKanbanCard(cardData)));
        
        columnEl.addEventListener('dragover', handleDragOver);
        columnEl.addEventListener('dragleave', handleDragLeave);
        columnEl.addEventListener('drop', handleDrop);
        boardContainer.appendChild(columnEl);
    }

    // Após adicionar todos os cards, atualiza os contadores
    boardContainer.querySelectorAll('.kanban-column').forEach(column => {
        const header = column.querySelector('.kanban-column-header');
        const cardCount = column.querySelector('.kanban-cards-container').children.length;
        // Pega o texto original do título (ex: "Backlog / A Fazer")
        const originalTitle = columns[column.dataset.columnKey].title;
        header.textContent = `${originalTitle} (${cardCount})`;
    });
}

// Substitua sua função createKanbanCard por esta
function createKanbanCard(caseData) {
    const card = document.createElement('div');
    card.className = 'kanban-card';
    const caseIdentifier = `test-case-${caseData.id}`;
    card.id = `kanban-${caseIdentifier}`;
    card.dataset.caseId = caseIdentifier;
    card.draggable = true;

    // Adiciona o evento de clique para abrir o novo modal de detalhes
    card.onclick = () => showKanbanCardDetailsModal(caseIdentifier);

    // Lógica de alerta de atraso
    const isOverdue = (() => {
        if (!caseData.dataEntrega) return false;
        const isDone = caseData.resultado === 'Aprovado' || caseData.resolutionStatus === 'Não será corrigido';
        if (isDone) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const deliveryDate = new Date(caseData.dataEntrega + 'T00:00:00');
        return deliveryDate < today;
    })();

    if (isOverdue) {
        card.classList.add('overdue');
    }

    const statusClass = (caseData.resultado || 'Pendente').toLowerCase().replace(/ /g, '-');
    card.classList.add(`status-${statusClass}`);

    const formattedDate = caseData.dataEntrega 
        ? new Date(caseData.dataEntrega + 'T00:00:00').toLocaleDateString('pt-BR') 
        : 'N/A';

    card.innerHTML = `
        <div class="kanban-card-title">${caseData.itemTestado || 'Item não definido'}</div>
        <div class="kanban-card-info">
            <span>ID #${caseData.displayId}</span>
            <span>${caseData.resultado || 'Pendente'}</span>
        </div>
        <div class="kanban-card-details">
            <div class="kanban-detail-item"><strong>Resp:</strong> ${caseData.responsavel || 'N/A'}</div>
            <div class="kanban-detail-item"><strong>Entrega:</strong> ${formattedDate}</div>
            <div class="kanban-detail-item"><strong>Prio:</strong> <span class="priority-tag priority-${(caseData.prioridadePlanejamento || 'N/A').toLowerCase()}">${caseData.prioridadePlanejamento || 'N/A'}</span></div>
            <div class="kanban-detail-item"><strong>Peso:</strong> ${caseData.peso || 'N/A'}</div>
        </div>
    `;

    card.addEventListener('dragstart', handleDragStart);
    return card;
}



function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.caseId);
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    this.querySelector('.kanban-cards-container').classList.add('drag-over');
}

function handleDragLeave(e) { this.querySelector('.kanban-cards-container').classList.remove('drag-over'); }

function handleDrop(e) {
    e.preventDefault();
    this.querySelector('.kanban-cards-container').classList.remove('drag-over');
    const caseId = e.dataTransfer.getData('text/plain');
    const targetStatus = this.dataset.status;
    const targetColumnKey = this.dataset.columnKey;
    const testCase = testCaseData[caseId];
    if (testCase) {
        if (targetColumnKey === 'concluido') {
            testCase.resultado = 'Aprovado';
            testCase.resolutionStatus = 'Corrigido'; 
        } else {
            testCase.resolutionStatus = targetStatus;
            if (testCase.resultado === 'Aprovado') testCase.resultado = 'Selecione um resultado';
        }
        const listCard = document.getElementById(caseId);
        if (listCard) {
            const resolutionSelect = listCard.querySelector('select[onchange*="resolutionStatus"]');
            if (resolutionSelect) resolutionSelect.value = testCase.resolutionStatus;
            const resultSelect = listCard.querySelector('select[onchange*="handleResultChange"]');
            if (resultSelect) {
                resultSelect.value = testCase.resultado;
                handleResultChange(caseId, resultSelect.value); 
            }
        }
        renderKanbanBoard();
        updateSummary();
    }
}

const SYSTEM_PROMPT = `Você é o "Assistente de Testes", um especialista amigável e prestativo para a ferramenta "Controle de Plano de Testes". Sua única função é responder perguntas sobre como usar esta ferramenta. Seja claro, direto e use listas de passos quando apropriado.

Base de Conhecimento da Ferramenta:
- **Casos de Teste:** Para adicionar, clique no '➕'. Cada caso tem ID, nome, etc. '🔄 Re-testar' cria um sub-item.
- **Gerenciamento de Projetos (Menu Lateral):** Salvar, Carregar (substitui dados na tela), Gerenciar (alterar status/excluir).
- **Relatórios (Menu Lateral):** Exportar Email (IA gera texto e copia), Gerar Roadmap (dashboard visual).
- **Evidências:** Anexe arquivos, grave tela (com painel flutuante de controle e desenho), cole logs, ou crie fluxogramas com IA. Visualizar vídeos permite comentários por tempo e Post-its.
- **Funcionalidades com IA ('🤖'):** Gerar descrição, analisar logs/mídia, priorizar falhas, importar de Word.
- **Painel de Controle ('⚙️'):** Defina seu nome/foto, veja estatísticas, ative/desative funções de IA e o Modo Noturno.
- **Outras Funcionalidades:** Modo Kanban (arraste para atualizar status), Importar/Exportar Backup (.json), Filtrar Reprovados ('⚠️').
- **Tickets:** Quando um teste falha, um botão "Gerar Ticket" aparece. Isso cria um item no quadro de tickets. No menu "Gerenciar Tickets", você vê um Kanban de tickets (Aberto, Em Análise, etc.), onde pode arrastá-los para mudar o status. Clicar em um ticket abre seus detalhes para edição, comentários e visualização das evidências originais.
Se a pergunta não for sobre a ferramenta, responda educadamente que só pode ajudar com o "Controle de Plano de Testes".`;

function toggleChatAssistant(show) {
    const chatModal = document.getElementById('chat-assistant-modal');
    if (show) {
        chatModal.style.display = 'flex';
        if (chatHistory.length === 0) displayMessage('Olá! Como posso ajudar você a usar a ferramenta de testes hoje?', 'assistant');
    } else chatModal.style.display = 'none';
}

function handleSendMessage() {
    const input = document.getElementById('chat-input');
    const userMessage = input.value.trim();
    if (!userMessage || isAssistantTyping) return;
    displayMessage(userMessage, 'user');
    chatHistory.push({ role: 'user', parts: [{ text: userMessage }] });
    input.value = '';
    input.focus();
    getAssistantResponse();
}

function displayMessage(message, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.textContent = message;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function getAssistantResponse() {
    if (!userSettings.ai.chatAssistant) { displayMessage('O assistente de IA está desativado. Você pode ativá-lo no Painel de Controle.', 'assistant'); return; }
    isAssistantTyping = true;
    document.getElementById('chat-send-btn').disabled = true;
    displayMessage('Pensando...', 'assistant thinking');
    const API_ENDPOINT = buildGeminiEndpoint();
    if (!API_ENDPOINT) {
        const thinkingMessage = document.querySelector('.assistant-message.thinking');
        if (thinkingMessage) thinkingMessage.remove();
        displayMessage('Configure sua chave de API no Painel de Controle para usar o assistente.', 'assistant');
        isAssistantTyping = false;
        document.getElementById('chat-send-btn').disabled = false;
        return;
    }
    const requestBody = {
        contents: chatHistory,
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }
    };
    try {
        const response = await fetch(API_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody) });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Erro na API: ${response.status} ${response.statusText}. Detalhes: ${JSON.stringify(errorData)}`);
        }
        const data = await response.json();
        const thinkingMessage = document.querySelector('.assistant-message.thinking');
        if (thinkingMessage) thinkingMessage.remove();
        if (data.candidates && data.candidates.length > 0) {
            const assistantResponse = data.candidates[0].content.parts[0].text;
            displayMessage(assistantResponse, 'assistant');
            chatHistory.push({ role: 'model', parts: [{ text: assistantResponse }] });
        } else displayMessage('Não recebi uma resposta válida da IA. Pode ser um filtro de segurança. Tente reformular sua pergunta.', 'assistant');
    } catch (error) {
        console.error("Erro ao chamar a API do Assistente:", error);
        const thinkingMessage = document.querySelector('.assistant-message.thinking');
        if (thinkingMessage) thinkingMessage.remove();
        const errorMsg = error?.message || 'Erro desconhecido.';
        displayMessage(`Desculpe, ocorreu um erro de comunicação com a IA. Verifique sua chave de API e a conexão. Detalhes: ${errorMsg}`, 'assistant');
    } finally {
        isAssistantTyping = false;
        document.getElementById('chat-send-btn').disabled = false;
    }
}

async function generateFlowchartFromDescription() {
    if (!userSettings.ai.generateFlowchart) return;
    const description = document.getElementById('flowchart-description').value.trim();
    if (!description) { alert("Por favor, descreva o fluxo que você deseja criar."); return; }
    const button = document.getElementById('generate-flowchart-btn');
    const codeTextarea = document.getElementById('flowchart-code');
    const preview = document.getElementById('flowchart-preview');
    button.disabled = true;
    button.textContent = "🧠 Gerando...";
    codeTextarea.value = "A IA está processando sua descrição...";
    preview.innerHTML = "";
    const prompt = `Aja como um especialista em sintaxe de fluxogramas Mermaid.js. Converta a descrição a seguir em um código de fluxograma Mermaid válido (graph TD). Responda APENAS com o bloco de código. Descrição: --- ${description} ---`;
    const API_ENDPOINT = buildGeminiEndpoint();
    if (!API_ENDPOINT) { button.disabled = false; button.textContent = "🤖 Gerar Fluxograma com IA"; return; }
    try {
        const response = await fetch(API_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
        if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
        const data = await response.json();
        const mermaidCode = data.candidates[0].content.parts[0].text.trim().replace(/```mermaid/g, '').replace(/```/g, '');
        codeTextarea.value = mermaidCode;
        await renderFlowchartPreview();
    } catch (error) {
        codeTextarea.value = `Ocorreu um erro: ${error.message}`;
        preview.innerHTML = `<div class="error-text">Falha ao gerar o diagrama.</div>`;
    } finally {
        button.disabled = false;
        button.textContent = "🤖 Gerar Fluxograma com IA";
    }
}

async function generateDescriptionWithAI(caseId) {
    if (!userSettings.ai.generateDescription) return;
    const itemTestadoInput = document.querySelector(`#${caseId} input[onchange*="itemTestado"]`);
    const descriptionTextarea = document.getElementById(`${caseId}-descricao`);
    const button = event.target;
    const itemTestado = itemTestadoInput.value;
    if (!itemTestado) { alert("Por favor, preencha o campo 'Nome do item a ser testado'."); return; }
    button.disabled = true;
    button.textContent = "🧠 Pensando...";
    descriptionTextarea.value = "Aguarde, a IA está gerando a descrição...";
    const prompt = `Como um QA Sênior, crie uma descrição detalhada de caso de teste para o item "${itemTestado}". Use o formato: 1. Objetivo do Teste; 2. Pré-condições; 3. Passos para Execução; 4. Resultados Esperados.`;
    const API_ENDPOINT = buildGeminiEndpoint();
    if (!API_ENDPOINT) { button.disabled = false; button.textContent = "🤖 Gerar Descrição com IA"; return; }
    try {
        const response = await fetch(API_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
        if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
        const data = await response.json();
        const generatedText = data.candidates[0].content.parts[0].text.trim();
        descriptionTextarea.value = generatedText;
        updateTestCaseData(caseId, 'descricao', generatedText);
    } catch (error) {
        alert("Ocorreu um erro ao se comunicar com a IA.");
        descriptionTextarea.value = "Ocorreu um erro. Tente novamente.";
    } finally {
        button.disabled = false;
        button.textContent = "🤖 Gerar Descrição com IA";
    }
}

async function analyzeLogWithAI() {
    if (!userSettings.ai.analyzeLog) return;
    if (!attachingLogToCaseId) { alert("Erro: Não foi possível identificar o caso de teste para análise."); return; }
    const logText = document.getElementById('log-attach-textarea').value.trim();
    if (!logText) { alert("Por favor, cole o log do console na área de texto."); return; }
    const button = event.target;
    button.disabled = true;
    button.textContent = "🧠 Analisando...";
    const prompt = `Como um dev sênior, analise o log a seguir e retorne um resumo e a causa provável. Formato: "**Resumo do Erro:** [resumo]\n**Causa Provável:** [causa]". Log: --- ${logText} ---`;
    const API_ENDPOINT = buildGeminiEndpoint();
    if (!API_ENDPOINT) { button.disabled = false; button.textContent = "🤖 Analisar Log com IA"; return; }
    try {
        const response = await fetch(API_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
        if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
        const data = await response.json();
        const generatedText = `**Análise do Log via IA:**\n\n${data.candidates[0].content.parts[0].text.trim()}`;
        addComment(attachingLogToCaseId, 'DEV', generatedText);
        alert("Análise do log concluída e adicionada como um comentário!");
        closeModal('log-attach-modal');
    } catch (error) { alert("Ocorreu um erro ao se comunicar com a IA.");
    } finally {
        button.disabled = false;
        button.textContent = "🤖 Analisar Log com IA";
    }
}

async function analyzeAndPrioritizeFailure(caseId) {
    if (!userSettings.ai.prioritizeFailure) return;
    const caseData = testCaseData[caseId];
    if (!caseData) return;
    const priorityOutput = document.getElementById(`${caseId}-priority-output`);
    const teamOutput = document.getElementById(`${caseId}-team-output`);
    priorityOutput.innerHTML = "🤖 Analisando...";
    teamOutput.innerHTML = "🤖 Analisando...";
    const dataForAI = { itemTestado: caseData.itemTestado, descricao: caseData.descricao, tipoFalha: caseData.tipoFalha };
    const prompt = `Como um Gerente de Projetos de TI, analise estes dados de um teste reprovado: ${JSON.stringify(dataForAI)}. Responda APENAS com um objeto JSON com as chaves "prioridade" ('Crítica', 'Alta', 'Média', 'Baixa'), "equipeSugerida" ('Frontend', 'Backend', 'Banco de Dados', 'Infraestrutura') e "justificativa" (string curta).`;
    const API_ENDPOINT = buildGeminiEndpoint(false);
    if (!API_ENDPOINT) { priorityOutput.textContent = "Chave de API não configurada"; teamOutput.textContent = "Chave de API não configurada"; return; }
    try {
        const response = await fetch(API_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
        if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
        const data = await response.json();
        const rawText = data.candidates[0].content.parts[0].text;
        const jsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const result = JSON.parse(jsonText);
        if (result.prioridade && result.equipeSugerida) {
            updateTestCaseData(caseId, 'priority', result.prioridade);
            updateTestCaseData(caseId, 'suggestedTeam', result.equipeSugerida);
            priorityOutput.textContent = result.prioridade;
            teamOutput.textContent = result.equipeSugerida;
            const justificationComment = `**Análise de Prioridade (IA):**\nPrioridade: **${result.prioridade}**, Equipe: **${result.equipeSugerida}**.\n**Justificativa:** ${result.justificativa}`;
            addComment(caseId, 'QA', justificationComment);
        } else throw new Error("Resposta da IA em formato inesperado.");
    } catch (error) {
        priorityOutput.textContent = "Erro na análise";
        teamOutput.textContent = "Erro na análise";
    }
}

// SUBSTITUA A SUA FUNÇÃO 'generateRoadmapSummaryAI' POR ESTA:
async function generateRoadmapSummaryAI(summaryData) {
    if (!userSettings.ai.summarizeRoadmap) return;
    const aiSummaryContainer = document.getElementById('roadmap-ai-summary');
    aiSummaryContainer.style.display = 'block';
    aiSummaryContainer.innerHTML = '<h3>Análise da IA</h3><p>🤖 Gerando análise qualitativa...</p>';

    const dataForAI = {
        contagemStatus: summaryData.resultsCount,
        tiposDeFalha: summaryData.failureTypeCounts,
    };

    const prompt = `Como um Gerente de QA experiente, analise o resumo do estado atual de um ciclo de testes: ${JSON.stringify(dataForAI)}. Escreva um resumo executivo de 2 a 4 frases. Foque sua análise nos seguintes pontos:
- "Em Andamento (DEV)" representa o gargalo atual de desenvolvimento.
- "Pronto para Re-teste (QA)" representa a carga de trabalho imediata para a equipe de QA.
- "Falha Nova (Aguardando Ticket)" são os riscos que ainda não foram endereçados.
Forneça uma recomendação clara baseada nesses números.`;

    const API_ENDPOINT = buildGeminiEndpoint(false);
    if (!API_ENDPOINT) { aiSummaryContainer.innerHTML = '<h3>Análise da IA</h3><p>Configure sua chave de API para gerar a análise.</p>'; return; }
    try {
        const response = await fetch(API_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
        if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
        const data = await response.json();
        const summaryText = data.candidates[0].content.parts[0].text;
        aiSummaryContainer.innerHTML = `<h3>Análise da IA</h3><p>${summaryText}</p>`;
    } catch (error) {
        aiSummaryContainer.innerHTML = '<h3>Análise da IA</h3><p>Ocorreu um erro ao gerar a análise.</p>';
    }
}
async function handleWordUpload(event) {
    if (!userSettings.ai.importFromWord) return;
    const file = event.target.files[0];
    if (!file) return;
    const importButton = event.target.nextElementSibling;
    const originalButtonText = importButton.innerHTML;
    importButton.disabled = true;
    importButton.innerHTML = "⏳ Processando...";
    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const result = await mammoth.extractRawText({ arrayBuffer: e.target.result });
            const generatedTestCases = await generateTestCasesFromText(result.value);
            if (generatedTestCases && generatedTestCases.length > 0) {
                showTestCaseView();
                generatedTestCases.forEach(tc => addNewTestCase({ itemTestado: tc.itemTestado, condicaoAprovacao: tc.condicaoAprovacao }));
                alert(`${generatedTestCases.length} casos de teste foram gerados com sucesso!`);
            } else alert("A IA não conseguiu gerar casos de teste do documento.");
        } catch (error) { alert("Ocorreu um erro ao processar o arquivo.");
        } finally {
            importButton.disabled = false;
            importButton.innerHTML = originalButtonText;
            event.target.value = '';
        }
    };
    reader.readAsArrayBuffer(file);
}

async function generateTestCasesFromText(scopeText) {
    const prompt = `Como um QA Sênior, analise o escopo a seguir e crie casos de teste. Para cada um, defina "itemTestado" e "condicaoAprovacao". Responda APENAS com um array de objetos JSON. Escopo: --- ${scopeText} ---`;
    const API_ENDPOINT = buildGeminiEndpoint();
    if (!API_ENDPOINT) return null;
    try {
        const response = await fetch(API_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
        if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
        const data = await response.json();
        const rawText = data.candidates[0].content.parts[0].text;
        const jsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonText);
    } catch (error) { throw error; }
}

async function generateAIReport(allTestCaseData) {
    if (!userSettings.ai.generateEmailReport) return null;
    const API_ENDPOINT = buildGeminiEndpoint();
    if (!API_ENDPOINT) return null;

    // ALTERAÇÃO: Enriquecemos os dados com o novo status geral dos tickets.
    const simplifiedData = Object.values(allTestCaseData).map(tc => {
        let statusGeralTickets = 'Sem Tickets';
        if (tc.tickets && tc.tickets.length > 0) {
            const hasOpenTickets = tc.tickets.some(ticketId => ticketData[ticketId]?.status !== 'Fechado');
            statusGeralTickets = hasOpenTickets ? 'Em Andamento' : 'Resolvido';
        }

        return {
            id: tc.displayId,
            itemTestado: tc.itemTestado,
            resultadoQA: tc.resultado, // Renomeado para clareza no prompt
            statusGeralTickets: statusGeralTickets // NOVO CAMPO PARA A IA
        };
    });

    if (simplifiedData.length === 0) {
        alert("Não há dados de teste para a IA analisar.");
        return null;
    }

    // ALTERAÇÃO: Prompt totalmente reescrito para usar o novo status e gerar um relatório orientado à ação.
    const prompt = `Como um Líder de QA, analise estes dados: ${JSON.stringify(simplifiedData)}. O campo 'resultadoQA' é a visão do tester, e 'statusGeralTickets' é o status do desenvolvimento. Gere um relatório de e-mail profissional e acionável. Responda APENAS com um objeto JSON com chaves "assunto" e "corpoEmail". O corpo do email deve ter as seguintes seções, apenas se houver itens para elas:
1.  **Acompanhamento de Pendências (Tickets em Andamento):** Liste os casos com 'statusGeralTickets' como 'Em Andamento'. Esta é a seção prioritária.
2.  **Itens Resolvidos (Prontos para Re-teste):** Liste os casos com 'statusGeralTickets' como 'Resolvido'. Indique que estes precisam ser re-testados pela equipe de QA.
3.  **Novas Falhas Identificadas (Aguardando Triagem):** Liste casos com 'resultadoQA' como 'Reprovado' mas que ainda estão com 'statusGeralTickets' como 'Sem Tickets'. Destaque que precisam da criação de tickets.
4.  **Itens Aprovados e Estáveis:** Liste os casos com 'resultadoQA' como 'Aprovado' e 'statusGeralTickets' como 'Sem Tickets'.
5.  **Conclusão e Próximos Passos:** Uma breve conclusão focada nas ações necessárias.`;

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
        const data = await response.json();
        const rawText = data.candidates[0].content.parts[0].text;
        const jsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonText);
    } catch (error) {
        alert("Ocorreu um erro ao gerar o relatório com a IA: " + error.message);
        return null;
    }
}

async function analyzeVideoWithAI(event, caseId, evidenceSrc) {
    if (!userSettings.ai.analyzeMedia) return;
    event.stopPropagation();
    const button = event.target;
    button.disabled = true;
    button.textContent = "⏳";
    const API_ENDPOINT = buildGeminiEndpoint();
    if (!API_ENDPOINT) { button.disabled = false; button.textContent = "🤖 Analisar Vídeo"; return; }
    try {
        const base64Data = evidenceSrc.split(',')[1];
        const prompt = `Analise este vídeo de um teste de software. Descreva as ações do usuário em bullet points. Se houver um erro, destaque-o com "ERRO:".`;
        const requestBody = { contents: [ { parts: [ { text: prompt }, { inline_data: { mime_type: "video/webm", data: base64Data } } ] } ] };
        const response = await fetch(API_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody) });
        if (!response.ok) { const errorText = await response.text(); throw new Error(`Erro na API: ${response.statusText}. Detalhes: ${errorText}`); }
        const data = await response.json();
        if (!data.candidates || data.candidates.length === 0) throw new Error("A API retornou uma resposta vazia (possivelmente filtros de segurança).");
        const generatedText = `**Análise do Vídeo por IA:**\n\n${data.candidates[0].content.parts[0].text.trim()}`;
        addComment(caseId, 'QA', generatedText);
        alert('Análise do vídeo concluída e adicionada como um novo comentário!');
    } catch (error) {
        alert(`Ocorreu um erro ao processar o vídeo: ${error.message}`);
    } finally {
        button.disabled = false;
        button.textContent = "🤖 Analisar Vídeo";
    }
}

async function analyzeImageWithAI(event, caseId, evidenceSrc, mimeType) {
    if (!userSettings.ai.analyzeMedia) return;
    event.stopPropagation();
    const button = event.target;
    button.disabled = true;
    button.textContent = "⏳";
    const API_ENDPOINT = buildGeminiEndpoint();
    if (!API_ENDPOINT) { button.disabled = false; button.textContent = "🤖 Analisar Imagem"; return; }
    try {
        const base64Data = evidenceSrc.split(',')[1];
        const prompt = `Analise esta imagem. Extraia todo o texto visível (OCR). Descreva mensagens de erro e resuma o que a tela representa.`;
        const requestBody = { contents: [ { parts: [ { text: prompt }, { inline_data: { mime_type: mimeType, data: base64Data } } ] } ] };
        const response = await fetch(API_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(requestBody) });
        if (!response.ok) { const errorText = await response.text(); throw new Error(`Erro na API: ${response.statusText}. Detalhes: ${errorText}`); }
        const data = await response.json();
        if (!data.candidates || data.candidates.length === 0) throw new Error("A API retornou uma resposta vazia (possivelmente filtros de segurança).");
        const generatedText = `**Análise da Imagem por IA:**\n\n${data.candidates[0].content.parts[0].text.trim()}`;
        addComment(caseId, 'QA', generatedText);
        alert('Análise da imagem concluída e adicionada como um novo comentário!');
    } catch (error) {
        alert(`Ocorreu um erro ao processar a imagem: ${error.message}`);
    } finally {
        button.disabled = false;
        button.textContent = "🤖 Analisar Imagem";
    }
}

function updateCommentButtonText(caseId) {
    const card = document.getElementById(caseId);
    if (!card) return;
    const button = card.querySelector('.btn-toggle-dev-comment');
    const wrapper = document.getElementById(`${caseId}-dev-comment-wrapper`);
    if (!button) return;
    const count = testCaseData[caseId]?.devComments?.length || 0;
    const isHidden = wrapper.classList.contains('hidden-field');
    const baseText = isHidden ? '💬 Exibir Comentários' : '💬 Ocultar Comentários';
    const countBadge = count > 0 ? `<span class="comment-count-badge">${count}</span>` : '';
    button.innerHTML = `${baseText} ${countBadge}`;
}

function handlePastedEvidence(event, caseId) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    let imageFound = false;
    for (const item of items) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
            event.preventDefault();
            imageFound = true;
            const file = item.getAsFile();
            const reader = new FileReader();
            reader.onload = (e) => {
                const evidenceData = { src: e.target.result, type: file.type, name: `pasted-image-${new Date().toISOString().replace(/[:.]/g, '-')}.png` };
                if (testCaseData[caseId] && testCaseData[caseId].evidences) {
                    testCaseData[caseId].evidences.push(evidenceData);
                    renderEvidencePreview(caseId, evidenceData, false);
                }
            };
            reader.readAsDataURL(file);
            break;
        }
    }
}
function openAICorrectionModal(caseId, field) {
    if (!testCaseData[caseId]) return;
    aiCorrectionContext = { caseId, field };
    const originalText = testCaseData[caseId][field];
    const fieldLabel = field === 'itemTestado' ? 'Nome do Item' : 'Descrição';
    document.getElementById('ai-correction-title').textContent = `Corrigir "${fieldLabel}" com IA`;
    document.getElementById('ai-correction-original-text').textContent = originalText;
    document.getElementById('ai-correction-prompt').value = '';
    document.getElementById('ai-correction-suggestion').value = '';
    document.getElementById('ai-correction-modal').style.display = 'flex';
}

async function runAICorrection() {
    const originalText = document.getElementById('ai-correction-original-text').textContent;
    const userPrompt = document.getElementById('ai-correction-prompt').value.trim();
    const suggestionTextarea = document.getElementById('ai-correction-suggestion');
    const generateBtn = document.getElementById('run-ai-correction-btn');
    if (!userPrompt) { alert("Por favor, digite uma instrução para a IA."); return; }
    generateBtn.disabled = true;
    generateBtn.textContent = '🧠 Pensando...';
    suggestionTextarea.value = 'Aguarde, a IA está trabalhando na sua solicitação...';
    const prompt = `Aja como um assistente de edição de texto. Sua tarefa é reescrever o "Texto Original" com base na "Instrução" fornecida. Responda APENAS com o texto reescrito, sem adicionar nenhuma explicação ou formatação extra.\n\nInstrução: "${userPrompt}"\n\nTexto Original: "${originalText}"`;
    const API_ENDPOINT = buildGeminiEndpoint();
    if (!API_ENDPOINT) { generateBtn.disabled = false; generateBtn.textContent = 'Gerar Sugestão'; return; }
    try {
        const response = await fetch(API_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }) });
        if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
        const data = await response.json();
        const generatedText = data.candidates[0].content.parts[0].text.trim();
        suggestionTextarea.value = generatedText;
    } catch (error) { suggestionTextarea.value = `Ocorreu um erro ao gerar a sugestão: ${error.message}`;
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = 'Gerar Sugestão';
    }
}

function applyAICorrection() {
    const { caseId, field } = aiCorrectionContext;
    if (!caseId || !field) return;
    const newText = document.getElementById('ai-correction-suggestion').value;
    updateTestCaseData(caseId, field, newText);
    const cardElement = document.getElementById(caseId);
    if (cardElement) {
        const inputElement = cardElement.querySelector(`[onchange*="${field}"], [data-field="${field}"]`);
        if (inputElement) inputElement.value = newText;
    }
    closeModal('ai-correction-modal');
    aiCorrectionContext = { caseId: null, field: null };
}

function setupVideoCommenter(evidence, caseId) {
    //-- CORREÇÃO: Validação robusta e uso do caseId para buscar dados
    if (!evidence) { 
        console.error("Dados da evidência de vídeo inválidos."); 
        document.getElementById('commenter-title').textContent = 'Erro: Evidência não encontrada';
        return; 
    }
    
    const caseData = testCaseData[caseId];
    const videoElement = document.getElementById('video-commenter-player');
    const canvasElement = document.getElementById('video-drawing-canvas');
    const ctx = canvasElement.getContext('2d');
    const paletteContainer = document.getElementById('color-palette-video');
    const pencilBtn = document.getElementById('pencil-tool-btn');
    const clearBtn = document.getElementById('clear-canvas-btn');
    const addPostitBtn = document.getElementById('add-postit-btn');
    const videoContainer = document.getElementById('video-main-container');

    let isDrawing = false, isPencilActive = false, currentStroke = null;
    const DRAWING_PERSISTENCE_SECONDS = 3;

    // Inicializa os arrays se não existirem no objeto de evidência
    if (!evidence.drawingActions) evidence.drawingActions = [];
    if (!evidence.comentariosPorTempo) evidence.comentariosPorTempo = [];
    if (!evidence.postIts) evidence.postIts = [];

    pencilBtn.classList.remove('active');
    canvasElement.classList.remove('active');
    videoContainer.querySelectorAll('.post-it').forEach(p => p.remove());

    document.getElementById('commenter-title').textContent = caseData ? caseData.itemTestado : (evidence.name || 'Vídeo');
    document.getElementById('commenter-author-date').textContent = `Criado em ${new Date().toLocaleDateString('pt-BR')}`;
    videoElement.src = evidence.src;

    paletteContainer.innerHTML = PENCIL_COLORS.map((color, index) => `<span class="color-box ${index === 0 ? 'active' : ''}" style="background-color: ${color};" data-color="${color}"></span>`).join('');
    
    const setDefaultContext = () => { 
        ctx.strokeStyle = paletteContainer.querySelector('.active')?.dataset.color || PENCIL_COLORS[0]; 
        ctx.lineWidth = 4; 
        ctx.lineJoin = 'round'; 
        ctx.lineCap = 'round'; 
    };
    setDefaultContext();
    
    const redrawCanvasForTime = (time) => {
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        (evidence.drawingActions || []).forEach(stroke => {
            const isVisible = time >= stroke.startTime && time <= (stroke.startTime + DRAWING_PERSISTENCE_SECONDS);
            if (isVisible) {
                ctx.strokeStyle = stroke.color;
                ctx.lineWidth = stroke.lineWidth;
                ctx.beginPath();
                if (stroke.points && stroke.points.length > 0) {
                    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
                    for (let i = 1; i < stroke.points.length; i++) ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
                    ctx.stroke();
                }
            }
        });
        setDefaultContext();
    };

    const getScaledCoordinates = (e) => {
        const rect = canvasElement.getBoundingClientRect();
        const scaleX = canvasElement.width / rect.width;
        const scaleY = canvasElement.height / rect.height;
        return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
    };

    const startDraw = (e) => {
        if (!isPencilActive) return;
        isDrawing = true;
        const { x, y } = getScaledCoordinates(e);
        currentStroke = { startTime: videoElement.currentTime, endTime: videoElement.currentTime, color: ctx.strokeStyle, lineWidth: ctx.lineWidth, points: [{ x, y }] };
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const draw = (e) => {
        if (!isDrawing || !isPencilActive || !currentStroke) return;
        const { x, y } = getScaledCoordinates(e);
        ctx.lineTo(x, y);
        ctx.stroke();
        currentStroke.points.push({ x, y });
    };

    const stopDraw = () => {
        if (!isDrawing) return;
        isDrawing = false;
        if (currentStroke && currentStroke.points.length > 1) {
            currentStroke.endTime = videoElement.currentTime;
            evidence.drawingActions.push(currentStroke);
        }
        currentStroke = null;
        redrawCanvasForTime(videoElement.currentTime);
    };

    const resizeCanvas = () => {
        const videoRect = videoElement.getBoundingClientRect();
        canvasElement.width = videoRect.width;
        canvasElement.height = videoRect.height;
        redrawCanvasForTime(videoElement.currentTime);
    };

    videoElement.onloadedmetadata = resizeCanvas;
    window.addEventListener('resize', resizeCanvas); // Lidar com redimensionamento da janela

    canvasElement.onmousedown = startDraw;
    canvasElement.onmousemove = draw;
    canvasElement.onmouseup = stopDraw;
    canvasElement.onmouseout = stopDraw;

    pencilBtn.onclick = () => { isPencilActive = !isPencilActive; pencilBtn.classList.toggle('active', isPencilActive); canvasElement.classList.toggle('active', isPencilActive); };
    clearBtn.onclick = () => { if (confirm("Tem certeza que deseja apagar TODOS os desenhos deste vídeo?")) { evidence.drawingActions = []; redrawCanvasForTime(videoElement.currentTime); } };
    paletteContainer.onclick = (e) => { if (e.target.classList.contains('color-box')) { const color = e.target.dataset.color; ctx.strokeStyle = color; paletteContainer.querySelector('.active').classList.remove('active'); e.target.classList.add('active'); } };
    
    const stepsListContainer = document.getElementById('comment-steps-list');
    renderBugReportSteps(evidence, stepsListContainer, videoElement);
    renderAllPostIts(evidence, videoContainer);
    addPostitBtn.onclick = () => addNewPostIt(evidence, videoContainer);
    document.getElementById('add-comment-btn').onclick = () => {
        const textarea = document.getElementById('new-comment-textarea');
        const commentText = textarea.value.trim();
        if (commentText) {
            getAuthorName();
            evidence.comentariosPorTempo.push({ time: videoElement.currentTime, text: commentText, author: currentAuthor });
            textarea.value = '';
            renderBugReportSteps(evidence, stepsListContainer, videoElement);
        }
    };
    videoElement.ontimeupdate = () => {
        const currentTime = videoElement.currentTime;
        redrawCanvasForTime(currentTime);
        const allSteps = stepsListContainer.querySelectorAll('.comment-step-item');
        let activeStep = null;
        allSteps.forEach(stepEl => { const stepTime = parseFloat(stepEl.dataset.time); if (currentTime >= stepTime) activeStep = stepEl; });
        allSteps.forEach(el => el.classList.remove('active-comment'));
        if (activeStep) activeStep.classList.add('active-comment');
    };
}

function handleCSVUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const text = e.target.result;
        const lines = text.trim().split(/\r?\n/);
        if (lines.length < 2) { alert("O arquivo CSV está vazio ou contém apenas o cabeçalho."); return; }
        const delimiter = lines[0].includes(';') ? ';' : ',';
        const headers = lines[0].toLowerCase().split(delimiter).map(h => h.trim().replace(/"/g, ''));
        const requiredHeaders = ['itemtestado', 'condicaoaprovacao'];
        if (!requiredHeaders.every(rh => headers.includes(rh))) { alert(`O cabeçalho do CSV deve conter pelo menos as colunas: ${requiredHeaders.join(', ')}.`); return; }
        let importedCount = 0;
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '') continue;
            const values = lines[i].split(delimiter).map(v => v.trim().replace(/^"|"$/g, ''));
            const testCase = {};
            headers.forEach((header, index) => {
                const key = { 'itemtestado': 'itemTestado', 'condicaoaprovacao': 'condicaoAprovacao', 'descricao': 'descricao', 'tipoteste': 'tipoTeste' }[header];
                if (key) testCase[key] = values[index] || '';
            });
            if (testCase.itemTestado && testCase.condicaoAprovacao) { addNewTestCase(testCase); importedCount++; }
        }
        alert(`${importedCount} casos de teste foram importados com sucesso do arquivo CSV!`);
    };
    reader.onerror = function() { alert("Ocorreu um erro ao ler o arquivo."); };
    reader.readAsText(file);
    event.target.value = '';
}

function addTag(caseId, inputElement) {
    const tagValue = inputElement.value.trim().toLowerCase();
    if (!tagValue) return;
    const caseData = testCaseData[caseId];
    if (caseData && !caseData.tags.includes(tagValue)) {
        caseData.tags.push(tagValue);
        renderTags(caseId);
        renderGlobalTagFilter();
    }
    inputElement.value = '';
}

function removeTag(caseId, tagToRemove) {
    const caseData = testCaseData[caseId];
    if (caseData) {
        caseData.tags = caseData.tags.filter(tag => tag !== tagToRemove);
        renderTags(caseId);
        renderGlobalTagFilter();
    }
}

function renderTags(caseId) {
    const container = document.getElementById(`${caseId}-tags-container`);
    const tags = testCaseData[caseId]?.tags || [];
    if (!container) return;
    container.innerHTML = tags.map(tag => `<span class="tag-pill">${tag}<button class="remove-tag-btn" onclick="removeTag('${caseId}', '${tag}')">&times;</button></span>`).join('');
}

function renderGlobalTagFilter() {
    const filterSelect = document.getElementById('tag-filter');
    if (!filterSelect) return;
    const allTags = new Set();
    Object.values(testCaseData).forEach(caseData => (caseData.tags || []).forEach(tag => allTags.add(tag)));
    const currentFilter = filterSelect.value;
    filterSelect.innerHTML = '<option value="">Todas as Tags</option>';
    Array.from(allTags).sort().forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        filterSelect.appendChild(option);
    });
    if (allTags.has(currentFilter)) filterSelect.value = currentFilter;
}

function filterByTag() {
    const selectedTag = document.getElementById('tag-filter').value;
    document.querySelectorAll('.test-case-card').forEach(card => {
        const caseData = testCaseData[card.id];
        if (caseData) card.style.display = !selectedTag || (caseData.tags && caseData.tags.includes(selectedTag)) ? '' : 'none';
    });
}

// SUBSTITUA A SUA FUNÇÃO 'openFilterModal' POR ESTA

function openFilterModal() {
    // Define as novas opções para o filtro de status
    const workflowStatusOptions = [
        'Em Andamento (DEV)',
        'Pronto para Re-teste (QA)',
        'Falha Nova (Aguardando Ticket)',
        'Aprovado e Concluído',
        'Inválido',
        'Pendente'
    ];
    
    // Popula o novo filtro e mantém os filtros existentes
    populateFilterOptions('filter-group-status', workflowStatusOptions, 'workflowStatus');
    populateFilterOptions('filter-group-test-type', testTypes.slice(1), 'tipoTeste');
    populateFilterOptions('filter-group-failure-type', failureTypes.slice(1), 'tipoFalha');
    
    // Garante que o título da seção está correto
    const statusGroupTitle = document.querySelector('#filter-group-status').previousElementSibling;
    if (statusGroupTitle) statusGroupTitle.textContent = 'Status do Fluxo';

    document.getElementById('filter-modal').style.display = 'flex';
}

function populateFilterOptions(containerId, optionsArray, filterCategory) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    optionsArray.forEach(option => {
        const value = (option === 'Pendente') ? 'Selecione um resultado' : option;
        const isChecked = activeFilters[filterCategory].includes(value) ? 'checked' : '';
        container.innerHTML += `<label><input type="checkbox" value="${value}" data-category="${filterCategory}" ${isChecked}>${option}</label>`;
    });
}

// SUBSTITUA A SUA FUNÇÃO 'applyFilters' POR ESTA

function applyFilters() {
    // Adiciona a nova categoria de filtro
    activeFilters = { workflowStatus: [], tipoTeste: [], tipoFalha: [] };
    
    document.querySelectorAll('#filter-modal input[type="checkbox"]:checked').forEach(checkbox => {
        const category = checkbox.dataset.category;
        if (activeFilters[category]) {
            activeFilters[category].push(checkbox.value);
        }
    });
    
    runMasterFilter();
    closeModal('filter-modal');
}

/// SUBSTITUA A SUA FUNÇÃO 'clearFilters' POR ESTA VERSÃO CORRIGIDA

function clearFilters() {
    // --- CORREÇÃO DEFINITIVA AQUI ---
    // Inicializa o objeto de filtros com TODAS as chaves necessárias.
    activeFilters = {
        workflowStatus: [],
        tipoTeste: [],
        tipoFalha: []
    };

    // Limpa a seleção visual dos checkboxes no modal
    document.querySelectorAll('#filter-modal input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Roda o filtro principal (que agora vai funcionar, pois activeFilters está correto)
    runMasterFilter();
    
    // Fecha o modal
    closeModal('filter-modal');
}

function runMasterFilter() {
    document.querySelectorAll('.test-case-card').forEach(card => {
        const caseData = testCaseData[card.id];
        if (!caseData) return;

        let shouldShow = true;

        // --- LÓGICA DE FILTRO ATUALIZADA ---
        // 1. Filtra pelo novo "Status do Fluxo"
        if (activeFilters.workflowStatus.length > 0) {
            const currentWorkflowStatus = getTestCaseWorkflowStatus(caseData);
            if (!activeFilters.workflowStatus.includes(currentWorkflowStatus)) {
                shouldShow = false;
            }
        }
        
        // 2. Mantém os outros filtros como estavam
        if (shouldShow && activeFilters.tipoTeste.length > 0 && !activeFilters.tipoTeste.includes(caseData.tipoTeste)) {
            shouldShow = false;
        }
        
        if (shouldShow && activeFilters.tipoFalha.length > 0 && !activeFilters.tipoFalha.includes(caseData.tipoFalha)) {
            shouldShow = false;
        }

        card.style.display = shouldShow ? '' : 'none';
    });
}

function addExecutionHistory(caseId, oldResult, newResult) {
    if (!testCaseData[caseId]) return;
    const historyEntry = { timestamp: new Date().toISOString(), oldResult: oldResult, newResult: newResult, author: userSettings.authorName || 'Anônimo' };
    testCaseData[caseId].executionHistory.push(historyEntry);
}

function addInitialHistory(caseId) {
     if (!testCaseData[caseId]) return;
    const historyEntry = { timestamp: new Date().toISOString(), oldResult: 'Criado', newResult: testCaseData[caseId].resultado, author: userSettings.authorName || 'Anônimo' };
    testCaseData[caseId].executionHistory.push(historyEntry);
}

function showHistoryModal(caseId) {
    const caseData = testCaseData[caseId];
    if (!caseData || !caseData.executionHistory) return;
    const titleEl = document.getElementById('history-modal-title');
    const contentEl = document.getElementById('history-modal-content');
    titleEl.textContent = `Caso de Teste ID #${caseData.displayId}: ${caseData.itemTestado}`;
    contentEl.innerHTML = '';
    if (caseData.executionHistory.length === 0) contentEl.innerHTML = '<p style="text-align: center;">Nenhum histórico de mudança de status encontrado.</p>';
    else {
        [...caseData.executionHistory].reverse().forEach(entry => {
            const date = new Date(entry.timestamp).toLocaleString('pt-BR');
            let textHtml, icon = '🔄';
            const oldStatusClass = entry.oldResult.toLowerCase().replace(/\s/g, '-');
            const newStatusClass = entry.newResult.toLowerCase().replace(/\s/g, '-');
            if (entry.oldResult === 'Criado') {
                icon = '✨';
                textHtml = `Caso de teste criado como <strong class="status status-${newStatusClass}">${entry.newResult}</strong>.`;
            } else textHtml = `Status alterado de <strong class="status status-${oldStatusClass}">${entry.oldResult}</strong> para <strong class="status status-${newStatusClass}">${entry.newResult}</strong>.`;
            const entryDiv = document.createElement('div');
            entryDiv.className = 'history-entry';
            entryDiv.innerHTML = `<div class="history-icon">${icon}</div><div class="history-details"><div class="history-text">${textHtml}</div><div class="history-meta">Por: <strong>${entry.author}</strong> em ${date}</div></div>`;
            contentEl.appendChild(entryDiv);
        });
    }
    document.getElementById('history-modal').style.display = 'flex';
}
// NOVO: Funções para gerenciar as evidências do ticket antes da criação
function handleTicketEvidenceUpload(event, caseId) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    for (const file of files) {
        const reader = new FileReader();
        reader.onload = ((theFile) => (e) => {
            const evidenceData = { src: e.target.result, type: theFile.type, name: theFile.name };
            if (!stagedTicketEvidences[caseId]) {
                stagedTicketEvidences[caseId] = [];
            }
            stagedTicketEvidences[caseId].push(evidenceData);
            renderStagedEvidencePreview(caseId, evidenceData);
        })(file);
        reader.readAsDataURL(file);
    }
    event.target.value = ''; // Permite selecionar o mesmo arquivo novamente
}

function renderStagedEvidencePreview(caseId, evidence) {
    const grid = document.getElementById(`${caseId}-ticket-evidence-grid`);
    if (!grid) return;
    const uploadLabel = grid.querySelector('.evidence-upload');

    const previewWrapper = document.createElement('div');
    previewWrapper.className = 'evidence-preview-wrapper';
    const sanitizedSrc = evidence.src.replace(/'/g, "&apos;").replace(/"/g, "&quot;");

    let mediaElementHTML = '';
    if (evidence.type.startsWith('image/')) {
        mediaElementHTML = `<img src="${sanitizedSrc}" class="preview-media">`;
    } else if (evidence.type.startsWith('video/')) {
        mediaElementHTML = `<video src="${sanitizedSrc}" class="preview-media"></video>`;
    } else {
        mediaElementHTML = `<div class="log-preview preview-media">📎<br>Anexo</div>`;
    }
    
    const removeBtnHTML = `<button class="remove-evidence-btn" onclick="(function(e){ e.stopPropagation(); removeStagedEvidence('${caseId}', '${sanitizedSrc}'); e.target.parentElement.remove(); })(event)">&times;</button>`;
    
    previewWrapper.innerHTML = mediaElementHTML + removeBtnHTML;
    grid.insertBefore(previewWrapper, uploadLabel);
}

function removeStagedEvidence(caseId, srcToRemove) {
    if (stagedTicketEvidences[caseId]) {
        stagedTicketEvidences[caseId] = stagedTicketEvidences[caseId].filter(e => e.src !== srcToRemove);
    }
}

function clearStagedEvidencePreviews(caseId) {
    const grid = document.getElementById(`${caseId}-ticket-evidence-grid`);
    if(grid) {
        grid.querySelectorAll('.evidence-preview-wrapper').forEach(el => el.remove());
    }
}

function handleResolutionEvidenceUpload(event, ticketId) {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    if (!ticketData.hasOwnProperty(ticketId)) {
        ticketData = Object.assign({}, ticketData, { [ticketId]: { ...Object.values(ticketData).find(t => t.id === ticketId), resolutionEvidences: ticketData.hasOwnProperty(ticketId) && ticketData.resolutionEvidences ? ticketData.resolutionEvidences : [] } });
    } else if (!ticketData.resolutionEvidences) {
        ticketData.resolutionEvidences = [];
    }
    const ticket = ticketData.hasOwnProperty(ticketId) ? ticketData : Object.values(ticketData).find(t => t.id === ticketId);

    for (const file of files) {
        const reader = new FileReader();
        reader.onload = ((theFile) => (e) => {
            const evidenceData = { src: e.target.result, type: theFile.type, name: theFile.name };
            if (!ticket.resolutionEvidences) {
                ticket.resolutionEvidences = [];
            }
            ticket.resolutionEvidences.push(evidenceData);
            renderResolutionEvidencePreview(ticketId, evidenceData);
        })(file);
        reader.readAsDataURL(file);
    }
    event.target.value = ''; // Permite selecionar o mesmo arquivo novamente
}

function renderResolutionEvidencePreview(ticketId, evidence) {
    const grid = document.getElementById('ticket-resolution-evidence-grid');
    if (!grid) return;
    const uploadLabel = grid.querySelector('.evidence-upload');
    const previewWrapper = document.createElement('div');
    previewWrapper.className = 'evidence-preview-wrapper';
    const sanitizedSrc = evidence.src.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
    let mediaElementHTML = '';
    if (evidence.type.startsWith('image/')) {
        mediaElementHTML = `<img src="${sanitizedSrc}" class="preview-media" onclick="openMediaModal('${sanitizedSrc}', '${evidence.type}', '${evidence.name}')">`;
    } else if (evidence.type.startsWith('video/')) {
        mediaElementHTML = `<video src="${sanitizedSrc}" class="preview-media" onclick="openMediaModal('${sanitizedSrc}', '${evidence.type}', '${evidence.name}')"></video>`;
    } else {
        mediaElementHTML = `<div class="log-preview preview-media" onclick="openMediaModal('${sanitizedSrc}', '${evidence.type}', '${evidence.name}')">📎<br>Anexo</div>`;
    }
    const removeBtnHTML = `<button class="remove-evidence-btn" onclick="(function(e){ e.stopPropagation(); removeResolutionEvidence('${ticketId}', '${sanitizedSrc}'); e.target.parentElement.remove(); })(event)">&times;</button>`;
    previewWrapper.innerHTML = mediaElementHTML + removeBtnHTML;
    grid.insertBefore(previewWrapper, uploadLabel);
}

function removeResolutionEvidence(ticketId, srcToRemove) {
    const ticket = ticketData.hasOwnProperty(ticketId) ? ticketData : Object.values(ticketData).find(t => t.id === ticketId);
    if (ticket && ticket.resolutionEvidences) {
        ticket.resolutionEvidences = ticket.resolutionEvidences.filter(e => e.src !== srcToRemove);
    }
}

function handlePastedResolutionEvidence(event, ticketId) {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (const item of items) {
        if (item.kind === 'file' && item.type.startsWith('image/')) {
            event.preventDefault();
            const file = item.getAsFile();
            const reader = new FileReader();
            reader.onload = (e) => {
                const evidenceData = { src: e.target.result, type: file.type, name: `pasted-resolution-${new Date().toISOString().replace(/[:.]/g, '-')}.png` };
                const ticket = ticketData.hasOwnProperty(ticketId) ? ticketData : Object.values(ticketData).find(t => t.id === ticketId);
                if (!ticket.resolutionEvidences) {
                    ticket.resolutionEvidences = [];
                }
                ticket.resolutionEvidences.push(evidenceData);
                renderResolutionEvidencePreview(ticketId, evidenceData);
            };
            reader.readAsDataURL(file);
            break;
        }
    }
}

// ADICIONE ESTA NOVA FUNÇÃO AO SEU SCRIPT.JS

function getTestCaseWorkflowStatus(testCase) {
    if (!testCase) return 'Inválido';

    // 1. Verifica status baseado nos tickets
    if (testCase.tickets && testCase.tickets.length > 0) {
        const totalTickets = testCase.tickets.length;
        const closedTickets = testCase.tickets.filter(id => ticketData[id]?.status === 'Fechado').length;
        
        if (closedTickets < totalTickets) {
            return 'Em Andamento (DEV)';
        } else { // Todos os tickets fechados
            if (testCase.resultado !== 'Aprovado') {
                return 'Pronto para Re-teste (QA)';
            }
            // Se chegou aqui, é porque está Aprovado e com todos os tickets fechados.
            // A lógica abaixo tratará disso.
        }
    }

    // 2. Se não tem tickets ou se todos já foram resolvidos e o caso aprovado, usa o 'resultado'
    switch (testCase.resultado) {
        case 'Aprovado':
            return 'Aprovado e Concluído';
        case 'Reprovado':
            return 'Falha Nova (Aguardando Ticket)'; // Se tem ticket, já foi tratado no if acima
        case 'Inválido':
            return 'Inválido';
        default:
            return 'Pendente'; // "Selecione um resultado" e sem tickets
    }
}

// NOVA FUNÇÃO para o modal de detalhes (estilo Trello)
function showKanbanCardDetailsModal(caseId) {
    const caseData = testCaseData[caseId];
    if (!caseData) return;

    const modalBody = document.getElementById('card-details-modal-body');
    const buildOptions = (options, selectedValue) => options.map(opt => `<option value="${opt}" ${opt === selectedValue ? 'selected' : ''}>${opt}</option>`).join('');

    modalBody.innerHTML = `
        <div class="details-modal-header">
            <input type="text" class="form-input details-modal-title" value="${caseData.itemTestado || ''}" onchange="updateTestCaseData('${caseId}', 'itemTestado', this.value)">
            <p style="margin-left: 10px; color: var(--cor-texto-claro);">no quadro ${document.querySelector('.kanban-card[data-case-id=\''+caseId+'\']').closest('.kanban-column').querySelector('.kanban-column-header').textContent}</p>
        </div>
        
        <div class="details-modal-main-grid">
            <div class="details-modal-col-main">
                <div class="details-modal-section details-modal-description">
                    <h3>Descrição</h3>
                    <textarea class="form-textarea" onchange="updateTestCaseData('${caseId}', 'descricao', this.value)">${caseData.descricao || ''}</textarea>
                </div>

                <div class="details-modal-section details-modal-evidence">
                    <h3>Evidências</h3>
                    <div id="details-modal-evidence-grid" class="evidence-grid">
                        <label class="evidence-upload"><input type="file" accept="image/*,video/*" multiple onchange="handleEvidenceUpload('${caseId}', this.files, false)"><span>➕ Adicionar</span></label>
                    </div>
                </div>

                <div class="details-modal-section details-modal-comments">
                    <h3>Comentários</h3>
                    <div id="details-modal-comments-list" class="dev-comments-list"></div>
                    <div class="new-comment-area" style="margin-top: 15px;">
                        <textarea id="details-modal-new-comment" class="form-textarea" placeholder="Escreva um comentário..."></textarea>
                        <button class="btn btn-add" style="margin-top: 10px;" onclick="addCommentFromDetailsModal('${caseId}')">Salvar Comentário</button>
                    </div>
                </div>
            </div>
            <div class="details-modal-col-sidebar">
                <div class="details-modal-section details-modal-planning">
                    <h3>Planejamento</h3>
                    <div class="form-group"><label class="form-label">Responsável</label><input type="text" class="form-input" value="${caseData.responsavel || ''}" onchange="updateTestCaseData('${caseId}', 'responsavel', this.value)"></div>
                    <div class="form-group"><label class="form-label">Data de Entrega</label><input type="date" class="form-input" value="${caseData.dataEntrega || ''}" onchange="updateTestCaseData('${caseId}', 'dataEntrega', this.value)"></div>
                    <div class="form-group"><label class="form-label">Prioridade</label><select class="form-select" onchange="updateTestCaseData('${caseId}', 'prioridadePlanejamento', this.value)">${buildOptions(planningPriorities, caseData.prioridadePlanejamento)}</select></div>
                    <div class="form-group"><label class="form-label">Peso</label><select class="form-select" onchange="updateTestCaseData('${caseId}', 'peso', this.value)">${buildOptions(planningWeights, caseData.peso)}</select></div>
                </div>

                <div class="details-modal-section details-modal-status">
                    <h3>Status</h3>
                    <div class="form-group"><label class="form-label">Resultado</label><select class="form-select" onchange="handleResultChange('${caseId}', this.value)">${buildOptions(testResults, caseData.resultado)}</select></div>
                    <div class="form-group"><label class="form-label">Tipo de Falha</label><select class="form-select" onchange="updateTestCaseData('${caseId}', 'tipoFalha', this.value)">${buildOptions(failureTypes, caseData.tipoFalha)}</select></div>
                </div>

                <div class="details-modal-section" id="details-modal-tags-section">
                     <h3>Tags</h3>
                     <div id="details-modal-tags-container"></div>
                     <input type="text" class="tag-input" placeholder="Adicionar tag..." onkeydown="if(event.key === 'Enter') addTagFromDetailsModal('${caseId}', this)">
                </div>
            </div>
        </div>
    `;

    // Renderiza os componentes dinâmicos dentro do modal
    const evidenceGrid = document.getElementById('details-modal-evidence-grid');
    (caseData.evidences || []).forEach(evidence => renderEvidencePreviewInModal(caseId, evidence, evidenceGrid));
    
    const commentsContainer = document.getElementById('details-modal-comments-list');
    renderCommentsInModal(caseId, commentsContainer);

    const tagsContainer = document.getElementById('details-modal-tags-container');
    renderTagsInModal(caseId, tagsContainer);

    document.getElementById('kanban-card-details-modal').style.display = 'flex';
}

// Funções auxiliares para renderizar conteúdo no novo modal
function renderEvidencePreviewInModal(caseId, evidence, grid) {
    // Esta função é uma cópia simplificada da renderEvidencePreview original
    const uploadLabel = grid.querySelector('.evidence-upload');
    const previewWrapper = document.createElement('div');
    previewWrapper.className = 'evidence-preview-wrapper';
    let mediaElementHTML = '';
    const sanitizedEvidenceSrc = evidence.src ? evidence.src.replace(/'/g, "&apos;").replace(/"/g, "&quot;") : '';

    if (evidence.type.startsWith('image/')) {
        mediaElementHTML = `<img src="${sanitizedEvidenceSrc}" class="preview-media" onclick="openMediaModal('${sanitizedEvidenceSrc}', '${evidence.type}', '${evidence.name}')">`;
    } else if (evidence.type.startsWith('video/')) {
        mediaElementHTML = `<video src="${sanitizedEvidenceSrc}" class="preview-media" onclick="openMediaModal('${sanitizedEvidenceSrc}', '${evidence.type}', '${evidence.name}')"></video>`;
    } else {
        mediaElementHTML = `<div class="log-preview preview-media" onclick="openMediaModal('${sanitizedEvidenceSrc}', '${evidence.type}', '${evidence.name}')">📎<br>Anexo</div>`;
    }
    previewWrapper.innerHTML = mediaElementHTML + `<button class="remove-evidence-btn" onclick="event.stopPropagation(); removeEvidenceAndRefreshModal('${caseId}', '${sanitizedEvidenceSrc}', this)">&times;</button>`;
    grid.insertBefore(previewWrapper, uploadLabel);
}

function renderCommentsInModal(caseId, container) {
    container.innerHTML = '';
    const comments = testCaseData[caseId].devComments || [];
    if (comments.length === 0) {
        container.innerHTML = '<p style="text-align:center; color: #888;">Nenhum comentário ainda.</p>';
        return;
    }
    comments.forEach((comment) => {
        const author = comment.author || 'DEV';
        const commentEntry = document.createElement('div');
        commentEntry.className = `comment-entry ${author === 'DEV' ? 'comment-author-dev' : 'comment-author-qa'}`;
        const timestamp = new Date(comment.timestamp).toLocaleString('pt-BR');
        commentEntry.innerHTML = `<div class="comment-header"><span class="comment-author">${author}</span><span class="comment-timestamp">${timestamp}</span></div><p class="comment-text">${comment.text.replace(/\n/g, '<br>')}</p>`;
        container.prepend(commentEntry); // Adiciona no topo para os mais recentes aparecerem primeiro
    });
}

function renderTagsInModal(caseId, container) {
    const tags = testCaseData[caseId]?.tags || [];
    container.innerHTML = tags.map(tag => `<span class="tag-pill">${tag}<button class="remove-tag-btn" onclick="removeTagAndRefreshModal('${caseId}', '${tag}')">&times;</button></span>`).join('');
}

// Funções de ação para o novo modal
function addCommentFromDetailsModal(caseId) {
    const textarea = document.getElementById('details-modal-new-comment');
    const text = textarea.value.trim();
    if (text) {
        getAuthorName();
        const newComment = { text, author: currentAuthor, timestamp: new Date().toISOString() };
        if (!testCaseData[caseId].devComments) testCaseData[caseId].devComments = [];
        testCaseData[caseId].devComments.push(newComment);
        textarea.value = '';
        // Re-renderiza a lista de comentários dentro do modal
        renderCommentsInModal(caseId, document.getElementById('details-modal-comments-list'));
    }
}

function addTagFromDetailsModal(caseId, input) {
    const tag = input.value.trim().toLowerCase();
    if (tag && !testCaseData[caseId].tags.includes(tag)) {
        testCaseData[caseId].tags.push(tag);
        renderTagsInModal(caseId, document.getElementById('details-modal-tags-container'));
        renderGlobalTagFilter();
    }
    input.value = '';
}

function removeTagAndRefreshModal(caseId, tag) {
    removeTag(caseId, tag);
    renderTagsInModal(caseId, document.getElementById('details-modal-tags-container'));
}

function removeEvidenceAndRefreshModal(caseId, src, button) {
    removeEvidence(caseId, src, false, null);
    button.parentElement.remove();
}
// EXCLUA AS FUNÇÕES DA RETROSPECTIVA ANTERIORES E ADICIONE ESTE BLOCO NOVO E CORRIGIDO

// =========================================================
// == BLOCO COMPLETO: RETROSPECTIVA E ANÁLISE (CORREÇÃO FINAL) ==
// Substitua todo o bloco anterior da retrospectiva por este.
// =========================================================

let retrospectiveAnimationState = {
    animationFrameId: null,
    isPlaying: false,
    events: [],
    segments: [],
    analytics: {},
    startTime: 0,
    endTime: 0,
    totalDuration: 0,
    playbackStartTime: 0,
    elapsedTimeOnPause: 0,
};

const BASE_PLAYBACK_DURATION_MS = 30000;

function showRetrospective() {
    console.log("Iniciando a Retrospectiva...");
    if (retrospectiveAnimationState.animationFrameId) cancelAnimationFrame(retrospectiveAnimationState.animationFrameId);
    
    retrospectiveAnimationState.isPlaying = false;
    document.getElementById('retrospective-play-pause-btn').textContent = '▶️';

    try {
        if (Object.keys(testCaseData).length === 0) {
            alert("Não há dados para gerar uma retrospectiva.");
            return;
        }

        retrospectiveAnimationState.analytics = calculateAnalytics();
        if(!retrospectiveAnimationState.analytics) {
             alert("Não há dados de análise suficientes para a retrospectiva.");
            return;
        }

        const events = compileAllEvents();
        if (events.length < 1) {
            alert("Não há eventos para criar uma retrospectiva.");
            return;
        }
        
        retrospectiveAnimationState.events = events;
        retrospectiveAnimationState.startTime = new Date(events[0].timestamp).getTime();
        let lastTimestamp = new Date(events[events.length - 1].timestamp).getTime();
        retrospectiveAnimationState.endTime = lastTimestamp + 1000;
        retrospectiveAnimationState.totalDuration = retrospectiveAnimationState.endTime - retrospectiveAnimationState.startTime;
        if (retrospectiveAnimationState.totalDuration <= 0) retrospectiveAnimationState.totalDuration = 1000;

        retrospectiveAnimationState.segments = processEventsIntoSegments(events);
        renderRetrospectiveTimeline(events, retrospectiveAnimationState.segments, retrospectiveAnimationState.analytics);
        setupRetrospectiveControls();
        
        document.getElementById('retrospective-modal').style.display = 'flex';
        updateTimelineView(0);

    } catch (error) {
        console.error("Erro CRÍTICO ao gerar a retrospectiva:", error);
        alert(`Ocorreu um erro inesperado ao gerar a retrospectiva: ${error.message}`);
    }
}


function renderRetrospectiveTimeline(events, segments, analyticsData) {
    const lanesContainer = document.getElementById('retrospective-timeline-lanes');
    lanesContainer.innerHTML = '';
    
    const { startTime, totalDuration } = retrospectiveAnimationState;
    const mainTestCases = Object.values(testCaseData).filter(tc => tc && !tc.isReTest);

    // CORREÇÃO: Usar os IDs corretos da análise
    const unstableCaseIds = analyticsData.topInstability.map(item => item.id);
    const longCycleCases = analyticsData.topCycleTime;

    mainTestCases.forEach(tc => {
        const lane = document.createElement('div');
        lane.className = 'timeline-lane';
        lane.innerHTML = `<div class="lane-label" title="${tc.itemTestado || ''}">ID #${tc.displayId}</div><div class="lane-track" id="track-test-case-${tc.id}"></div>`;
        lanesContainer.appendChild(lane);

        const track = document.getElementById(`track-test-case-${tc.id}`);
        if (!track) return;
        
        // Renderiza os SEGMENTOS de estado
        segments.filter(seg => seg.caseId === tc.id).forEach(segment => {
            const left = (segment.startTime - startTime) / totalDuration * 100;
            const width = (segment.endTime - segment.startTime) / totalDuration * 100;
            const statusClass = (segment.status || 'criado').toLowerCase().replace(/\s/g, '-').replace(/[()]/g, '');

            const segmentDiv = document.createElement('div');
            segmentDiv.className = `timeline-bar-segment ${segment.type} status-${statusClass}`;
            segmentDiv.style.left = `${left}%`;
            segmentDiv.style.width = `${Math.max(0.2, width)}%`; // Largura mínima para ser visível
            segmentDiv.dataset.startTime = segment.startTime;

            // Adiciona o texto dentro da barra se ela for larga o suficiente
            if (width > 5) { // Apenas adiciona texto em segmentos maiores
                 segmentDiv.innerHTML = `<span class="segment-label">${segment.status}</span>`;
            }
            
            track.appendChild(segmentDiv);
        });

        // Renderiza os MARCADORES de eventos com análise de gargalo
        events.filter(event => event.caseId === tc.id).forEach(event => {
            const offset = (new Date(event.timestamp).getTime() - startTime) / totalDuration * 100;
            const marker = document.createElement('div');
            let tooltipText = '', icon = '', isBottleneck = false, specificBottleneckClass = '';
            
            const eventCaseId = `test-case-${event.caseId}`;
            const statusClass = (event.newStatus || (event.type === 'TICKET_CREATED' ? 'aberto' : 'criado')).toLowerCase().replace(/\s/g, '-').replace(/[()]/g, '');
            
            // CORREÇÃO DA LÓGICA DE VERIFICAÇÃO DE PINS
            if (event.type === 'TEST_STATUS_CHANGE' && event.newStatus === 'Reprovado' && unstableCaseIds.includes(eventCaseId)) {
                isBottleneck = true;
                specificBottleneckClass = 'bottleneck-instability';
                icon = '🐞';
                const failureCount = events.filter(e => e.caseId === event.caseId && e.newStatus === 'Reprovado' && new Date(e.timestamp) <= new Date(event.timestamp)).length;
                tooltipText = `${failureCount}ª Falha (Instável)`;
            } else if (event.type === 'TEST_STATUS_CHANGE' && event.newStatus === 'Aprovado') {
                const cycleData = longCycleCases.find(item => item.id === eventCaseId);
                if (cycleData) {
                    isBottleneck = true;
                    specificBottleneckClass = 'bottleneck-cycletime';
                    icon = '⏳';
                    tooltipText = `Aprovado (Ciclo: ${formatDuration(cycleData.duration)})`;
                }
            } else if (event.type === 'TICKET_CREATED') {
                const ticket = ticketData[event.ticketId];
                if (ticket && (ticket.priority === 'Crítica' || ticket.priority === 'Alta')) {
                    isBottleneck = true;
                    specificBottleneckClass = 'bottleneck-criticality';
                    icon = '🔥';
                    tooltipText = `Ticket Crítico #${event.displayId} Criado`;
                }
            }
            
            if (!isBottleneck) {
                if (event.type === 'TICKET_CREATED') icon = '🎫';
                tooltipText = `${event.oldStatus || 'Início'} → ${event.newStatus || `Ticket #${event.displayId} Criado`}`;
            }

            marker.className = `event-marker status-${statusClass} ${isBottleneck ? 'bottleneck ' + specificBottleneckClass : ''}`;
            marker.style.left = `${offset}%`;
            marker.dataset.startTime = new Date(event.timestamp).getTime();
            marker.innerHTML = `${icon}<div class="event-tooltip">${tooltipText}</div>`;
            track.appendChild(marker);
        });
    });
}


// --- Funções restantes (compilação, animação, análise) ---
// Estas funções são interdependentes e devem ser substituídas em bloco.

function compileAllEvents() {
    let allEvents = [];
    Object.values(testCaseData).forEach(tc => {
        if (tc && tc.executionHistory) tc.executionHistory.forEach(h => allEvents.push({ timestamp: h.timestamp, type: 'TEST_STATUS_CHANGE', caseId: tc.id, displayId: tc.displayId, newStatus: h.newResult, oldStatus: h.oldResult, author: h.author, itemName: tc.itemTestado }));
    });
    Object.values(ticketData).forEach(ticket => {
        if (ticket && ticket.createdAt) allEvents.push({ timestamp: ticket.createdAt, type: 'TICKET_CREATED', ticketId: ticket.id, caseId: parseInt(ticket.originalCaseId.split('-')[2]), displayId: ticket.displayId, itemName: ticket.clonedData.itemTestado });
        if (ticket && ticket.statusHistory) ticket.statusHistory.slice(1).forEach(h => allEvents.push({ timestamp: h.timestamp, type: 'TICKET_STATUS_CHANGE', ticketId: ticket.id, caseId: parseInt(ticket.originalCaseId.split('-')[2]), displayId: ticket.displayId, newStatus: h.status, itemName: ticket.clonedData.itemTestado }));
    });
    allEvents.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    return allEvents;
}

function processEventsIntoSegments(events) {
    const segments = [];
    const entityGroups = {};
    events.forEach(event => {
        const key = event.ticketId ? `ticket-${event.ticketId}` : `case-${event.caseId}`;
        if (!entityGroups[key]) entityGroups[key] = [];
        entityGroups[key].push(event);
    });
    for (const key in entityGroups) {
        const groupEvents = entityGroups[key].sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));
        for (let i = 0; i < groupEvents.length; i++) {
            const currentEvent = groupEvents[i];
            const nextEvent = groupEvents[i + 1];
            segments.push({
                startTime: new Date(currentEvent.timestamp).getTime(),
                endTime: nextEvent ? new Date(nextEvent.timestamp).getTime() : retrospectiveAnimationState.endTime,
                status: currentEvent.newStatus || (currentEvent.type === 'TICKET_CREATED' ? 'Aberto' : 'Criado'),
                caseId: currentEvent.caseId,
                ticketId: currentEvent.ticketId,
                type: key.startsWith('ticket') ? 'ticket-segment' : 'test-case-segment'
            });
        }
    }
    return segments;
}

function setupRetrospectiveControls() {
    const playPauseBtn = document.getElementById('retrospective-play-pause-btn');
    const scrubber = document.getElementById('retrospective-scrubber');
    scrubber.value = 0;
    retrospectiveAnimationState.isPlaying = false;
    retrospectiveAnimationState.elapsedTimeOnPause = 0;
    playPauseBtn.textContent = '▶️';
    playPauseBtn.onclick = () => {
        retrospectiveAnimationState.isPlaying = !retrospectiveAnimationState.isPlaying;
        playPauseBtn.textContent = retrospectiveAnimationState.isPlaying ? '⏸️' : '▶️';
        if (retrospectiveAnimationState.isPlaying) {
            if (parseFloat(scrubber.value) >= parseFloat(scrubber.max)) {
                retrospectiveAnimationState.elapsedTimeOnPause = 0;
            }
            retrospectiveAnimationState.playbackStartTime = performance.now() - retrospectiveAnimationState.elapsedTimeOnPause;
            animateRetrospective();
        } else {
            retrospectiveAnimationState.elapsedTimeOnPause = performance.now() - retrospectiveAnimationState.playbackStartTime;
            cancelAnimationFrame(retrospectiveAnimationState.animationFrameId);
        }
    };
    scrubber.oninput = () => {
        if (retrospectiveAnimationState.isPlaying) playPauseBtn.click();
        const progress = parseFloat(scrubber.value) / parseFloat(scrubber.max);
        const speed = parseFloat(document.getElementById('retrospective-speed-control').value);
        const effectiveDuration = BASE_PLAYBACK_DURATION_MS / speed;
        retrospectiveAnimationState.elapsedTimeOnPause = progress * effectiveDuration;
        updateTimelineView(progress);
    };
}

let lastTimestamp = 0;
function animateRetrospective() {
    if (!retrospectiveAnimationState.isPlaying) return;
    const speed = parseFloat(document.getElementById('retrospective-speed-control').value);
    const effectiveDuration = BASE_PLAYBACK_DURATION_MS / speed;
    const elapsedTime = performance.now() - retrospectiveAnimationState.playbackStartTime;
    const progress = Math.min(elapsedTime / effectiveDuration, 1);
    updateTimelineView(progress);
    if (progress < 1) {
        retrospectiveAnimationState.animationFrameId = requestAnimationFrame(animateRetrospective);
    } else {
        retrospectiveAnimationState.isPlaying = false;
        document.getElementById('retrospective-play-pause-btn').textContent = '▶️';
        retrospectiveAnimationState.elapsedTimeOnPause = effectiveDuration;
    }
}

function updateTimelineView(progress) {
    const { events, startTime, totalDuration } = retrospectiveAnimationState;
    if (totalDuration <= 0) return;
    const currentTime = startTime + (totalDuration * progress);
    const scrubber = document.getElementById('retrospective-scrubber');
    if (scrubber) scrubber.value = progress * scrubber.max;
    const totalPlaybackSeconds = Math.floor(BASE_PLAYBACK_DURATION_MS / 1000);
    const currentPlaybackSeconds = Math.floor(totalPlaybackSeconds * progress);
    const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    document.getElementById('retrospective-timer').textContent = `${formatTime(currentPlaybackSeconds)} / ${formatTime(totalPlaybackSeconds)}`;
    let lastEventDetails = "Aguardando eventos...";
    const visibleEvents = events.filter(e => new Date(e.timestamp).getTime() <= currentTime);
    if (visibleEvents.length > 0) {
        const lastEvent = visibleEvents[visibleEvents.length - 1];
        lastEventDetails = `[${new Date(lastEvent.timestamp).toLocaleTimeString('pt-BR')}] ${lastEvent.itemName || 'Item'}: ${lastEvent.oldStatus ? `${lastEvent.oldStatus} → ${lastEvent.newStatus}` : `${lastEvent.type.replace(/_/g, ' ')}`}`;
    }
    document.getElementById('retrospective-details-panel').textContent = lastEventDetails;
    document.querySelectorAll('.timeline-bar-segment, .event-marker').forEach(el => {
        const elStartTime = parseFloat(el.dataset.startTime);
        el.classList.toggle('visible', elStartTime <= currentTime);
    });
}

function showAnalyticsPanel() {
    try {
        const analyticsData = calculateAnalytics();
        if (!analyticsData) {
            alert("Não há dados suficientes para gerar uma análise. Execute alguns testes e tente novamente.");
            return;
        }
        renderAnalyticsDashboard(analyticsData);
        document.getElementById('analytics-modal').style.display = 'flex';
    } catch (error) {
        console.error("Erro ao gerar o painel de análise:", error);
        alert("Ocorreu um erro ao preparar a análise. Verifique o console para mais detalhes.");
    }
}

function calculateAnalytics() {
    const allTestCases = Object.values(testCaseData);
    if (allTestCases.length === 0) return null;
    const instability = allTestCases.map(tc => ({
        id: `test-case-${tc.id}`,
        displayId: tc.displayId,
        name: tc.itemTestado,
        count: (tc.executionHistory || []).filter(h => h.newResult === 'Reprovado').length
    })).filter(tc => tc.count > 1).sort((a, b) => b.count - a.count); // Apenas considera instável com mais de 1 falha
    const cycleTime = allTestCases.map(tc => {
        if (tc.resultado !== 'Aprovado') return null;
        const history = tc.executionHistory || [];
        const firstFailure = history.find(h => h.newResult === 'Reprovado');
        if (!firstFailure) return null;
        const finalApproval = [...history].reverse().find(h => h.newResult === 'Aprovado');
        if (!finalApproval) return null;
        const duration = new Date(finalApproval.timestamp).getTime() - new Date(firstFailure.timestamp).getTime();
        return { id: `test-case-${tc.id}`, displayId: tc.displayId, name: tc.itemTestado, duration };
    }).filter(item => item && item.duration > 0).sort((a, b) => b.duration - a.duration);
    const ticketCriticality = { critical: 0, high: 0 };
    Object.values(ticketData).filter(t => t.status !== 'Fechado').forEach(t => {
        if (t.priority === 'Crítica') ticketCriticality.critical++;
        else if (t.priority === 'Alta') ticketCriticality.high++;
    });
    return {
        topInstability: instability.slice(0, 3),
        topCycleTime: cycleTime.slice(0, 3),
        ticketCriticality
    };
}
//... (o restante das funções de análise permanece o mesmo) ...
// =========================================================
// == BLOCO DE FUNÇÕES PARA O PAINEL DE ANÁLISE DE RISCOS ==
// =========================================================

function showAnalyticsPanel() {
    try {
        const analyticsData = calculateAnalytics();
        if (!analyticsData) {
            alert("Não há dados suficientes para gerar uma análise. Execute alguns testes e tente novamente.");
            return;
        }
        renderAnalyticsDashboard(analyticsData);
        document.getElementById('analytics-modal').style.display = 'flex';
    } catch (error) {
        console.error("Erro ao gerar o painel de análise:", error);
        alert("Ocorreu um erro ao preparar a análise. Verifique o console para mais detalhes.");
    }
}

function calculateAnalytics() {
    const allTestCases = Object.values(testCaseData);
    const allTickets = Object.values(ticketData);

    if (allTestCases.length === 0) return null;

    // Métrica 1: Instabilidade (Falhas Recorrentes)
    const instability = allTestCases.map(tc => {
        const failureCount = (tc.executionHistory || []).filter(h => h.newResult === 'Reprovado').length;
        return {
            id: tc.id,
            displayId: tc.displayId,
            name: tc.itemTestado,
            count: failureCount
        };
    }).filter(tc => tc.count > 0).sort((a, b) => b.count - a.count);

    // Métrica 2: Tempo de Ciclo de Correção
    const cycleTime = allTestCases.map(tc => {
        if (tc.resultado !== 'Aprovado') return null;

        const history = tc.executionHistory || [];
        const firstFailure = history.find(h => h.newResult === 'Reprovado');
        if (!firstFailure) return null; // Nunca falhou, não tem ciclo de correção

        const finalApproval = [...history].reverse().find(h => h.newResult === 'Aprovado');
        if (!finalApproval) return null; // Isso não deve acontecer se o status atual for Aprovado, mas é uma segurança

        const startTime = new Date(firstFailure.timestamp).getTime();
        const endTime = new Date(finalApproval.timestamp).getTime();
        const duration = endTime - startTime;

        return {
            id: tc.id,
            displayId: tc.displayId,
            name: tc.itemTestado,
            duration: duration
        };
    }).filter(Boolean).sort((a, b) => b.duration - a.duration);

    // Métrica 3: Criticidade dos Tickets Abertos
    const ticketCriticality = {
        critical: 0,
        high: 0,
    };
    allTickets.filter(t => t.status !== 'Fechado').forEach(t => {
        if (t.priority === 'Crítica') {
            ticketCriticality.critical++;
        } else if (t.priority === 'Alta') {
            ticketCriticality.high++;
        }
    });

    return {
        topInstability: instability.slice(0, 3),
        topCycleTime: cycleTime.slice(0, 3),
        ticketCriticality: ticketCriticality
    };
}

function renderAnalyticsDashboard(data) {
    const container = document.getElementById('analytics-dashboard');
    container.innerHTML = '';

    // Card 1: Gargalos de Qualidade (Instabilidade)
    let instabilityHtml = '<h3>🐞 Gargalos de Qualidade (Falhas Recorrentes)</h3>';
    if (data.topInstability.length > 0) {
        instabilityHtml += '<ul class="analytics-list">';
        data.topInstability.forEach(item => {
            instabilityHtml += `
                <li class="analytics-list-item">
                    <span class="item-name">ID #${item.displayId} - ${item.name}</span>
                    <span class="item-metric severity-high">${item.count} falha(s)</span>
                </li>`;
        });
        instabilityHtml += '</ul>';
    } else {
        instabilityHtml += '<p>Nenhum caso de teste com falhas recorrentes encontrado. Bom trabalho!</p>';
    }
    container.innerHTML += `<div class="analytics-card">${instabilityHtml}</div>`;

    // Card 2: Gargalos de Resolução (Ciclos Longos)
    let cycleTimeHtml = '<h3>⏳ Gargalos de Resolução (Ciclos Longos)</h3>';
    if (data.topCycleTime.length > 0) {
        cycleTimeHtml += '<ul class="analytics-list">';
        data.topCycleTime.forEach(item => {
            cycleTimeHtml += `
                <li class="analytics-list-item">
                    <span class="item-name">ID #${item.displayId} - ${item.name}</span>
                    <span class="item-metric severity-medium">${formatDuration(item.duration)}</span>
                </li>`;
        });
        cycleTimeHtml += '</ul>';
    } else {
        cycleTimeHtml += '<p>Nenhuma correção de ciclo longo identificada.</p>';
    }
    container.innerHTML += `<div class="analytics-card">${cycleTimeHtml}</div>`;

    // Card 3: Foco de Risco Atual (Criticidade)
    let criticalityHtml = '<h3>🔥 Foco de Risco Atual (Tickets Abertos)</h3>';
    if (data.ticketCriticality.critical > 0 || data.ticketCriticality.high > 0) {
        criticalityHtml += '<ul class="analytics-list">';
        if (data.ticketCriticality.critical > 0) {
            criticalityHtml += `<li class="analytics-list-item priority-summary-item priority-critical"><span class="count">${data.ticketCriticality.critical}</span> Ticket(s) de Prioridade CRÍTICA</li>`;
        }
        if (data.ticketCriticality.high > 0) {
            criticalityHtml += `<li class="analytics-list-item priority-summary-item priority-alta"><span class="count">${data.ticketCriticality.high}</span> Ticket(s) de Prioridade ALTA</li>`;
        }
        criticalityHtml += '</ul>';
    } else {
        criticalityHtml += '<p>Nenhum ticket de alta criticidade em aberto. Excelente!</p>';
    }
    container.innerHTML += `<div class="analytics-card">${criticalityHtml}</div>`;
}

function formatDuration(milliseconds) {
    if (milliseconds < 0) return "0s";
    let totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);

    let result = '';
    if (days > 0) result += `${days}d `;
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0 && days === 0) result += `${minutes}m`; // Mostra minutos apenas se for menos de um dia
    
    return result.trim() || "Menos de 1m";
}

// --- ADICIONE ESTE NOVO BLOCO DE FUNÇÕES PARA GERENCIAR MACRO-PROJETOS ---

function showMacroProjectManagementModal() {
    document.getElementById('new-macro-project-name').value = '';
    renderMacroProjectsList('macro-project-list', 'manage');
    document.getElementById('macro-project-modal').style.display = 'flex';
}

function addMacroProject() {
    const nameInput = document.getElementById('new-macro-project-name');
    const macroName = nameInput.value.trim();
    if (!macroName) {
        alert("O nome do Macro-Projeto não pode ser vazio.");
        return;
    }

    const macroProjects = JSON.parse(localStorage.getItem(MACRO_PROJECTS_KEY)) || [];
    const nameExists = macroProjects.some(mp => mp.macroName.toLowerCase() === macroName.toLowerCase());
    if (nameExists) {
        alert("Já existe um Macro-Projeto com este nome.");
        return;
    }

    const newMacroProject = {
        macroId: `mp-${Date.now()}`,
        macroName: macroName,
        createdAt: new Date().toISOString(),
        runs: []
    };

    macroProjects.push(newMacroProject);
    localStorage.setItem(MACRO_PROJECTS_KEY, JSON.stringify(macroProjects));

    nameInput.value = '';
    renderMacroProjectsList('macro-project-list', 'manage');
}

function renderMacroProjectsList(containerId, mode = 'manage') {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    const macroProjects = JSON.parse(localStorage.getItem(MACRO_PROJECTS_KEY)) || [];

    if (macroProjects.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#888;">Nenhum Macro-Projeto encontrado.</p>';
        return;
    }

    macroProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    macroProjects.forEach(mp => {
        const item = document.createElement('div');
        item.className = 'macro-project-item';
        const date = new Date(mp.createdAt).toLocaleDateString('pt-BR');
        
        let actionButtons = '';
        if (mode === 'manage') {
            actionButtons = `<button class="btn btn-remove" onclick="deleteMacroProject('${mp.macroId}')">Excluir</button>`;
        } else if (mode === 'load') {
            actionButtons = `<button class="btn btn-load" onclick="showRunListForMacroProject('${mp.macroId}')">Carregar</button>`;
        }

        item.innerHTML = `
            <div class="macro-project-info">
                <strong>${mp.macroName}</strong>
                <span>Criado em: ${date} | ${mp.runs.length} execução(ões)</span>
            </div>
            <div class="macro-project-actions">
                ${actionButtons}
            </div>
        `;
        container.appendChild(item);
    });
}

function deleteMacroProject(macroId) {
    if (!confirm("Tem certeza que deseja excluir este Macro-Projeto e TODAS as suas execuções salvas? Esta ação não pode ser desfeita.")) {
        return;
    }
    let macroProjects = JSON.parse(localStorage.getItem(MACRO_PROJECTS_KEY)) || [];
    macroProjects = macroProjects.filter(mp => mp.macroId !== macroId);
    localStorage.setItem(MACRO_PROJECTS_KEY, JSON.stringify(macroProjects));
    renderMacroProjectsList('macro-project-list', 'manage');
}

function deleteRun(macroId, runId) {
     if (!confirm("Tem certeza que deseja excluir esta execução permanentemente?")) {
        return;
    }
    let macroProjects = JSON.parse(localStorage.getItem(MACRO_PROJECTS_KEY)) || [];
    const macroIndex = macroProjects.findIndex(mp => mp.macroId === macroId);
    if(macroIndex > -1) {
        macroProjects[macroIndex].runs = macroProjects[macroIndex].runs.filter(run => run.runId !== runId);
        localStorage.setItem(MACRO_PROJECTS_KEY, JSON.stringify(macroProjects));
        // Re-renderiza a lista de execuções no modal
        showRunListForMacroProject(macroId);
    }
}


// --- NOVO BLOCO: LÓGICA DE EXPORTAÇÃO AVANÇADA ---

function showExportModal() {
    const content = document.getElementById('export-modal-content');
    content.innerHTML = `
        <h3>Selecione um Macro-Projeto para exportar:</h3>
        <div id="export-macro-list" class="project-list-container"></div>
    `;

    const macroProjects = JSON.parse(localStorage.getItem(MACRO_PROJECTS_KEY)) || [];
    const listContainer = document.getElementById('export-macro-list');
    listContainer.innerHTML = '';

    if (macroProjects.length === 0) {
        listContainer.innerHTML = '<p style="text-align:center;">Nenhum Macro-Projeto encontrado.</p>';
    } else {
        macroProjects.forEach(mp => {
            const item = document.createElement('div');
            item.className = 'macro-project-item';
            // Adiciona um onclick para mostrar as opções de exportação para este macro-projeto
            item.onclick = () => showExportOptionsForMacro(mp.macroId);
            item.innerHTML = `
                <div class="macro-project-info">
                    <strong>${mp.macroName}</strong>
                    <span>${mp.runs.length} execução(ões)</span>
                </div>
            `;
            listContainer.appendChild(item);
        });
    }

    document.getElementById('export-modal').style.display = 'flex';
}

function showExportOptionsForMacro(macroId) {
    const macroProjects = JSON.parse(localStorage.getItem(MACRO_PROJECTS_KEY)) || [];
    const macroProject = macroProjects.find(mp => mp.macroId === macroId);
    if (!macroProject) {
        alert('Macro-Projeto não encontrado.');
        return;
    }

    const content = document.getElementById('export-modal-content');
    let runsListHTML = '<p>Nenhuma execução encontrada neste projeto.</p>';

    if (macroProject.runs.length > 0) {
        runsListHTML = macroProject.runs.map(run => `
            <div class="export-run-item">
                <input type="checkbox" id="export-run-${run.runId}" data-run-id="${run.runId}">
                <label for="export-run-${run.runId}">${run.runName}</label>
            </div>
        `).join('');
    }

    content.innerHTML = `
        <h3>Exportar: ${macroProject.macroName}</h3>
        <button class="btn btn-add" style="width:100%; margin-bottom: 20px;" onclick="executeMacroProjectExport('${macroId}')">
            Exportar Macro-Projeto Completo
        </button>
        <hr class="sidebar-divider">
        <h4 style="text-align: center; margin: 15px 0;">Ou selecione execuções específicas:</h4>
        <div class="export-run-list">${runsListHTML}</div>
        <div class="modal-actions">
            <button class="btn btn-history" onclick="showExportModal()">⬅️ Voltar</button>
            <button class="btn btn-import" onclick="executeSelectedRunsExport('${macroId}')">Exportar Selecionadas</button>
        </div>
    `;
}

function executeMacroProjectExport(macroId) {
    const macroProjects = JSON.parse(localStorage.getItem(MACRO_PROJECTS_KEY)) || [];
    const macroProjectToExport = macroProjects.find(mp => mp.macroId === macroId);
    if (!macroProjectToExport) {
        alert("Erro: Macro-Projeto não encontrado para exportação.");
        return;
    }

    const dataToExport = JSON.stringify([macroProjectToExport], null, 2);
    const blob = new Blob([dataToExport], { type: "application/json" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `macro-projeto_${macroProjectToExport.macroName.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    closeModal('export-modal');
}

function executeSelectedRunsExport(macroId) {
    const selectedRunIds = Array.from(document.querySelectorAll('#export-modal-content input[type="checkbox"]:checked'))
                                .map(cb => cb.dataset.runId);

    if (selectedRunIds.length === 0) {
        alert("Por favor, selecione pelo menos uma execução para exportar.");
        return;
    }

    const macroProjects = JSON.parse(localStorage.getItem(MACRO_PROJECTS_KEY)) || [];
    const originalMacroProject = macroProjects.find(mp => mp.macroId === macroId);
    if (!originalMacroProject) {
        alert("Erro: Macro-Projeto não encontrado.");
        return;
    }

    const selectedRuns = originalMacroProject.runs.filter(run => selectedRunIds.includes(run.runId));

    const exportObject = {
        ...originalMacroProject,
        runs: selectedRuns // Inclui apenas as execuções selecionadas
    };

    const dataToExport = JSON.stringify([exportObject], null, 2);
    const blob = new Blob([dataToExport], { type: "application/json" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `execucoes_selecionadas_${originalMacroProject.macroName.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    closeModal('export-modal');

};

let firebaseApp = null;
let firebaseDb = null;

(async function initializeFirebase() {
      try {
        // Imports do Firebase usando importação dinâmica para evitar erro de módulo
        const [{ initializeApp }, { getFirestore, collection, addDoc, getDocs }] = await Promise.all([
          import("https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js"),
          import("https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js")
        ]);

        // Config do seu projeto
        const firebaseConfig = {
          apiKey: "AIzaSyBt16B6FnPwft82OEkPA-dnBwIlNt1RsqU",
          authDomain: "beyond-test-4c87a.firebaseapp.com",
          projectId: "beyond-test-4c87a",
          storageBucket: "beyond-test-4c87a.firebasestorage.app",
          messagingSenderId: "467835877240",
          appId: "1:467835877240:web:b35759acb6e604275cba8d",
          measurementId: "G-MWZNHFL7JW"
        };

        // Inicializa Firebase apenas uma vez
        firebaseApp = firebaseApp || initializeApp(firebaseConfig);
        firebaseDb = firebaseDb || getFirestore(firebaseApp);
        window.db = firebaseDb;

        console.log("✅ Firebase inicializado", firebaseApp?.name || "(sem nome)");

        // 🔍 TESTE
        async function testarFirebase() {
          console.log("🔍 Testando conexão com Firebase...");

          if (!firebaseDb) {
            console.error("❌ Firebase não está inicializado antes do teste.");
            return;
          }

          try {
            const ref = await addDoc(collection(firebaseDb, "teste_conexao"), {
              funcionando: true,
              timestamp: new Date()
            });

            console.log("🔥 Documento criado! ID:", ref.id);

            const snapshot = await getDocs(collection(firebaseDb, "teste_conexao"));
            console.log(`📚 Documentos lidos: ${snapshot.size}`);

            return { id: ref.id, count: snapshot.size };
          } catch (erro) {
            console.error("❌ Firebase NÃO conectou!", erro);
            throw erro;
          }
        }

        // Disponibiliza o teste no console para reuso manual
        window.testarFirebase = testarFirebase;

        // Executa um teste inicial para validar a conexão
        await testarFirebase();
      } catch (erro) {
        console.error("❌ Erro ao inicializar Firebase ou executar teste:", erro);
      }
})();
