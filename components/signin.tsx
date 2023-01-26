import { Box } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

interface SignInProps {
  isSignInMode: boolean;
  setSignInMode: Dispatch<SetStateAction<boolean>>;
}

export default function SignIn(props: SignInProps) {
  return <Box>SignIn</Box>;
}
