import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, XCircle, Users, Target } from 'lucide-react';

interface DashboardProps {
  uploadedModel: any;
  analysisResults: any;
}

const Dashboard: React.FC<DashboardProps> = ({ uploadedModel, analysisResults }) => {
  const mockMetrics = [
    { name: 'Demographic Parity', value: 0.85, status: 'warning', threshold: 0.8 },
    { name: 'Equalized Odds', value: 0.72, status: 'error', threshold: 0.8 },
    { name: 'Calibration', value: 0.91, status: 'success', threshold: 0.8 },
    { name: 'Overall Fairness', value: 0.78, status: 'warning', threshold: 0.8 },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <CheckCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bias & Fairness Dashboard</h2>
        <p className="text-gray-600 mb-4">
          Welcome to the ML Bias Auditor. Upload your model and dataset to begin comprehensive fairness analysis.
        </p>
        
        {!uploadedModel ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-800 font-medium">Get Started</span>
            </div>
            <p className="text-blue-700 mt-2">
              Upload your ML model and dataset to begin bias analysis and fairness evaluation.
            </p>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">Model Loaded</span>
            </div>
            <p className="text-green-700 mt-2">
              {uploadedModel.name} is ready for analysis. Navigate to the Analysis tab to run bias detection.
            </p>
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">{metric.name}</h3>
              {getStatusIcon(metric.status)}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-gray-900">
                {(metric.value * 100).toFixed(1)}%
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                {metric.status === 'success' ? 'Fair' : metric.status === 'warning' ? 'Caution' : 'Biased'}
              </div>
            </div>
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  metric.status === 'success' ? 'bg-green-500' : 
                  metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${metric.value * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Analysis Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Protected Groups Analysis
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Gender</span>
              <span className="text-sm font-medium text-red-600">Bias Detected</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Age</span>
              <span className="text-sm font-medium text-yellow-600">Moderate Risk</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Race</span>
              <span className="text-sm font-medium text-green-600">Fair</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Income</span>
              <span className="text-sm font-medium text-yellow-600">Moderate Risk</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Recommendations
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900 font-medium">Critical: Gender Bias</p>
                <p className="text-sm text-gray-600">Implement gender-blind preprocessing</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900 font-medium">Moderate: Age Disparity</p>
                <p className="text-sm text-gray-600">Apply age-balanced sampling</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-gray-900 font-medium">Enhancement</p>
                <p className="text-sm text-gray-600">Add fairness constraints to training</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;