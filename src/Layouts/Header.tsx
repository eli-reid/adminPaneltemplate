import React from 'react';
import { Link } from 'gatsby';
import styled, { DefaultTheme } from 'styled-components';
import Select from '@paljs/ui/Select';
import { LayoutHeader } from '@paljs/ui/Layout';
import { EvaIcon } from '@paljs/ui/Icon';
import { Actions } from '@paljs/ui/Actions';
import ContextMenu from '@paljs/ui/ContextMenu';
import User from '@paljs/ui/User';
import { getPathReady } from './Sidebar';
import { Location } from '@reach/router';
import { breakpointDown } from '@paljs/ui/breakpoints';
import { useState } from 'react';
import { useEffect } from 'react';
import getThemes, { theme } from './themesOptions';
import { EvaIconOptions, Icon } from '@paljs/icons';

const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${breakpointDown('sm')`
    .right{
      display: none;
    }
  `}
  .right > div {
    height: auto;
    display: flex;
    align-content: center;
  }
  .logo {
    font-size: 1.25rem;
    white-space: nowrap;
    text-decoration: none;
  }
  .left {
    display: flex;
    align-items: center;
    .github {
      font-size: 18px;
      margin-right: 5px;
    }
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
`;

const SelectStyled = styled(Select)`
  min-width: 150px;
`;

interface HeaderProps {
  toggleSidebar: () => void;
  theme: {
    set: (value: DefaultTheme['name']) => void;
    value: DefaultTheme['name'];
  };
  changeDir: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const [themeOptions, setThemeOptions] = useState<theme[]>([]);
  useEffect(() => {
    getThemes().then((themes: theme[]) => {
      themes.forEach(function (item) {
        let label = (
          <Label>
            <EvaIcon
              name={item.jsonLabel.icon.name as keyof Icon}
              options={item.jsonLabel.icon.options as EvaIconOptions}
            />
            {item.jsonLabel.value}
          </Label>
        );
        item.label = label;
      });
      console.log(themes[1].label);
      setThemeOptions(themes);
    });
  }, []);

  return (
    <LayoutHeader fixed>
      <HeaderStyle>
        <Actions
          size="Medium"
          actions={[
            {
              icon: { name: 'menu-2-outline' },
              url: {
                onClick: props.toggleSidebar,
              },
            },
            {
              content: (
                <Link to="/" className="logo">
                  Python Multitask Admin Panel
                </Link>
              ),
            },
            {
              content: (
                <SelectStyled
                  isSearchable={false}
                  shape="SemiRound"
                  placeholder="Themes"
                  value={themeOptions.find((item) => item.value === props.theme.value)}
                  options={themeOptions}
                  onChange={({ value }: { value: DefaultTheme['name'] }) => props.theme.set(value)}
                />
              ),
            },
          ]}
        />
        <Actions
          size="Small"
          className="right"
          actions={[
            {
              content: (
                <Location>
                  {({ location }) => (
                    <ContextMenu
                      style={{ cursor: 'pointer' }}
                      placement="bottom"
                      currentPath={getPathReady(location.pathname)}
                      items={[
                        { title: 'Profile', link: { to: '/modal-overlays/tooltip' } },
                        { title: 'Log out', link: { to: '/logout' } },
                      ]}
                      Link={Link}
                    >
                      <User image="url('/icons/icon-72x72.png')" name="Root" title="Manger" size="Medium" />
                    </ContextMenu>
                  )}
                </Location>
              ),
            },
          ]}
        />
      </HeaderStyle>
    </LayoutHeader>
  );
};
export default Header;
