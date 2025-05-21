'use client';

import {Card, CardBody, CardHeader, Heading, Button, Flex, Icon} from '@chakra-ui/react';
import {useAuth} from "@/hooks/useAuth";
import {useOwnersControllerGetByUserId} from "../../hooks/api/generated";
import {useLocale} from "@/hooks/useLocale";
import {MdWork} from 'react-icons/md';
import NewOwnerCard from "@/components/NewOwnerCard";

export default function OwnerCard() {
    const locale = useLocale();
    const {data: authData, loading: authLoading} = useAuth(true);
    const {data: owners, isLoading: ownersLoading} = useOwnersControllerGetByUserId(
        authData?.id ?? ""
    );

    if (authLoading || ownersLoading) return <div>Loading...</div>;

    return (
        <Flex gap={4} wrap="wrap">
            {owners.map((owner) => (
                <Card.Root key={owner.id} w="300px" shadow="md" borderRadius="2xl">
                    <CardHeader>
                        <Flex align="center" gap={2}>
                            <Icon as={MdWork} boxSize={6} />
                            <Heading size="md">{owner.name}</Heading>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Button colorScheme="blue" as="a" href={`/${locale}/owner/${owner.id}`}>
                            Go to owner
                        </Button>
                    </CardBody>
                </Card.Root>
            ))}
            <NewOwnerCard />
        </Flex>
    )
}