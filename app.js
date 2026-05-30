// --- Dialogue Trees & Presets ---
const PRESETS = {
    restaurant: {
        filename: "bistro_menu_v4.pdf",
        prompt: `SYSTEM: You are the AI Phone receptionist for Bistro A1. 
Goal: Friendly, efficient, book a table, or answer menu/hours FAQ using the RAG search database.
Guidelines: Keep answers concise, speak naturally. When reserving, check table availability. Log booking once user provides details.`,
        dialogue: [
            { sender: 'ai', text: "Thank you for calling Bistro A1! I can help you reserve a table or answer menu questions. What can I do for you today?", node: 2, log: "WS Connect established. Sending greeting session trigger." },
            { sender: 'user', text: "Hey! I'd like to book a table for 4 people tonight at 7 PM." },
            { sender: 'ai', text: "Let me check our table database for tonight at 7:00 PM. One moment...", node: 3, query: "SELECT slots FROM reservations WHERE date=TODAY AND time='19:00'", log: "Triggering semantic query on menu_v4 RAG: Table availability criteria." },
            { sender: 'system', log: "ChromaDB: Query matched chunk (Index 14) 'Main Hall and Patio reservation parameters. Cap 6/table.' similarity=0.92" },
            { sender: 'ai', text: "Great! We have a table available inside the main hall or on our outdoor patio. Do you have a preference?", node: 2 },
            { sender: 'user', text: "The patio would be awesome, thanks." },
            { sender: 'ai', text: "Perfect. Under what name should I place the reservation?", node: 2 },
            { sender: 'user', text: "Alex Mercer." },
            { sender: 'ai', text: "Got it, Alex. Let me finalize your booking for 4 people on the patio for tonight at 7:00 PM...", node: 4, query: "INSERT INTO reservations (name, size, time, section) VALUES ('Alex Mercer', 4, '19:00', 'Patio')", log: "Action hook fired: Synced to SQLite & n8n booking workflow (ID: wf_2391a)" },
            { sender: 'system', log: "Webhook response: Booking successfully logged. SMS confirmation code sent: #BISTRO-9201" },
            { sender: 'ai', text: "All set, Alex! I've booked your patio table and sent a confirmation SMS. Is there anything else I can help you with?", node: 5 },
            { sender: 'user', text: "No, that's all. Thank you!" },
            { sender: 'ai', text: "My pleasure! We look forward to hosting you tonight. Have a wonderful day. Goodbye!", node: 5, log: "Session terminated. WebSocket closed. Connection status: IDLE" }
        ]
    },
    dental: {
        filename: "practice_procedures_2026.pdf",
        prompt: `SYSTEM: You are the AI Receptionist for BrightSmile Dental.
Goal: Patient intake, scheduling appointments, verifying insurance parameters.
Guidelines: Always verify Doctor availability, collect full name and date of birth, log to scheduler DB.`,
        dialogue: [
            { sender: 'ai', text: "Hello! Thank you for calling BrightSmile Dental. I'm your AI booking assistant. Are you looking to schedule an appointment today?", node: 2, log: "WS Connect established. Voice session loaded: SHIMMER" },
            { sender: 'user', text: "Yes, I need to schedule a cleaning next Tuesday morning if possible." },
            { sender: 'ai', text: "Let me pull up Dr. Smith's availability schedule for next Tuesday morning...", node: 3, query: "SELECT slots FROM calendar WHERE date='2026-06-03' AND doctor='Smith'", log: "Triggering semantic query on procedures_2026 RAG: Appointment guidelines." },
            { sender: 'system', log: "ChromaDB: Query matched chunk (Index 5) 'Routine cleanings duration: 45 min. Standard blocks.' similarity=0.88" },
            { sender: 'ai', text: "We have two slots open: 9:00 AM and 10:30 AM. Which one works best for you?", node: 2 },
            { sender: 'user', text: "Let's do 9:00 AM." },
            { sender: 'ai', text: "Got it. May I please have your full name and date of birth?", node: 2 },
            { sender: 'user', text: "Sarah Connor, November 10th, 1984." },
            { sender: 'ai', text: "Thank you, Sarah. Booking Tuesday, June 3rd at 9:00 AM for your cleaning appointment now...", node: 4, query: "INSERT INTO appointments (name, dob, date, time) VALUES ('Sarah Connor', '1984-11-10', '2026-06-03', '09:00')", log: "Action hook fired: Syncing to Patient Portal API and webhook pipeline" },
            { sender: 'system', log: "Webhook response: Patient profile updated. Appointment status: CONFIRMED" },
            { sender: 'ai', text: "Perfect, Sarah! You're all set. We've sent a calendar invite. We look forward to seeing you next Tuesday. Goodbye!", node: 5 },
            { sender: 'user', text: "Thanks, bye!" },
            { sender: 'ai', text: "Goodbye, take care!", node: 5, log: "Session terminated. WebSocket closed. Connection status: IDLE" }
        ]
    },
    support: {
        filename: "isp_troubleshooting_guide.pdf",
        prompt: `SYSTEM: You are the AI Tech Support receptionist for A1 Broadband.
Goal: Authenticate accounts, run line diagnostic ping commands, perform system resets, log support tickets.
Guidelines: Collect account number, diagnose packet loss/latency. Run reset script if packet loss > 10%.`,
        dialogue: [
            { sender: 'ai', text: "Thank you for calling A1 Broadband Technical Support. I can help troubleshoot connection issues today. What seems to be the problem?", node: 2, log: "WS Connect established. Voice session loaded: ECHO" },
            { sender: 'user', text: "My internet has been super slow all day, and I've already restarted my router." },
            { sender: 'ai', text: "I'm sorry to hear that. Let's run a remote diagnostic. To start, could you tell me your account number?", node: 2 },
            { sender: 'user', text: "It's ACCT-88392." },
            { sender: 'ai', text: "Got it. Scanning router diagnostics on account ACCT-88392. One moment...", node: 3, query: "SELECT details FROM diagnostics WHERE account='ACCT-88392'", log: "Triggering semantic query on support_guide RAG: Slow connection troubleshooting." },
            { sender: 'system', log: "ChromaDB: Query matched chunk (Index 22) 'IP Lease refresh commands and channel optimization protocols.' similarity=0.95" },
            { sender: 'system', log: "Diagnostics output: Packet loss = 12% | Latency = 240ms | IP Status: STALE" },
            { sender: 'ai', text: "I've run the diagnostics and notice some packet loss. I'm going to push a line optimization signal to refresh your IP lease and reset the connection. May I do that now?", node: 2 },
            { sender: 'user', text: "Yes, go ahead." },
            { sender: 'ai', text: "Sending signal to your router. Resetting IP lease node. Please wait...", node: 4, query: "UPDATE router SET channel_opt=TRUE, ip_lease='REFRESH' WHERE account='ACCT-88392'", log: "Action hook fired: Executing channel optimization script over SSH bridge" },
            { sender: 'system', log: "SSH response: Signal received by ACCT-88392 router. Channel reset: SUCCESS" },
            { sender: 'ai', text: "Signal completed! Could you try opening a webpage or checking your speed now to see if it's resolved?", node: 2 },
            { sender: 'user', text: "Yeah, it actually loaded instantly! It seems back to normal speed." },
            { sender: 'ai', text: "Wonderful! I'm closing the ticket now. Have a great day and thanks for choosing A1 Broadband!", node: 5 },
            { sender: 'user', text: "Thanks, bye." },
            { sender: 'ai', text: "Goodbye!", node: 5, log: "Session terminated. WebSocket closed. Connection status: IDLE" }
        ]
    }
};

