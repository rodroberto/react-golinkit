import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Image, Center, useToast, Flex } from '@chakra-ui/react';

interface ImageDropzoneProps {
  isCircle?: boolean;
  height: string;
  width: string;
}

const ImageDropzone = ({ isCircle = false, width, height }: ImageDropzoneProps) => {
  const [image, setImage] = useState<string | null>(null);
  const toast = useToast();

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Set base64 result here
        toast({
          title: 'Image uploaded.',
          description: 'The image has been successfully uploaded.',
          status: 'success',
          duration: 3000,
          isClosable: true,
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
        borderWidth="2px"
        borderRadius={isCircle ? 'full' : 'md'}
        borderColor="gray.300"
        width={width}
        height={height}
        bg="rgba(255, 121, 121, 0.1)"
        textAlign="center"
        _hover={{ borderColor: 'gray.400' }}
        cursor="pointer"
        transition="all 0.2s"
      >
        <input {...getInputProps()} />
        {image ? (
            <Image
              src={image}
              alt="Uploaded image"
              borderRadius={isCircle ? 'full' : 'md'}
              boxSize="100%"
              objectFit="cover"
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
