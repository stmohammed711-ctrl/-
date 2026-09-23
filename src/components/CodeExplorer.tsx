import React, { useState } from 'react';
import {
  FileCode,
  FileText,
  Settings,
  FolderTree,
  Copy,
  Check,
  Search,
  Download,
  ExternalLink,
  Layers,
  Sparkles
} from 'lucide-react';
import { PROJECT_FILES, ProjectFile } from '../data/androidProjectSource';

interface CodeExplorerProps {
  initialFilePath?: string;
  onDownloadZip: () => void;
}

export const CodeExplorer: React.FC<CodeExplorerProps> = ({ initialFilePath, onDownloadZip }) => {
  const [selectedPath, setSelectedPath] = useState<string>(initialFilePath || PROJECT_FILES[0].path);
  const [filterCategory, setFilterCategory] = useState<'all' | 'java' | 'xml' | 'gradle' | 'config' | 'doc'>('all');
  const [searchFileQuery, setSearchFileQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const activeFile = PROJECT_FILES.find((f) => f.path === selectedPath) || PROJECT_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingleFile = () => {
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name.replace(/ \(.+\)/, '');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredFiles = PROJECT_FILES.filter((f) => {
    const matchesCategory = filterCategory === 'all' || f.category === filterCategory;
    const matchesSearch =
      searchFileQuery === '' ||
      f.name.toLowerCase().includes(searchFileQuery.toLowerCase()) ||
      f.path.toLowerCase().includes(searchFileQuery.toLowerCase()) ||
      f.description.includes(searchFileQuery);
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadge = (cat: ProjectFile['category']) => {
    switch (cat) {
      case 'java':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Java</span>;
      case 'xml':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">XML</span>;
      case 'gradle':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Gradle</span>;
      case 'config':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">Config</span>;
      case 'doc':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-500/20 text-slate-400 border border-slate-500/30">Doc</span>;
    }
  };

  const lines = activeFile.content.split('\n');

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[740px]">
      {/* File Tree Sidebar */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-l border-slate-800 bg-slate-950/60 flex flex-col h-1/3 md:h-full">
        {/* Search & Category Filter */}
        <div className="p-3 border-b border-slate-800/80 space-y-2">
          <div className="relative">
            <input
              type="text"
              value={searchFileQuery}
              onChange={(e) => setSearchFileQuery(e.target.value)}
              placeholder="ابحث في ملفات الأندرويد..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-8 pl-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-emerald-500/50"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-2.5" />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 text-[11px]">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'java', label: 'Java' },
              { id: 'xml', label: 'XML' },
              { id: 'gradle', label: 'Gradle' },
              { id: 'doc', label: 'دليل' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id as any)}
                className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                  filterCategory === tab.id
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Files List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-900/80 p-1.5">
          {filteredFiles.map((file) => {
            const isSelected = file.path === selectedPath;
            return (
              <button
                key={file.path}
                onClick={() => setSelectedPath(file.path)}
                className={`w-full text-right p-2.5 rounded-xl flex items-start gap-2.5 transition-all text-xs ${
                  isSelected
                    ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-700/50 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {file.category === 'java' && <FileCode className="w-4 h-4 text-amber-400" />}
                  {file.category === 'xml' && <Layers className="w-4 h-4 text-blue-400" />}
                  {file.category === 'gradle' && <Settings className="w-4 h-4 text-emerald-400" />}
                  {file.category === 'config' && <Settings className="w-4 h-4 text-purple-400" />}
                  {file.category === 'doc' && <FileText className="w-4 h-4 text-slate-400" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="font-bold truncate">{file.name}</span>
                    {getCategoryBadge(file.category)}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono truncate">{file.path}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Download Helper */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
          <button
            onClick={onDownloadZip}
            className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-1.5 active:scale-98 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تحميل المشروع كاملاً ZIP</span>
          </button>
        </div>
      </div>

      {/* Code Viewer Panel */}
      <div className="flex-1 flex flex-col h-2/3 md:h-full bg-slate-950">
        {/* Code Header Bar */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2 bg-slate-900/50">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-100 font-mono">{activeFile.name}</h3>
              {getCategoryBadge(activeFile.category)}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">{activeFile.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadSingleFile}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5 transition-colors"
              title="تنزيل هذا الملف منفرداً"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تنزيل الملف</span>
            </button>

            <button
              onClick={handleCopy}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-950/60 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-900/60'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ الكود'}</span>
            </button>
          </div>
        </div>

        {/* Path breadcrumb */}
        <div className="px-4 py-1.5 bg-slate-900/30 border-b border-slate-800/40 text-[11px] font-mono text-slate-500 flex items-center justify-between">
          <span>{activeFile.path}</span>
          <span>{lines.length} سطر • UTF-8</span>
        </div>

        {/* Code Content Container */}
        <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-300 selection:bg-emerald-600/40 selection:text-white leading-relaxed">
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60">
                  <td className="w-10 select-none text-slate-600 text-right pl-3 pr-2 align-top text-[11px]">
                    {idx + 1}
                  </td>
                  <td className="text-left whitespace-pre font-mono pl-4 align-top" dir="ltr">
                    {line}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
