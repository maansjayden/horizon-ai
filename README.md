# Horizon AI

Horizon AI is a unified, immersive, and highly accessible career navigation ecosystem built for high schoolers. Designed for the **Youth Code x AI Hackathon**, the application helps students discover emerging AI tracks, construct customized educational roadmaps, upgrade resumes with metric-driven bullet points, and practice technical interview questions with a real-time semantic AI Coach.

A portion of all sponsor funds directly supports the **Akhil Autism Foundation**.

---

## 🚀 Key Features

* **🧠 Career Explorer Quiz**: A behavioral 5-question matcher quiz mapping student interests to high-demand tracks (Fintech, AI Filmmaking, Ethical AI, Learning Design).
* **🗺️ Interactive Roadmaps**: An interactive SVG-based canvas visualizing target phases to transition from high school to professional roles.
* **💬 AI Interview Coach (Aura)**: A live interview simulator powered by Google Gemini, giving real-time structured critiques, scores, and tracking domain-specific concept coverage.
* **📝 Resume Enhancer**: Refines raw high-school volunteer or project descriptions into high-impact, action-verb statements with quantitative metrics.
* **🎵 Procedural Audio Synth**: Fully synthesized lo-fi background ambient pad and mechanical typewriter keyboard sounds generated entirely via the native browser **Web Audio API** (zero heavy external audio file assets).

---

## 🛠️ Architecture & Math Modeling

### 1. Matcher Scoring Logic
The quiz calculates career affinity scores by summing answer weights:
$$ S(c) = \sum_{q=1}^{5} W_q(c) $$
The final affinity percentage is normalized and bounded:
$$ M(c) = \max\left(20, \min\left(100, \left\lfloor \frac{S(c)}{15} \times 100 \right\rfloor\right)\right) $$

### 2. Semantic Coach Concept Verification
The coach checks semantic proximity to required core concepts:
$$ A = \frac{|C_{\text{matched}}|}{|C_{\text{ideal}}|} $$
If the response is empty or under 15 characters, a hard penalty is enforced:
$$ R \le 15 \quad \text{if} \quad \text{length}(userAnswer) < 15 $$

---

## ⚙️ Local Setup Guide

Follow these steps to run both the frontend and backend servers locally:

### 1. Clone & Install Dependencies
```bash
cd horizon-ai
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```
*(Replace with your Google AI Studio API key).*

### 3. Run the Servers

Horizon AI uses a proxy setup to protect API credentials:
* **Backend Server (Proxy)**: Communicates with Google's Gemini API securely.
  ```bash
  npm run server
  # Runs on http://localhost:3001
  ```
* **Frontend Dev Server**: Vite-React hot-reloader.
  ```bash
  npm run dev
  # Runs on http://localhost:3000
  ```

---

## 🔗 Project Links
* **GitHub Repository**: [https://github.com/maansjayden/horizon-ai](https://github.com/maansjayden/horizon-ai)
* **Creator Portfolio**: [https://jayden.lumesystems.co.za/](https://jayden.lumesystems.co.za/)
* **Youth Code Foundation**: [https://www.youthcodefoundation.org/](https://www.youthcodefoundation.org/)
