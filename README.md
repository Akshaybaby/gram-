# 🙏 ChristConnect - Christian Social Community Platform

**ChristConnect** is a comprehensive Christian social media platform designed to bring believers together in faith, fellowship, and spiritual growth. Built with modern web technologies, it provides a safe, moderated environment for Christians to connect, share their faith journey, read the Bible together, and build meaningful relationships.

## ✨ Features

### 🔐 **Authentication & User Management**
- **Multiple Login Options**: Email/Password, Google OAuth, Apple ID
- **Secure Registration**: Email verification and password security
- **Profile Management**: Bio, denomination, location, and spiritual interests
- **Follower/Following System**: Connect with fellow believers
- **Privacy Controls**: Public/private posts and profile settings

### 📱 **Social Media Core**
- **Timeline Feed**: Instagram-like social media experience
- **Rich Media Posts**: Photos, videos, reels (no time limit)
- **Bible Verse Integration**: Share scripture with beautiful formatting
- **Engagement Features**: Like, comment, share, and bookmark posts
- **Hashtag System**: Discover content by topic (#PrayerRequest, #Testimony, etc.)
- **User Tagging**: Mention and connect with other believers

### 📖 **Integrated Bible Reader**
- **Multiple Translations**: Catholic-approved versions (NABRE, RSV-CE, Douay-Rheims)
- **Offline Reading**: Download chapters for offline study
- **Bookmarking System**: Save favorite verses and passages
- **Verse Sharing**: Share scripture directly to feed or social media
- **Reading Plans**: Daily Bible reading schedules and devotionals
- **Cross-References**: Navigate related passages easily

### 🤝 **Community Features**
- **Discussion Forums**: Prayer Requests, Apologetics, Youth Ministry, Testimonies
- **Community Groups**: Join or create groups by interest or denomination
- **Group Chat**: Real-time messaging within communities
- **Moderation Tools**: Admin and moderator roles for safe discussions

### 🙏 **Prayer & Spiritual Growth**
- **Prayer Groups**: Create and join live prayer sessions
- **Prayer Requests**: Share and pray for community needs
- **Live Prayer Rooms**: Voice and video calling for group prayer
- **Rosary Mode**: Guided prayer with rotating leaders
- **Scripture Reading**: Shared screen Bible study sessions
- **Prayer Reminders**: Notifications for prayer times and groups

### ⛪ **Church & Events**
- **Mass Coordination**: Plan church visits with other believers
- **Event Planning**: Retreats, holy site visits, and community gatherings
- **RSVP System**: "I'm attending" and "Need a ride?" features
- **Church Finder**: Discover nearby churches and parishes
- **Group Calendar**: Shared scheduling with push reminders
- **Community Meetups**: Connect with local Christian groups

### 💬 **Communication**
- **Direct Messaging**: Private conversations with other users
- **Real-time Chat**: Instant messaging with typing indicators
- **Push Notifications**: Stay updated on posts, comments, and messages
- **Group Messaging**: Communicate within prayer groups and communities

### 🔍 **Discovery & Exploration**
- **Smart Search**: Find users, posts, Bible verses, and forum topics
- **Trending Content**: Discover popular Christian content and discussions
- **Explore Page**: Curated content based on interests and denomination
- **User Suggestions**: Connect with like-minded believers

### 🛡️ **Moderation & Safety**
- **Content Filtering**: AI-powered content moderation
- **Reporting System**: Flag inappropriate content or behavior
- **Admin Dashboard**: Comprehensive moderation tools
- **Community Guidelines**: Christian values-based rules and enforcement
- **Safe Environment**: Family-friendly, faith-focused community

## 🚀 Technology Stack

### **Frontend (Client)**
- **Framework**: Next.js 14 with React 18
- **Styling**: Tailwind CSS with custom Christian-themed design system
- **Authentication**: NextAuth.js with multiple providers
- **State Management**: React Query for server state
- **UI Components**: Headless UI with custom spiritual design
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Heroicons with custom spiritual symbols
- **Media Upload**: React Dropzone with image optimization

### **Backend (Server)**
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with bcrypt encryption
- **Real-time**: Socket.IO for live features
- **File Storage**: Cloudinary for media management
- **Email**: Nodemailer for notifications
- **Security**: Helmet.js, CORS, rate limiting
- **Validation**: Express Validator for input sanitization

### **Infrastructure**
- **Database**: PostgreSQL (local/cloud)
- **Media Storage**: Cloudinary CDN
- **Deployment**: Docker-ready for easy deployment
- **Development**: Hot reload, TypeScript support
- **Testing**: Jest and Cypress (planned)

## 🛠️ Installation & Setup

### **Prerequisites**
- Node.js 18+ and npm/yarn
- PostgreSQL database
- Cloudinary account (for media uploads)
- Google OAuth credentials (optional)

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/christconnect.git
cd christconnect
```

### **2. Install Dependencies**
```bash
# Install root dependencies and all sub-projects
npm run install:all

# Or install manually:
npm install
cd client && npm install
cd ../server && npm install
```

### **3. Environment Setup**

**Server Environment** (`server/.env`):
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/christconnect?schema=public"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="your-jwt-secret"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Service
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Media Storage
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Server Configuration
PORT=3001
NODE_ENV=development
```

**Client Environment** (`client/.env.local`):
```env
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### **4. Database Setup**
```bash
cd server

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Optional: View database in Prisma Studio
npx prisma studio
```

### **5. Start Development Servers**
```bash
# Start both client and server concurrently
npm run dev

# Or start individually:
npm run dev:client  # Frontend on http://localhost:3000
npm run dev:server  # Backend on http://localhost:3001
```

### **6. Access the Application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **API Health Check**: http://localhost:3001/api/health
- **Database Studio**: http://localhost:5555 (if running)

## 📁 Project Structure

```
christconnect/
├── client/                 # Next.js Frontend Application
│   ├── app/               # Next.js 13+ App Router
│   │   ├── globals.css    # Global styles and Tailwind
│   │   ├── layout.tsx     # Root layout component
│   │   ├── page.tsx       # Home page
│   │   └── providers.tsx  # App providers (Auth, Theme, etc.)
│   ├── components/        # React components
│   │   ├── LandingPage.tsx    # Marketing landing page
│   │   ├── Dashboard.tsx      # Main app dashboard
│   │   ├── Navigation.tsx     # Top navigation bar
│   │   ├── Sidebar.tsx        # Left sidebar navigation
│   │   ├── Feed.tsx           # Social media feed
│   │   ├── CreatePost.tsx     # Post creation modal
│   │   ├── BibleReader.tsx    # Integrated Bible reader
│   │   └── [Other Components] # Additional UI components
│   ├── lib/               # Utility libraries
│   │   ├── auth.ts        # NextAuth configuration
│   │   └── prisma.ts      # Prisma client setup
│   ├── types/             # TypeScript type definitions
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Helper functions
│   └── public/            # Static assets
│
├── server/                # Express.js Backend API
│   ├── routes/            # API route handlers
│   │   ├── auth.js        # Authentication endpoints
│   │   ├── users.js       # User management
│   │   ├── posts.js       # Social media posts
│   │   ├── comments.js    # Post comments
│   │   ├── messages.js    # Direct messaging
│   │   ├── prayers.js     # Prayer requests
│   │   ├── forums.js      # Discussion forums
│   │   ├── events.js      # Church events
│   │   ├── bible.js       # Bible API
│   │   └── admin.js       # Admin/moderation
│   ├── middleware/        # Express middleware
│   │   └── auth.js        # Authentication middleware
│   ├── prisma/            # Database configuration
│   │   ├── schema.prisma  # Database schema
│   │   └── seed.js        # Database seeding
│   ├── utils/             # Backend utilities
│   └── index.js           # Server entry point
│
├── docs/                  # Documentation files
├── package.json           # Root package configuration
└── README.md             # This file
```

## 🔗 API Endpoints

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh JWT token

### **Users**
- `GET /api/users/:id` - Get user profile
- `POST /api/users/:id/follow` - Follow/unfollow user
- `GET /api/users/search` - Search users

### **Posts**
- `GET /api/posts/feed` - Get social media feed
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get single post
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/bookmark` - Bookmark post
- `DELETE /api/posts/:id` - Delete post

### **Additional APIs**
- Prayer Requests: `/api/prayers`
- Forums: `/api/forums`
- Events: `/api/events`
- Messages: `/api/messages`
- Bible: `/api/bible`
- Notifications: `/api/notifications`
- Admin: `/api/admin`

## 🎨 Design System

### **Color Palette**
- **Primary**: Spiritual Purple (#6B46C1)
- **Secondary**: Heavenly Blue (#87CEEB)
- **Accent**: Divine Gold (#D4AF37)
- **Success**: Hope Green (#32CD32)
- **Warning**: Faith Blue (#4169E1)
- **Error**: Love Red (#DC143C)

### **Typography**
- **Primary**: Inter (modern, clean)
- **Scripture**: Times New Roman (traditional, readable)
- **Display**: Georgia (elegant headings)

### **Custom Components**
- Spiritual-themed animations and transitions
- Bible verse highlighting and formatting
- Prayer hand icons and Christian symbols
- Peaceful shadows and divine glows
- Cross and dove iconography

## 🔮 Roadmap & Future Features

### **Phase 1: Core Features** ✅
- ✅ User authentication and profiles
- ✅ Social media feed and posting
- ✅ Bible reader integration
- ✅ Basic community features

### **Phase 2: Enhanced Community** 🚧
- 🔄 Advanced prayer group features
- 🔄 Live streaming for churches
- 🔄 Enhanced forums and discussions
- 🔄 Mobile app development

### **Phase 3: Advanced Features** 📋
- 📅 AI-powered content recommendations
- 📅 Denomination-specific features
- 📅 Multi-language support
- 📅 Advanced Bible study tools
- 📅 Church management integration
- 📅 Donation and tithing system

### **Phase 4: Global Expansion** 🌍
- 🌍 International church directory
- 🌍 Mission trip coordination
- 🌍 Global prayer initiatives
- 🌍 Interfaith dialogue features

## 🤝 Contributing

We welcome contributions from the Christian developer community! Here's how you can help:

### **Getting Started**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and test thoroughly
4. Submit a pull request with detailed description

### **Contribution Guidelines**
- Follow Christian values in all content and code
- Maintain high code quality and documentation
- Test all features before submission
- Respect different denominations and traditions
- Focus on building up the Christian community

### **Areas for Contribution**
- 🐛 Bug fixes and improvements
- ✨ New feature development
- 📖 Documentation and tutorials
- 🌐 Internationalization and translations
- 🎨 UI/UX design improvements
- 🧪 Testing and quality assurance

## 📞 Support & Community

### **Getting Help**
- 📧 **Email**: support@christconnect.app
- 💬 **Discord**: [ChristConnect Community](https://discord.gg/christconnect)
- 📖 **Documentation**: [docs.christconnect.app](https://docs.christconnect.app)
- 🐛 **Issues**: [GitHub Issues](https://github.com/christconnect/issues)

### **Community Guidelines**
- Show Christ's love in all interactions
- Respect different denominations and traditions
- Keep discussions constructive and uplifting
- Report inappropriate content promptly
- Help newcomers feel welcome

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Christian Community**: For inspiration and guidance
- **Open Source Libraries**: For providing excellent tools
- **Beta Testers**: Early users who helped shape the platform
- **Contributors**: Developers who helped build this platform

---

**"Therefore encourage one another and build each other up, just as in fact you are doing."** - 1 Thessalonians 5:11

Built with ❤️ and 🙏 for the global Christian community.

---

## 🚀 Quick Start Commands

```bash
# Complete setup (first time)
npm run setup

# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Database management
cd server && npx prisma studio

# View API documentation
curl http://localhost:3001/api/health
```

**Ready to connect, grow, and share your faith with ChristConnect!** ✝️