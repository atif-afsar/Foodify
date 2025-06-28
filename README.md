# 🍔 Foodify – A Deliciously Smooth Grocery Web App

Welcome to **Foodify** – a modern, responsive food and grocery web app that offers an elegant user experience to explore a wide range of grocery items in real time.

This project is a major milestone in my frontend journey, powered by React and built with clean architecture and scalable practices. Huge thanks to my instructor **Akshay Saini**, whose exceptional teaching through *Namaste React* helped me understand core concepts deeply and gave me the confidence to build this project from scratch. 🙏

---

## 🌟 Features

- 🔍 **Search & Filter**: Real-time product search and filtering
- 💡 **Lazy Loading & Suspense**: Efficient component rendering
- 🛠️ **Custom Hooks**: Reusable and modular logic
- 🧠 **Redux Toolkit**: For powerful and scalable state management
- ⚡ **Optimized Build**: Using Vite for fast and efficient bundling
- 🎨 **Responsive Design**: Tailwind CSS-based clean UI for all devices
- 🎭 **Mock Data**: Comprehensive mock data for realistic restaurant experience

---

## 🧰 Tech Stack

| Category       | Tech Used                     |
|----------------|-------------------------------|
| Frontend       | React, JSX, Tailwind CSS       |
| State Mgmt     | Redux Toolkit, React-Redux     |
| Routing        | React Router DOM               |
| Bundler        | Vite                          |
| Other Tools    | Babel, npm, npx                |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/atif-afsar/Foodify.git
cd Foodify
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm start
```

4. **Open your browser:**
- Frontend: http://localhost:3000

---

## 🎭 Mock Data Solution

This project uses comprehensive mock data instead of external APIs to provide a realistic restaurant experience:

### **Mock Data Features:**
- ✅ **12 Realistic Restaurants** with different cuisines
- ✅ **Complete Menu Data** for each restaurant
- ✅ **Realistic Pricing** and delivery times
- ✅ **Search Functionality** works perfectly
- ✅ **No CORS Issues** - everything works locally
- ✅ **No Backend Required** - pure frontend solution

### **Restaurant Categories:**
- 🍕 Italian (Pizza, Pasta)
- 🍔 American (Burgers, Fast Food)
- 🍣 Japanese (Sushi, Asian)
- 🍗 Indian (Tandoori, North Indian)
- 🥗 Vegetarian (Healthy, Organic)
- 🍰 Desserts (Bakery, Ice Cream)
- 🦐 Seafood (Chinese, Asian)
- 🌮 Mexican (Latin, Tacos)
- ☕ Coffee (Beverages, Snacks)

---

## 🧠 Key Learnings

This project helped reinforce and apply the following concepts:

- Understanding and applying **CDNs vs NPM-based setups**
- **JSX** and the transformation process: `JSX ➝ React.createElement ➝ JS Object ➝ DOM`
- **Functional Components** & **Component Composition**
- **React Hooks** – `useState`, `useEffect`, and creating custom hooks
- **Routing** with `React Router DOM`
- Difference between **Client-side and Server-side Routing**
- **Redux Toolkit**: Store, slices, dispatch, selectors
- **Higher-Order Components (HOCs)**
- **Controlled vs Uncontrolled Components**
- Code splitting and **lazy loading** for performance
- **Mock Data Implementation** for realistic development
- **Vite Features**:
  - Dev & Prod builds
  - HMR (Hot Module Replacement)
  - Tree Shaking
  - Differential bundling
  - Minification & Image optimization

---

## 📁 Project Structure
```
Foodify/
├── src/
│   ├── components/        # Reusable UI components (Header, Footer, Cards, etc.)
│   ├── pages/             # Main page views (Home, Grocery, About)
│   ├── redux/             # Redux slices and store setup
│   ├── hooks/             # Custom reusable hooks
│   ├── utils/             # Utilities and mock data
│   ├── App.js             # App layout and routing
│   ├── index.js           # Entry point to render the app
│   └── index.css          # Global styling
├── public/                # Static files (images, favicon, etc.)
├── package.json           # Project metadata and dependencies
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

---

## 🚀 Deployment

### **Easy Deployment (No Backend Required):**

Since this project uses mock data, you can deploy it anywhere without backend setup:

#### **Vercel (Recommended):**
1. Connect your GitHub repo to Vercel
2. Vercel auto-detects React app
3. Deploy with one click

#### **Netlify:**
1. Connect your GitHub repo to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

#### **GitHub Pages:**
1. Add `"homepage": "https://yourusername.github.io/reponame"` to package.json
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add deploy script: `"deploy": "gh-pages -d dist"`
4. Run: `npm run build && npm run deploy`

---

## 🎯 Expected Results

✅ **Working Features:**
- Restaurant list loading (12 restaurants)
- Restaurant search functionality
- Menu display for all restaurants
- Cart functionality
- Responsive design
- No CORS errors
- No API dependencies

✅ **Mock Data Benefits:**
- Always works (no API failures)
- Fast loading (no network delays)
- Consistent data structure
- Easy to modify and extend
- Perfect for development and demo

---

🙏 Acknowledgements
Akshay Saini – For his brilliant teaching in Namaste React, which gave me the confidence and clarity to build scalable React apps.

React Docs – For being the go-to source for accurate and deep React knowledge.

Redux Toolkit Team – For simplifying state management with modern Redux practices.

Community contributors and open-source packages that supported this project.

---

📚 What I Learned
Mastered React architecture, JSX, and routing with React Router.

Learned how to manage state efficiently using Redux Toolkit.

Used custom hooks for cleaner, reusable logic.

Improved performance using lazy loading and suspense.

Built a clean, responsive UI using Tailwind CSS and utility-first design principles.

Understood modular project structure for scalable apps.

Learned how to use Vite for fast bundling and dev builds.

**Implemented comprehensive mock data** for realistic development experience.
