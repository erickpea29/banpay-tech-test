import React from "react";
import { Navbar, Footer } from "@/components";

function MyFavorites() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <h1>My Favorites</h1>
      <Footer />
    </main>
  );
}

export default MyFavorites;
