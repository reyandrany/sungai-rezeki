import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage.tsx'
import SiteShell from './components/SiteShell.tsx'
import {
  AboutPage,
  ContactPage,
  FleetPage,
  GroupPage,
  ProjectsPage,
  ServicesPage,
} from './pages/companyPages.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteShell />}>
          <Route index element={<LandingPage />} />
          <Route path="tentang-kami" element={<AboutPage />} />
          <Route path="servis" element={<ServicesPage />} />
          <Route path="projek" element={<ProjectsPage />} />
          <Route path="aset-kenderaan" element={<FleetPage />} />
          <Route path="anak-syarikat" element={<GroupPage />} />
          <Route path="pelanggan" element={<Navigate to="/anak-syarikat#pelanggan" replace />} />
          <Route path="hubungi" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
