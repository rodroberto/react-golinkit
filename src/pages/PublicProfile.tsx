import { useNavigate, useParams } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import PageLayout from '../components/layouts/PageLayout';
import { useEffect, useState } from 'react';
import ProfileInfo from '../components/ProfileInfo';
import { Api } from '../lib/Api';
import LinkItem from '../components/LinkItem';

const PublicProfile = () => {
  const [links, setLinks] = useState<LinkType[]>([]);
  const [user, setUser] = useState<UserType>();

  const navigate = useNavigate();
  const { profileLink } = useParams();

  const getUser = async () => {
    const { data } = await Api.get(`/users/profiles/${profileLink}`);
    setUser(data);
  };

  const getLinks = async () => {
      const { data } = await Api.get(`/links/${profileLink}`);
      setLinks(data);
  };

  useEffect(() => {
    getUser();
    getLinks();
  }, []);

  const onBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout onBack={onBack} title='Profile'>
      <Flex flexDirection='column' gap={6}>
        <ProfileInfo
          email={user?.email || ''}
          profileImage={user?.profileImage || ''}
          backgroundImage={user?.backgroundImage || ''}
        />
        <Flex flexDirection='column' gap={4} maxHeight='250px' overflow='auto'>
          {links.map(({ imageName, title, url, _id }) => (
            <LinkItem imageName={imageName} title={title} url={url} linkId={_id} />
          ))}
        </Flex>
      </Flex>
    </PageLayout>
  );
};

export default PublicProfile;
