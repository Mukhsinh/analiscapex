# 🔄 Panduan Update Aplikasi

Panduan untuk melakukan update aplikasi yang sudah di-deploy di Vercel.

## 📋 Workflow Update

### 1. Development

```bash
# Buat branch baru untuk fitur/fix
git checkout -b feature/nama-fitur

# Lakukan perubahan
# Edit files...

# Test lokal
npm run dev

# Test build
npm run build
npm run preview
```

### 2. Testing

```bash
# Pre-deployment check
.\pre-deploy-check.ps1

# Pastikan semua test passed
```

### 3. Commit & Push

```bash
# Commit changes
git add .
git commit -m "feat: deskripsi perubahan"

# Push ke branch
git push origin feature/nama-fitur
```

### 4. Deploy Preview

**Opsi A: Automatic (jika sudah setup Git integration)**
- Push ke branch akan otomatis create preview deployment
- Check preview URL di Vercel Dashboard

**Opsi B: Manual**
```bash
# Deploy preview
vercel
# atau
.\deploy.ps1 preview
```

### 5. Test Preview

- Test semua fitur di preview URL
- Verify tidak ada breaking changes
- Check browser console untuk errors
- Test di berbagai device/browser

### 6. Merge & Deploy Production

```bash
# Merge ke main branch
git checkout main
git merge feature/nama-fitur
git push origin main

# Deploy production
vercel --prod
# atau
.\deploy.ps1 production
```

## 🔧 Jenis Update

### Update Dependencies

```bash
# Check outdated packages
npm outdated

# Update specific package
npm update package-name

# Update all packages (careful!)
npm update

# Security audit
npm audit
npm audit fix
```

**Setelah update dependencies:**
1. Test lokal
2. Test build
3. Deploy preview
4. Test preview
5. Deploy production

### Update Environment Variables

**Via Vercel CLI:**
```bash
# Add new variable
vercel env add VITE_NEW_VARIABLE

# Remove variable
vercel env rm VITE_OLD_VARIABLE

# List all variables
vercel env ls
```

**Via Vercel Dashboard:**
1. Project Settings → Environment Variables
2. Add/Edit/Remove variables
3. Redeploy untuk apply changes

### Update Database Schema

1. **Backup database terlebih dahulu!**
```sql
-- Di Supabase SQL Editor
-- Export data penting
```

2. **Buat migration**
```sql
-- Create migration file
-- Apply changes
```

3. **Test di development**
```bash
# Test dengan database development
npm run dev
```

4. **Deploy**
```bash
# Deploy dengan schema baru
vercel --prod
```

### Hotfix (Urgent Fix)

```bash
# Buat hotfix branch dari main
git checkout main
git checkout -b hotfix/nama-fix

# Fix issue
# Edit files...

# Test cepat
npm run build

# Commit
git add .
git commit -m "fix: deskripsi fix"

# Deploy langsung ke production
git checkout main
git merge hotfix/nama-fix
git push origin main
vercel --prod
```

## 🔄 Rollback

### Rollback via Vercel Dashboard

1. Buka Vercel Dashboard
2. Project → Deployments
3. Pilih deployment sebelumnya yang stable
4. Click "Promote to Production"

### Rollback via Git

```bash
# Revert commit terakhir
git revert HEAD
git push origin main

# Atau reset ke commit sebelumnya (hati-hati!)
git reset --hard <commit-hash>
git push origin main --force

# Redeploy
vercel --prod
```

## 📊 Monitoring After Update

### Check Logs

```bash
# Via CLI
vercel logs [deployment-url]

# Via Dashboard
Project → Deployments → View Logs
```

### Check Performance

1. Run Lighthouse audit
2. Check loading time
3. Monitor error rate
4. Check user feedback

### Verify Functionality

- [ ] Login works
- [ ] All forms work
- [ ] Calculations accurate
- [ ] Export functions work
- [ ] Database operations work
- [ ] No console errors

## 🚨 Troubleshooting Updates

### Build Fails After Update

```bash
# Clear everything
rm -rf node_modules package-lock.json dist

# Reinstall
npm install

# Try build
npm run build
```

### Breaking Changes

1. Check changelog of updated packages
2. Review migration guides
3. Update code accordingly
4. Test thoroughly

### Performance Degradation

1. Check bundle size: `npm run build`
2. Analyze with Lighthouse
3. Check for unnecessary dependencies
4. Optimize imports

### Database Issues

1. Check migration logs
2. Verify RLS policies
3. Check indexes
4. Review query performance

## 📝 Update Checklist

### Before Update
- [ ] Backup database
- [ ] Document current state
- [ ] Review changes
- [ ] Plan rollback strategy

### During Update
- [ ] Test locally
- [ ] Run pre-deployment check
- [ ] Deploy to preview
- [ ] Test preview thoroughly
- [ ] Monitor logs

### After Update
- [ ] Verify production
- [ ] Check performance
- [ ] Monitor errors
- [ ] Update documentation
- [ ] Notify team/users

## 🔐 Security Updates

### Critical Security Update

```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Fix with breaking changes (careful!)
npm audit fix --force

# Manual fix
npm update vulnerable-package
```

### Update Process
1. Review security advisory
2. Test fix in development
3. Deploy preview
4. Test thoroughly
5. Deploy production ASAP
6. Monitor closely

## 📅 Regular Maintenance Schedule

### Weekly
- [ ] Check error logs
- [ ] Monitor performance
- [ ] Review user feedback

### Monthly
- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance review
- [ ] Database optimization

### Quarterly
- [ ] Major version updates
- [ ] Code refactoring
- [ ] Documentation update
- [ ] Feature review

## 🎯 Best Practices

1. **Always test locally first**
2. **Use preview deployments**
3. **Keep backups**
4. **Document changes**
5. **Monitor after deployment**
6. **Have rollback plan**
7. **Update dependencies regularly**
8. **Follow semantic versioning**
9. **Write clear commit messages**
10. **Communicate with team**

## 📞 Emergency Contacts

- **Vercel Support:** https://vercel.com/support
- **Supabase Support:** https://supabase.com/support
- **Team Lead:** [contact]
- **DevOps:** [contact]

---

**Last Updated:** 25 Feb 2026
**Version:** 1.0.0
