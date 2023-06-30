import React from 'react';

export interface NavigationProps {
  title: string;
}

export default function Navigation({title}: NavigationProps) {
  return <nav>{title}</nav>;
};
