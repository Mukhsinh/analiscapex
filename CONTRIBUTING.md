# Contributing to Capex Analysis Application

Terima kasih atas minat Anda untuk berkontribusi! 🎉

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 🤝 Code of Conduct

### Our Pledge
- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Prioritize user needs

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Unprofessional conduct

## 🚀 How to Contribute

### Reporting Bugs
1. Check if bug already reported in Issues
2. Use bug report template
3. Include:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (browser, OS)

### Suggesting Features
1. Check if feature already requested
2. Use feature request template
3. Explain:
   - Use case
   - Expected behavior
   - Why it's valuable
   - Possible implementation

### Code Contributions
1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 💻 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation
```bash
# Clone repository
git clone https://github.com/your-username/capex-analysis.git
cd capex-analysis

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# http://localhost:5173
```

### Project Structure
```
src/
├── components/     # React components
├── utils/          # Utility functions
│   ├── calculations.js
│   ├── validators.js
│   └── constants.js
├── App.jsx         # Main app component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## 📝 Coding Standards

### JavaScript/React
- Use functional components with hooks
- Follow ESLint rules
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### Example:
```javascript
// ✅ Good
const calculatePVFactor = (rate, year) => {
  return 1 / Math.pow(1 + rate / 100, year)
}

// ❌ Bad
const calc = (r, y) => {
  return 1 / Math.pow(1 + r / 100, y)
}
```

### CSS/Tailwind
- Use Tailwind utility classes
- Follow mobile-first approach
- Keep custom CSS minimal
- Use semantic class names

### File Naming
- Components: PascalCase (e.g., `LeasingForm.jsx`)
- Utils: camelCase (e.g., `calculations.js`)
- Constants: UPPER_SNAKE_CASE

## 📦 Commit Guidelines

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(leasing): add validation for monthly payment

- Add min/max validation
- Show error messages
- Update form component

Closes #123
```

```bash
fix(calculations): correct PV factor formula

The previous formula was using simple interest instead of compound.
Now using: 1 / (1 + r)^n

Fixes #456
```

## 🔄 Pull Request Process

### Before Submitting
1. ✅ Code follows style guidelines
2. ✅ All tests pass
3. ✅ No console errors/warnings
4. ✅ Documentation updated
5. ✅ Commit messages follow guidelines

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added/updated tests
- [ ] All tests passing

## Screenshots
(if applicable)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
```

### Review Process
1. Maintainer reviews code
2. Feedback provided (if needed)
3. Make requested changes
4. Re-review
5. Merge when approved

## 🧪 Testing

### Manual Testing
```bash
# Test all three alternatives
# Verify calculations match Excel
# Test export functionality
# Check responsive design
```

### Automated Testing (Future)
```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Check coverage
npm run test:coverage
```

## 📚 Documentation

### Code Comments
```javascript
/**
 * Calculate Present Value Factor
 * @param {number} rate - Discount rate (percentage)
 * @param {number} year - Year number
 * @returns {number} PV Factor
 */
const calculatePVFactor = (rate, year) => {
  return 1 / Math.pow(1 + rate / 100, year)
}
```

### README Updates
- Keep installation steps current
- Update feature list
- Add new examples
- Update screenshots

## 🎨 Design Guidelines

### UI/UX Principles
- Keep it simple and intuitive
- Consistent spacing and colors
- Clear labels and instructions
- Responsive on all devices
- Accessible (WCAG 2.1)

### Color Palette
- Primary: Blue (#3B82F6)
- Success: Green (#22C55E)
- Warning: Yellow (#EAB308)
- Danger: Red (#EF4444)
- Neutral: Gray (#6B7280)

## 🐛 Debugging Tips

### Common Issues
1. **Calculation mismatch**: Check PV Factor formula
2. **Chart not rendering**: Verify Chart.js import
3. **Export not working**: Check browser console
4. **Styling broken**: Clear Tailwind cache

### Debug Tools
- React DevTools
- Browser DevTools
- Console logging
- Breakpoints

## 📞 Getting Help

### Resources
- [Documentation](./README.md)
- [User Guide](./PANDUAN_APLIKASI.md)
- [Testing Guide](./TESTING.md)
- [Deployment Guide](./DEPLOYMENT.md)

### Contact
- GitHub Issues: For bugs and features
- Discussions: For questions and ideas
- Email: [your-email]

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing!** 🙏

Every contribution, no matter how small, makes a difference.
