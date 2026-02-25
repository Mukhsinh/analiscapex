# ⚡ Quick Reference - Capex Analysis

Referensi cepat untuk command dan workflow yang sering digunakan.

## 🚀 Deployment Commands

```bash
# Pre-deployment check
.\pre-deploy-check.ps1

# Deploy preview
.\deploy.ps1 preview
# atau
vercel

# Deploy production
.\deploy.ps1 production
# atau
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls
```

## 💻 Development Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Clean build
npm run clean
```

## 🔧 Vercel CLI Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Add environment variable
vercel env add VARIABLE_NAME

# Remove environment variable
vercel env rm VARIABLE_NAME

# List environment variables
vercel env ls

# Pull environment variables
vercel env pull

# View project info
vercel project ls

# View logs
vercel logs [deployment-url]

# Promote deployment to production
vercel promote [deployment-url]
```

## 🗄️ Database Commands (Supabase)

```bash
# Via Supabase Dashboard
# https://supabase.com/dashboard

# SQL Editor untuk queries
# Table Editor untuk data management
# Database → Backups untuk backup
```

## 📦 Package Management

```bash
# Check outdated packages
npm outdated

# Update specific package
npm update package-name

# Update all packages
npm update

# Security audit
npm audit

# Fix vulnerabilities
npm audit fix

# Install new package
npm install package-name

# Install dev dependency
npm install -D package-name

# Remove package
npm uninstall package-name
```

## 🔍 Debugging Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for errors
npm run build 2>&1 | more
```

## 🌐 Git Commands

```bash
# Check status
git status

# Add files
git add .

# Commit
git commit -m "message"

# Push
git push origin main

# Pull latest
git pull origin main

# Create branch
git checkout -b feature/name

# Switch branch
git checkout main

# Merge branch
git merge feature/name

# View history
git log --oneline

# Revert commit
git revert HEAD
```

## 📊 Testing Commands

```bash
# Test build locally
npm run build
npm run preview

# Check bundle size
npm run build
# Check dist/ folder size

# Test specific feature
# Open browser and test manually
```

## 🔐 Environment Variables

### Local (.env)
```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

### Vercel (via CLI)
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

### Vercel (via Dashboard)
```
Project Settings → Environment Variables
→ Add Variable
```

## 📁 Important Files

### Configuration
- `vercel.json` - Vercel config
- `vite.config.js` - Build config
- `package.json` - Dependencies
- `.env` - Environment variables (local)
- `.gitignore` - Git exclusions

### Source Code
- `src/App.jsx` - Main app
- `src/main.jsx` - Entry point
- `src/lib/database.js` - Database functions
- `src/lib/supabase.js` - Supabase client
- `src/utils/calculations.js` - Calculations

### Documentation
- `START_HERE.md` - Start here!
- `DEPLOYMENT_READY.md` - Deployment status
- `DEPLOY_QUICK_START.md` - Quick deploy
- `README.md` - Main readme
- `DOCS_INDEX.md` - All docs

## 🎯 Common Workflows

### Deploy New Version
```bash
# 1. Make changes
# 2. Test locally
npm run dev

# 3. Build
npm run build

# 4. Pre-check
.\pre-deploy-check.ps1

# 5. Deploy preview
.\deploy.ps1 preview

# 6. Test preview

# 7. Deploy production
.\deploy.ps1 production
```

### Fix Bug
```bash
# 1. Create hotfix branch
git checkout -b hotfix/bug-name

# 2. Fix bug

# 3. Test
npm run dev

# 4. Commit
git add .
git commit -m "fix: description"

# 5. Merge to main
git checkout main
git merge hotfix/bug-name

# 6. Deploy
.\deploy.ps1 production
```

### Update Dependencies
```bash
# 1. Check outdated
npm outdated

# 2. Update
npm update

# 3. Test
npm run build
npm run preview

# 4. Commit
git add package.json package-lock.json
git commit -m "chore: update dependencies"

# 5. Deploy
.\deploy.ps1 production
```

### Rollback Deployment
```bash
# Via Vercel Dashboard:
# 1. Go to Deployments
# 2. Find previous stable deployment
# 3. Click "Promote to Production"

# Via CLI:
vercel promote [previous-deployment-url]
```

## 🆘 Troubleshooting Quick Fixes

### Build Fails
```bash
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### Environment Variables Not Working
```bash
# Check .env file exists
# Check variable names have VITE_ prefix
# Restart dev server
# In Vercel: redeploy after adding env vars
```

### Deployment Fails
```bash
# Check Vercel credentials
vercel whoami

# Re-link project
vercel link

# Try manual deploy
vercel --prod
```

### Database Connection Issues
```bash
# Check .env variables
# Verify Supabase project is active
# Check RLS policies
# Review Supabase logs
```

## 📞 Quick Links

### Documentation
- [START_HERE.md](./START_HERE.md) - Start here
- [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md) - Deployment
- [DOCS_INDEX.md](./DOCS_INDEX.md) - All docs

### External Resources
- Vercel: https://vercel.com/docs
- Supabase: https://supabase.com/docs
- Vite: https://vitejs.dev
- React: https://react.dev

### Dashboards
- Vercel: https://vercel.com/dashboard
- Supabase: https://supabase.com/dashboard
- GitHub: https://github.com

## 💡 Tips

1. **Always test locally first** - `npm run build && npm run preview`
2. **Use preview deployments** - Test before production
3. **Keep backups** - Database and code
4. **Monitor logs** - Check for errors regularly
5. **Update regularly** - Dependencies and security patches
6. **Document changes** - Clear commit messages
7. **Use branches** - Feature branches for development
8. **Test thoroughly** - All features before deploy
9. **Have rollback plan** - Know how to revert
10. **Communicate** - Keep team informed

## 🎯 Keyboard Shortcuts (VS Code)

```
Ctrl+` - Toggle terminal
Ctrl+P - Quick file open
Ctrl+Shift+P - Command palette
Ctrl+B - Toggle sidebar
Ctrl+/ - Toggle comment
Ctrl+S - Save
Ctrl+Shift+F - Find in files
F5 - Start debugging
```

---

**Quick Reference Version:** 1.0.0
**Last Updated:** 25 Feb 2026

**Keep this handy for daily development! 📌**
