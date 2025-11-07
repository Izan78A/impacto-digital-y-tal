# 🚀 Impacto Digital - Quick Reference Card

## One-Line Commands

```bash
# Deploy to GitHub
npm start -- deploy --provider github

# Deploy to Render with notification
npm start -- deploy --provider render --notify

# Inject commands into file
npm start -- agent --task "inject npm install" --file ./app.js

# Make phone call
npm start -- call --message "Your message"

# Duplicate agent
npm start -- duplicate-agent --name MyAgent

# Initialize new project
npm start -- init
```

## Setup (First Time Only)

```bash
npm install
cp .env.example .env
# Edit .env with your credentials
```

## Minimum Required Config (.env)

```bash
# For GitHub only
GITHUB_TOKEN=your_token
GITHUB_USERNAME=your_username
```

## All Providers

| Provider | Command | Required Env Vars |
|----------|---------|-------------------|
| GitHub | `--provider github` | `GITHUB_TOKEN`, `GITHUB_USERNAME` |
| Render | `--provider render` | `RENDER_API_KEY` |
| Supabase | `--provider supabase` | `SUPABASE_URL`, `SUPABASE_KEY` |
| Docker | `--provider docker` | `DOCKER_USERNAME`, `DOCKER_PASSWORD` |

## Agent Tasks

| Task | Effect |
|------|--------|
| "inject npm install" | Adds npm install command |
| "inject git push" | Adds git push command |
| "inject docker build" | Adds docker build command |
| "create new component" | Creates new file |
| "modify exports" | Modifies existing file |

## Phone Notifications

```bash
# Setup Twilio in .env
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=...
NOTIFICATION_PHONE_NUMBER=...

# Then use --notify flag
npm start -- deploy --provider github --notify
```

## File Locations

- **Main CLI**: `src/cli.js`
- **Deployers**: `src/deployers/*.js`
- **Agent**: `src/agent/system.js`
- **Config**: `.env` (create from `.env.example`)
- **Examples**: `examples/simple-node-app/`

## Get Help

```bash
npm start -- --help
npm start -- deploy --help
npm start -- agent --help
```

## Documentation

- 📖 [README.md](README.md) - Main docs
- 🚀 [GETTING_STARTED.md](GETTING_STARTED.md) - Quick start
- 📚 [USAGE.md](USAGE.md) - Advanced usage
- 🔧 [API.md](API.md) - API reference
- 📋 [SUMMARY.md](SUMMARY.md) - Project summary

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "GitHub token invalid" | Check `GITHUB_TOKEN` in `.env` |
| "Twilio not configured" | Add Twilio vars or don't use `--notify` |
| "Docker not found" | Install Docker |
| "npm start fails" | Run `npm install` first |

## Security Checklist

- ✅ Never commit `.env` file
- ✅ Use `.env.example` as template
- ✅ Keep tokens secure
- ✅ Use environment variables
- ✅ Check `.gitignore` includes `.env`

## Verify Installation

```bash
./verify.sh
# Should show: ✅ TODOS LOS CHECKS PASARON
```

---

**Quick Start:** `npm install && cp .env.example .env && npm start -- init`
