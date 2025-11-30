# Computer Networks Laboratory - Virtual Learning Platform

A modern, full-stack web application for Computer Networks education featuring interactive labs, AI-powered chat assistance, online C compiler, video tutorials, and comprehensive learning materials.

## 🚀 Features

### 🎓 **Interactive Virtual Lab**
- **10 Complete CN Lab Weeks** with detailed programs and explanations
- **Online C Code Compiler** using Piston API for real-time code execution
- **AI Chat Assistant** powered by Google Gemini 2.0 Flash
- **Week-wise Navigation** with program browsing
- **Code Editor** with syntax highlighting and line numbers
- **Copy Code** functionality with visual feedback

### 🤖 **AI-Powered Learning**
- **Context-Aware Chat** - AI tutor understands the current week's topic
- **Instant Answers** to Computer Networks questions
- **Auto-Scroll Chat** for better user experience
- **Smart Formatting** with markdown support in responses

### 💻 **Online Compiler**
- **Real C Code Execution** with Piston API
- **Syntax Error Detection** and reporting
- **Output Display** with formatted results
- **Code Persistence** while navigating programs
- **Clear Code** functionality

### 📚 **Comprehensive Content**
- **Data Link Layer Framing Methods** (Character/Bit Stuffing)
- **CRC Implementation** for error detection
- **Sliding Window Protocol** (Go-Back-N)
- **Dijkstra's Algorithm** for routing
- **Distance Vector Routing** protocols
- **Encryption/Decryption** techniques
- **Congestion Control** (Leaky Bucket)
- **Packet Analysis** with Wireshark
- **Video Tutorials** for each week
- **Viva Questions** (10 per week) with answers

### 🎨 **Modern React UI**
- **Dark/Light Theme** with persistent storage
- **Fully Responsive** design for all devices
- **Smooth Animations** and transitions
- **Professional Navigation** with active link highlighting
- **Clean Card-Based Layout**
- **Gradient Accents** and modern styling

### 🔐 **User Authentication**
- **JWT-based Authentication** with MongoDB
- **Secure Login/Register** system
- **Protected Routes** for authenticated users
- **User Session Management**

## 📖 Topics Covered

### Week 1: Data Link Layer Framing Methods
- Character Counting Method
- Character Stuffing Method
- Bit Stuffing Method

### Week 3: CRC Code Implementation
- Cyclic Redundancy Check algorithms
- Error detection and correction

### Week 4: Sliding Window Protocol (Go-Back-N)
- Flow control mechanisms
- Automatic Repeat Request (ARQ)

### Week 5: Dijkstra's Shortest Path Algorithm
- Graph algorithms in networking
- Route optimization

### Week 6: Broadcast Tree for a Subnet
- Spanning tree algorithms
- Network broadcasting concepts

### Week 7: Distance Vector Routing Algorithm
- Dynamic routing protocols
- Bellman-Ford algorithm implementation

### Week 8: Data Encryption and Decryption
- Network security fundamentals
- Cryptographic algorithms

### Week 9: Congestion Control (Leaky Bucket)
- Traffic shaping algorithms
- Network performance optimization

### Week 10: Packet Capture with Wireshark
- Network protocol analyzer
- Packet capture and analysis
- Real-time traffic monitoring

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router v6** - Client-side routing
- **CSS3** - Custom styling with CSS variables
- **Local Storage** - Theme and session persistence

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing

