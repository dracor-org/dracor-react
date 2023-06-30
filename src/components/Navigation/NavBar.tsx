import React from 'react';

export interface NavBarProps {
  title: string;
}

export default function NavBar ({title}: NavBarProps) {
  return <nav>{title}</nav>;
};
