import { useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  Image,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import PageLayout from '../components/layouts/PageLayout';
import { useState } from 'react';
import { MenuItems } from '../lib/constants/global.constants';
import MenuItem from '../components/MenuItem';
import AddLinkModal from '../components/modals/AddLinkModal';
import ProfileLinkModal from '../components/modals/ProfileLinkModal';
import ProfileInfo from '../components/ProfileInfo';
import ChangeLinkModal from '../components/modals/ChangeLinkModal';
import UpdateEmailModal from '../components/modals/UpdateEmailModal';
import ChangePasswordModal from '../components/modals/ChangePasswordModal';
import StatsModal from '../components/modals/StatsModal';

const MENU_ITEMS = Object.values(MenuItems);

const Profile = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenAddLink, setIsOpenAddLink] = useState<boolean>(false);
  const [isOpenProfileLink, setIsOpenProfileLink] = useState<boolean>(false);
  const [isOpenChangeLink, setIsOpenChangeLink] = useState<boolean>(false);
  const [isOpenUpdateEmail, setIsOpenUpdateEmail] = useState<boolean>(false);
  const [isOpenChangePassword, setIsOpenChangePassword] =
    useState<boolean>(false);
  const [isOpenStats, setIsOpenStats] = useState<boolean>(false);

  const navigate = useNavigate();

  const onBack = () => {};

  const onCloseMenu = () => {
    setIsOpenMenu(false);
  };

  const onMenuItemClick = (menuItem: MenuItems) => {
    console.log('menuItem', menuItem);
    switch (menuItem) {
      case MenuItems.HOME:
        navigate('/');
        break;
      case MenuItems.PROFILE_LINK:
        setIsOpenProfileLink(true);
        break;
      case MenuItems.CHANGE_LINK:
        setIsOpenChangeLink(true);
        break;
      case MenuItems.UPDATE_EMAIL:
        setIsOpenUpdateEmail(true);
        break;
      case MenuItems.CHANGE_PASSWORD:
        setIsOpenChangePassword(true);
        break;
      case MenuItems.STATS:
        setIsOpenStats(true);
        break;

      default:
        break;
    }
  };

  return (
    <PageLayout
      onBack={onBack}
      title='Profile'
      isMenu
      onMenuOpen={() => setIsOpenMenu(true)}
    >
      <ProfileInfo />
      <Button onClick={() => setIsOpenAddLink(true)}>Add Link</Button>
      <Drawer isOpen={isOpenMenu} placement='right' onClose={onCloseMenu}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Profile Menu</DrawerHeader>

          <DrawerBody>
            {MENU_ITEMS.map((menu: string, index: number) => (
              <MenuItem
                key={index}
                title={menu}
                onClick={() => onMenuItemClick(menu as MenuItems)}
              />
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <AddLinkModal
        isOpen={isOpenAddLink}
        onClose={() => setIsOpenAddLink(false)}
      />
      <ProfileLinkModal
        isOpen={isOpenProfileLink}
        onClose={() => setIsOpenProfileLink(false)}
      />
      <ChangeLinkModal
        isOpen={isOpenChangeLink}
        onClose={() => setIsOpenChangeLink(false)}
      />
      <UpdateEmailModal
        isOpen={isOpenUpdateEmail}
        onClose={() => setIsOpenUpdateEmail(false)}
      />
      <ChangePasswordModal
        isOpen={isOpenChangePassword}
        onClose={() => setIsOpenChangePassword(false)}
      />
      <StatsModal isOpen={isOpenStats} onClose={() => setIsOpenStats(false)} />
    </PageLayout>
  );
};

export default Profile;
