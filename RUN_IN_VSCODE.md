# 🚀 How to Run Infinity Travels in Visual Studio Code

This guide explains how to open, set up, and run both the **Web Application (React + Vite)** and the **Python Frontend Suite** in **VS Code**.

---

## 📁 1. Open the Project in VS Code

1. Open **Visual Studio Code**.
2. Click **File** > **Open Folder...** (or press `Ctrl+K Ctrl+O` on Windows / `Cmd+O` on Mac).
3. Select this project root folder.
4. Open the integrated terminal in VS Code:
   - Menu: **Terminal** > **New Terminal**
   - Or shortcut: `` Ctrl+` `` (Windows/Linux) or `` Cmd+` `` (Mac).

---

## 🌐 2. Run the Web Application (React + Vite + Tailwind CSS)

### Prerequisites:
- **Node.js** (v18 or higher recommended): [Download Node.js](https://nodejs.org/)

### Commands:

```bash
# Step 1: Install all project dependencies
npm install

# Step 2: Start the local development server
npm run dev
```

### View in Browser:
- Open your browser at: **`http://localhost:3000`**
- Any edits made to files in `src/` will hot-reload automatically!

---

## 🐍 3. Run the Python Frontends

The project includes complete Python frontend implementations located in the `python_frontend/` folder.

### Prerequisites:
- **Python 3.9+**: [Download Python](https://www.python.org/)

### Setup Virtual Environment:

In the VS Code terminal:

```bash
# 1. Create a virtual environment
python -m venv venv

# 2. Activate the virtual environment:
# On Windows (Command Prompt / PowerShell):
.\venv\Scripts\activate
# On macOS / Linux:
source venv/bin/activate

# 3. Install Python dependencies
pip install -r python_frontend/requirements.txt
```

---

### Option A: Run Streamlit Web Frontend (Recommended)

```bash
streamlit run python_frontend/app_streamlit.py
```
> Opens your default browser at **`http://localhost:8501`** with the full interactive travel portal, sidebar booking engine, dynamic cards, and ticket downloader.

---

### Option B: Run Flask Full-Stack Web App

```bash
python python_frontend/app_flask.py
```
> Runs at **`http://127.0.0.1:5000`** with server-rendered package cards and booking confirmation endpoints.

---

### Option C: Run NiceGUI Pure Python Frontend

```bash
python python_frontend/app_nicegui.py
```
> Runs at **`http://localhost:8080`** with pure Python reactive UI components.

---

### Option D: Run CustomTkinter Desktop GUI App

```bash
python python_frontend/app_desktop_gui.py
```
> Launches a native dark/gold desktop window with interactive sliders, package selectors, and reservation dialogs.

---

### Option E: Run Python Core Booking Engine (CLI Test)

```bash
python python_frontend/travel_engine.py
```
> Runs package query filters, quotation math, and creates test bookings in the terminal.

---

## ⚡ 4. Using VS Code 1-Click Launch & Debugger

We have included pre-configured `.vscode/launch.json` and `.vscode/tasks.json` files:

1. Click on the **Run & Debug** icon on the left sidebar (or press `Ctrl+Shift+D` / `Cmd+Shift+D`).
2. In the dropdown at the top, select one of the ready-to-run configurations:
   - **🌐 Run Web App (Chrome / Edge)**
   - **🐍 Run Streamlit Python Frontend**
   - **🐍 Run Flask Python App**
   - **🐍 Run Desktop GUI (CustomTkinter)**
   - **🐍 Run Python CLI Engine**
3. Press **F5** or the green **Play** button to start!

---

## 🛠️ Summary of Scripts

| Framework | Command | Port / Target |
| :--- | :--- | :--- |
| **React + Vite** | `npm run dev` | `http://localhost:3000` |
| **Streamlit** | `streamlit run python_frontend/app_streamlit.py` | `http://localhost:8501` |
| **Flask** | `python python_frontend/app_flask.py` | `http://localhost:5000` |
| **NiceGUI** | `python python_frontend/app_nicegui.py` | `http://localhost:8080` |
| **Desktop GUI** | `python python_frontend/app_desktop_gui.py` | Native Desktop Window |
| **Python CLI Engine** | `python python_frontend/travel_engine.py` | Integrated Terminal |
