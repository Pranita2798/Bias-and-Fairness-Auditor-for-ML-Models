import React, { useState, useCallback } from 'react';
import { Upload, File, CheckCircle, AlertCircle, Database, Brain } from 'lucide-react';

interface ModelUploadProps {
  onModelUpload: (model: any) => void;
  uploadedModel: any;
}

const ModelUpload: React.FC<ModelUploadProps> = ({ onModelUpload, uploadedModel }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{
    model: File | null;
    dataset: File | null;
  }>({
    model: null,
    dataset: null,
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      // Simulate file processing
      setIsUploading(true);
      simulateUpload(files[0]);
    }
  }, []);

  const simulateUpload = (file: File) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        
        // Create mock model data
        const mockModel = {
          name: file.name,
          type: file.name.includes('.pkl') ? 'scikit-learn' : 'tensorflow',
          size: file.size,
          uploadDate: new Date().toISOString(),
          features: ['age', 'gender', 'income', 'education', 'race'],
          target: 'approved',
          accuracy: 0.87,
          status: 'ready'
        };
        
        onModelUpload(mockModel);
        setUploadProgress(0);
      }
    }, 200);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'model' | 'dataset') => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFiles(prev => ({ ...prev, [type]: file }));
      if (type === 'model') {
        simulateUpload(file);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Model Upload</h2>
        <p className="text-gray-600 mb-6">
          Upload your machine learning model and dataset to begin bias analysis. We support popular formats including scikit-learn, TensorFlow, and PyTorch models.
        </p>

        {/* Upload Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Model Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              ML Model
            </h3>
            
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Drop your model file here, or{' '}
                <label htmlFor="model-upload" className="text-blue-600 hover:text-blue-500 cursor-pointer">
                  browse
                </label>
              </p>
              <p className="text-xs text-gray-500">
                Supports .pkl, .joblib, .h5, .pb, .pth files
              </p>
              <input
                id="model-upload"
                type="file"
                className="hidden"
                accept=".pkl,.joblib,.h5,.pb,.pth"
                onChange={(e) => handleFileSelect(e, 'model')}
              />
            </div>

            {isUploading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  <span className="text-sm text-blue-800">Uploading... {uploadProgress}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Dataset Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Dataset
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Database className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Drop your dataset here, or{' '}
                <label htmlFor="dataset-upload" className="text-blue-600 hover:text-blue-500 cursor-pointer">
                  browse
                </label>
              </p>
              <p className="text-xs text-gray-500">
                Supports .csv, .json, .parquet files
              </p>
              <input
                id="dataset-upload"
                type="file"
                className="hidden"
                accept=".csv,.json,.parquet"
                onChange={(e) => handleFileSelect(e, 'dataset')}
              />
            </div>
          </div>
        </div>

        {/* Uploaded Model Info */}
        {uploadedModel && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <h4 className="text-lg font-medium text-green-800">Model Successfully Uploaded</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-green-700"><strong>Name:</strong> {uploadedModel.name}</p>
                <p className="text-sm text-green-700"><strong>Type:</strong> {uploadedModel.type}</p>
                <p className="text-sm text-green-700"><strong>Size:</strong> {(uploadedModel.size / 1024).toFixed(2)} KB</p>
              </div>
              <div>
                <p className="text-sm text-green-700"><strong>Features:</strong> {uploadedModel.features.length}</p>
                <p className="text-sm text-green-700"><strong>Target:</strong> {uploadedModel.target}</p>
                <p className="text-sm text-green-700"><strong>Accuracy:</strong> {(uploadedModel.accuracy * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Configuration */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 className="text-lg font-medium text-gray-900 mb-3">Analysis Configuration</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Protected Attributes
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Gender, Age, Race</option>
                <option>Custom Selection</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fairness Metrics
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>All Metrics</option>
                <option>Demographic Parity Only</option>
                <option>Equalized Odds Only</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelUpload;