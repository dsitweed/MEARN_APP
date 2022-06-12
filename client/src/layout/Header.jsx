import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className="sticky h-6 top-0 bottom-0 left-0 right-0 z-50 bg-white border-slate-50">
        <div className="mx-auto my-1 px-2 ">
          <div className="flex justify-between items-center">
            <Link to={"/"} className="nav-link">
              <img className="h-12" alt="CIVIZEN Logo" />
            </Link>
            <div className="flex flex-row gap-2">
              <div className="hidden md:flex md:items-center">
                <Link to={"/templates"} className="nav-link btn-outline">
                  Mẫu CV
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
