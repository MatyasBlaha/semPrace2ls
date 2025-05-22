'use client';

import {
    Box,
    Button,
    Flex,
    Icon,
    Link,
    Spinner,
    Text,
    VStack
} from '@chakra-ui/react';
import { MdWork, MdPerson } from 'react-icons/md';
import { useLocale } from '@/hooks/useLocale';
import { useAuth } from '@/hooks/useAuth';
import { useOwnersControllerGetById, useOwnersControllerGetByUserId } from '../../../../hooks/api/generated';
import { useOwner } from '@/context/OwnerContext';
import { MenuRoot, MenuTrigger, MenuContent } from '@ark-ui/react';
import z from 'zod';

export const newOwnerSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
});

export type NewOwnerValues = z.infer<typeof newOwnerSchema>;

interface SidebarProps {
    onMobileClose?: () => void;
}

export default function Sidebar({ onMobileClose }: SidebarProps) {
    const { ownerId } = useOwner();
    const locale = useLocale();
    const { data: authData, loading: authLoading } = useAuth(true);

    const { data: owners = [], isLoading: ownersLoading } = useOwnersControllerGetByUserId(authData?.id ?? '');
    const { data: currentOwner, isSuccess } = useOwnersControllerGetById<NewOwnerValues>(ownerId);

    const handleLinkClick = () => {
        onMobileClose?.();
    };

    return (
        <Box as="aside" bg="gray.800" color="white" p={4} h="100%" overflowY="auto">
            <VStack align="start" spacing={6}>
                <Text fontSize="xl" fontWeight="bold">
                    My Owners
                </Text>

                {ownersLoading || authLoading ? (
                    <Spinner />
                ) : (
                    <MenuRoot>
                        <MenuTrigger asChild>
                            <Button size="sm" colorScheme="blue">
                                {currentOwner?.name || 'Choose owner'}
                            </Button>
                        </MenuTrigger>
                        <MenuContent borderRadius="md" p={2} shadow="md">
                            {owners.map((owner) => (
                                <Link
                                    key={owner.id}
                                    href={`/${locale}/owner/${owner.id}`}
                                    _hover={{ textDecoration: 'none', bg: 'gray.100' }}
                                    px={3}
                                    py={2}
                                    borderRadius="md"
                                    display="block"
                                    color='white'
                                    bg='black'
                                    onClick={handleLinkClick}
                                >
                                    {owner.name}
                                </Link>
                            ))}
                        </MenuContent>
                    </MenuRoot>
                )}

                <Flex direction="column" gap={4} pt={4} w="full">
                    <Text fontSize="sm" fontWeight="semibold">
                        Navigation
                    </Text>
                    <Link
                        color='white'
                        href={`/${locale}/owner/${ownerId}/employees`}
                        display="flex"
                        alignItems="center"
                        gap={2}
                        onClick={handleLinkClick}
                    >
                        <Icon as={MdWork} boxSize={5} />
                        Employees
                    </Link>
                    <Link
                        color='white'
                        href={`/${locale}/owner/${ownerId}/branches`}
                        display="flex"
                        alignItems="center"
                        gap={2}
                        onClick={handleLinkClick}
                    >
                        <Icon as={MdPerson} boxSize={5} />
                        Branches
                    </Link>
                    <Link
                        color='white'
                        href={`/${locale}/owner/${ownerId}/settings`}
                        display="flex"
                        alignItems="center"
                        gap={2}
                        onClick={handleLinkClick}
                    >
                        <Icon as={MdWork} boxSize={5} />
                        Settings
                    </Link>
                </Flex>
            </VStack>
        </Box>
    );
}