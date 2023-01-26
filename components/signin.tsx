import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface SignInProps {
  isSignInMode: boolean;
  setSignInMode: Dispatch<SetStateAction<boolean>>;
}
export default function SignIn(props: SignInProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { data: session } = useSession();
  console.log('Session: ', session);

  const router = useRouter();

  const handleSignIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log('Email: ', email);
    await signIn('credentials', {
      redirect: false,
      email,
      password,
    })
      .then((response) => {
        console.log(response);
        router.replace('/profile');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Flex h={'100%'} justifyContent={'center'} alignItems={'center'}>
      {props.isSignInMode ? (
        <VStack w={'100%'} spacing={5}>
          <Heading as="h2" fontFamily={'monospace'} fontWeight={'bolder'}>
            Sign In
          </Heading>
          <form onSubmit={handleSignIn} style={{ width: '75%' }}>
            <VStack spacing={5} w={'100%'}>
              <FormControl isRequired={true}>
                <Input
                  type={'email'}
                  placeholder={'Email'}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormErrorMessage>
                  {email === '' ? 'Email is required' : 'Invalid email'}
                </FormErrorMessage>
              </FormControl>
              <FormControl isRequired={true}>
                <Input
                  type={'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormErrorMessage>
                  Password cannot be less than 8 characters
                </FormErrorMessage>
              </FormControl>
            </VStack>
            <Box>
              <Button
                bgColor={'transparent'}
                fontSize={'0.8rem'}
                color={'#00000088'}
                fontFamily={'monospace'}
                transition={'0.5s'}
                _hover={{ bgColor: 'transparent', color: 'red' }}
              >
                <Link href="reset-password">Forgot Password?</Link>
              </Button>
            </Box>
            <Flex justifyContent={'center'}>
              <Button
                type="submit"
                borderRadius={'full'}
                bgColor={'red'}
                fontFamily={'monospace'}
                color={'white'}
                _hover={{
                  bgColor: 'transparent',
                  color: 'red',
                  border: '2px solid red',
                }}
                w={'60%'}
              >
                SIGN IN
              </Button>
            </Flex>
          </form>
        </VStack>
      ) : (
        <Flex
          h={{ base: '60%', md: '40%' }}
          px={5}
          flexDirection={'column'}
          justifyContent={'space-around'}
          alignItems={'center'}
          fontFamily={'monospace'}
        >
          <Heading
            as="h2"
            color={'white'}
            fontSize={'2.4rem'}
            fontWeight={'extrabold'}
          >
            Welcome Back!
          </Heading>
          <Text fontSize={'1rem'} textAlign={'center'} color={'white'}>
            To continue your journey with us, please login
          </Text>
          <Button
            border={'2px solid #fff'}
            borderRadius={'full'}
            bgColor={'transparent'}
            color={'white'}
            w={'50%'}
            onClick={() => props.setSignInMode(true)}
            _hover={{ bgColor: '#fff', color: 'red' }}
          >
            SIGN IN
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
