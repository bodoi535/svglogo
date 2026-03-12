import EditorPage from "#/components/EditorPage";
import InfoFab from "#/components/InfoFab";
import UpdatesFab from "#/components/UpdatesFab";
import { fetchLatestNotification } from "#/lib/notifications";

export default async function Home() {
  const notification = await fetchLatestNotification();

  return (
    <>
      <EditorPage />
      <UpdatesFab notification={notification} />
      <InfoFab />
    </>
  );
}
