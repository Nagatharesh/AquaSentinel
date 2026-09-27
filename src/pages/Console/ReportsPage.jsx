import React, { useState, useMemo } from 'react';
import { FileText, Search, Filter, Sparkles } from 'lucide-react';
import { COMPLIANCE_REPORTS_DATA } from '../../data/reportsData';
import { ReportCard } from '../../components/reports/ReportCard';
import { ReportViewerModal } from '../../components/reports/ReportViewerModal';
import { OfficialPdfReportModal } from '../../components/reports/OfficialPdfReportModal';
import './ReportsPage.css';

export function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeReportModal, setActiveReportModal] = useState(null);
  const [activePdfModal, setActivePdfModal] = useState(null);

  const filteredReports = useMemo(() => {
    return COMPLIANCE_REPORTS_DATA.filter((rep) => {
      const matchesSearch =
        !searchTerm ||
        rep.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rep.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rep.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rep.district.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || rep.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="reports-page-wrapper">
      {/* Top Banner Meta */}
      <div className="reports-top-bar">
        <div className="reports-title-badge">
          <FileText size={13} /> Official Compliance & Statutory Audit Dossiers
        </div>
        <div className="reports-title-badge live">
          <Sparkles size={13} /> {COMPLIANCE_REPORTS_DATA.length} Verified Legal Reports Archived
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="reports-toolbar">
        <div className="search-input-wrap">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            placeholder="Search reports by ID, facility, district, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="reports-search-input"
          />
        </div>

        <div className="category-filter-bar">
          <Filter size={13} className="filter-icon" />
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Reports
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'Statutory Notice' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Statutory Notice')}
          >
            Statutory Notices
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'Satellite Briefing' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Satellite Briefing')}
          >
            Satellite Briefings
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'Audit Report' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Audit Report')}
          >
            Audit Reports
          </button>
          <button
            className={`filter-btn ${selectedCategory === 'Annual Compliance' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Annual Compliance')}
          >
            Annual Summaries
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="reports-cards-grid">
        {filteredReports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onViewReport={(rep) => setActiveReportModal(rep)}
            onOpenPdf={(rep) => setActivePdfModal(rep)}
          />
        ))}
      </div>

      {/* Interactive Report Briefing Modal */}
      {activeReportModal && (
        <ReportViewerModal
          report={activeReportModal}
          onClose={() => setActiveReportModal(null)}
        />
      )}

      {/* Official Government Printable PDF Modal */}
      {activePdfModal && (
        <OfficialPdfReportModal
          report={activePdfModal}
          onClose={() => setActivePdfModal(null)}
        />
      )}
    </div>
  );
}

export default ReportsPage;
