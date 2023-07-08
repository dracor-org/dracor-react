import React from 'react';

export interface NavBarProps {
  title: string;
}

export default function NavBar ({title}: NavBarProps) {
  return (
    <nav className="text-center bg-blue-700 text-white p-2 text-xl">
      {title}
    </nav>
  );
};
