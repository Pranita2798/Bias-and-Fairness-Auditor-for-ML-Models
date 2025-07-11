import React, { useState } from 'react';
import { Upload, BarChart3, Shield, FileText, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ModelUpload from './components/ModelUpload';
import BiasAnalysis from './components/BiasAnalysis';
import Reports from './components/Reports';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadedModel, setUploadedModel] = useState<any>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'upload', label: 'Model Upload', icon: Upload },
    { id: 'analysis', label: 'Bias Analysis', icon: Shield },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">ML Bias Auditor</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">v1.0.0</span>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard 
            uploadedModel={uploadedModel} 
            analysisResults={analysisResults}
          />
        )}
        {activeTab === 'upload' && (
          <ModelUpload 
            onModelUpload={setUploadedModel}
            uploadedModel={uploadedModel}
          />
        )}
        {activeTab === 'analysis' && (
          <BiasAnalysis 
            uploadedModel={uploadedModel}
            onAnalysisComplete={setAnalysisResults}
            analysisResults={analysisResults}
          />
        )}
        {activeTab === 'reports' && (
          <Reports 
            uploadedModel={uploadedModel}
            analysisResults={analysisResults}
          />
        )}
      </main>
    </div>
  );
}

export default App;