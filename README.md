# OpenClaw Free Agent

A CLI-first, plug-and-play AI assistant project powered by OpenClaw. This repository provides a minimal, ready-to-use setup for running AI agents with multiple LLM providers.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/openclaw-free-agent.git
cd openclaw-free-agent

# Install dependencies
npm install

# Run the onboard command to initialize OpenClaw
npx openclaw onboard

# Set your preferred model (optional)
npx openclaw models set gemini/gemini-3.1-flash-latest

# Run your custom logic (if any)
node main.js
```

## 📁 Project Structure

```
openclaw-free-agent/
├── openclaw.json      # Main configuration file
├── main.js            # Optional custom user logic
├── .gitignore         # Git ignore rules
├── README.md          # This file
└── package.json       # Node.js dependencies
```

## ⚙️ Configuration

The `openclaw.json` file is the heart of this project. It defines:

### Providers

| Provider | Base URL | API Key Env Var | Default Model |
|----------|----------|-----------------|---------------|
| **Ollama** | `http://127.0.0.1:11434/v1` | N/A (local) | `ollama/llama3.3` |
| **Gemini** | Google AI | `GEMINI_API_KEY` | - |
| **Mistral** | Mistral AI | `MISTRAL_API_KEY` | - |
| **NVIDIA** | `https://integrate.api.nvidia.com/v1` | `NVIDIA_API_KEY` | - |

### Default Agent Model

The primary model is configured as:
- `gemini/gemini-3.1-flash-latest`

### Fallback Chain

If the primary model fails, the system will automatically try:
1. `mistral/mistral-large-latest`
2. `google/gemini-pro`

## 🔑 Getting API Keys

### Gemini (Google AI)
Get your free API key at: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

### Mistral AI
Get your free API key at: [https://console.mistral.ai/api-keys/](https://console.mistral.ai/api-keys/)

### NVIDIA (OpenCode Zen)
Get your free API key at: [https://build.nvidia.com/explore/discover](https://build.nvidia.com/explore/discover)

### Setting Environment Variables

Create a `.env` file in the project root:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
MISTRAL_API_KEY=your_mistral_api_key_here
NVIDIA_API_KEY=your_nvidia_api_key_here
```

## 🛠️ CLI Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npx openclaw onboard` | Initialize OpenClaw and link your account |
| `npx openclaw models set <model>` | Set the default model for agents |
| `node main.js` | Run your custom logic entry point |

## 🚨 SECURITY

### Community Skills Audit Risks

⚠️ **Important**: When using community-contributed skills or plugins:

1. **Review Code Before Execution**: Always audit any community skills before enabling them in your environment
2. **Sandbox Sensitive Operations**: Run untrusted code in isolated environments when possible
3. **Monitor Network Activity**: Be aware of what external services skills may connect to
4. **Limit Permissions**: Grant minimum necessary permissions to each skill

### API Cost Management

💰 **Monitor Your Usage**:

1. **Set Budget Alerts**: Configure spending limits on your API provider accounts
2. **Track Token Usage**: Monitor token consumption to avoid unexpected charges
3. **Use Local Models**: Leverage Ollama for local inference to reduce API costs
4. **Implement Rate Limiting**: Add rate limiting in your workflows to prevent runaway costs
5. **Test with Small Inputs**: Always test new prompts with minimal input before scaling

## 🔮 Future Plans

### VS Code Extension Migration Path

This project is designed as a stepping stone toward a full VS Code extension experience:

1. **Phase 1 - CLI Foundation** (Current): 
   - Establish core configuration and provider setup
   - Build familiarity with OpenClaw's configuration model

2. **Phase 2 - Node.js Module Integration**:
   - Extract reusable components into npm packages
   - Create shared utilities for provider management

3. **Phase 3 - VS Code Extension**:
   - Migrate CLI functionality to VS Code extension API
   - Add UI components for model selection and configuration
   - Integrate with VS Code's terminal and editor features
   - Provide real-time agent status and output panels

4. **Phase 4 - Advanced Features**:
   - Context-aware code suggestions
   - Integrated debugging assistance
   - Workspace-aware refactoring tools
   - Multi-agent collaboration features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Support

For OpenClaw documentation and support:
- [OpenClaw Documentation](https://openclaw.dev)
- [OpenClaw GitHub](https://github.com/getopenclaw/claw)
- [Community Discord](https://discord.gg/openclaw)
