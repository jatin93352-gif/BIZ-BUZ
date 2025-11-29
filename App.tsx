import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Menu, ArrowRight, CheckCircle2, Lock, Mail, User as UserIcon, Building } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Customers from './components/Clients';
import CustomerForm from './components/BizBot';
import Analytics from './components/Invoices';
import { User, BusinessCategory, Customer } from './types';

// --- Onboarding Components ---

const Welcome: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center animate-fade-in relative overflow-hidden">
    {/* Abstract Background Elements */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-50 rounded-full blur-3xl opacity-60"></div>
    </div>

    <div className="relative z-10 max-w-2xl mx-auto">
      <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-5xl font-bold mb-8 shadow-2xl shadow-emerald-200 mx-auto transform hover:rotate-3 transition-transform duration-300">
        P
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">PulseMate</h1>
      <p className="text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed">
        Your business, simplified. <br/> 
        <span className="text-emerald-600 font-medium">Manage. Grow. Succeed.</span>
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={onStart}
          className="group bg-slate-900 hover:bg-slate-800 text-white text-lg font-semibold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
        >
          Get Started
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
        </button>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-slate-500 font-medium">
         <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={18} /> Smart Management
         </div>
         <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={18} /> Growth Analytics
         </div>
         <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={18} /> Secure Data
         </div>
      </div>
    </div>
  </div>
);