// --- DOM Elements ---
const presetSelect = document.getElementById('agent-preset');
const voiceSelect = document.getElementById('agent-voice');
const ragFilename = document.getElementById('rag-filename');
const promptTextarea = document.getElementById('agent-prompt');
const tempInput = document.getElementById('agent-temp');
const tempVal = document.getElementById('temp-val');
const speedInput = document.getElementById('agent-speed');
const speedVal = document.getElementById('speed-val');
const btnStartSim = document.getElementById('btn-start-simulation');
const callTimer = document.getElementById('call-timer');
const callStatus = document.getElementById('call-status');
const waveform = document.getElementById('waveform');
const transcriptContainer = document.getElementById('transcript-container');
const logsContainer = document.getElementById('logs-container');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const canvas = document.getElementById('canvas');
const connectionsSvg = document.getElementById('connections-svg');

// --- Global Simulation State ---
let simActive = false;
let dialogueIndex = 0;
let callDurationSec = 0;
let timerInterval = null;
let currentPresetKey = 'restaurant';
let currentPreset = PRESETS.restaurant;
let currentRunId = 0;

// --- Initialize App ---
function init() {
    loadPreset(presetSelect.value);
    
    // Event Listeners
    presetSelect.addEventListener('change', (e) => loadPreset(e.target.value));
    
    tempInput.addEventListener('input', (e) => {
        tempVal.textContent = e.target.value;
    });
    
    speedInput.addEventListener('input', (e) => {
        speedVal.textContent = `${e.target.value}ms`;
    });
    
    btnStartSim.addEventListener('click', startCallSimulation);
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const tabId = `tab-${btn.dataset.tab}`;
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Listen to resize to redraw connection lines
    window.addEventListener('resize', drawConnectionLines);
    
    // Initial draw delay to let DOM render
    setTimeout(drawConnectionLines, 300);
}

