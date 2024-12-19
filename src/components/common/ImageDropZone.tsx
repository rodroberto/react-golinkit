import { useDropzone } from 'react-dropzone';
import { Box, Image, Center, useToast, Flex } from '@chakra-ui/react';

interface ImageDropzoneProps {
  isCircle?: boolean;
  height: string;
  width: string;
  image: string;
  onSetImage: (val: string) => void;
  imageDirectory?: string;
}

const ImageDropzone = ({
  isCircle = false,
  width,
  height,
  image,
  onSetImage,
  imageDirectory = 'links',
}: ImageDropzoneProps) => {
  const toast = useToast();

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onSetImage(reader.result as string); // Set base64 result here
        toast({
          title: 'Image uploaded.',
          description: 'The image has been successfully uploaded.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      };
      reader.readAsDataURL(file); // Read the file as base64
    } else {
      toast({
        title: 'Invalid file type.',
        description: 'Please upload an image file.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['image/*'] as any, // Accept image files
  });

  return (
    <Center>
      <Box
        {...getRootProps()}
        borderRadius={isCircle ? 'full' : 'md'}
        width={width}
        height={height}
        bg='rgba(255, 121, 121, 0.1)'
        textAlign='center'
        _hover={{ borderColor: 'gray.400' }}
        cursor='pointer'
        transition='all 0.2s'
      >
        <input {...getInputProps()} />
        {image ? (
          <Image
            src={
              image.includes('.')
                ? `${process.env.REACT_APP_BASE_URL}/${imageDirectory}/${image}`
                : image
            }
            alt='Uploaded image'
            borderRadius={isCircle ? 'full' : 'md'}
            boxSize='100%'
            objectFit='cover'
          />
        ) : (
          <Flex height='full' justifyContent='center' alignItems='center'>
            <Image src='/assets/add-image.png' alt='add-icon' width='40px' />
          </Flex>
        )}
      </Box>
    </Center>
  );
};

export default ImageDropzone;
