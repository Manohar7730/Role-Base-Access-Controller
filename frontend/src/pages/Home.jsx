import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">

      <h1 className="text-2xl font-semibold mb-4">
        Welcome to RBAC System
      </h1>

      <Button>
        <Link to="/login">Login</Link>
      </Button>

      <Button>
        <Link to="/register">Register</Link>
      </Button>

    </div>
  );
}