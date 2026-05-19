import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SplashOnboarding from './screens/SplashOnboarding';
import LandingPage from './screens/LandingPage';
import HomeDashboard from './screens/HomeDashboard';
import ModeSelection from './screens/ModeSelection';
import LiveTranslation from './screens/LiveTranslation';
import SignReader from './screens/SignReader';
import Glossary from './screens/Glossary';
import LiveInterpreter from './screens/LiveInterpreter';
import CivicResources from './screens/CivicResources';
import ValidatorPanel from './screens/ValidatorPanel';
import AdminDashboard from './screens/AdminDashboard';
import Settings from './screens/Settings';
import EmergencySOS from './screens/EmergencySOS';
import LearnFlashcards from './screens/LearnFlashcards';
import LearnDaily from './screens/LearnDaily';
import LearnCourses from './screens/LearnCourses';
import LearnAlphabet from './screens/LearnAlphabet';
import LearnProfile from './screens/LearnProfile';
import LearnHearing from './screens/LearnHearing';
import LearnCamera from './screens/LearnCamera';
import DesktopLayout from './components/DesktopLayout';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<SplashOnboarding />} />
          
          <Route path="/home" element={<DesktopLayout><HomeDashboard /></DesktopLayout>} />
          <Route path="/mode-selection" element={<DesktopLayout><ModeSelection /></DesktopLayout>} />
          <Route path="/live-translation" element={<DesktopLayout><LiveTranslation /></DesktopLayout>} />
          <Route path="/sign-reader" element={<DesktopLayout><SignReader /></DesktopLayout>} />
          <Route path="/glossary" element={<DesktopLayout><Glossary /></DesktopLayout>} />
          <Route path="/live-interpreter" element={<DesktopLayout><LiveInterpreter /></DesktopLayout>} />
          <Route path="/civic-resources" element={<DesktopLayout><CivicResources /></DesktopLayout>} />
          <Route path="/validator" element={<DesktopLayout><ValidatorPanel /></DesktopLayout>} />
          <Route path="/admin" element={<DesktopLayout><AdminDashboard /></DesktopLayout>} />
          <Route path="/settings" element={<DesktopLayout><Settings /></DesktopLayout>} />
          <Route path="/emergency" element={<DesktopLayout><EmergencySOS /></DesktopLayout>} />

          {/* ── Learning Hub ── */}
          <Route path="/learn/courses"    element={<DesktopLayout><LearnCourses />   </DesktopLayout>} />
          <Route path="/learn/flashcards" element={<DesktopLayout><LearnFlashcards /></DesktopLayout>} />
          <Route path="/learn/daily"      element={<DesktopLayout><LearnDaily />     </DesktopLayout>} />
          <Route path="/learn/alphabet"   element={<DesktopLayout><LearnAlphabet />  </DesktopLayout>} />
          <Route path="/learn/profile"    element={<DesktopLayout><LearnProfile />   </DesktopLayout>} />
          <Route path="/learn/camera"     element={<DesktopLayout><LearnCamera />    </DesktopLayout>} />
          <Route path="/learn/hearing"    element={<LearnHearing />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
