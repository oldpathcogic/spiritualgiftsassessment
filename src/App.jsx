import React from 'react';
import SpiritualGiftsAssessment from './components/SpiritualGiftsAssessment.jsx';
import AssessmentResultsViewer from './components/AssessmentResultsViewer.jsx';

export default function App() {
  const isAdminView = window.location.pathname === '/admin';

  return isAdminView ? <AssessmentResultsViewer /> : <SpiritualGiftsAssessment />;
}
