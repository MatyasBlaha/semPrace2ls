'use client';

import {Card, CardBody, CardHeader, Heading, Button, Flex, Icon} from '@chakra-ui/react';
import {useLocale} from "@/hooks/useLocale";
import {MdAddBusiness} from 'react-icons/md';

export default function NewOwnerCard() {
    const locale = useLocale();

    return (
        <Card.Root w="300px" shadow="md" borderRadius="2xl" bg="gray.50" _hover={{ bg: 'gray.100' }}>
            <CardHeader>
                <Flex align="center" gap={2}>
                    <Icon as={MdAddBusiness} boxSize={6} />
                    <Heading size="md">Create New Owner</Heading>
                </Flex>
            </CardHeader>
            <CardBody>
                <Button colorScheme="green" as="a" href={`/${locale}/owner/new`}>
                    New Owner
                </Button>
            </CardBody>
        </Card.Root>
    );
}