// --- Load Preset ---
function loadPreset(key) {
    currentPresetKey = key;
    currentPreset = PRESETS[key];
    
    ragFilename.textContent = currentPreset.filename;
    promptTextarea.value = currentPreset.prompt;
    
    // Reset simulation visual states if running
    if (simActive) {
        stopCallSimulation();
    }
    
    // Recalculate node connector paths
    setTimeout(drawConnectionLines, 100);
}

// --- Draw SVG Connections ---
function drawConnectionLines() {
    connectionsSvg.innerHTML = '';
    
    const dots = [
        { from: 'webhook-out', to: 'bridge-in' },
        { from: 'bridge-out', to: 'rag-in' },
        { from: 'rag-out', to: 'action-in' },
        { from: 'action-out', to: 'callback-in' }
    ];
    
    const canvasRect = canvas.getBoundingClientRect();
    
    dots.forEach(connection => {
        const fromEl = document.querySelector(`[data-dot="${connection.from}"]`);
        const toEl = document.querySelector(`[data-dot="${connection.to}"]`);
        
        if (fromEl && toEl) {
            const fromRect = fromEl.getBoundingClientRect();
            const toRect = toEl.getBoundingClientRect();
            
            // Calculate coords relative to canvas
            const x1 = fromRect.left - canvasRect.left + (fromRect.width / 2);
            const y1 = fromRect.top - canvasRect.top + (fromRect.height / 2);
            const x2 = toRect.left - canvasRect.left + (toRect.width / 2);
            const y2 = toRect.top - canvasRect.top + (toRect.height / 2);
            
            // Draw smooth bezier curve (vertical flows)
            const controlOffset = Math.abs(y2 - y1) / 2;
            const pathData = `M ${x1} ${y1} C ${x1} ${y1 + controlOffset}, ${x2} ${y2 - controlOffset}, ${x2} ${y2}`;
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', pathData);
            path.setAttribute('class', 'connection-line');
            connectionsSvg.appendChild(path);
        }
    });
}

