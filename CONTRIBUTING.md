# Contributing to Obscura OS SDK

First off, thank you for considering contributing to Obscura OS SDK! It's people like you that make Obscura OS such a great tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to security@obscuraos.xyz.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment
4. Create a branch for your changes
5. Make your changes
6. Submit a pull request

## How to Contribute

There are many ways to contribute:

- **Report bugs**: If you find a bug, please open an issue
- **Suggest features**: Have an idea? We'd love to hear it
- **Write documentation**: Help us improve our docs
- **Fix bugs**: Look for issues labeled "good first issue"
- **Add features**: Check our roadmap for planned features

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/sdk.git
cd sdk

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Run linting
npm run lint
```

### Project Structure

```
sdk/
├── src/
│   ├── index.ts           # Main entry point
│   ├── types/
│   │   └── index.ts       # Type definitions
│   └── modules/
│       ├── BaseModule.ts      # Base class for modules
│       ├── PrivacyScanner.ts  # Privacy analysis
│       ├── ZKProofEngine.ts   # ZK proof generation
│       ├── ChainAnalyzer.ts   # Chain analysis
│       ├── WalletShield.ts    # Wallet protection
│       └── ObfuscationLayer.ts# Obfuscation utilities
├── examples/              # Usage examples
├── docs/                  # Documentation
├── tests/                 # Test files
├── package.json
├── tsconfig.json
└── README.md
```

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Prefer interfaces over types for object shapes
- Always define return types for functions
- Use meaningful variable and function names

### Code Style

```typescript
// Good
async function analyzeAddress(address: string): Promise<AnalysisResult> {
  // Implementation
}

// Bad
async function analyze(a: string) {
  // Implementation
}
```

### Documentation

- Add JSDoc comments to all public methods
- Include @param and @returns tags
- Provide usage examples in comments

```typescript
/**
 * Analyzes an address for privacy vulnerabilities
 * 
 * @param address - The Ethereum address to analyze
 * @returns Privacy analysis result with score and recommendations
 * 
 * @example
 * ```typescript
 * const result = await scanner.analyze('0x...');
 * console.log(result.score);
 * ```
 */
async analyze(address: string): Promise<PrivacyAnalysisResult> {
  // Implementation
}
```

### Testing

- Write tests for all new features
- Maintain at least 80% code coverage
- Use descriptive test names

```typescript
describe('PrivacyScanner', () => {
  describe('analyze', () => {
    it('should return a valid privacy score for a valid address', async () => {
      // Test implementation
    });

    it('should throw ValidationError for invalid address', async () => {
      // Test implementation
    });
  });
});
```

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(privacy-scanner): add linked address detection

fix(zk-engine): resolve proof verification timeout

docs(readme): update installation instructions

test(wallet-shield): add monitoring tests
```

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make your changes**
   - Follow the coding standards
   - Write tests for new functionality
   - Update documentation if needed

3. **Commit your changes**
   ```bash
   git commit -m "feat(module): add new feature"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/my-feature
   ```

5. **Open a Pull Request**
   - Fill out the PR template
   - Link related issues
   - Request review from maintainers

6. **Code Review**
   - Address feedback promptly
   - Keep discussions constructive

7. **Merge**
   - Once approved, a maintainer will merge your PR

## Bug Reports

When reporting a bug, please include:

1. **Summary**: A clear, descriptive title
2. **Environment**: OS, Node version, SDK version
3. **Steps to Reproduce**: Minimal code to reproduce
4. **Expected Behavior**: What should happen
5. **Actual Behavior**: What actually happens
6. **Additional Context**: Logs, screenshots, etc.

### Bug Report Template

```markdown
## Bug Description
A clear description of the bug.

## Environment
- OS: macOS 14.0
- Node: 20.10.0
- SDK Version: 1.0.0

## Steps to Reproduce
1. Initialize SDK with config
2. Call `privacyScanner.analyze()`
3. See error

## Expected Behavior
Should return privacy analysis result.

## Actual Behavior
Throws NetworkError.

## Code Sample
\`\`\`typescript
const obscura = new ObscuraSDK({ ... });
await obscura.privacyScanner.analyze('0x...');
\`\`\`

## Error Message
\`\`\`
NetworkError: Request timeout
\`\`\`
```

## Feature Requests

We welcome feature requests! Please include:

1. **Problem Statement**: What problem does this solve?
2. **Proposed Solution**: Your suggested approach
3. **Alternatives Considered**: Other options you've thought of
4. **Additional Context**: Mockups, references, etc.

---

## Questions?

Feel free to reach out:

- **Telegram**: https://t.me/obscura_os
- **Twitter**: https://twitter.com/obscuraos
- **Email**: help@obscuraos.xyz

Thank you for contributing to Obscura OS! 🛡️
