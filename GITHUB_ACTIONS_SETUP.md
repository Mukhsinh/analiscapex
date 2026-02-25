# 🔄 Setup GitHub Actions (Optional)

GitHub Actions untuk automated CI/CD pipeline.

## 📋 Prerequisites

1. Repository di GitHub
2. Vercel account
3. Vercel project sudah dibuat

## 🔧 Setup

### 1. Get Vercel Credentials

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project
vercel link

# Get project info
vercel project ls
```

Atau dari Vercel Dashboard:
- Project Settings → General
- Copy Project ID dan Org ID

### 2. Get Vercel Token

1. Buka https://vercel.com/account/tokens
2. Create new token
3. Copy token

### 3. Add GitHub Secrets

Di GitHub repository:
1. Settings → Secrets and variables → Actions
2. Add secrets:
   - `VERCEL_TOKEN` - Token dari step 2
   - `VERCEL_ORG_ID` - Organization ID
   - `VERCEL_PROJECT_ID` - Project ID
   - `VITE_SUPABASE_URL` - Supabase URL
   - `VITE_SUPABASE_ANON_KEY` - Supabase anon key

## 📁 Workflow Files

### `.github/workflows/ci.yml`
- Runs on push/PR to main/develop
- Tests build on Node 18 and 20
- Uploads build artifacts

### `.github/workflows/deploy.yml`
- Deploys preview on PR
- Deploys production on push to main
- Requires Vercel secrets

## 🚀 Usage

### Automatic Deployment

**Preview Deployment:**
```bash
# Create PR
git checkout -b feature/new-feature
git push origin feature/new-feature
# Create PR on GitHub
# → Automatic preview deployment
```

**Production Deployment:**
```bash
# Merge to main
git checkout main
git merge feature/new-feature
git push origin main
# → Automatic production deployment
```

### Manual Trigger

Di GitHub:
1. Actions tab
2. Select workflow
3. Run workflow → Run

## 📊 Monitoring

### Check Workflow Status

1. GitHub → Actions tab
2. View workflow runs
3. Check logs

### Deployment Status

1. Check in Vercel Dashboard
2. View deployment logs
3. Monitor performance

## 🔧 Customization

### Add Tests

Edit `.github/workflows/ci.yml`:
```yaml
- name: Run tests
  run: npm test
```

### Add Linting

Edit `.github/workflows/ci.yml`:
```yaml
- name: Lint
  run: npm run lint
```

### Add Notifications

Add Slack/Discord notification:
```yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## 🐛 Troubleshooting

### Build Fails

1. Check GitHub Actions logs
2. Verify secrets are set correctly
3. Test build locally
4. Check Node version compatibility

### Deployment Fails

1. Verify Vercel credentials
2. Check Vercel project settings
3. Review deployment logs
4. Test manual deployment

### Secrets Not Working

1. Verify secret names match exactly
2. Check secret values (no extra spaces)
3. Recreate secrets if needed
4. Restart workflow

## 🎯 Best Practices

1. **Use branch protection** - Require PR reviews
2. **Test before merge** - CI must pass
3. **Monitor deployments** - Check logs regularly
4. **Keep secrets secure** - Never commit secrets
5. **Update workflows** - Keep actions up to date

## 🔒 Security

- Never commit secrets to repository
- Use GitHub Secrets for sensitive data
- Rotate tokens regularly
- Limit token permissions
- Review workflow permissions

## 📝 Workflow Triggers

### Current Setup

**CI Workflow:**
- Push to main/develop
- PR to main/develop

**Deploy Workflow:**
- Push to main (production)
- PR to main (preview)

### Custom Triggers

Add more triggers:
```yaml
on:
  push:
    branches: [ main, develop, staging ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * 0'  # Weekly
  workflow_dispatch:  # Manual trigger
```

## 🚫 Disable GitHub Actions

Jika tidak ingin menggunakan:

1. Delete `.github/workflows/` folder
2. Atau disable di GitHub Settings → Actions

Manual deployment tetap bisa via:
```bash
vercel --prod
```

## 📞 Support

- GitHub Actions Docs: https://docs.github.com/actions
- Vercel GitHub Integration: https://vercel.com/docs/git

---

**Note:** GitHub Actions adalah optional. Anda tetap bisa deploy manual via Vercel CLI atau Dashboard.
