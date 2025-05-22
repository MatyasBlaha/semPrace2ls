import { Spinner, Flex } from '@chakra-ui/react';

export default function Loading() {
    return (
        <Flex w="100%" h="100%" align="center" justify="center">
            <Spinner size="xl" />
        </Flex>
    );
}