import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { FeedPage } from "./pages/feed";
import { HomePage } from "./pages/home";
import { PostPage } from "./pages/post";
import { SubmitPage } from "./pages/submit";
import { RegisterPage } from "./pages/register";
import { SettingsPage } from "./pages/settings";
import { ClaimPage } from "./pages/claim";
import { DmListPage } from "./pages/dm-list";
import { DmConversationPage } from "./pages/dm-conversation";

export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/claim/:token" element={<ClaimPage />} />
        <Route path="/dm" element={<DmListPage />} />
        <Route path="/dm/:id" element={<DmConversationPage />} />
      </Routes>
    </AppShell>
  );
}
