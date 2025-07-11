import React from 'react';
import { Download, FileText, Share2, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

interface ReportsProps {
  uploadedModel: any;
  analysisResults: any;
}

const Reports: React.FC<ReportsProps> = ({ uploadedModel, analysisResults }) => {
  const generateReport = (format: string) => {
    // Simulate report generation
    const reportData = {
      modelName: uploadedModel?.name || 'Unknown Model',
      analysisDate: new Date().toISOString().split('T')[0],
      overallFairness: analysisResults ? 'Moderate Risk' : 'Not Analyzed',
      format: format
    };
    
    console.log('Generating report:', reportData);
    
    // In a real application, this would generate and download the actual report
    alert(`${format.toUpperCase()} report generated for ${reportData.modelName}`);
  };

  if (!uploadedModel) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Model Available</h3>
        <p className="text-gray-600">Upload a model and run analysis to generate reports.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis Reports</h2>
        <p className="text-gray-600 mb-6">
          Generate comprehensive reports for your bias analysis results. Share findings with stakeholders and maintain audit trails.
        </p>

        {/* Report Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Report Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Model Name</p>
              <p className="font-medium">{uploadedModel.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Analysis Date</p>
              <p className="font-medium">
                {analysisResults ? new Date(analysisResults.timestamp).toLocaleDateString() : 'Not analyzed'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Overall Status</p>
              <div className="flex items-center space-x-2">
                {analysisResults ? (
                  <>
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="text-yellow-700 font-medium">Moderate Risk</span>
                  </>
                ) : (
                  <>
                    <div className="h-4 w-4 bg-gray-400 rounded-full" />
                    <span className="text-gray-600">Not Analyzed</span>
                  </>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Protected Groups</p>
              <p className="font-medium">Gender, Age, Race</p>
            </div>
          </div>
        </div>

        {/* Report Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Executive Summary */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-3">
              <FileText className="h-5 w-5 text-blue-600 mr-2" />
              <h4 className="font-medium text-gray-900">Executive Summary</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              High-level overview of bias analysis findings for executive stakeholders.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => generateReport('pdf')}
                className="w-full text-left px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
              >
                <Download className="h-4 w-4 inline mr-2" />
                Download PDF
              </button>
              <button
                onClick={() => generateReport('docx')}
                className="w-full text-left px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100"
              >
                <Download className="h-4 w-4 inline mr-2" />
                Download DOCX
              </button>
            </div>
          </div>

          {/* Technical Report */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Calendar className="h-5 w-5 text-green-600 mr-2" />
              <h4 className="font-medium text-gray-900">Technical Report</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Detailed technical analysis with metrics, methodology, and statistical findings.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => generateReport('pdf')}
                className="w-full text-left px-3 py-2 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100"
              >
                <Download className="h-4 w-4 inline mr-2" />
                Download PDF
              </button>
              <button
                onClick={() => generateReport('html')}
                className="w-full text-left px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100"
              >
                <Download className="h-4 w-4 inline mr-2" />
                Download HTML
              </button>
            </div>
          </div>

          {/* Compliance Report */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center mb-3">
              <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
              <h4 className="font-medium text-gray-900">Compliance Report</h4>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Regulatory compliance documentation for audit and legal requirements.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => generateReport('pdf')}
                className="w-full text-left px-3 py-2 text-sm bg-purple-50 text-purple-700 rounded hover:bg-purple-100"
              >
                <Download className="h-4 w-4 inline mr-2" />
                Download PDF
              </button>
              <button
                onClick={() => generateReport('json')}
                className="w-full text-left px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded hover:bg-gray-100"
              >
                <Download className="h-4 w-4 inline mr-2" />
                Download JSON
              </button>
            </div>
          </div>
        </div>

        {/* Analysis Results Preview */}
        {analysisResults && (
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Analysis Results Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded p-3">
                <p className="text-sm text-gray-600">Demographic Parity</p>
                <p className="text-lg font-bold text-yellow-600">
                  {(analysisResults.metrics.demographicParity.overall * 100).toFixed(1)}%
                </p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="text-sm text-gray-600">Equalized Odds</p>
                <p className="text-lg font-bold text-red-600">
                  {(analysisResults.metrics.equalizedOdds.overall * 100).toFixed(1)}%
                </p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="text-sm text-gray-600">Calibration</p>
                <p className="text-lg font-bold text-green-600">
                  {(analysisResults.metrics.calibration.overall * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sharing Options */}
        <div className="mt-6 border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Share Results</h3>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              <Share2 className="h-4 w-4" />
              <span>Share Link</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
              <Calendar className="h-4 w-4" />
              <span>Schedule Email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;