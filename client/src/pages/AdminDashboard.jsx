import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Bus,
  Layers,
  MapPin,
  Settings,
  LogOut,
  Search,
  Filter,
  CheckCircle,
  Clock,
  MessageSquare,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Phone,
  Mail,
  Camera,
  Star,
  RefreshCw,
  Upload,
  AlertCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('yt_admin_token');
  const user = JSON.parse(localStorage.getItem('yt_admin_user') || '{}');

  const [activeTab, setActiveTab] = useState('enquiries'); // 'enquiries', 'fleet', 'routes', 'gallery', 'testimonials', 'settings'
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Enquiries state
  const [enquiries, setEnquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [quoteAmount, setQuoteAmount] = useState('');
  const [quoteNotes, setQuoteNotes] = useState('');

  // Fleet state
  const [fleet, setFleet] = useState([]);
  const [fleetModalOpen, setFleetModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [vehicleForm, setVehicleForm] = useState({
    name: '',
    category: 'Tempo Travellers',
    seating_capacity: 17,
    ac_option: 'Both AC & Non-AC Available',
    bus_type: 'Luxury Coach',
    purpose: '',
    features: '',
    image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    badge: '',
    is_active: 1
  });

  // Routes state
  const [routes, setRoutes] = useState([]);
  const [routeModalOpen, setRouteModalOpen] = useState(false);
  const [routeForm, setRouteForm] = useState({
    origin: 'Pune',
    destination: '',
    region: 'Maharashtra',
    distance_km: 150,
    duration_hrs: '3.5 Hours',
    popular_for: '',
    recommended_vehicles: 'Tempo Traveller, Buses, Cars',
    is_popular: 1
  });

  // Settings state
  const [settingsForm, setSettingsForm] = useState({
    company_name: '',
    tagline: '',
    main_location: '',
    phone: '',
    whatsapp_number: '',
    email: '',
    office_address: '',
    google_maps_embed: ''
  });

  // Password state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Verify auth on mount
  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchSettings();
  }, [token]);

  useEffect(() => {
    if (activeTab === 'enquiries') fetchEnquiries();
    if (activeTab === 'fleet') fetchFleet();
    if (activeTab === 'routes') fetchRoutes();
    if (activeTab === 'settings') fetchSettings();
  }, [activeTab, statusFilter, searchQuery]);

  const handleLogout = () => {
    localStorage.removeItem('yt_admin_token');
    localStorage.removeItem('yt_admin_user');
    navigate('/admin');
  };

  const showNotification = (msg, isError = false) => {
    if (isError) {
      setErrorMsg(msg);
      setTimeout(() => setErrorMsg(''), 4000);
    } else {
      setSuccessMsg(msg);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  // --- API CALLS ---
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== 'All') params.append('status', statusFilter);
      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`/api/enquiries?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateEnquiryStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/enquiries/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Status updated to "${status}"`);
        fetchEnquiries();
      }
    } catch (err) {
      showNotification('Failed to update status', true);
    }
  };

  const saveQuotation = async (id) => {
    try {
      const res = await fetch(`/api/enquiries/${id}/quotation`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          quotation_amount: quoteAmount,
          quotation_notes: quoteNotes,
          status: 'Quotation Sent'
        })
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Quotation details saved and status updated');
        setSelectedEnquiry(null);
        fetchEnquiries();
      }
    } catch (err) {
      showNotification('Failed to save quotation', true);
    }
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm('Delete this enquiry permanently?')) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Enquiry deleted');
        fetchEnquiries();
      }
    } catch (err) {
      showNotification('Delete failed', true);
    }
  };

  const fetchFleet = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/fleet/all-admin', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setFleet(data.vehicles);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveVehicle = async (e) => {
    e.preventDefault();
    try {
      const isEdit = !!editingVehicle;
      const url = isEdit ? `/api/fleet/${editingVehicle.id}` : '/api/fleet';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(vehicleForm)
      });
      const data = await res.json();
      if (data.success) {
        showNotification(isEdit ? 'Vehicle updated successfully' : 'Vehicle added to fleet');
        setFleetModalOpen(false);
        setEditingVehicle(null);
        fetchFleet();
      }
    } catch (err) {
      showNotification('Failed to save vehicle', true);
    }
  };

  const deleteVehicle = async (id) => {
    if (!window.confirm('Delete this vehicle from fleet?')) return;
    try {
      const res = await fetch(`/api/fleet/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Vehicle deleted');
        fetchFleet();
      }
    } catch (err) {
      showNotification('Delete failed', true);
    }
  };

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/routes');
      const data = await res.json();
      if (data.success) {
        setRoutes(data.routes);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveRoute = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/routes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(routeForm)
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Route added successfully');
        setRouteModalOpen(false);
        fetchRoutes();
      }
    } catch (err) {
      showNotification('Failed to add route', true);
    }
  };

  const deleteRoute = async (id) => {
    if (!window.confirm('Delete this route?')) return;
    try {
      const res = await fetch(`/api/routes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Route deleted');
        fetchRoutes();
      }
    } catch (err) {
      showNotification('Delete failed', true);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.settings) {
        setSettingsForm(data.settings);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settingsForm)
      });
      const data = await res.json();
      if (data.success) {
        showNotification('Settings updated successfully');
      }
    } catch (err) {
      showNotification('Failed to update settings', true);
    }
  };

  // Helper for generating WhatsApp message to client from Admin
  const openWhatsAppToClient = (enquiry) => {
    const cleanPhone = String(enquiry.mobile_number).replace(/\D/g, '');
    const text = `Hello ${enquiry.customer_name}, Greetings from Yedeshwari Travels Pune!
Regarding your travel enquiry (${enquiry.reference_no}) for ${enquiry.pickup_city} to ${enquiry.destination_city} on ${enquiry.start_date}:
${enquiry.quotation_amount ? `Your estimated quotation is ₹${enquiry.quotation_amount}.` : 'We have reviewed your vehicle requirement.'}
Vehicle: ${enquiry.vehicle_category} (${enquiry.ac_preference})
Please let us know if you would like to proceed with vehicle confirmation.`;

    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800">

      {/* Top Navbar */}
      <header className="bg-[#0a192f] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 sticky top-0 z-30 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
            <img src="/yedeshwari-logo.svg" alt="Yedeshwari Travels Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center">
              <span className="text-lg font-black font-heading tracking-tight text-white">YEDESHWARI</span>
              <span className="text-lg font-black text-amber-400 ml-1.5 font-heading">ADMIN</span>
            </div>
            <p className="text-[10px] text-slate-200">Operations Control Center • Kalewadi, Pune</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-white">{user.name || 'Admin User'}</p>
            <p className="text-[10px] text-amber-400 uppercase font-semibold">{user.role || 'Superadmin'}</p>
          </div>

          <Link
            to="/"
            target="_blank"
            className="hidden md:flex items-center px-3 py-1.5 text-xs text-white bg-white/10 hover:bg-white/20 rounded-lg border border-white/15"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1 text-amber-400" />
            View Live Website
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center px-3 py-1.5 text-xs font-semibold text-red-200 bg-red-900/40 hover:bg-red-800/60 border border-red-500/30 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 mr-1" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

        {/* Toast Alerts */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500 text-white text-xs font-semibold shadow-lg flex items-center justify-between animate-in slide-in-from-top-2">
            <span>{successMsg}</span>
            <button onClick={() => setSuccessMsg('')}>✕</button>
          </div>
        )}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-600 text-white text-xs font-semibold shadow-lg flex items-center justify-between animate-in slide-in-from-top-2">
            <span>{errorMsg}</span>
            <button onClick={() => setErrorMsg('')}>✕</button>
          </div>
        )}

        {/* Dashboard Tabs */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`flex items-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-heading ${activeTab === 'enquiries' ? 'bg-[#0a192f] text-amber-400 shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
          >
            <Clock className="w-4 h-4 mr-2" />
            Customer Enquiries ({enquiries.length})
          </button>

          <button
            onClick={() => setActiveTab('fleet')}
            className={`flex items-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-heading ${activeTab === 'fleet' ? 'bg-[#0a192f] text-amber-400 shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
          >
            <Bus className="w-4 h-4 mr-2" />
            Fleet Management
          </button>

          <button
            onClick={() => setActiveTab('routes')}
            className={`flex items-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-heading ${activeTab === 'routes' ? 'bg-[#0a192f] text-amber-400 shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Popular Routes
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-heading ${activeTab === 'settings' ? 'bg-[#0a192f] text-amber-400 shadow-md' : 'text-slate-700 hover:bg-slate-100'
              }`}
          >
            <Settings className="w-4 h-4 mr-2" />
            Company & WhatsApp Settings
          </button>
        </div>

        {/* TAB 1: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            {/* Search and Filters Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-2 flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by Customer, Mobile, Reference (e.g. YT-2026), City..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#3a2d97]"
                />
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs font-medium text-slate-500">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Quotation Sent">Quotation Sent</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <button
                  onClick={fetchEnquiries}
                  className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg"
                  title="Refresh"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Enquiries Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {loading ? (
                <div className="py-16 text-center text-slate-400">Loading enquiries...</div>
              ) : enquiries.length === 0 ? (
                <div className="py-16 text-center text-slate-500">No enquiries found matching criteria.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Ref No / Date</th>
                        <th className="py-3 px-4">Customer Details</th>
                        <th className="py-3 px-4">Route & Travel Date</th>
                        <th className="py-3 px-4">Vehicle & Passengers</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Quotation (₹)</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {enquiries.map((enquiry) => (
                        <tr key={enquiry.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
                              {enquiry.reference_no}
                            </span>
                            <p className="text-[10px] text-slate-400 mt-1">
                              {new Date(enquiry.created_at).toLocaleDateString()}
                            </p>
                          </td>

                          <td className="py-3.5 px-4">
                            <p className="font-bold text-slate-900">{enquiry.customer_name}</p>
                            <a href={`tel:${enquiry.mobile_number}`} className="text-slate-600 hover:text-amber-600 font-medium block">
                              📞 {enquiry.mobile_number}
                            </a>
                            {enquiry.email && <p className="text-[11px] text-slate-400">✉ {enquiry.email}</p>}
                          </td>

                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-slate-800">
                              {enquiry.pickup_city} ➔ {enquiry.destination_city}
                            </p>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              📅 {enquiry.start_date} {enquiry.end_date ? `to ${enquiry.end_date}` : ''} ({enquiry.trip_type})
                            </p>
                          </td>

                          <td className="py-3.5 px-4">
                            <p className="font-semibold text-slate-800">
                              {enquiry.vehicle_category} {enquiry.seating_capacity ? `(${enquiry.seating_capacity})` : ''}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {enquiry.ac_preference} • {enquiry.passenger_count} Pax • {enquiry.trip_purpose}
                            </p>
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={enquiry.status}
                              onChange={(e) => updateEnquiryStatus(enquiry.id, e.target.value)}
                              className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${enquiry.status === 'New' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                enquiry.status === 'Contacted' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                                  enquiry.status === 'Quotation Sent' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                                    enquiry.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                                      enquiry.status === 'Completed' ? 'bg-slate-200 text-slate-700 border-slate-300' :
                                        'bg-red-100 text-red-800 border-red-200'
                                }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Quotation Sent">Quotation Sent</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4">
                            {enquiry.quotation_amount ? (
                              <span className="font-bold text-emerald-700">₹{parseFloat(enquiry.quotation_amount).toLocaleString()}</span>
                            ) : (
                              <span className="text-slate-400 italic">Pending</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                            {/* Quote button */}
                            <button
                              onClick={() => {
                                setSelectedEnquiry(enquiry);
                                setQuoteAmount(enquiry.quotation_amount || '');
                                setQuoteNotes(enquiry.quotation_notes || '');
                              }}
                              className="px-2.5 py-1 text-[11px] font-semibold text-white bg-[#0a192f] hover:bg-[#0a192f] rounded-md"
                              title="Add / Edit Quotation"
                            >
                              Quote
                            </button>

                            {/* WhatsApp link */}
                            <button
                              onClick={() => openWhatsAppToClient(enquiry)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md"
                              title="Open WhatsApp chat with client"
                            >
                              WhatsApp
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => deleteEnquiry(enquiry.id)}
                              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                              title="Delete enquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quotation Modal */}
            {selectedEnquiry && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
                  <h3 className="text-lg font-bold text-amber-600 font-heading mb-1">
                    Manage Quotation for {selectedEnquiry.customer_name}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Ref: {selectedEnquiry.reference_no} • {selectedEnquiry.pickup_city} to {selectedEnquiry.destination_city}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Quotation Amount (₹ INR)
                      </label>
                      <input
                        type="number"
                        value={quoteAmount}
                        onChange={(e) => setQuoteAmount(e.target.value)}
                        placeholder="e.g. 18500"
                        className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-[#3a2d97]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Quotation Notes / Rate Breakdown
                      </label>
                      <textarea
                        rows="3"
                        value={quoteNotes}
                        onChange={(e) => setQuoteNotes(e.target.value)}
                        placeholder="e.g. Includes driver allowance, state tax, and 300km per day. Toll extra at actuals."
                        className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-[#3a2d97]"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setSelectedEnquiry(null)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveQuotation(selectedEnquiry.id)}
                        className="px-4 py-2 text-xs font-bold text-amber-600 bg-[#0a192f] text-white hover:bg-amber-300 rounded-xl font-heading"
                      >
                        Save Quotation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: FLEET MANAGEMENT */}
        {activeTab === 'fleet' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-amber-600 font-heading">Vehicle Fleet Roster</h3>
                <p className="text-xs text-slate-500">Manage seating capacities, AC options, and photographs.</p>
              </div>
              <button
                onClick={() => {
                  setEditingVehicle(null);
                  setVehicleForm({
                    name: '',
                    category: 'Tempo Travellers',
                    seating_capacity: 17,
                    ac_option: 'Both AC & Non-AC Available',
                    bus_type: 'Luxury Coach',
                    purpose: '',
                    features: 'Air Conditioning, Pushback Seats, Luggage Boot, GPS',
                    image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
                    badge: '',
                    is_active: 1
                  });
                  setFleetModalOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 text-xs font-bold text-amber-600 bg-[#0a192f] text-white hover:bg-amber-300 rounded-xl font-heading shadow"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add New Vehicle
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fleet.map((v) => (
                <div key={v.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="relative h-44 bg-slate-800">
                      <img src={v.image_url} alt={v.name} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-[#0a192f]/80 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded">
                        {v.category}
                      </span>
                      <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                        {v.seating_capacity} Seats • {v.ac_option}
                      </span>
                    </div>

                    <div className="p-4">
                      <h4 className="text-base font-bold text-amber-600 font-heading">{v.name}</h4>
                      <p className="text-xs text-amber-600 font-semibold">{v.bus_type}</p>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2">{v.purpose}</p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Status: {v.is_active ? <span className="text-emerald-600 font-bold">Active</span> : <span className="text-slate-400">Hidden</span>}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setEditingVehicle(v);
                          setVehicleForm({
                            name: v.name,
                            category: v.category,
                            seating_capacity: v.seating_capacity,
                            ac_option: v.ac_option,
                            bus_type: v.bus_type,
                            purpose: v.purpose,
                            features: Array.isArray(v.features) ? v.features.join(', ') : v.features,
                            image_url: v.image_url,
                            badge: v.badge || '',
                            is_active: v.is_active
                          });
                          setFleetModalOpen(true);
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteVehicle(v.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Vehicle Modal */}
            {fleetModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8">
                  <h3 className="text-lg font-bold text-amber-600 font-heading mb-4">
                    {editingVehicle ? 'Edit Vehicle Details' : 'Add New Vehicle to Fleet'}
                  </h3>

                  <form onSubmit={saveVehicle} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Name *</label>
                      <input
                        type="text"
                        required
                        value={vehicleForm.name}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, name: e.target.value })}
                        placeholder="e.g. 26 Seater Luxury Coach"
                        className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                        <select
                          value={vehicleForm.category}
                          onChange={(e) => setVehicleForm({ ...vehicleForm, category: e.target.value })}
                          className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                        >
                          <option value="Tempo Travellers">Tempo Travellers</option>
                          <option value="Mini Buses">Mini Buses</option>
                          <option value="Large Buses">Large Buses</option>
                          <option value="Luxury Buses">Luxury Buses</option>
                          <option value="Cars">Cars & SUVs</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Seating Capacity *</label>
                        <input
                          type="number"
                          required
                          value={vehicleForm.seating_capacity}
                          onChange={(e) => setVehicleForm({ ...vehicleForm, seating_capacity: parseInt(e.target.value, 10) })}
                          className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">AC Option *</label>
                        <select
                          value={vehicleForm.ac_option}
                          onChange={(e) => setVehicleForm({ ...vehicleForm, ac_option: e.target.value })}
                          className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                        >
                          <option value="Both AC & Non-AC Available">Both AC & Non-AC Available</option>
                          <option value="AC">AC Only</option>
                          <option value="Non-AC">Non-AC Only</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Bus / Car Type</label>
                        <input
                          type="text"
                          value={vehicleForm.bus_type}
                          onChange={(e) => setVehicleForm({ ...vehicleForm, bus_type: e.target.value })}
                          placeholder="e.g. Pushback Coach, Sedan"
                          className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Suitable Purpose</label>
                      <input
                        type="text"
                        value={vehicleForm.purpose}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, purpose: e.target.value })}
                        placeholder="Weddings, Corporate, Pilgrimage"
                        className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Features (comma separated)</label>
                      <input
                        type="text"
                        value={vehicleForm.features}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, features: e.target.value })}
                        placeholder="Pushback Seats, Chilled AC, Baggage Hold, USB"
                        className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={vehicleForm.image_url}
                        onChange={(e) => setVehicleForm({ ...vehicleForm, image_url: e.target.value })}
                        placeholder="https://..."
                        className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Card Badge (Optional)</label>
                        <input
                          type="text"
                          value={vehicleForm.badge}
                          onChange={(e) => setVehicleForm({ ...vehicleForm, badge: e.target.value })}
                          placeholder="Popular, Best Seller"
                          className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
                        <select
                          value={vehicleForm.is_active}
                          onChange={(e) => setVehicleForm({ ...vehicleForm, is_active: parseInt(e.target.value, 10) })}
                          className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                        >
                          <option value="1">Active (Visible)</option>
                          <option value="0">Draft / Inactive</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setFleetModalOpen(false)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold text-amber-600 bg-[#0a192f] text-white hover:bg-amber-300 rounded-xl font-heading"
                      >
                        Save Vehicle
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ROUTES */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-amber-600 font-heading">Popular Routes from Pune</h3>
                <p className="text-xs text-slate-500">Maharashtra intercity & All-India highway corridors.</p>
              </div>
              <button
                onClick={() => setRouteModalOpen(true)}
                className="inline-flex items-center px-4 py-2 text-xs font-bold text-amber-600 bg-[#0a192f] text-white hover:bg-amber-300 rounded-xl font-heading shadow"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                Add New Route
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                    <th className="py-3 px-4">Route</th>
                    <th className="py-3 px-4">Region</th>
                    <th className="py-3 px-4">Distance & Duration</th>
                    <th className="py-3 px-4">Highlights</th>
                    <th className="py-3 px-4">Recommended Vehicles</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {routes.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {r.origin} ➔ {r.destination}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${r.region === 'Maharashtra' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                          {r.region}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {r.distance_km} km • {r.duration_hrs}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {r.popular_for}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {r.recommended_vehicles}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => deleteRoute(r.id)}
                          className="p-1 text-red-500 hover:text-red-700"
                          title="Delete route"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Route Add Modal */}
            {routeModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
                  <h3 className="text-lg font-bold text-amber-600 font-heading mb-4">Add Route Destination</h3>
                  <form onSubmit={saveRoute} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Origin</label>
                        <input
                          type="text"
                          required
                          value={routeForm.origin}
                          onChange={(e) => setRouteForm({ ...routeForm, origin: e.target.value })}
                          className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Destination *</label>
                        <input
                          type="text"
                          required
                          value={routeForm.destination}
                          onChange={(e) => setRouteForm({ ...routeForm, destination: e.target.value })}
                          placeholder="e.g. Mahabaleshwar"
                          className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Region *</label>
                        <select
                          value={routeForm.region}
                          onChange={(e) => setRouteForm({ ...routeForm, region: e.target.value })}
                          className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                        >
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="All India">All India</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Distance (km) *</label>
                        <input
                          type="number"
                          required
                          value={routeForm.distance_km}
                          onChange={(e) => setRouteForm({ ...routeForm, distance_km: parseInt(e.target.value, 10) })}
                          className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Estimated Duration</label>
                      <input
                        type="text"
                        value={routeForm.duration_hrs}
                        onChange={(e) => setRouteForm({ ...routeForm, duration_hrs: e.target.value })}
                        placeholder="e.g. 4 Hours"
                        className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Highlights / Popular For</label>
                      <input
                        type="text"
                        value={routeForm.popular_for}
                        onChange={(e) => setRouteForm({ ...routeForm, popular_for: e.target.value })}
                        placeholder="e.g. Hill Station, Strawberries & Viewpoints"
                        className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                      />
                    </div>

                    <div className="pt-3 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setRouteModalOpen(false)}
                        className="px-4 py-2 text-xs text-slate-600 bg-slate-100 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-bold text-amber-600 bg-[#0a192f] text-white rounded-xl font-heading"
                      >
                        Save Route
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 max-w-3xl">
            <h3 className="text-xl font-bold text-amber-600 font-heading mb-1">
              Company & Contact Settings
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Configure phone numbers, WhatsApp dispatch desk number, and address displayed across website.
            </p>

            <form onSubmit={saveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={settingsForm.company_name}
                    onChange={(e) => setSettingsForm({ ...settingsForm, company_name: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Main Mobile & Helpline Phone *
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    placeholder="+91 9767224445"
                    className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 font-bold"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Primary call and customer contact line.</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Number (country code + 10 digits) *
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.whatsapp_number}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })}
                    placeholder="919767224445"
                    className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 font-mono font-bold"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Used by floating WhatsApp button & prefilled booking links.</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Additional Direct Helplines (comma-separated)
                </label>
                <input
                  type="text"
                  value={settingsForm.additional_phones || ''}
                  onChange={(e) => setSettingsForm({ ...settingsForm, additional_phones: e.target.value })}
                  placeholder="+91 9860451641, +91 9096965271, +91 9322112095"
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 font-mono"
                />
                <p className="text-[10px] text-slate-400 mt-0.5">Displayed on top bar, contact section, mobile drawer, and footer.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Official Email Address</label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Main Location</label>
                  <input
                    type="text"
                    value={settingsForm.main_location}
                    onChange={(e) => setSettingsForm({ ...settingsForm, main_location: e.target.value })}
                    className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Office Address</label>
                <textarea
                  rows="2"
                  value={settingsForm.office_address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, office_address: e.target.value })}
                  className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-amber-600 bg-[#0a192f] text-white hover:bg-amber-300 rounded-xl font-heading shadow"
                  className="px-6 py-2.5 text-xs font-bold bg-[#0a192f] text-white hover:bg-slate-800 rounded-xl font-heading shadow"
                >
                  Save Company Settings
                </button>
              </div>
            </form>

            {/* Change Admin Password Section */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <h4 className="text-lg font-bold text-[#0a192f] font-heading mb-1">
                Change Admin Password
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                Update the master administrator credentials for securing this dashboard.
              </p>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
                    showNotification('New passwords do not match', true);
                    return;
                  }
                  if (passwordForm.newPassword.length < 6) {
                    showNotification('Password must be at least 6 characters', true);
                    return;
                  }
                  try {
                    setPasswordLoading(true);
                    const res = await fetch('/api/auth/change-password', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                      },
                      body: JSON.stringify({
                        currentPassword: passwordForm.currentPassword,
                        newPassword: passwordForm.newPassword
                      })
                    });
                    const data = await res.json();
                    if (data.success) {
                      showNotification('Admin password updated successfully!');
                      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    } else {
                      showNotification(data.message || 'Failed to update password', true);
                    }
                  } catch (err) {
                    showNotification('Failed to update password', true);
                  } finally {
                    setPasswordLoading(false);
                  }
                }}
                className="space-y-4 max-w-md"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Admin Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    placeholder="Enter current password"
                    className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="Min 6 characters"
                      className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      placeholder="Re-enter new password"
                      className="w-full text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="px-5 py-2.5 text-xs font-bold bg-amber-400 text-[#0a192f] hover:bg-amber-300 rounded-xl font-heading shadow transition-all disabled:opacity-50"
                >
                  {passwordLoading ? 'Updating Password...' : 'Update Password'}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}


