import React, { useState } from 'react';
import { Upload, FileCheck, Loader2 } from 'lucide-react';

export const IPFSUploader = ({ onUploadComplete, label = "Upload Document to IPFS" }) => {
  const [uploading, setUploading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setUploading(true);

    // Simulate IPFS Hash Generation
    setTimeout(() => {
      const generatedHash = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      setIpfsHash(generatedHash);
      setUploading(false);
      if (onUploadComplete) {
        onUploadComplete(generatedHash, file.name);
      }
    }, 1500);
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-textMuted uppercase tracking-wider block">
        {label}
      </label>
      
      {!ipfsHash ? (
        <label className="border-2 border-dashed border-borderDark hover:border-primaryGreen/50 bg-bgDeep/60 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all group">
          {uploading ? (
            <div className="flex items-center gap-2 text-accentGold text-xs font-mono">
              <Loader2 size={18} className="animate-spin text-accentGold" />
              Pinning to IPFS Cluster...
            </div>
          ) : (
            <>
              <Upload size={22} className="text-textMuted group-hover:text-primaryGreen mb-1.5 transition-colors" />
              <span className="text-xs text-textPrimary font-medium">Click to upload or drag & drop</span>
              <span className="text-[10px] text-textMuted mt-0.5">PDF, PNG, JPG (Max 10MB)</span>
            </>
          )}
          <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
        </label>
      ) : (
        <div className="bg-surface border border-primaryGreen/40 p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <FileCheck size={18} className="text-primaryGreen flex-shrink-0" />
            <div className="truncate">
              <p className="text-xs font-medium text-textPrimary truncate">{fileName}</p>
              <p className="text-[10px] font-mono text-accentGold truncate">IPFS: {ipfsHash}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => { setIpfsHash(''); setFileName(''); }}
            className="text-xs text-textMuted hover:text-errorRed px-2 py-1"
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
};
