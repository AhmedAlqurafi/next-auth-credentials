import { Button, Flex, Text } from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();

  return (
    <Flex
      w={'50%'}
      mx={'auto'}
      flexDirection={'column'}
      justifyContent={'center'}
      my={5}
      fontFamily={'monospace'}
    >
      <Text textAlign={'center'}>
        Welcome {session?.user?.name} to our website
      </Text>
      <Button
        my={5}
        borderRadius={'full'}
        bgColor={'red'}
        fontFamily={'monospace'}
        color={'white'}
        w={'60%'}
        mx={'auto'}
        _hover={{
          bgColor: 'transparent',
          color: 'red',
          border: '2px solid red',
        }}
        onClick={() => signOut()}
      >
        Sign Out
      </Button>
    </Flex>
  );
}

//@ts-ignore
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permananet: false,
      },
    };
  }

  return {
    props: { session },
  };
};
