import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
} from '@chakra-ui/react';
import PageLayout from '../components/layouts/PageLayout';
import { useEffect, useState } from 'react';
import { MenuItems } from '../lib/constants/global.constants';
import MenuItem from '../components/MenuItem';
import AddLinkModal from '../components/modals/AddLinkModal';
import ProfileLinkModal from '../components/modals/ProfileLinkModal';
import ProfileInfo from '../components/ProfileInfo';
import ChangeLinkModal from '../components/modals/ChangeLinkModal';
import UpdateEmailModal from '../components/modals/UpdateEmailModal';
import ChangePasswordModal from '../components/modals/ChangePasswordModal';
import StatsModal from '../components/modals/StatsModal';
import { Api } from '../lib/Api';
import Button from '../components/common/Button';
import LinkItem from '../components/LinkItem';
import { EditIcon } from '@chakra-ui/icons';
import { useAuth } from '../lib/contexts/AuthContext';
import UpdateBioModal from '../components/modals/UpdateBioModal';

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
  const [isOpenBio, setIsOpenBio] = useState<boolean>(false);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [selectedLink, setSelectedLink] = useState<LinkType>();
  const [user, setUser] = useState<UserType>();

  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const TOKEN = localStorage.getItem('token');

  const getCurrentUser = async () => {
    const { data } = await Api.get('/users/current', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    if (!data.isVerified) {
      navigate(`/signup?email-verify=${data.email}`);
    } else if (!data.profileImage) {
      navigate('/onboarding');
    }
    setUser(data);
  };

  const getLinks = async () => {
    if (TOKEN) {
      const { data } = await Api.get('/links', {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      setLinks(data);
    } else {
      console.log('No token found, user is not authorized');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getCurrentUser();
      getLinks();
    }
  }, [isAuthenticated]);

  const onBack = () => {
    navigate(-1);
  };

  const onCloseMenu = () => {
    setIsOpenMenu(false);
  };

  const onMenuItemClick = (menuItem: MenuItems) => {
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
      case MenuItems.UPDATE_BIO:
        setIsOpenBio(true);
        break;
      case MenuItems.LOGOUT:
        logout();
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
      <Flex flexDirection='column' gap={6}>
        <ProfileInfo
          username={user?.username || ''}
          profileImage={user?.profileImage || ''}
          backgroundImage={user?.backgroundImage || ''}
          bio={user?.bio || ''}
          onImageUpdated={() => getCurrentUser()}
        />
        <Flex flexDirection='column' gap={4} maxHeight='250px' overflow='auto'>
          {links.map(({ imageName, title, url, _id }) => (
            <LinkItem
              imageName={imageName}
              title={title}
              actionIcon={<EditIcon color='#00CB36' />}
              onAction={() => {
                setSelectedLink({
                  imageName,
                  title,
                  url,
                  _id,
                });
                setIsOpenAddLink(true);
              }}
              url={url}
              linkId={_id}
            />
          ))}
        </Flex>
      </Flex>
      <Button onClick={() => setIsOpenAddLink(true)}>Add Link</Button>
      <Drawer isOpen={isOpenMenu} placement='right' onClose={onCloseMenu}>
        <DrawerOverlay />
        <DrawerContent borderRadius='16px 0px 0px 16px'>
          <DrawerCloseButton color='#D818C3' top='15px' />
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
        onClose={() => {
          setIsOpenAddLink(false);
          setSelectedLink(undefined);
          getLinks();
        }}
        selectedLink={selectedLink}
      />
      <ProfileLinkModal
        isOpen={isOpenProfileLink}
        onClose={() => setIsOpenProfileLink(false)}
        profileLink={user?.profileLink || ''}
      />
      <ChangeLinkModal
        isOpen={isOpenChangeLink}
        onClose={() => setIsOpenChangeLink(false)}
        user={user}
        onUpdateUser={(val: UserType) => setUser(val)}
      />
      <UpdateEmailModal
        isOpen={isOpenUpdateEmail}
        onClose={() => setIsOpenUpdateEmail(false)}
        currentEmail={user?.email || ''}
      />
      <ChangePasswordModal
        isOpen={isOpenChangePassword}
        onClose={() => setIsOpenChangePassword(false)}
      />
      <StatsModal
        isOpen={isOpenStats}
        onClose={() => setIsOpenStats(false)}
        links={links}
        onUpdateLinks={() => getLinks()}
      />
      <UpdateBioModal
        isOpen={isOpenBio}
        onClose={() => {
          getCurrentUser()
          setIsOpenBio(false)
        }}
        bio={user?.bio || ''}
      />
    </PageLayout>
  );
};

export default Profile;
