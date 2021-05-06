import React, { useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { SidebarBody, SidebarRefObject, SidebarProps, Sidebar } from '@paljs/ui/Sidebar';
import { Menu, MenuRefObject } from '@paljs/ui/Menu';
import { Button } from '@paljs/ui/Button';
import { EvaIcon } from '@paljs/ui/Icon';
import { Link } from 'gatsby';
import { Location } from '@reach/router';
import { MenuItemType } from '@paljs/ui';
import getMenu from './menu';

export const getPathReady = (path: string) => {
  return path.endsWith('/') ? path.slice(0, -1) : path;
};

const SidebarCustom: React.ForwardRefRenderFunction<Omit<SidebarRefObject, 'hide'>, SidebarProps> = (props, ref) => {
  const [menuState, setMenuState] = useState(false);
  const sidebarRef = useRef<SidebarRefObject>(null);
  const menuRef = useRef<MenuRefObject>(null);
  const [seeHeader, setSeeHeader] = useState(false);
  const [items, setItems] = useState<MenuItemType[]>([{ title: 'Loading', group: true }]);

  useImperativeHandle(ref, () => ({
    toggle() {
      sidebarRef.current?.toggle();
    },
  }));

  const getState = (state?: 'hidden' | 'visible' | 'compacted' | 'expanded') => {
    setSeeHeader(state !== 'compacted');
  };

  useEffect(() => {
    getMenu().then((menus) => {
      setItems(menus);
    });
  }, []);

  return (
    <Sidebar getState={getState} ref={sidebarRef} property="start" containerFixed responsive className="menu-sidebar">
      <SidebarBody>
        <Location>
          {({ location }) => (
            <Menu
              className="sidebar-menu"
              Link={Link}
              ref={menuRef}
              items={items}
              currentPath={getPathReady(location.pathname)}
              toggleSidebar={() => sidebarRef.current?.hide()}
            />
          )}
        </Location>
      </SidebarBody>
    </Sidebar>
  );
};

export default forwardRef(SidebarCustom);
