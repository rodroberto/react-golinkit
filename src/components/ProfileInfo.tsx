import { Flex, Image, Text } from '@chakra-ui/react';
import ImageDropzone from './common/ImageDropZone';
import { Api } from '../lib/Api';

interface ProfileInfoProps {
  username: string;
  profileImage: string;
  backgroundImage: string;
  bio: string;
  isUpdateProfileImage?: boolean;
  onProfileImageUpdated?: () => void;
}

const ProfileInfo = ({
  username,
  profileImage,
  backgroundImage,
  bio,
  isUpdateProfileImage = false,
  onProfileImageUpdated
}: ProfileInfoProps) => {
  const TOKEN = localStorage.getItem('token');

  const onUpdateProfileImage = async (image: string) => {
    const { data } = await Api.put(
      `/users/update-profile-image`,
      {
        image,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    onProfileImageUpdated?.()
  };

  return (
    <Flex flexDirection='column'>
      <Flex justifyContent='center'>
        <Image
          src={`${process.env.REACT_APP_BASE_URL}/backgrounds/${backgroundImage}`}
          alt='Logo'
          width='100%'
          maxHeight='200px'
          objectFit='cover'
        />
      </Flex>
      <Flex justifyContent='center' marginTop='-65px'>
        {isUpdateProfileImage ? (
          <ImageDropzone
            isCircle
            width='140px'
            height='140px'
            image={profileImage}
            imageDirectory='profiles'
            onSetImage={(val: string) => onUpdateProfileImage(val)}
          />
        ) : (
          <Image
            borderRadius='full'
            boxSize='130px'
            src={`${process.env.REACT_APP_BASE_URL}/profiles/${profileImage}`}
            alt='Dan Abramov'
          />
        )}
      </Flex>
      <Text textAlign='center' marginY='16px'>
        {username}
      </Text>
      <Text textAlign='center'>{bio}</Text>
    </Flex>
  );
};

export default ProfileInfo;