const Auth: React.FC<{ onAuth: (user: User) => void }> = ({ onAuth }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const usersDb = JSON.parse(localStorage.getItem('pulse_users_db') || '[]');

    if (isSignup) {
        if (password !== confirmPass) {
            setError("Passwords do not match");
            return;
        }
        if (usersDb.find((u: User) => u.email === email)) {
            setError("Email already registered. Please login.");
            return;
        }
        
        const newUser: User = { email, name: name || email.split('@')[0], password };
        const updatedDb = [...usersDb, newUser];
        localStorage.setItem('pulse_users_db', JSON.stringify(updatedDb));
        onAuth(newUser);
    } else {
        const user = usersDb.find((u: User) => u.email === email && u.password === password);
        if (user) {
            onAuth(user);
        } else {
            setError("Invalid email or password");
        }
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 to-slate-900 z-10"></div>
        <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
            alt="Office" 
            className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-20 p-12 text-white max-w-lg">
            <h2 className="text-4xl font-bold mb-6">Manage your business with confidence.</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Join thousands of small business owners who trust PulseMate to organize their customers and track their growth.
            </p>
            <div className="flex gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                    <h3 className="font-bold text-2xl text-emerald-400">100%</h3>
                    <p className="text-sm text-slate-400">Secure Data</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                    <h3 className="font-bold text-2xl text-emerald-400">24/7</h3>
                    <p className="text-sm text-slate-400">Access Anywhere</p>
                </div>
            </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100">
          <div className="text-center mb-8">
             <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-4">
                <Lock size={24} />
             </div>
             <h2 className="text-3xl font-bold text-slate-800">
                {isSignup ? 'Create Account' : 'Welcome Back'}
             </h2>
             <p className="text-slate-500 mt-2">
                {isSignup ? 'Start your journey with PulseMate' : 'Enter your details to access your account'}
             </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-2">
                <span className="font-bold">Error:</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Full Name</label>
                <div className="relative">
                    <input required type="text" placeholder="John Doe" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black transition-all bg-slate-50 focus:bg-white" value={name} onChange={e => setName(e.target.value)} />
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Email Address</label>
              <div className="relative">
                <input required type="email" placeholder="you@company.com" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black transition-all bg-slate-50 focus:bg-white" value={email} onChange={e => setEmail(e.target.value)} />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Password</label>
              <div className="relative">
                <input required type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black transition-all bg-slate-50 focus:bg-white" value={password} onChange={e => setPassword(e.target.value)} />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </div>
            {isSignup && (
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Confirm Password</label>
                  <div className="relative">
                    <input required type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black transition-all bg-slate-50 focus:bg-white" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  </div>
               </div>
            )}
            <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-lg mt-2 flex items-center justify-center gap-2">
              {isSignup ? 'Create Account' : 'Sign In'}
              <ArrowRight size={18} />
            </button>
          </form>
          <div className="mt-8 text-center text-sm text-slate-500">
             {isSignup ? "Already have an account? " : "New to PulseMate? "}
             <button onClick={() => { setIsSignup(!isSignup); setError(''); }} className="text-emerald-600 font-bold hover:underline">
               {isSignup ? "Log In" : "Sign Up"}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategorySelection: React.FC<{ onSelect: (cat: BusinessCategory, businessName: string) => void }> = ({ onSelect }) => {
  const [businessName, setBusinessName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | null>(null);

  const categories: BusinessCategory[] = [
    'Gym', 'Salon', 'Coaching Centre', 'Yoga Studio', 
    'Dance Academy', 'Fitness Studio', 'Tuition Centre', 
    'Tiffin Service', 'Martial Arts', 'Custom Subscription'
  ];

  const handleFinish = () => {
    if (selectedCategory && businessName.trim()) {
        onSelect(selectedCategory, businessName);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        
        <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Setup Your Business</h2>
            <p className="text-slate-500">Tell us a bit about what you do.</p>
        </div>

        {/* Step 1: Business Name */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <label className="block text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Building className="text-emerald-600" />
                What is your Business Name?
            </label>
            <input 
                type="text" 
                placeholder="e.g. Iron Gym, City Salon, Smart Coaching..." 
                className="w-full p-4 text-lg rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black bg-slate-50 focus:bg-white transition-all"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                autoFocus
            />
        </div>
        
        {/* Step 2: Category */}
        <div className={`transition-all duration-500 ${businessName ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
            <h3 className="text-lg font-bold text-slate-800 mb-4 ml-1">Select Business Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map(cat => (
                <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                disabled={!businessName}
                className={`
                    p-4 rounded-xl shadow-sm border transition-all text-center group h-32 flex flex-col items-center justify-center
                    ${selectedCategory === cat 
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500 ring-offset-2' 
                        : 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-md'}
                    ${!businessName ? 'cursor-not-allowed grayscale opacity-60' : 'cursor-pointer'}
                `}
                >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-colors ${
                    selectedCategory === cat ? 'bg-emerald-200 text-emerald-800' : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-600'
                }`}>
                    <span className="text-lg font-bold">{cat[0]}</span>
                </div>
                <span className={`text-sm font-semibold ${selectedCategory === cat ? 'text-emerald-900' : 'text-slate-700'}`}>{cat}</span>
                </button>
            ))}
            </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4">
            <button
                onClick={handleFinish}
                disabled={!selectedCategory || !businessName}
                className={`
                    px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all transform flex items-center gap-2
                    ${selectedCategory && businessName 
                        ? 'bg-slate-900 hover:bg-slate-800 text-white hover:scale-105' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                `}
            >
                Complete Setup
                <ArrowRight size={20} />
            </button>
        </div>

      </div>
    </div>
  );
};

// --- Main App Logic ---

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('pulseUser');
    return stored ? JSON.parse(stored) : null;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
     const stored = localStorage.getItem('pulseCustomers');
     return stored ? JSON.parse(stored) : [];
  });

  const [step, setStep] = useState<'welcome' | 'auth' | 'category' | 'app'>('welcome');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Sync with local storage
  useEffect(() => {
    if (user) {
        localStorage.setItem('pulseUser', JSON.stringify(user));
        // Update user in the "db" as well if changed (e.g. category added)
        const usersDb = JSON.parse(localStorage.getItem('pulse_users_db') || '[]');
        const updatedDb = usersDb.map((u: User) => u.email === user.email ? user : u);
        localStorage.setItem('pulse_users_db', JSON.stringify(updatedDb));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pulseCustomers', JSON.stringify(customers));
  }, [customers]);

  // Determine initial step
  useEffect(() => {
    if (user) {
      if (user.category && user.businessName) {
        setStep('app');
      } else {
        setStep('category');
      }
    } else {
        setStep('welcome'); 
    }
  }, []);

  const handleStart = () => setStep('auth');
  
  const handleAuth = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.category && loggedInUser.businessName) {
       setStep('app');
    } else {
       setStep('category');
    }
  };

  const handleCategorySelect = (category: BusinessCategory, businessName: string) => {
    if (!user) return;
    const updatedUser = { ...user, category, businessName };
    setUser(updatedUser);
    setStep('app');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('pulseUser');
    setStep('welcome');
  };

  const handleSaveCustomer = (customer: Customer) => {
    setCustomers(prev => {
        const exists = prev.find(c => c.id === customer.id);
        if (exists) {
            return prev.map(c => c.id === customer.id ? customer : c);
        }
        return [...prev, customer];
    });
  };

  if (step === 'welcome') return <Welcome onStart={handleStart} />;
  if (step === 'auth') return <Auth onAuth={handleAuth} />;
  if (step === 'category') return <CategorySelection onSelect={handleCategorySelect} />;

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <Sidebar 
            isOpen={isSidebarOpen} 
            setIsOpen={setSidebarOpen} 
            userEmail={user?.email} 
            businessName={user?.businessName}
            category={user?.category}
            onLogout={handleLogout}
        />
        
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Mobile Header */}
          <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 z-10">
            <div className="flex items-center gap-2 font-bold text-lg text-slate-800">
               <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white text-sm">
                <Building size={16} />
              </div>
              <span className="truncate max-w-[180px]">{user?.businessName || 'PulseMate'}</span>
            </div>
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto scroll-smooth">
            <Routes>
              <Route path="/" element={<Dashboard customers={customers} />} />
              <Route path="/customers" element={<Customers customers={customers} />} />
              <Route path="/add-customer" element={<CustomerForm customers={customers} onSave={handleSaveCustomer} />} />
              <Route path="/edit-customer/:id" element={<CustomerForm customers={customers} onSave={handleSaveCustomer} />} />
              <Route path="/analytics" element={<Analytics customers={customers} />} />
              <Route path="/settings" element={<div className="p-8 text-center text-slate-500">Settings Coming Soon</div>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;