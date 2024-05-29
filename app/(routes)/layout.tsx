import GoToTop from "../ui/GoToTop";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <GoToTop />
    </>
  );
}
