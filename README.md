# Screen Tester Pro

A comprehensive web-based screen testing application built with React, TypeScript, and TailwindCSS. Test your display for dead pixels, uniformity, color accuracy, response time, and more.

![Screen Tester Pro](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 Features

### 8 Comprehensive Display Tests

1. **Dead Pixel Test** - Cycle through solid colors to detect stuck or dead pixels
2. **Uniformity Test** - Check for backlight bleeding and screen uniformity
3. **Color Gradient Test** - Detect color banding with adjustable gradient steps
4. **Response Time Test** - UFO-style moving object test for ghosting detection
5. **Contrast Test** - Checkerboard patterns to evaluate contrast ratios
6. **Brightness Test** - Window patterns at various brightness levels
7. **Text Clarity Test** - Font rendering test with adjustable parameters
8. **Viewing Angle Test** - Evaluate color shift at different viewing angles

### Key Features

- ✨ **Modern UI** - Dark theme optimized for display testing
- 🎮 **Keyboard Shortcuts** - Full keyboard control (1-8 for tests, F/F11 for fullscreen, Space to pause)
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎯 **Draggable Controls** - Move test option panels anywhere on screen
- 🔄 **Real-time Adjustments** - Modify test parameters on the fly
- 💾 **No Installation Required** - Runs directly in your browser

## 🛠️ Tech Stack

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **TailwindCSS 4** - Utility-first CSS framework
- **Canvas API** - Hardware-accelerated rendering

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/linkmodo/screen_tester_pro.git

# Navigate to project directory
cd screen_tester_pro

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🚀 Usage

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `1-8` | Switch between tests |
| `F` or `F11` | Toggle fullscreen |
| `Space` | Pause/Resume test |
| `R` | Reset current test |
| `←/→` | Navigate options |
| `+/-` | Adjust speed (where applicable) |
| `?` | Show help modal |
| `Esc` | Close modals |

## 🎨 Test Details

### Dead Pixel Test
Cycles through 8 solid colors (Red, Green, Blue, White, Black, Cyan, Magenta, Yellow) to help identify stuck or dead pixels. Supports auto-cycle mode with adjustable intervals.

### Uniformity Test
Displays uniform colors at various brightness levels with optional grid overlay to check for backlight bleeding and uniformity issues.

### Color Gradient Test
Renders smooth or stepped gradients in multiple directions to detect color banding. Adjustable from 8 to 256 color steps.

### Response Time Test
Animated moving shapes with motion trails to evaluate pixel response time and detect ghosting or motion blur.

### Contrast Test
Checkerboard patterns with adjustable grid sizes to test contrast ratios and edge sharpness.

### Brightness Test
Window patterns at different brightness levels to evaluate peak brightness and uniformity.

### Text Clarity Test
Sample text with adjustable font sizes, families, letter spacing, and line height to test subpixel rendering and text sharpness.

### Viewing Angle Test
Patterns designed to reveal color shift, contrast loss, or brightness changes when viewed from different angles.

## 🌐 Deployment

The app is configured for deployment on Netlify. Simply connect your GitHub repository to Netlify for automatic deployments.

### Manual Deployment

```bash
npm run build
# Upload the dist folder to your hosting provider
```

## 📝 Project Structure

```
screen-tester-pro/
├── src/
│   ├── components/
│   │   ├── Layout/          # Header, Sidebar, Footer
│   │   ├── Tests/           # 8 test components
│   │   └── UI/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript type definitions
│   ├── styles/              # Global styles
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── index.html               # HTML template
└── package.json             # Dependencies and scripts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Li Fan**

- GitHub: [@linkmodo](https://github.com/linkmodo)
- Repository: [screen_tester_pro](https://github.com/linkmodo/screen_tester_pro)

## 🙏 Acknowledgments

- Inspired by professional display calibration tools
- Built with modern web technologies for universal accessibility
- Designed for both casual users and display professionals

## 📸 Screenshots

*Coming soon - Screenshots will be added after deployment*

---

**Built with ❤️ by Li Fan, 2026**
