import { Box } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

interface SignUpProps {
  isSignInMode: boolean;
  setSignInMode: Dispatch<SetStateAction<boolean>>;
}
export default function SignUn(props: SignUpProps) {
  return <Box>SignUp</Box>;
}
