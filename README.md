# AI Voice Agent Flow Builder

An interactive, premium visual sandbox designed to demonstrate and simulate the pipeline of an AI calling receptionist. It bridges standard VoIP cloud telephony (Twilio) with low-latency LLMs (OpenAI Realtime API over WebSockets), vector knowledge databases (ChromaDB RAG), and backend database integration hooks.

---

## 🌟 Features

* **Interactive Node Canvas**: Visualizes the call execution route from inbound Twilio webhook triggers to socket bridging, semantic RAG matching, and wrapping up callbacks.
* **Live Dialogue Stream**: Plays simulated voice transcripts between a caller and the AI agent with a dynamic audio wave animation synced to whoever is speaking.
* **System Webhook Logs**: A scrolling console showing WebSocket packet exchanges (audio delta delta/tx/rx), database queries, and n8n webhook actions in real-time.
* **Presets & Controls**: Easily toggle between Restaurant Booking, Dental Scheduler, and ISP Support presets. Customize the agent's AI model parameters (temperature and delay latency).
* **Asynchronous Safety**: Audited with run-ID verification tokens to prevent overlapping callbacks if the simulation is stopped and restarted quickly.

---

## 🛠️ How to Use

1. Open `index.html` directly in any web browser.
2. Select an **Industry Preset** (e.g., *Bistro Table Booking*) from the dropdown.
3. Review the custom system prompt loaded into the config window.
4. Click **Run Call Simulator** in the control panel.
5. Watch the active nodes pulse as they execute, read the live dialogue transcripts, and inspect the real-time system logs.

---

## 💼 Business Value & Use Case

Abstract AI concepts can be difficult to explain to clients or stakeholders. This builder serves as a **sales and engineering prototype tool**:
* **Visual Proof of Concept**: Demonstrates exactly how your voice agent routing works before writing a single line of backend hook logic.
* **Parameter Testing**: Lets you conceptualize how response latency and model temperature affect conversation flow.
* **POS/CRM Integration Modeling**: Demonstrates how SQL operations (e.g., `INSERT INTO reservations`) are triggered mid-call when booking conditions are met.