// --- Start Simulation ---
function startCallSimulation() {
    if (simActive) {
        stopCallSimulation();
        return;
    }
    
    simActive = true;
    currentRunId++;
    const localRunId = currentRunId;
    dialogueIndex = 0;
    callDurationSec = 0;
    
    // Update Button UI
    btnStartSim.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg> Stop Simulation`;
    btnStartSim.classList.remove('btn-primary');
    btnStartSim.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    btnStartSim.style.boxShadow = '0 4px 20px rgba(239, 68, 68, 0.25)';
    
    // Clear display
    transcriptContainer.innerHTML = '';
    logsContainer.innerHTML = '';
    
    // Clear node active states
    document.querySelectorAll('.node').forEach(node => node.classList.remove('active', 'active-log'));
    
    // Update call header
    callStatus.textContent = 'CONNECTING...';
    callStatus.parentElement.classList.add('active');
    
    // Start timers
    timerInterval = setInterval(() => {
        if (currentRunId !== localRunId) return;
        callDurationSec++;
        const minutes = Math.floor(callDurationSec / 60).toString().padStart(2, '0');
        const seconds = (callDurationSec % 60).toString().padStart(2, '0');
        callTimer.textContent = `${minutes}:${seconds}`;
    }, 1000);
    
    // First event: Webhook Trigger
    addSystemLog(`Incoming call request initiated. Webhook parameters parsed...`, 'webhook');
    const webhookNode = document.getElementById('node-webhook');
    webhookNode.classList.add('active');
    
    setTimeout(() => {
        if (currentRunId !== localRunId) return;
        callStatus.textContent = 'LIVE';
        addSystemLog(`Twilio SIP session bridged. Connecting to OpenAI Realtime socket...`, 'webhook');
        
        setTimeout(() => {
            if (currentRunId !== localRunId) return;
            addSystemLog(`WebSocket session authenticated. Audio sample rate: 24kHz`, 'websocket-tx');
            nextDialogueStep();
        }, 800);
        
    }, 1000);
}

// --- Stop Simulation ---
function stopCallSimulation() {
    simActive = false;
    currentRunId++;
    clearInterval(timerInterval);
    timerInterval = null;
    
    btnStartSim.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> Run Call Simulator`;
    btnStartSim.removeAttribute('style');
    btnStartSim.classList.add('btn-primary', 'btn-glow');
    
    callTimer.textContent = '00:00';
    callStatus.textContent = 'IDLE';
    callStatus.parentElement.classList.remove('active');
    waveform.className = 'audio-waves';
    
    document.querySelectorAll('.node').forEach(node => node.classList.remove('active', 'active-log'));
    
    if (transcriptContainer.innerHTML === '') {
        transcriptContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <p>Call terminated. Click "Run Call Simulator" to start again.</p>
            </div>
        `;
    }
}

// --- Run Next Dialogue Step ---
function nextDialogueStep() {
    if (!simActive || dialogueIndex >= currentPreset.dialogue.length) {
        stopCallSimulation();
        return;
    }
    
    const step = currentPreset.dialogue[dialogueIndex];
    const delay = parseInt(speedInput.value);
    const localRunId = currentRunId;
    
    // Update Node highlight
    document.querySelectorAll('.node').forEach(node => node.classList.remove('active-log'));
    if (step.node) {
        const nodeEl = document.querySelector(`[data-node="${step.node}"]`);
        if (nodeEl) {
            document.querySelectorAll('.node').forEach(node => node.classList.remove('active'));
            // Keep previous ones active, but make current one stand out
            for (let i = 1; i <= step.node; i++) {
                document.querySelector(`[data-node="${i}"]`).classList.add('active');
            }
            nodeEl.classList.add('active-log');
        }
    }
    
    // Process step
    if (step.sender === 'ai') {
        // AI Speaking
        waveform.className = 'audio-waves animating-ai';
        addSystemLog(`WS RX: response.audio.delta | Streaming voice out`, 'websocket-rx');
        
        // Typing delay simulation
        const bubble = createBubble('ai', '');
        transcriptContainer.appendChild(bubble);
        transcriptContainer.scrollTop = transcriptContainer.scrollHeight;
        
        typeText(bubble.querySelector('.bubble-content'), step.text, () => {
            if (currentRunId !== localRunId || !simActive) return;
            waveform.className = 'audio-waves';
            dialogueIndex++;
            
            // Queue next user response
            setTimeout(() => {
                if (currentRunId !== localRunId || !simActive) return;
                nextDialogueStep();
            }, delay + 800);
        });
        
    } else if (step.sender === 'user') {
        // User Speaking
        waveform.className = 'audio-waves animating-user';
        addSystemLog(`WS TX: input_audio_buffer.append | User speaking`, 'websocket-tx');
        
        setTimeout(() => {
            if (currentRunId !== localRunId || !simActive) return;
            waveform.className = 'audio-waves';
            const bubble = createBubble('user', step.text);
            transcriptContainer.appendChild(bubble);
            transcriptContainer.scrollTop = transcriptContainer.scrollHeight;
            
            dialogueIndex++;
            setTimeout(() => {
                if (currentRunId !== localRunId || !simActive) return;
                nextDialogueStep();
            }, delay);
        }, 1500);
        
    } else if (step.sender === 'system') {
        // System logs / alerts
        if (step.log.includes('ChromaDB')) {
            addSystemLog(step.log, 'db-query');
        } else {
            addSystemLog(step.log, 'webhook');
        }
        dialogueIndex++;
        nextDialogueStep();
    }
    
    // Log additional triggers if any
    if (step.log && step.sender !== 'system') {
        addSystemLog(step.log, step.sender === 'ai' ? 'websocket-rx' : 'websocket-tx');
    }
    if (step.query) {
        addSystemLog(`DB QUERY: ${step.query}`, 'db-query');
    }
}

// --- Create Transcript Bubble ---
function createBubble(sender, text) {
    const bubble = document.createElement('div');
    bubble.classList.add('dialog-bubble', sender);
    
    const labelText = sender === 'ai' ? 'AI Agent' : 'Caller';
    bubble.innerHTML = `
        <span class="dialog-label">${labelText}</span>
        <div class="bubble-content">${text}</div>
    `;
    return bubble;
}

// --- Typewriter Effect ---
function typeText(element, text, callback) {
    let i = 0;
    const words = text.split(' ');
    element.textContent = '';
    const localRunId = currentRunId;
    
    function type() {
        if (currentRunId !== localRunId || !simActive) return;
        if (i < words.length) {
            element.textContent += (i === 0 ? '' : ' ') + words[i];
            i++;
            transcriptContainer.scrollTop = transcriptContainer.scrollHeight;
            setTimeout(type, 80);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// --- Add Log Entry ---
function addSystemLog(text, type = 'system') {
    const now = new Date();
    const timeStr = `[${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}]`;
    
    const entry = document.createElement('div');
    entry.classList.add('log-entry', type);
    entry.innerHTML = `
        <span class="log-time">${timeStr}</span>
        <span class="log-text">${text}</span>
    `;
    
    logsContainer.appendChild(entry);
    logsContainer.scrollTop = logsContainer.scrollHeight;
}

// Start app
window.addEventListener('DOMContentLoaded', init);
