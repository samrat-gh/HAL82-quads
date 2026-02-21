# CoFound - Co-Founder Matching Platform

<div align="center">
  <h3>🚀 Find Your Perfect Co-Founder Through AI-Powered Matching</h3>
  <p>A sophisticated platform that connects founders with co-founders using intelligent compatibility algorithms</p>
</div>

---

## 📋 Table of Contents  

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)  
- [Authentication System](#authentication-system)
- [Matching Algorithm](#matching-algorithm)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)

---

## 🎯 Overview

CoFound is a comprehensive co-founder matching platform designed to help entrepreneurs find their ideal business partners. The platform uses a sophisticated compatibility scoring system that evaluates multiple dimensions including skills, work style, risk appetite, commitment level, and ambition to provide highly accurate matches.

**Purpose**: Solve the challenging problem of finding compatible co-founders by going beyond simple skill matching to evaluate deep compatibility factors that determine long-term partnership success.

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- **Secure Authentication**: JWT-based authentication using NextAuth.js
- **Role-Based Access**: Three user roles (Founder, Co-Founder, Investor (not working just focusing on founder and cofounder))
- **Credential Management**: Bcrypt password hashing for security
- **Session Management**: Persistent sessions with automatic token refresh
- **Protected Routes**: Server-side and client-side route protection

### 👤 User Profile Management
- **Complete Profile System**: 
  - Personal information (name, email, phone, location)
  - Profile pictures with drag-and-drop upload
  - Bio and professional background
  - Years of experience tracking
  - Social media integration (Twitter, LinkedIn, GitHub, Instagram)
  
- **Work Experience Management**:
  - Add/edit/remove work experiences
  - Track current and past positions
  - Detailed role descriptions
  - Company and duration tracking
  - Optional field (can start with empty experience)

- **Traction Metrics** (for Founders):
  - Current user count
  - Monthly traffic statistics
  - Monthly revenue tracking
  - Website URL (optional)

### 🎯 Role-Specific Onboarding

#### For Founders:
- **Product Information**:
  - Product name and description
  - Product URL (required)
  - Started date tracking
  - Project stage (Idea, MVP, Traction)
  
- **Co-Founder Requirements**:
  - Desired skill set (Tech, Design, Growth, Ops)
  - Commitment level required (Full-time, Part-time)
  
- **Work Preferences**:
  - Risk appetite (Conservative, Balanced, Aggressive)
  - Work speed preference (Fast, Structured)
  - Decision-making style (Data-driven, Intuitive, Collaborative)
  - Ambition level (Lifestyle, Scalable, Hypergrowth)

#### For Co-Founders:
- **Skill Profile**:
  - Primary skill (required)
  - Secondary skill (optional)
  - Experience level (Junior, Mid, Senior)
  - "Actively Seeking" status with disclaimer
  
- **Preferences**:
  - Preferred project stage
  - Availability commitment
  - Risk appetite alignment
  - Work style preferences
  - Decision-making compatibility
  - Ambition level matching

### 🤝 Intelligent Matching System

The platform implements a **multi-dimensional compatibility scoring algorithm** with **100 total points** distributed across 7 dimensions:

1. **Skill Match (30 points)**: Alignment between founder's needs and co-founder's expertise
2. **Stage Alignment (20 points)**: Project stage compatibility and growth trajectory
3. **Commitment Match (15 points)**: Full-time vs. Part-time availability alignment
4. **Risk Appetite (10 points)**: Conservative vs. Aggressive risk tolerance
5. **Work Style (10 points)**: Fast-paced vs. Structured approach
6. **Decision Style (10 points)**: Data-driven vs. Intuitive decision-making
7. **Ambition Level (5 points)**: Business goals alignment

**Match Categories**:
- **Excellent Match** (80%+): Highly compatible across all dimensions
- **Good Match** (60-79%): Strong compatibility with minor differences
- **Fair Match** (<60%): Moderate compatibility, may require compromise

### 📊 Advanced Dashboard (Professional Redesign)

The dashboard provides a comprehensive matching interface with major UI improvements:

#### Filtering System:
- **Minimum Compatibility Score**: Filter by score threshold (50%, 60%, 70%, 75%, 80%)
- **Skill Filter**: Filter by specific skills (Tech, Design, Growth, Ops)
- **Experience Level** (for Founders): Filter co-founders by experience
- **Project Stage** (for Co-Founders): Filter ventures by development stage
- **Sort Options**: Compatibility score (descending), skill/expertise, project stage

#### Match Cards (Redesigned - 56% Code Reduction):
- **Profile Overview**:
  - Larger profile pictures (64px) with gradient fallback initials
  - Enhanced typography and spacing
  - Role-specific colored badges with icons
  - Product information cards for founders
  
- **Compatibility Display**:
  - Large gradient score text (orange gradient #FF6154 → #FF7A6B)
  - Color-coded compatibility badges
  - Professional ring styling
  
- **Detailed Breakdown**:
  - 7 individual score cards with hover effects
  - Animated gradient progress bars
  - Percentage display for each metric
  - Professional gradient background
  
- **Quick Actions**:
  - Gradient "View Full Profile" button
  - "View Breakdown" button with animated icons
  - Smooth transitions and hover effects

#### Component Architecture:
- **CompatibilityBadge**: Color-coded match indicators
- **FilterPanel**: Advanced filtering with gradients
- **MatchCard**: Professional match display
- **CompatibilityBreakdown**: Animated score analysis
- **EmptyState**: Helpful no-results UI

**Code Quality**: Dashboard refactored from 702 to 307 lines (56% reduction)

### 🎨 Image Management
- **Cloudinary Integration**: Secure cloud-based image storage
- **Drag-and-Drop Upload**: Intuitive file upload interface
- **Real-time Updates**: Instant profile picture updates across the app
- **Automatic Optimization**: Image optimization and delivery via CDN
- **Session Refresh**: JWT callback refreshes profile pictures on each request

### 🌐 Public Profile Viewing
- **Shareable Profiles**: Each user has a unique profile URL
- **Comprehensive Display**:
  - Personal information showcase
  - Work experience timeline
  - Traction metrics visualization
  - **For Founders**: Featured product card at top with:
    - Product name and "BUILDING" badge
    - Product overview and description
    - Call-to-action button linking to product
    - Project stage and skills displayed
    - Orange gradient design for emphasis
  - Social media links with icons
  - Work style and preferences section
- **Privacy-Conscious**: Controlled information display
- **Professional Layout**: Clean, modern design with gradients

### 🎨 Professional UI/UX

#### Design System:
- **Modern Aesthetics**: Clean, professional interface
- **Gradient Accents**: Orange brand gradients (#FF6154 → #FF7A6B)
- **Micro-interactions**: Smooth transitions and hover effects
- **Responsive Design**: Mobile-first approach
- **Dark/Light Theme**: Theme toggle with next-themes
- **Accessibility**: ARIA labels, keyboard navigation, focus states

#### Styling:
- **Tailwind CSS v4**: Utility-first CSS framework
- **Gradient Utilities**: Linear gradients for modern effects
- **Custom Colors**: Brand-specific orange palette
- **Shadow System**: Layered shadow definitions
- **Animation Classes**: Smooth transitions and transforms

### 📱 Landing Page
- Hero section with value proposition
- Problem statement section
- Solution overview  
- Step-by-step how it works
- Feature highlights
- Call-to-action sections
- Footer with navigation

---

## 🛠 Technology Stack

### Frontend
- **Next.js 16.1.1**: React framework with App Router
- **React 19.2.3**: Latest React with concurrent features
- **TypeScript 5**: Type-safe development
- **Tailwind CSS 4**: Utility-first styling
- **Radix UI**: Accessible component primitives
- **Lucide React**: Modern icon library
- **next-themes**: Theme management

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **NextAuth.js 4.24.11**: Authentication solution
- **Prisma 6.19.2**: Type-safe ORM
- **MongoDB Atlas**: Cloud database
- **Bcrypt.js**: Password hashing

### Cloud Services
- **Cloudinary 2.9.0**: Image hosting and optimization
- **MongoDB Atlas**: Managed database hosting

### Development Tools
- **Biome 2.2.0**: Fast linter and formatter
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing

---

## 🏗 System Architecture

### Application Flow

```
CoFound Platform
├── Authentication (NextAuth.js + JWT)
├── Frontend (Next.js App Router)
│   ├── Landing Pages
│   ├── Authentication Pages
│   ├── Dashboard (Professional Redesign)
│   ├── Profile Management
│   └── Onboarding Flows
├── API Layer (11 REST Endpoints)
│   ├── Authentication (/auth)
│   ├── User Management (/user)
│   ├── Profile Operations (/profile)
│   ├── Matching Engine (/matches)
│   └── File Upload (/upload)
├── Database (Prisma + MongoDB)
│   ├── 6 Models (User, Profile, Experience, etc.)
│   └── Compatibility Scoring
└── External Services
    ├── Cloudinary (Image Storage)
    └── MongoDB Atlas (Database)
```

### Data Flow Examples

1. **User Registration**: Join Page → Register API → Bcrypt Hash → MongoDB → JWT Token
2. **Profile Creation**: Onboarding Form → Profile API → Validation → Database → Match Calculation  
3. **Matching**: Dashboard Request → Matches API → Query Compatibility → Return Sorted Results
4. **Image Upload**: Drag & Drop → Upload API → Cloudinary → URL → Update DB → Session Refresh

---

## 💾 Database Schema

### Core Models

#### User Model
```prisma
model User {
  id               String   @unique
  email            String   @unique
  password         String
  firstName        String
  lastName         String
  role             String  // founder, cofounder, investor
  profilePicture   String?
  profileCompleted Boolean  @default(false)
  // Relations
  profile          Profile?
  founderProfile   FounderProfile?
  cofounderProfile CoFounderProfile?
  experiences      Experience[]
}
```

#### Profile Model
```prisma
model Profile {
  userId           String  @unique @db.ObjectId
  phoneNumber      String?
  location         String?
  bio              String?
  yearsOfExperience Int?
  twitter          String?
  linkedin         String?
  github           String?
  instagram        String?
  // For Founders only
  currentUsers     Int?
  monthlyTraffic   Int?
  monthlyRevenue   Int?
  websiteUrl       String?
}
```

#### Experience Model
```prisma
model Experience {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  userId      String   @db.ObjectId
  title       String
  company     String
  description String?
  startDate   String
  endDate     String?
  isCurrent   Boolean  @default(false)
  user        User     @relation(fields: [userId], references: [userId])
}
```

#### FounderProfile Model
```prisma
model FounderProfile {
  userId              String        @unique @db.ObjectId
  productName         String
  description         String
  productUrl          String
  startedDate         String
  stage               Stage         // IDEA, MVP, TRACTION
  lookingForSkill     Skill         // TECH, DESIGN, GROWTH, OPS
  commitmentRequired  Commitment    // FULL_TIME, PART_TIME
  riskAppetite        RiskAppetite  // CONSERVATIVE, BALANCED, AGGRESSIVE
  workSpeed           WorkSpeed     // FAST, STRUCTURED
  decisionStyle       DecisionStyle // DATA_DRIVEN, INTUITIVE, COLLABORATIVE
  ambitionLevel       AmbitionLevel // LIFESTYLE, SCALABLE, HYPERGROWTH
  user                User          @relation(fields: [userId], references: [userId])
}
```

#### CoFounderProfile Model
```prisma
model CoFounderProfile {
  userId          String           @unique @db.ObjectId
  primarySkill    Skill
  secondarySkill  Skill?
  experienceLevel ExperienceLevel  // JUNIOR, MID, SENIOR
  preferredStage  Stage
  availability    Commitment
  activelySeeking Boolean          @default(false)
  riskAppetite    RiskAppetite
  workSpeed       WorkSpeed
  decisionStyle   DecisionStyle
  ambitionLevel   AmbitionLevel
  user            User             @relation(fields: [userId], references: [userId])
}
```

#### Compatibility Model
```prisma
model Compatibility {
  id              String  @id @default(auto()) @map("_id") @db.ObjectId
  founderId       String  @db.ObjectId
  coFounderId     String  @db.ObjectId
  totalScore      Int     // 0-100
  skillScore      Int     // 0-30
  stageScore      Int     // 0-20
  commitmentScore Int     // 0-15
  riskScore       Int     // 0-10
  workStyleScore  Int     // 0-10
  decisionScore   Int     // 0-10
  ambitionScore   Int     // 0-5
  
  @@unique([founderId, coFounderId])
  @@index([totalScore])
  @@index([founderId])
  @@index([coFounderId])
}
```

### Enums

```prisma
enum Stage {
  IDEA
  MVP
  TRACTION
}

enum Skill {
  TECH
  DESIGN
  GROWTH
  OPS
}

enum Commitment {
  FULL_TIME
  PART_TIME
}

enum RiskAppetite {
  CONSERVATIVE
  BALANCED
  AGGRESSIVE
}

enum WorkSpeed {
  FAST
  STRUCTURED
}

enum DecisionStyle {
  DATA_DRIVEN
  INTUITIVE
  COLLABORATIVE
}

enum AmbitionLevel {
  LIFESTYLE
  SCALABLE
  HYPERGROWTH
}

enum ExperienceLevel {
  JUNIOR
  MID
  SENIOR
}
```

---

## 🔌 API Routes

### Authentication
- `POST /api/auth/register` - User registration
  ```typescript
  Request: { email, password, firstName, lastName, role }
  Response: { message, userId }
  ```

- `POST /api/auth/[...nextauth]` - NextAuth endpoints (login/logout/session)

### User Management
- `GET /api/user` - Get current user information
  ```typescript
  Response: { user: User & { profile, founderProfile, cofounderProfile } }
  ```

- `POST /api/user/update-picture` - Update profile picture
  ```typescript
  Request: { profilePicture: string }
  Response: { user: User }
  ```

### Profile Management
- `GET /api/profile` - Get current user's profile
  ```typescript
  Response: { profile: Profile }
  ```

- `POST /api/profile` - Create/update profile
  ```typescript
  Request: { phoneNumber?, location?, bio?, yearsOfExperience?, ... }
  Response: { profile: Profile }
  ```

- `GET /api/profile/[userId]` - Get public profile by userId
  ```typescript
  Response: { 
    user: User,
    profile: Profile,
    experiences: Experience[],
    founderProfile?: FounderProfile,
    cofounderProfile?: CoFounderProfile
  }
  ```

- `POST /api/profile/complete` - Complete initial profile
  ```typescript
  Request: Profile data
  Response: { profile: Profile }
  ```

### Role-Specific Profiles
- `GET /api/founder-profile` - Get founder profile
- `POST /api/founder-profile` - Create/update founder profile
  ```typescript
  Request: FounderProfile data
  Response: { founderProfile: FounderProfile }
  ```

- `GET /api/cofounder-profile` - Get co-founder profile  
- `POST /api/cofounder-profile` - Create/update co-founder profile
  ```typescript
  Request: CoFounderProfile data
  Response: { cofounderProfile: CoFounderProfile }
  ```

### Matching & Upload
- `GET /api/matches` - Get compatibility matches (sorted descending by score)
  ```typescript
  Response: {
    matches: Array<{
      user: User,
      profile: Profile,
      founderProfile?: FounderProfile,
      cofounderProfile?: CoFounderProfile,
      compatibility: Compatibility
    }>
  }
  ```

- `POST /api/upload` - Upload image to Cloudinary
  ```typescript
  Request: FormData with image file
  Response: { url: string }
  ```

---

## 🔒 Authentication System

### NextAuth.js Implementation

**Provider**: Credentials-based authentication
**Strategy**: JWT with automatic token refresh
**Storage**: MongoDB for user data
**Security**: 
- Bcrypt password hashing (10 rounds)
- JWT token encryption
- HTTP-only secure cookies
- CSRF protection

**Session Management**:
```typescript
// JWT callback refreshes profile picture and role on each request
jwt: async ({ token }) => {
  const user = await prisma.user.findUnique({
    where: { userId: token.id },
    select: { profilePicture: true, role: true }
  });
  token.profilePicture = user?.profilePicture;
  token.role = user?.role;
  return token;
}

// Session callback includes user data
session: async ({ session, token }) => {
  session.user = {
    ...session.user,
    id: token.id,
    role: token.role,
    profilePicture: token.profilePicture
  };
  return session;
}
```

**Protected Routes**: Both server-side and client-side protection using `getServerSession` and `useSession`

---

## 🧮 Matching Algorithm

### Scoring Logic

```typescript
Total Score (100 points) = 
  Skill Score (30) +
  Stage Score (20) +
  Commitment Score (15) +
  Risk Score (10) +
  Work Style Score (10) +
  Decision Score (10) +
  Ambition Score (5)
```

### Dimension Breakdown

**1. Skill Match (30 points)**:
- Exact primary skill match: 30 points
- Secondary skill match: 20 points  
- No match: 0 points

**2. Stage Alignment (20 points)**:
- Perfect alignment: 20 points
- Compatible stages (e.g., MVP ↔ Traction): 15 points
- Misaligned stages: 10 points

**3. Commitment (15 points)**:
- Same commitment level (both Full-time or Part-time): 15 points
- Different commitment levels: 0 points

**4. Risk Appetite (10 points)**:
- Same risk tolerance: 10 points
- One level different (e.g., Balanced ↔ Aggressive): 5 points
- Two levels different: 0 points

**5. Work Style (10 points)**:
- Same work speed preference: 10 points
- Different preferences: 0 points

**6. Decision Style (10 points)**:
- Same decision-making style: 10 points
- Compatible styles (e.g., Data-driven ↔ Collaborative): 5 points
- Incompatible: 0 points

**7. Ambition Level (5 points)**:
- Same ambition level: 5 points
- One level different: 3 points
- Two levels different: 0 points

### Match Quality Thresholds
- **Excellent Match** (80-100): Highly compatible across all dimensions
- **Good Match** (60-79): Strong compatibility with minor differences
- **Fair Match** (0-59): Moderate compatibility, may require compromise

### Optimization
- Database indexes on `totalScore`, `founderId`, `coFounderId`
- Eager loading of related user and profile data
- Results sorted descending by total score
- Unique constraint prevents duplicate match records
- Compound indexes for efficient queries

---

## 🚀 Setup Instructions

### Prerequisites
- **Node.js 20+** (LTS recommended)
- **pnpm 9+** (or npm/yarn)
- **MongoDB Atlas** account (free tier available)
- **Cloudinary** account (free tier available)

### Installation Steps

1. **Clone Repository**:
```bash
git clone <repository-url>
cd cofound
```

2. **Install Dependencies**:
```bash
pnpm install
# or
npm install
```

3. **Environment Setup**:
```bash
# Create environment file
cp .env.example .env.local

# Edit .env.local with your credentials (see Environment Variables section)
```

4. **Database Setup**:
```bash
# Generate Prisma client
npx prisma generate

# Push schema to MongoDB Atlas
npx prisma db push
```

5. **Run Development Server**:
```bash
pnpm dev
# or
npm run dev
```

6. **Open Browser**: Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
# Build optimized production bundle
pnpm build

# Start production server
pnpm start
```

### Code Quality Commands
```bash
# Lint and format check
pnpm lint

# Auto-format code
pnpm format
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database Connection
# Get from MongoDB Atlas dashboard
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
# In production: "https://yourdomain.com"

# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="your-super-secret-key-here"

# Cloudinary Configuration
# Get from Cloudinary dashboard
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_KEY="your-api-key"
CLOUDINARY_SECRET="your-api-secret"
```

### Getting Service Credentials

#### MongoDB Atlas
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free M0 cluster (512MB)
3. Create database user (Database Access → Add New Database User)
4. Whitelist IP address (Network Access → Add IP Address → 0.0.0.0/0 for development)
5. Get connection string (Clusters → Connect → Connect your application)
6. Replace `<username>`, `<password>`, and `<database>` in connection string

#### Cloudinary
1. Create free account at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy **Cloud Name**, **API Key**, and **API Secret**
4. Add to `.env.local`

#### NextAuth Secret
Generate a secure random string:
```bash
openssl rand -base64 32
```

---

## 📁 Project Structure

```
cofound/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes (11 endpoints)
│   │   ├── auth/
│   │   │   ├── register/
│   │   │   │   └── route.ts     # User registration
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts     # NextAuth handler
│   │   ├── cofounder-profile/
│   │   │   └── route.ts         # Co-founder profile CRUD
│   │   ├── founder-profile/
│   │   │   └── route.ts         # Founder profile CRUD
│   │   ├── matches/
│   │   │   └── route.ts         # Matching algorithm API
│   │   ├── profile/
│   │   │   ├── route.ts         # Profile CRUD
│   │   │   ├── complete/
│   │   │   │   └── route.ts     # Complete profile
│   │   │   └── [userId]/
│   │   │       └── route.ts     # Public profile
│   │   ├── upload/
│   │   │   └── route.ts         # Cloudinary image upload
│   │   └── user/
│   │       ├── route.ts         # Get user info
│   │       └── update-picture/
│   │           └── route.ts     # Update profile picture
│   │
│   ├── dashboard/
│   │   └── page.tsx             # Dashboard (307 lines - refactored)
│   │
│   ├── join/
│   │   └── page.tsx             # Authentication page
│   │
│   ├── onboarding/
│   │   ├── founder/
│   │   │   └── page.tsx         # Founder onboarding flow
│   │   └── cofounder/
│   │       └── page.tsx         # Co-founder onboarding flow
│   │
│   ├── profile/
│   │   ├── page.tsx             # Personal profile view/edit
│   │   ├── complete/
│   │   │   └── page.tsx         # Profile completion wizard
│   │   └── [userId]/
│   │       └── page.tsx         # Public profile view
│   │
│   ├── settings/
│   │   └── page.tsx             # User settings
│   │
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Global styles
│
├── components/
│   ├── dashboard/               # Dashboard components (5 files)
│   │   ├── compatibility-badge.tsx      # Color-coded match badges
│   │   ├── compatibility-breakdown.tsx  # Detailed score breakdown
│   │   ├── empty-state.tsx              # No results UI
│   │   ├── filter-panel.tsx             # Advanced filters
│   │   └── match-card.tsx               # Match display card
│   │
│   ├── landing/                 # Landing page components (8 files)
│   │   ├── call-to-action.tsx
│   │   ├── features.tsx
│   │   ├── footer.tsx
│   │   ├── header.tsx
│   │   ├── hero.tsx
│   │   ├── how-it-works.tsx
│   │   ├── problem.tsx
│   │   └── solution.tsx
│   │
│   ├── login/
│   │   ├── custom-signin-form.tsx       # Login form
│   │   └── index.tsx
│   │
│   ├── ui/                      # Reusable UI components (Radix)
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── tooltip.tsx
│   │
│   ├── dashboard-nav.tsx        # Navigation component
│   ├── loading-spinner.tsx      # Loading state
│   ├── theme-menu.tsx           # Theme switcher
│   └── theme-provider.tsx       # Theme context
│
├── lib/
│   ├── auth.ts                  # NextAuth configuration
│   ├── prisma.ts                # Prisma client singleton
│   └── utils.ts                 # Helper functions (cn, etc.)
│
├── prisma/
│   └── schema.prisma            # Database schema
│                                # 6 models, 8 enums, indexes
│
├── public/                      # Static assets
│
├── types/                       # TypeScript type definitions
│
├── .env.local                   # Environment variables (create this)
├── .gitignore                   # Git ignore rules
├── biome.json                   # Biome linter/formatter config
├── global.d.ts                  # Global TypeScript declarations
├── next-env.d.ts                # Next.js TypeScript declarations
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── pnpm-lock.yaml               # Lockfile
├── postcss.config.mjs           # PostCSS configuration
├── README.md                    # This file
└── tsconfig.json                # TypeScript configuration
```

---

## 🎨 Component Architecture

### Dashboard Component Breakdown

**Before Refactor**: 702 lines in single file  
**After Refactor**: 307 lines + 5 reusable components  
**Code Reduction**: 56%

#### New Components

1. **CompatibilityBadge** (`compatibility-badge.tsx`)
   - Color-coded match indicators
   - Ring-based styling
   - Three variants: Excellent, Good, Fair
   - Props: `score: number`

2. **FilterPanel** (`filter-panel.tsx`)
   - Advanced filtering interface
   - Gradient styling and animations
   - Role-specific filters
   - Props: All filter states and setters

3. **MatchCard** (`match-card.tsx`)
   - Professional match display
   - Profile information
   - Gradient compatibility score
   - Quick action buttons
   - Props: `match` object with user, profile, compatibility

4. **CompatibilityBreakdown** (`compatibility-breakdown.tsx`)
   - 7 dimension score cards
   - Animated gradient progress bars
   - Hover effects
   - Percentage display
   - Props: `compatibility` object

5. **EmptyState** (`empty-state.tsx`)
   - No results display
   - Helpful messaging
   - Icons and suggestions
   - Props: None

### Design Improvements

#### Visual Enhancements
- **Gradients**: Orange brand gradients (#FF6154 → #FF7A6B)
- **Typography**: Larger text, better hierarchy
- **Spacing**: More breathing room, better alignment
- **Images**: 64px profile pictures (up from 48px)
- **Shadows**: Professional layered shadow system
- **Animations**: Smooth transitions, hover effects, loading states

#### User Experience
- **Clarity**: Clear visual hierarchy
- **Feedback**: Hover states, loading indicators
- **Accessibility**: ARIA labels, keyboard navigation
- **Responsiveness**: Mobile-optimized layouts
- **Performance**: Code splitting, lazy loading

---

## 🧪 Development Best Practices

### Code Quality Standards

1. **Type Safety**
   - Full TypeScript coverage
   - Strict mode enabled
   - No `any` types without justification
   - Proper interface definitions

2. **Error Handling**
   - Try-catch blocks in all async operations
   - Meaningful error messages
   - Proper HTTP status codes
   - Client-side error boundaries

3. **Validation**
   - Client-side form validation
   - Server-side API validation
   - Prisma schema constraints
   - Sanitization of user inputs

4. **Security**
   - Password hashing with bcrypt
   - JWT token encryption
   - HTTP-only secure cookies
   - CSRF protection
   - Environment variable protection

5. **Performance**
   - Database indexes on frequently queried fields
   - Eager loading of related data
   - Code splitting and lazy loading
   - Image optimization with Cloudinary
   - React Server Components where appropriate

6. **Accessibility**
   - Semantic HTML
   - ARIA labels and roles
   - Keyboard navigation
   - Focus indicators
   - Screen reader support

7. **Component Design**
   - Single Responsibility Principle
   - Reusable and composable
   - Props validation
   - Clear naming conventions

### Development Workflow

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Development cycle
pnpm dev              # Start dev server
pnpm lint             # Check for issues
pnpm format           # Format code

# 3. Database changes (if needed)
npx prisma db push    # Update database
npx prisma generate   # Regenerate client

# 4. Test changes manually
# - Test in browser
# - Check console for errors
# - Verify database changes

# 5. Commit changes
git add .
git commit -m "feat: add new feature"

# 6. Push and create PR
git push origin feature/new-feature

# 7. After PR approval, deploy
git checkout main
git merge feature/new-feature
# Deploy triggers automatically
```

### Common Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Lint code
pnpm format           # Format code with Biome

# Database
npx prisma studio     # Open Prisma Studio (DB GUI)
npx prisma generate   # Generate Prisma client
npx prisma db push    # Push schema changes
npx prisma db pull    # Pull schema from database

# Debugging
pnpm dev --turbo      # Development with Turbopack
```

---

## 📊 Key Achievements & Metrics

### Architecture Improvements
- ✅ **56% Code Reduction**: Dashboard from 702 to 307 lines
- ✅ **Component Library**: 5 reusable dashboard components
- ✅ **Type Safety**: 100% TypeScript coverage
- ✅ **Performance**: Database indexes for optimal queries
- ✅ **Modern UI**: Professional gradients and animations

### Technical Implementation
- ✅ **7-Dimensional Matching**: Sophisticated compatibility algorithm
- ✅ **Role-Based Access**: Founder, Co-Founder, Investor roles
- ✅ **JWT Authentication**: Secure session management with auto-refresh
- ✅ **Image Optimization**: Cloudinary CDN integration
- ✅ **Type-Safe Database**: Prisma ORM with MongoDB

### User Experience
- ✅ **Professional Dashboard**: Complete redesign with advanced filtering
- ✅ **Onboarding Flows**: Separate flows for founders and co-founders
- ✅ **Public Profiles**: Shareable profile URLs with comprehensive display
- ✅ **Real-Time Updates**: Profile picture updates across app
- ✅ **Responsive Design**: Mobile-first approach

### Data Model
- ✅ **6 Database Models**: User, Profile, Experience, FounderProfile, CoFounderProfile, Compatibility
- ✅ **8 Enums**: Stage, Skill, Commitment, Risk, WorkSpeed, DecisionStyle, Ambition, ExperienceLevel
- ✅ **11 API Routes**: Complete REST API for all operations
- ✅ **Optimized Queries**: Indexes and eager loading

---

## 🔮 Future Enhancements

### Phase 1: Communication (High Priority)
1. **Messaging System**
   - Direct messages between matches
   - Real-time chat with WebSockets
   - Message history and search
   - Read receipts and typing indicators

2. **Notifications**
   - Email notifications for new matches
   - In-app notification system
   - Notification preferences
   - Match alerts

### Phase 2: Enhanced Matching
3. **Advanced Search**
   - More filtering options
   - Saved searches
   - Location-based matching
   - Industry-specific filters

4. **AI Recommendations**
   - Machine learning match suggestions
   - Behavioral pattern analysis
   - Success rate predictions
   - Personalized recommendations

### Phase 3: Collaboration Tools
5. **Video Profiles**
   - Introduction video uploads
   - Video call integration
   - Screen recording for product demos

6. **Calendar Integration**
   - Meeting scheduling
   - Availability management
   - Time zone handling
   - Google Calendar sync

### Phase 4: Expansion
7. **Team Matching**
   - Multi-person team formation
   - Complementary skill sets
   - Team compatibility scores

8. **Investor Integration**
   - Investor profiles
   - Funding rounds
   - Pitch deck uploads
   - Investment matching

### Phase 5: Analytics & Insights
9. **Profile Analytics**
   - Profile view tracking
   - Match engagement metrics
   - Conversion analytics
   - A/B testing

10. **Success Tracking**
    - Partnership outcomes
    - Success stories
    - Testimonials
    - Case studies

### Technical Improvements
- **Testing**: Unit tests, integration tests, E2E tests
- **Monitoring**: Error tracking with Sentry
- **CI/CD**: Automated deployment pipeline
- **Caching**: Redis for session and query caching
- **API**: GraphQL API for flexible queries
- **Mobile**: Native iOS/Android apps
- **Scaling**: Microservices architecture
- **Security**: Rate limiting, DDoS protection

---

## 📄 License

This project is private and proprietary.

---

## 👥 Contributors

Built with ❤️ by the CoFound team

### Core Features Developed
- Authentication system with NextAuth.js
- Multi-dimensional matching algorithm (100-point system)
- Professional dashboard redesign (56% code reduction)
- Role-based onboarding flows
- Public profile system with featured product cards
- Image upload and management with Cloudinary
- Prisma database schema with 6 models
- 11 REST API endpoints

---

## 📞 Support & Contact

For questions, issues, or feature requests:

- **GitHub Issues**: Create an issue in the repository
- **Email**: [support@cofound.app](mailto:support@cofound.app)
- **Documentation**: This README

---

## 📝 Changelog

### Version 1.0.0 (Current)
- ✅ Complete authentication system
- ✅ User profile management
- ✅ Role-specific onboarding (Founder/Co-Founder)
- ✅ Multi-dimensional matching algorithm
- ✅ Professional dashboard with advanced filtering
- ✅ Public profile viewing
- ✅ Image upload and optimization
- ✅ Work experience management
- ✅ Traction metrics for founders
- ✅ Theme toggle (Dark/Light mode)

### Recent Updates
- **Dashboard Redesign**: Reduced from 702 to 307 lines (56% reduction)
- **Component Library**: Created 5 reusable dashboard components
- **Visual Improvements**: Added gradient styling throughout
- **Enhanced UX**: Improved match cards with detailed breakdowns
- **Better Filtering**: Advanced filtering with role-specific options

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Status**: Active Development  
**Notable Achievement**: Dashboard professionally redesigned with 56% code reduction

---

<div align="center">
  <p>🚀 <strong>CoFound</strong> - Find Your Perfect Co-Founder</p>
  <p>Built with Next.js 16, React 19, TypeScript, Prisma, MongoDB, and Cloudinary</p>
</div>
