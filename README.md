# 🦦 Otter Todo Extension

A beautiful, modern browser extension for managing your daily tasks with a playful otter theme!

## ✨ Features

- **Modern UI Design**: Sleek, glass-morphism interface with smooth animations
- **Otter Theme**: Adorable otter emojis and playful design elements
- **Auto-focus**: Input field automatically focuses when popup opens
- **Keyboard Support**: Add tasks with Enter key for quick workflow
- **Task Completion**: Green checkmark buttons to close tasks as complete
- **Local Storage**: Tasks persist between browser sessions
- **Responsive Design**: Works perfectly on different screen sizes
- **Security**: Input validation and XSS protection
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🎨 Design Highlights

- **Animated Title**: Rainbow gradient cycling with otter emojis
- **Breathing Effects**: Subtle animations throughout the interface
- **Modern Gradients**: Beautiful color schemes and transitions
- **Glass Morphism**: Semi-transparent elements with backdrop blur
- **Smooth Interactions**: Hover effects and micro-animations

## 🚀 Installation

### For Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/otter-todo-extension.git
   cd otter-todo-extension
   ```

2. **Load in Chrome/Edge**:
   - Open your browser and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the project folder

3. **Start using**:
   - Click the extension icon in your browser toolbar
   - Start adding tasks!

### For Users

1. Download the extension files
2. Follow the same loading process as above
3. Enjoy your new otter-themed todo list!

## 📁 Project Structure

```
todo/
├── manifest.json      # Extension configuration
├── popup.html         # Main interface
├── popup.css          # Modern styling
├── popup.js           # Functionality
├── icon.png           # Extension icon
└── README.md          # This file
```

## 🛠️ Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: Only `storage` for saving tasks
- **Content Security Policy**: Secure defaults with CSP headers
- **Local Storage**: Tasks saved in browser's localStorage
- **Input Validation**: Sanitized inputs with length limits
- **Error Handling**: Graceful error recovery and logging

## 🎯 Usage

1. **Add Tasks**: Type in the input field and press Enter or click "Add"
2. **Complete Tasks**: Click the green checkmark ✓ to mark as complete
3. **Auto-focus**: The input field automatically focuses when you open the popup
4. **Persistence**: Your tasks are saved and will appear when you reopen the extension

## 🔧 Customization

The extension is highly customizable through CSS variables and the modular JavaScript structure. You can easily:

- Change colors in `popup.css`
- Modify animations and timing
- Add new features to `popup.js`
- Update the otter theme elements

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests
- Improve the documentation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🦦 About the Otter Theme

Otters are playful, intelligent creatures that bring joy and positivity. This extension captures that spirit with:
- Playful animations
- Friendly color schemes
- Adorable emoji decorations
- Smooth, flowing interactions

---

**Made with ❤️ by TonsOfFunn** 