### APIs & Services
- **Google Gemini 2.0 Flash** - AI chat assistant
- **Piston API** - Online code execution
- **YouTube Embed API** - Video integration

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** account (MongoDB Atlas free tier)
- **Google Gemini API Key** (free from Google AI Studio)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DheerajSai24/CN-lab.git
   cd CN-lab
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend-react
   npm install
   ```

4. **Configure Environment Variables**:
   
   Create `.env` file in `backend` folder:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. **Update API Keys** (in frontend):
   - Open `frontend-react/src/pages/CNLab.jsx`
   - Update `GEMINI_API_KEY` with your Google Gemini API key

### Running the Application

1. **Start Backend Server**:
   ```bash
   cd backend
   npm start
   # Backend runs on http://localhost:5000
   ```

2. **Start Frontend Development Server**:
   ```bash
   cd frontend-react
   npm run dev
   # Frontend runs on http://localhost:3000
   ```

3. **Access the Application**:
   ```
   http://localhost:3000
   ```

## 📂 Project Structure

```
CN-lab/
├── backend/                    # Node.js/Express backend
│   ├── models/
│   │   └── User.js            # MongoDB user schema
│   ├── routes/
│   │   └── auth.js            # Authentication routes
│   ├── middleware/
│   │   └── auth.js            # JWT verification
│   ├── server.js              # Express server setup
│   └── package.json
│
├── frontend-react/            # React frontend
│   ├── public/
│   │   ├── *.png              # Week topic images
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx     # Navigation component
│   │   ├── pages/
│   │   │   ├── Home.jsx       # Landing page
│   │   │   ├── CNLab.jsx      # Main lab interface
│   │   │   ├── About.jsx      # About page
│   │   │   ├── Notes.jsx      # Notes & downloads
│   │   │   ├── Login.jsx      # Login page
│   │   │   └── Register.jsx   # Registration page
│   │   ├── data/
│   │   │   └── weeksData.js   # All weeks content
│   │   ├── App.jsx            # Main app component
│   │   ├── App.css            # Global styles
│   │   └── main.jsx           # React entry point
│   └── package.json
│
└── README.md                  # Documentation
```

## 🎯 Key Features Usage

### Virtual Lab
1. **Select a Week** from the home page cards
2. **Browse Programs** using Next/Previous buttons
3. **View Code** in the integrated editor
4. **Compile & Run** using the online compiler
5. **Watch Videos** embedded for each program
6. **Practice Viva Questions** with detailed answers

### AI Chat Assistant
1. Click on any week to activate the chat
2. Ask questions related to the current topic
3. Get instant AI-powered explanations
4. Chat auto-scrolls to latest messages

### Code Compiler
1. View or edit C code in the editor
2. Click "Run Code" to execute
3. See output in the output panel
4. Copy code with one click

## 🎨 Features Breakdown

### Authentication System
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Protected routes and session management
- User registration with validation

### Interactive Lab Environment
- 10 complete weeks with multiple programs each
- Real-time code execution via Piston API
- Syntax highlighting and line numbers
- Code copying functionality
- Output display with error handling

### AI Chat Integration
- Context-aware responses based on current week
- Markdown formatting support
- Auto-scroll to latest messages
- Rate limit handling with retry logic
- Clean, formatted AI responses

### Content Management
- Structured week-wise data organization
- Video tutorials for each topic
- Comprehensive viva questions (10 per week)
- Downloadable notes and resources
- Topic images and visual aids

### UI/UX Design
- Modern React-based interface
- Dark/Light theme toggle
- Fully responsive design
- Smooth animations and transitions
- Professional navigation system
- Card-based layouts
- Gradient accents and modern styling

## Contributing

We welcome contributions to improve the Computer Networks Laboratory! Here's how you can help:

### Ways to Contribute
- **Add new networking topics** or expand existing content
- **Improve video content** or add more educational resources
- **Enhance the user interface** and user experience
- **Fix bugs** or optimize performance
- **Add more download resources** (PDFs, study materials)
- **Improve documentation** and README content

### Getting Started with Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Code Style Guidelines
- Use semantic HTML5 elements
- Follow CSS naming conventions (BEM methodology preferred)
- Write clean, commented JavaScript code
- Ensure responsive design compatibility
- Test across different browsers

## 🔧 API Configuration

### Google Gemini API
1. Get free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Update in `frontend-react/src/pages/CNLab.jsx`:
   ```javascript
   const GEMINI_API_KEY = 'your_api_key_here';
   ```

### MongoDB Atlas
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create cluster and get connection string
3. Add to `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cnlab
   ```

## 🌐 Browser Compatibility

- ✅ **Chrome** 90+
- ✅ **Firefox** 88+
- ✅ **Safari** 14+
- ✅ **Edge** 90+
- ✅ **Mobile browsers** (iOS Safari, Chrome Mobile)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Educational content inspired by standard Computer Networks curricula
- Modern web design principles and best practices
- Open source community for inspiration and resources

## Support & Contact

For questions, issues, or suggestions:
- 📧 **Email**: Create an issue in the GitHub repository
- 🐛 **Bug Reports**: Use the GitHub Issues tab
- 💡 **Feature Requests**: Submit via GitHub Issues
- 📖 **Documentation**: Check this README for comprehensive information

## 🚧 Development Roadmap

### Completed ✅
- [x] Full-stack MERN application
- [x] JWT authentication system
- [x] AI chat assistant integration
- [x] Online C compiler
- [x] 10 complete lab weeks
- [x] Video tutorials
- [x] Viva questions system
- [x] Dark/Light theme
- [x] Responsive design

### Future Enhancements 🔮
- [ ] Code syntax highlighting
- [ ] Multiple language support (C++, Java, Python)
- [ ] Progress tracking dashboard
- [ ] Quiz system with scoring
- [ ] Certificate generation
- [ ] Admin panel for content management
- [ ] Student performance analytics
- [ ] Discussion forum
- [ ] Mobile app version

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Dheeraj Sai**
- GitHub: [@DheerajSai24](https://github.com/DheerajSai24)
- Repository: [CN-lab](https://github.com/DheerajSai24/CN-lab)

## 🙏 Acknowledgments

- Google Gemini AI for chat assistance
- Piston API for code execution
- MongoDB Atlas for database hosting
- React community for excellent documentation

---

**Made with ❤️ for Computer Networks Education**

**Happy Learning! 🚀📚🌐**
