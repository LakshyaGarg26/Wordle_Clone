import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <header className="text-4xl font-bold my-8">
    {title}
  </header>
);

export default Header;
