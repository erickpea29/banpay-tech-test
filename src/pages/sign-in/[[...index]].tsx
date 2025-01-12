import { Footer, Navbar } from "@/components";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-1 items-center justify-center">
        <SignIn />
      </main>
      <Footer />
    </div>
  );
}
