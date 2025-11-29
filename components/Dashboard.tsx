import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, AlertTriangle, ArrowRight } from 'lucide-react';
import { Customer } from '../types';

interface DashboardProps {
  customers: Customer[];
}

const StatCard: React.FC<{ 
  title: string; 
  value: string | number; 
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
}> = ({ title, value, icon, colorClass, bgClass }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
    </div>
    <div className={`p-3 rounded-lg ${bgClass} ${colorClass}`}>
      {icon}
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ customers }) => {
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  
  // Calculate expiring soon (next 7 days)
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  const expiringSoon = customers.filter(c => {
    if (c.status !== 'Active') return false;
    const endDate = new Date(c.subscription_end_date);
    return endDate >= today && endDate <= nextWeek;
  }).length;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Overview</h1>
          <p className="text-slate-500">Your business at a glance.</p>
        </div>
        <Link 
          to="/add-customer" 
          className="hidden md:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <UserPlus size={18} />
          Add Customer
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Customers" 
          value={totalCustomers} 
          icon={<Users size={24} />} 
          colorClass="text-blue-600"
          bgClass="bg-blue-50"
        />
        <StatCard 
          title="Active Members" 
          value={activeCustomers} 
          icon={<Users size={24} />} 
          colorClass="text-emerald-600"
          bgClass="bg-emerald-50"
        />
        <StatCard 
          title="Expiring Soon (7 Days)" 
          value={expiringSoon} 
          icon={<AlertTriangle size={24} />} 
          colorClass="text-amber-600"
          bgClass="bg-amber-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Recent Customers</h2>
            <Link to="/customers" className="text-sm text-emerald-600 font-medium hover:underline flex items-center">
              View All <ArrowRight size={16} className="ml-1"/>
            </Link>
          </div>
          <div className="space-y-4">
            {customers.slice(0, 5).map(customer => (
              <div key={customer.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-semibold">
                    {customer.full_name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{customer.full_name}</div>
                    <div className="text-xs text-slate-500">{customer.subscription_type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    customer.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </div>
            ))}
            {customers.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                No customers yet. Start by adding one!
              </div>
            )}
          </div>
        </div>

        <div className="bg-emerald-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">Grow Your Business</h2>
            <p className="text-emerald-100 mb-6 max-w-xs">
              Keep track of your monthly growth and make data-driven decisions.
            </p>
            <Link 
              to="/analytics" 
              className="inline-flex items-center bg-white text-emerald-700 px-4 py-2 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
            >
              View Analytics
            </Link>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-40 h-40 bg-emerald-400 rounded-full opacity-30 blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;