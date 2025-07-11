import React, { useState } from 'react';
import { Play, BarChart3, TrendingDown, TrendingUp, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

interface BiasAnalysisProps {
  uploadedModel: any;
  onAnalysisComplete: (results: any) => void;
  analysisResults: any;
}

const BiasAnalysis: React.FC<BiasAnalysisProps> = ({ 
  uploadedModel, 
  onAnalysisComplete, 
  analysisResults 
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis process
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          
          // Generate mock results
          const mockResults = {
            timestamp: new Date().toISOString(),
            metrics: {
              demographicParity: {
                overall: 0.78,
                byGroup: {
                  gender: { male: 0.85, female: 0.72 },
                  age: { '18-30': 0.82, '31-50': 0.79, '50+': 0.74 },
                  race: { white: 0.81, black: 0.73, hispanic: 0.77, asian: 0.83 }
                }
              },
              equalizedOdds: {
                overall: 0.72,
                byGroup: {
                  gender: { male: 0.79, female: 0.65 },
                  age: { '18-30': 0.76, '31-50': 0.73, '50+': 0.68 },
                  race: { white: 0.75, black: 0.67, hispanic: 0.71, asian: 0.78 }
                }
              },
              calibration: {
                overall: 0.91,
                byGroup: {
                  gender: { male: 0.93, female: 0.89 },
                  age: { '18-30': 0.92, '31-50': 0.91, '50+': 0.89 },
                  race: { white: 0.92, black: 0.88, hispanic: 0.90, asian: 0.94 }
                }
              }
            },
            recommendations: [
              {
                type: 'critical',
                title: 'Gender Bias in Equalized Odds',
                description: 'Significant disparity in true positive rates between male and female groups',
                actions: ['Implement gender-blind preprocessing', 'Add fairness constraints to model training']
              },
              {
                type: 'moderate',
                title: 'Age-related Bias',
                description: 'Moderate bias against older age groups across multiple metrics',
                actions: ['Balance training data across age groups', 'Use age-aware sampling techniques']
              }
            ]
          };
          
          onAnalysisComplete(mockResults);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const getMetricStatus = (value: number) => {
    if (value >= 0.8) return 'success';
    if (value >= 0.7) return 'warning';
    return 'error';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (!uploadedModel) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Model Uploaded</h3>
        <p className="text-gray-600">Please upload a model first to run bias analysis.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analysis Control */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bias Analysis</h2>
        <p className="text-gray-600 mb-6">
          Run comprehensive bias analysis on your uploaded model to identify potential fairness issues.
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span>{isAnalyzing ? 'Analyzing...' : 'Run Analysis'}</span>
            </button>
            
            {isAnalyzing && (
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{analysisProgress}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysisResults && (
        <div className="space-y-6">
          {/* Metrics Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Fairness Metrics Overview
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(analysisResults.metrics).map(([key, metric]: [string, any]) => (
                <div key={key} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <span className={`text-sm font-medium ${getStatusColor(getMetricStatus(metric.overall))}`}>
                      {(metric.overall * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        getMetricStatus(metric.overall) === 'success' ? 'bg-green-500' :
                        getMetricStatus(metric.overall) === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${metric.overall * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Group Analysis */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Group-wise Analysis</h3>
            
            <div className="space-y-6">
              {Object.entries(analysisResults.metrics.demographicParity.byGroup).map(([groupType, groups]: [string, any]) => (
                <div key={groupType} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3 capitalize">{groupType}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(groups).map(([group, value]: [string, any]) => (
                      <div key={group} className="text-center">
                        <div className="text-sm text-gray-600 mb-1 capitalize">{group}</div>
                        <div className={`text-lg font-bold ${getStatusColor(getMetricStatus(value))}`}>
                          {(value * 100).toFixed(1)}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recommendations</h3>
            
            <div className="space-y-4">
              {analysisResults.recommendations.map((rec: any, index: number) => (
                <div key={index} className={`border-l-4 pl-4 ${
                  rec.type === 'critical' ? 'border-red-500 bg-red-50' :
                  rec.type === 'moderate' ? 'border-yellow-500 bg-yellow-50' : 'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {rec.type === 'critical' ? (
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{rec.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Recommended Actions:</p>
                        <ul className="mt-1 text-sm text-gray-600">
                          {rec.actions.map((action: string, actionIndex: number) => (
                            <li key={actionIndex} className="flex items-center space-x-2">
                              <span>•</span>
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiasAnalysis;