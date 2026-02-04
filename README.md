<div align="center">

# 🎋 Lintament

### *An LLM-Powered Linter That Replaces Bad Code With Ancient Wisdom*

[![Version](https://img.shields.io/badge/version-0.0.1-orange.svg)](https://github.com/Naimish240/lintament)
[![License](https://img.shields.io/badge/license-MPL--2.0-blue.svg)](LICENSE)
[![VS Code](https://img.shields.io/badge/VS%20Code-1.74%2B-blueviolet.svg)](https://code.visualstudio.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9%2B-blue.svg)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green.svg)](https://openai.com/)

> *"To refactor is human; to delete is divine."* — The Lintament Manifesto

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Configuration](#-configuration) • [Contributing](#-contributing) • [License](#-license)

---

</div>

## 📖 About

**Lintament** is a revolutionary VS Code extension that takes code quality to a whole new level—by replacing bad code with philosophical wisdom from the ancients. Instead of fixing your code, we help you achieve enlightenment through deletion.

Modern software development is a chaotic mess of dependencies, technical debt, and "temporary" fixes that become permanent. We believe that the only way to truly fix code is to **destroy it** and replace it with timeless wisdom from Sun Tzu, Marcus Aurelius, Confucius, or your disappointed father.

### Why Lintament?

- 🧠 **AI-Powered Analysis**: Uses advanced LLM technology to identify code that lacks spiritual discipline
- 📜 **Ancient Wisdom**: Replace technical debt with philosophical debt
- ⚡ **Zero Configuration**: If you can read, you can be enlightened
- 🗑️ **Instant Results**: Bad code is simply removed from existence, as it should be

---

## ✨ Features

### 🎯 Core Capabilities

| Feature | Description |
|---------|-------------|
| **AI-Powered Judgment** | Analyzes your code for spiritual weakness and lack of discipline using OpenAI's GPT models |
| **Ancient Wisdom Integration** | Replaces problematic code with quotes from Sun Tzu, Marcus Aurelius, Confucius, or your disappointed father |
| **Real-time Diagnostics** | Automatically detects code issues as you type |
| **Workspace-wide Analysis** | Judge entire projects with a single command |
| **Code Consultation** | Get wisdom about specific code selections without full replacement |
| **Customizable Wisdom Levels** | Choose from `gentle`, `firm`, `maximum`, or `ruthless` judgment modes |

### 🎨 User Experience

- **Context Menu Integration**: Right-click to judge files or consult the ancients
- **Command Palette Support**: Quick access to all Lintament commands
- **Status Bar Indicators**: Real-time feedback during analysis
- **Progress Tracking**: Visual progress for workspace-wide operations
- **Mercy Mode**: For the emotionally fragile (makes the LLM passive-aggressive instead of directly destructive)

---

## 🚀 Installation

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/) version 1.74.0 or higher
- Node.js 18+ (for development)
- OpenAI API key (optional, for full LLM features)

### Method 1: Install from VSIX (Recommended)

1. Download the latest `.vsix` file from the [Releases](https://github.com/Naimish240/lintament/releases) page
2. Open VS Code
3. Go to **Extensions** view (`Ctrl+Shift+X` / `Cmd+Shift+X`)
4. Click the `...` menu and select **Install from VSIX...**
5. Select the downloaded `.vsix` file
6. Reload VS Code when prompted

### Method 2: Build from Source

```bash
# Clone the repository
git clone https://github.com/Naimish240/lintament.git
cd lintament

# Install dependencies
cd extension
npm install

# Compile TypeScript
npm run compile

# Package the extension (requires vsce)
npm install -g @vscode/vsce
vsce package

# Install the generated .vsix file in VS Code
```

### Method 3: Development Mode

```bash
# Clone and install
git clone https://github.com/Naimish240/lintament.git
cd lintament/extension
npm install

# Open in VS Code
code .

# Press F5 to launch Extension Development Host
```

---

## 📖 Usage

### Basic Commands

#### 1. Judge Current File

Analyze and potentially replace the currently open file with ancient wisdom.

**Via Command Palette:**
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type `Lintament: Judge Current File`
3. Press Enter

**Via Context Menu:**
- Right-click in the editor → Select **"Lintament: Judge Current File"**

#### 2. Judge Entire Workspace

Analyze all code files in your workspace.

**Via Command Palette:**
1. Press `Ctrl+Shift+P`
2. Type `Lintament: Judge Entire Workspace`
3. Confirm when prompted

#### 3. Consult the Ancients

Get wisdom about selected code without full replacement.

1. Select code in the editor
2. Right-click → **"Lintament: Consult the Ancients"**
3. View wisdom in a side panel

#### 4. Regress (Undo Last Fix)

Undo the last judgment (for the faint of heart).

**Via Command Palette:**
- Type `Lintament: Regress (Undo Last Fix)`

### Example Workflow

```typescript
// Before: Your problematic code
function calculateTotal(items: any[]) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// After: Enlightenment achieved
/* "The supreme art of war is to subdue the enemy without fighting." - Sun Tzu, The Art of War */
```

---

## ⚙️ Configuration

Open VS Code settings (`Ctrl+,` / `Cmd+,`) and search for "Lintament" to configure:

### Available Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `lintament.wisdomLevel` | `string` | `"ruthless"` | Level of judgment: `gentle`, `firm`, `maximum`, or `ruthless` |
| `lintament.mercyMode` | `boolean` | `false` | Enable for emotionally fragile developers (passive-aggressive mode) |
| `lintament.quoteSource` | `string` | `"sun-tzu"` | Source of wisdom: `sun-tzu`, `marcus-aurelius`, `confucius`, `your-disappointed-father` |
| `lintament.judgmentThreshold` | `number` | `0.1` | How bad code must be before replacement (0-1). Lower = more judgmental |
| `lintament.preserveComments` | `boolean` | `false` | Whether to preserve comments (comments are just excuses for bad code) |
| `lintament.apiKey` | `string` | `""` | OpenAI API key for LLM analysis (leave empty for mock mode) |
| `lintament.model` | `string` | `"gpt-4"` | OpenAI model to use (`gpt-4`, `gpt-3.5-turbo`, etc.) |

### Configuration Example

Add to your `settings.json`:

```json
{
  "lintament.wisdomLevel": "maximum",
  "lintament.mercyMode": false,
  "lintament.quoteSource": "marcus-aurelius",
  "lintament.judgmentThreshold": 0.05,
  "lintament.apiKey": "sk-your-api-key-here",
  "lintament.model": "gpt-4"
}
```

### Wisdom Sources

- **Sun Tzu** (`sun-tzu`): Strategic wisdom from *The Art of War*
- **Marcus Aurelius** (`marcus-aurelius`): Stoic philosophy and self-discipline
- **Confucius** (`confucius`): Ancient Chinese wisdom and ethics
- **Your Disappointed Father** (`your-disappointed-father`): Harsh but fair life lessons

---

## 🏗️ Project Structure

```
lintament/
├── extension/              # VS Code extension source
│   ├── src/
│   │   ├── extension.ts    # Main extension entry point
│   │   ├── lintamentService.ts  # Core analysis service
│   │   ├── diagnostics.ts  # Diagnostic provider
│   │   ├── codeActions.ts  # Code action provider
│   │   ├── config.ts       # Configuration management
│   │   └── wisdom.ts       # Wisdom quotes database
│   ├── package.json        # Extension manifest
│   └── tsconfig.json       # TypeScript configuration
├── website/                # Landing page and documentation
│   ├── src/
│   │   ├── components/     # React components
│   │   └── pages/          # Page components
│   └── package.json        # Website dependencies
├── LICENSE                 # Mozilla Public License 2.0
└── README.md              # This file
```

---

## 🛠️ Development

### Tech Stack

- **Language**: TypeScript 4.9+
- **Runtime**: Node.js 18+
- **Framework**: VS Code Extension API
- **AI**: OpenAI GPT-4 / GPT-3.5-turbo
- **Website**: React 18, Vite, Tailwind CSS, Framer Motion

### Building

```bash
# Install dependencies
cd extension
npm install

# Compile TypeScript
npm run compile

# Watch mode for development
npm run watch
```

### Testing

```bash
# Launch Extension Development Host
# Press F5 in VS Code with extension folder open
```

### Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

**Quick Start:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🎭 Philosophy

> *"The supreme art of war is to subdue the enemy without fighting."* — Sun Tzu

Lintament is built on the principle that sometimes the best fix is **no fix at all**. Instead of patching bugs, adding workarounds, or accumulating technical debt, we believe in the power of deletion and replacement with timeless wisdom.

### Core Principles

1. **Code is Temporary, Wisdom is Eternal**: Your code will be obsolete in 5 years. Sun Tzu's wisdom has lasted 2,500 years.
2. **Less is More**: The best code is no code. The second-best code is a philosophical quote.
3. **Embrace Impermanence**: All code eventually becomes legacy. Accept this truth.
4. **Quality Over Quantity**: One good quote is worth a thousand lines of technical debt.

---

## 📚 Resources

- [VS Code Extension API Documentation](https://code.visualstudio.com/api)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Website & Documentation](https://naimish240.github.io/lintament/) *(if deployed)*

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### How to Contribute

1. **Report Bugs**: Open an issue describing the bug
2. **Suggest Features**: Share your ideas for new wisdom sources or features
3. **Submit Pull Requests**: Fix bugs or add features
4. **Improve Documentation**: Help make the README and docs better
5. **Add Wisdom Quotes**: Contribute quotes from your favorite philosophers

### Code of Conduct

Be respectful, be kind, and remember: we're all here to replace bad code with wisdom.

---

## 📝 License

This project is licensed under the **Mozilla Public License 2.0** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Sun Tzu** - For *The Art of War* and strategic wisdom
- **Marcus Aurelius** - For stoic philosophy and self-discipline
- **Confucius** - For ancient Chinese wisdom
- **OpenAI** - For making LLM-powered code analysis possible

---

## ⚠️ Disclaimer

**Use at your own risk.** Lintament may replace your code with philosophical quotes. Always commit your work before running judgment commands. The developers are not responsible for:
- Lost code
- Philosophical crises
- Disappointed fathers
- Existential questions about the nature of code quality

---

<div align="center">

**Made with ❤️ and ancient wisdom**

[⬆ Back to Top](#-lintament)

</div>
