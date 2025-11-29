import React, { useState, useEffect } from 'react';
import { Save, Calendar, ArrowLeft } from 'lucide-react';
import { Customer } from '../types';
import { useNavigate, useParams } from 'react-router-dom';

interface CustomerFormProps {
  customers: Customer[];
  onSave: (customer: Customer) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customers, onSave }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const isEditMode = Boolean(id);
  const existingCustomer = id ? customers.find(c => c.id === id) : null;

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    joiningDate: new Date().toISOString().split('T')[0],
    subscriptionEndDate: '',
    subscriptionType: '',
    amount: '',
    notes: ''
  });

  useEffect(() => {
    if (isEditMode && existingCustomer) {
      setFormData({
        fullName: existingCustomer.full_name,
        phoneNumber: existingCustomer.phone_number,
        joiningDate: existingCustomer.joining_date,
        subscriptionEndDate: existingCustomer.subscription_end_date,
        subscriptionType: existingCustomer.subscription_type,
        amount: existingCustomer.amount.toString(),
        notes: existingCustomer.notes
      });
    }
  }, [isEditMode, existingCustomer]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phoneNumber: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Status Logic
    const today = new Date();
    today.setHours(0,0,0,0);
    const endDate = new Date(formData.subscriptionEndDate);
    const status = endDate >= today ? 'Active' : 'Expired';

    // Created Month for analytics (if new, use today, if edit use existing or today)
    const createdMonth = isEditMode && existingCustomer 
        ? existingCustomer.created_month 
        : new Date().toISOString().slice(0, 7); // YYYY-MM

    const customerData: Customer = {
      id: isEditMode && existingCustomer ? existingCustomer.id : Date.now().toString(),
      full_name: formData.fullName,
      phone_number: formData.phoneNumber,
      joining_date: formData.joiningDate,
      subscription_end_date: formData.subscriptionEndDate,
      subscription_type: formData.subscriptionType,
      amount: parseFloat(formData.amount) || 0,
      notes: formData.notes,
      status: status,
      created_month: createdMonth
    };

    onSave(customerData);
    navigate('/customers');
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/customers')} 
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {isEditMode ? 'Edit Customer' : 'Add New Customer'}
          </h1>
          <p className="text-slate-500">Enter customer details below.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Customer Full Name</label>
          <input 
            required
            type="text" 
            placeholder="John Doe"
            className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black placeholder:text-slate-400"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
          <input 
            required
            type="text" 
            placeholder="9876543210"
            className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black placeholder:text-slate-400"
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
          />
          <p className="text-xs text-slate-400 mt-1">Max 10 digits, numbers only.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Joining Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Joining Date</label>
            <div className="relative">
              <input 
                required
                type="date" 
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
                value={formData.joiningDate}
                onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={20} />
            </div>
          </div>

          {/* Subscription End Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Subscription End Date</label>
            <div className="relative">
              <input 
                required
                type="date" 
                className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
                value={formData.subscriptionEndDate}
                onChange={(e) => setFormData({ ...formData, subscriptionEndDate: e.target.value })}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Subscription Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Subscription Type</label>
            <select 
              required
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black bg-white"
              value={formData.subscriptionType}
              onChange={(e) => setFormData({ ...formData, subscriptionType: e.target.value })}
            >
              <option value="" disabled>Select Type</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Half-Yearly">Half-Yearly</option>
              <option value="Yearly">Yearly</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Amount</label>
            <input 
              required
              type="number" 
              placeholder="0.00"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Notes</label>
          <textarea 
            rows={3}
            placeholder="Additional details..."
            className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-black resize-none"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button 
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Save size={20} />
            {isEditMode ? 'Update Customer' : 'Save Customer'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default CustomerForm;